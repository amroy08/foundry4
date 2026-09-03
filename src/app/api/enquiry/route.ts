import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// In-memory rate limiter to prevent spam attacks
// Maps IP Address to the timestamp of their last submission
const ipLimitMap = new Map<string, number>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 60 seconds

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      fullName,
      email,
      phone,
      companyName,
      serviceRequired,
      estimatedBudget,
      preferredContact,
      projectDescription,
      projectTimeline,
      consent,
      honeypot,
    } = body;

    // 1. Honeypot check (Spam Prevention)
    if (honeypot && honeypot.trim() !== "") {
      console.warn("Spam detected via honeypot field. Rejecting request silently.");
      // Return 200/success to make the bot think it succeeded, preventing retry
      return NextResponse.json({ success: true, message: "Enquiry filtered successfully." });
    }

    // 2. IP-based Rate Limiting (Spam Prevention)
    const clientIp = request.headers.get("x-forwarded-for") || "unknown-ip";
    const now = Date.now();
    const lastSubmitTime = ipLimitMap.get(clientIp);

    if (lastSubmitTime && now - lastSubmitTime < RATE_LIMIT_WINDOW) {
      const timeLeft = Math.ceil((RATE_LIMIT_WINDOW - (now - lastSubmitTime)) / 1000);
      return NextResponse.json(
        {
          success: false,
          error: `Too many requests. Please wait ${timeLeft} seconds before submitting again.`,
        },
        { status: 429 }
      );
    }
    
    // Update submission timestamp for this IP
    if (clientIp !== "unknown-ip") {
      ipLimitMap.set(clientIp, now);
    }

    // 3. Server-side Inputs Validation
    if (!fullName || !fullName.trim()) {
      return NextResponse.json({ success: false, error: "Full name is required." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: "A valid email address is required." }, { status: 400 });
    }

    if (!phone || !phone.trim()) {
      return NextResponse.json({ success: false, error: "Phone number is required." }, { status: 400 });
    }

    if (!projectDescription || projectDescription.trim().length < 10) {
      return NextResponse.json({ success: false, error: "Project description must be at least 10 characters." }, { status: 400 });
    }

    if (!consent) {
      return NextResponse.json({ success: false, error: "Data processing consent is required." }, { status: 400 });
    }

    // 4. Retrieve SMTP environment variables
    const smtpHost = process.env.SMTP_HOST || "smtppro.zoho.in";
    const smtpPort = parseInt(process.env.SMTP_PORT || "465");
    const smtpUser = process.env.SMTP_USER || "info@foundry4.in";
    const smtpPass = process.env.SMTP_PASSWORD || "ARADUGzYHddQ";
    const targetCompanyEmail = process.env.CONTACT_EMAIL || smtpUser;

    // Check if password is available to send emails
    const isSmtpConfigured = Boolean(smtpPass.trim());

    // 5. Send Emails with Multi-Server Zoho Fallback
    if (isSmtpConfigured) {
      try {
        const sendWithFallback = async (toEmail: string, subjectLine: string, htmlContent: string, senderName: string) => {
          const smtpConfigs = [
            { host: process.env.SMTP_HOST || "smtppro.zoho.in", port: parseInt(process.env.SMTP_PORT || "465"), secure: true },
            { host: "smtp.zoho.in", port: 465, secure: true },
            { host: "smtp.zoho.in", port: 587, secure: false },
            { host: "smtppro.zoho.com", port: 465, secure: true },
            { host: "smtp.zoho.com", port: 465, secure: true },
            { host: "smtp.zoho.com", port: 587, secure: false },
          ];

          let lastError: unknown = null;

          for (const cfg of smtpConfigs) {
            try {
              const transporter = nodemailer.createTransport({
                host: cfg.host,
                port: cfg.port,
                secure: cfg.secure,
                auth: {
                  user: smtpUser,
                  pass: smtpPass,
                },
                tls: {
                  rejectUnauthorized: false,
                },
                connectionTimeout: 10000,
                greetingTimeout: 6000,
              });

              await transporter.sendMail({
                from: `"${senderName}" <${smtpUser}>`,
                to: toEmail,
                subject: subjectLine,
                html: htmlContent,
              });

              console.log(`Enquiry email successfully dispatched via ${cfg.host}:${cfg.port} to ${toEmail}`);
              return true;
            } catch (err) {
              console.warn(`SMTP attempt failed on ${cfg.host}:${cfg.port}:`, err);
              lastError = err;
            }
          }

          throw lastError || new Error("All SMTP connection attempts failed.");
        };

        // Dispatch admin notification & client confirmation
        await Promise.all([
          sendWithFallback(targetCompanyEmail, `New Project Request - ${serviceRequired} [${fullName}]`, adminMailHtml, "Foundry4 Enquiries"),
          sendWithFallback(email, `We've received your Foundry4 project inquiry!`, clientMailHtml, "Foundry4 Support")
        ]);

      } catch (emailError) {
        console.error("All SMTP configuration attempts failed. Logging enquiry data to server logs:", emailError);
        console.log("=== ENQUIRY LOG FALLBACK (SMTP ERROR) ===");
        console.log(`Client Name: ${fullName}`);
        console.log(`Client Email: ${email}`);
        console.log(`Client Phone: ${phone}`);
        console.log(`Company: ${companyName}`);
        console.log(`Service Required: ${serviceRequired}`);
        console.log(`Estimated Budget: ${estimatedBudget}`);
        console.log(`Preferred Contact: ${preferredContact}`);
        console.log(`Project Timeline: ${projectTimeline}`);
        console.log(`Project Description:\n${projectDescription}`);
        console.log("=========================================");
      }
    } else {
      // SMTP variables missing - trigger fallback log mode
      console.warn("SMTP configuration details are missing. Running in Server Log fallback mode.");
      console.log("=== ENQUIRY LOG FALLBACK ===");
      console.log(`Client Name: ${fullName}`);
      console.log(`Client Email: ${email}`);
      console.log(`Client Phone: ${phone}`);
      console.log(`Company: ${companyName}`);
      console.log(`Service Required: ${serviceRequired}`);
      console.log(`Estimated Budget: ${estimatedBudget}`);
      console.log(`Preferred Contact: ${preferredContact}`);
      console.log(`Project Timeline: ${projectTimeline}`);
      console.log(`Project Description:\n${projectDescription}`);
      console.log("============================");
    }

    return NextResponse.json({ success: true, message: "Enquiry submitted successfully." });

  } catch (error) {
    console.error("Server error handling enquiry submission:", error);
    // Never expose detailed SMTP/server error messages to the client browser
    return NextResponse.json(
      { success: false, error: "Internal server error occurred while sending email." },
      { status: 500 }
    );
  }
}
