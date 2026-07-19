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

    const targetCompanyEmail = CONTACT_EMAIL || "info@foundry4.in";

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
        <div style="background-color: #030014; color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; border: 1px solid #1e1b4b; border-radius: 16px;">
          <!-- Top Accent Gradient Bar -->
          <div style="height: 4px; background: linear-gradient(90deg, #6366f1 0%, #d946ef 100%); border-radius: 4px; margin-bottom: 24px;"></div>
          
          <!-- Header Logo & Brand -->
          <div style="text-align: center; margin-bottom: 32px;">
            <a href="https://foundry4.in" target="_blank" style="text-decoration: none; display: inline-flex; align-items: center; gap: 8px;">
              <img src="https://foundry4.in/images/logo.png" alt="Foundry4 Logo" width="36" height="36" style="vertical-align: middle; border: 0; outline: none;" />
              <span style="font-size: 24px; font-weight: bold; color: #ffffff; letter-spacing: -0.5px; vertical-align: middle; margin-left: 6px; font-family: sans-serif;">
                Foundry<span style="color: #6366f1;">4</span>
              </span>
            </a>
          </div>
          
          <!-- Message Body -->
          <h3 style="color: #ffffff; font-size: 18px; margin-top: 0; margin-bottom: 12px; font-weight: 600;">Project Enquiry Received</h3>
          <p style="color: #94a3b8; font-size: 15px; line-height: 1.6; margin-bottom: 16px;">Dear ${fullName},</p>
          <p style="color: #94a3b8; font-size: 15px; line-height: 1.6; margin-bottom: 20px;">
            Thank you for reaching out to <strong>Foundry4</strong>. We have successfully received your project enquiry details.
          </p>
          
          <!-- Main Response Line -->
          <div style="color: #f8fafc; font-size: 15px; line-height: 1.6; margin-bottom: 24px; padding: 12px 16px; background-color: rgba(99, 102, 241, 0.1); border-left: 3px solid #6366f1; border-radius: 4px;">
            <strong>Our team will contact you within 24–48 hours</strong> via your preferred contact method (<strong>${preferredContact}</strong>) to discuss the project scope, timeline, and next steps.
          </div>
          
          <!-- Request Details Card -->
          <div style="background-color: rgba(13, 10, 33, 0.6); border: 1px solid #1e1b4b; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
            <h4 style="color: #ffffff; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; margin-top: 0; margin-bottom: 16px; font-weight: bold; border-bottom: 1px solid #1e1b4b; padding-bottom: 8px;">Summary of Request</h4>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 8px 0; color: #94a3b8; width: 40%; font-weight: 500;">Service Required:</td>
                <td style="padding: 8px 0; color: #ffffff; font-weight: 600;">${serviceRequired}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #94a3b8; font-weight: 500;">Estimated Timeline:</td>
                <td style="padding: 8px 0; color: #ffffff; font-weight: 600;">${projectTimeline}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #94a3b8; font-weight: 500;">Preferred Contact:</td>
                <td style="padding: 8px 0; color: #ffffff; font-weight: 600; text-transform: capitalize;">${preferredContact}</td>
              </tr>
            </table>
          </div>
          
          <!-- Better Ending Message -->
          <p style="color: #64748b; font-size: 13px; line-height: 1.5; margin-bottom: 24px; text-align: center; font-style: italic;">
            This is an automated confirmation email. Our team will follow up with you shortly.
          </p>
          
          <!-- Divider -->
          <div style="border-top: 1px solid #1e1b4b; margin-bottom: 24px;"></div>
          
          <!-- Brand Footer -->
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="text-align: center; padding-bottom: 16px;">
                <span style="font-size: 16px; font-weight: bold; color: #ffffff;">Foundry4</span>
                <br />
                <span style="font-size: 11px; color: #64748b; line-height: 1.5;">Building Digital Experiences That Move Businesses Forward.</span>
              </td>
            </tr>
            <tr>
              <td style="text-align: center; padding-bottom: 16px; font-size: 13px;">
                <a href="mailto:info@foundry4.in" style="color: #6366f1; text-decoration: none; margin: 0 10px;">info@foundry4.in</a>
                <span style="color: #334155;">|</span>
                <a href="tel:+918433568078" style="color: #6366f1; text-decoration: none; margin: 0 10px;">+91 8433568078</a>
                <span style="color: #334155;">|</span>
                <a href="https://foundry4.in" target="_blank" style="color: #6366f1; text-decoration: none; margin: 0 10px;">foundry4.in</a>
              </td>
            </tr>
            <tr>
              <td style="text-align: center; padding-bottom: 16px;">
                <!-- Social Badges for Brand Identity -->
                <a href="https://linkedin.com/company/foundry4-digital/" target="_blank" style="text-decoration: none; margin: 0 4px; display: inline-block;">
                  <span style="padding: 6px 12px; font-size: 11px; background-color: rgba(255,255,255,0.05); color: #94a3b8; border-radius: 12px; border: 1px solid #1e1b4b; font-family: sans-serif;">LinkedIn</span>
                </a>
                <a href="https://instagram.com/foundry4" target="_blank" style="text-decoration: none; margin: 0 4px; display: inline-block;">
                  <span style="padding: 6px 12px; font-size: 11px; background-color: rgba(255,255,255,0.05); color: #94a3b8; border-radius: 12px; border: 1px solid #1e1b4b; font-family: sans-serif;">Instagram</span>
                </a>
                <a href="https://twitter.com/foundry4" target="_blank" style="text-decoration: none; margin: 0 4px; display: inline-block;">
                  <span style="padding: 6px 12px; font-size: 11px; background-color: rgba(255,255,255,0.05); color: #94a3b8; border-radius: 12px; border: 1px solid #1e1b4b; font-family: sans-serif;">Twitter</span>
                </a>
                <a href="https://github.com/foundry4" target="_blank" style="text-decoration: none; margin: 0 4px; display: inline-block;">
                  <span style="padding: 6px 12px; font-size: 11px; background-color: rgba(255,255,255,0.05); color: #94a3b8; border-radius: 12px; border: 1px solid #1e1b4b; font-family: sans-serif;">GitHub</span>
                </a>
              </td>
            </tr>
            <tr>
              <td style="text-align: center; font-size: 11px; color: #475569;">
                &copy; 2026 Foundry4. All rights reserved.
              </td>
            </tr>
          </table>
        </div>
      `;

      // Dispatch to Company Inbox and Client Confirmation in parallel
      await Promise.all([
        transporter.sendMail({
          from: `"Foundry4 Enquiries" <${SMTP_USER}>`,
          to: targetCompanyEmail,
          subject: `New Project Request - ${serviceRequired} [${fullName}]`,
          html: adminMailHtml,
        }),
        transporter.sendMail({
          from: `"Foundry4 Support" <${SMTP_USER}>`,
          to: email,
          subject: `We've received your Foundry4 project inquiry!`,
          html: clientMailHtml,
        })
      ]);
      
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
