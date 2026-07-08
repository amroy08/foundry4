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

    if (!projectDescription || projectDescription.trim().length < 20) {
      return NextResponse.json({ success: false, error: "Project description must be at least 20 characters." }, { status: 400 });
    }

    if (!consent) {
      return NextResponse.json({ success: false, error: "Data processing consent is required." }, { status: 400 });
    }

    // 4. Retrieve SMTP environment variables
    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASSWORD,
      CONTACT_EMAIL,
    } = process.env;

    // Check if configuration is present
    const isSmtpConfigured = SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASSWORD && CONTACT_EMAIL;

    const targetCompanyEmail = CONTACT_EMAIL || "hello@foundry4.in";

    // 5. Send Emails
    if (isSmtpConfigured) {
      // Create SMTP transporter
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: parseInt(SMTP_PORT || "587"),
        secure: parseInt(SMTP_PORT || "587") === 465, // True for 465, false for other ports
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASSWORD,
        },
      });

      // HTML body for Company Notification Email
      const adminMailHtml = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #4f46e5; border-bottom: 2px solid #f1f5f9; padding-bottom: 10px;">New Project Enquiry from Foundry4</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 180px;">Client Name:</td>
              <td style="padding: 8px 0;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Email Address:</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Phone Number:</td>
              <td style="padding: 8px 0;"><a href="tel:${phone}">${phone}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Company Name:</td>
              <td style="padding: 8px 0;">${companyName || "Not Provided"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Service Required:</td>
              <td style="padding: 8px 0; font-weight: bold; color: #4f46e5;">${serviceRequired}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Estimated Budget:</td>
              <td style="padding: 8px 0;">${estimatedBudget || "Not Provided"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Preferred Contact:</td>
              <td style="padding: 8px 0;">${preferredContact}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Project Timeline:</td>
              <td style="padding: 8px 0;">${projectTimeline}</td>
            </tr>
          </table>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #f8fafc; border-radius: 6px;">
            <h4 style="margin-top: 0; margin-bottom: 8px; color: #334155;">Project Description:</h4>
            <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #475569; white-space: pre-wrap;">${projectDescription}</p>
          </div>
        </div>
      `;

      // HTML body for Client Confirmation Email
      const clientMailHtml = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #4f46e5; border-bottom: 2px solid #f1f5f9; padding-bottom: 10px;">Foundry4 Project Enquiry</h2>
          <p>Dear ${fullName},</p>
          <p>Thank you for reaching out to **Foundry4**. We have successfully received your project enquiry details.</p>
          <p>Our team of technical architects and creative leads is reviewing your requirements. We will contact you shortly via <strong>${preferredContact}</strong> to discuss the scope and define the next steps.</p>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #f8fafc; border-radius: 6px;">
            <h4 style="margin-top: 0; margin-bottom: 8px; color: #334155;">Summary of your request:</h4>
            <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #475569;">
              <li><strong>Service:</strong> ${serviceRequired}</li>
              <li><strong>Timeline:</strong> ${projectTimeline}</li>
              <li><strong>Preferred Contact:</strong> ${preferredContact}</li>
            </ul>
          </div>
          
          <p style="margin-top: 20px; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; padding-top: 15px;">
            This is an automated confirmation of your request. Please do not reply directly to this email.
          </p>
        </div>
      `;

      // Dispatch to Company Inbox
      await transporter.sendMail({
        from: `"Foundry4 Enquiries" <${SMTP_USER}>`,
        to: targetCompanyEmail,
        subject: `New Project Request - ${serviceRequired} [${fullName}]`,
        html: adminMailHtml,
      });

      // Dispatch to Client Confirmation
      await transporter.sendMail({
        from: `"Foundry4 Support" <${SMTP_USER}>`,
        to: email,
        subject: `We've received your Foundry4 project inquiry!`,
        html: clientMailHtml,
      });
      
      console.log(`Enquiry email dispatched successfully for: ${email}`);

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
