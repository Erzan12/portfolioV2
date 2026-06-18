import nodemailer from "nodemailer";

// Ensure environment variables exist before crashing silently
const gmailUser = process.env.GMAIL_USER;
const gmailPass = process.env.GMAIL_APP_PASSWORD;
const appUrl = process.env.NEXT_PUBLIC_APP_URL;

const logoUrl = "https://orgfmizyhreotvshajda.supabase.co/storage/v1/object/public/my_logo/favicon-light-8.png";

if (!gmailUser || !gmailPass || !appUrl) {
  throw new Error("Missing required email environment variables (GMAIL_USER, GMAIL_APP_PASSWORD, NEXT_PUBLIC_APP_URL).");
}

// Initialize the transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailUser,
    pass: gmailPass,
  },
});

interface ModerationEmailProps {
  to: string;
  name: string;
  approved: boolean;
  feedback?: string;
}

export async function sendModerationEmail({ to, name, approved, feedback }: ModerationEmailProps): Promise<{ success: boolean; error?: string }> {
  // Set up conditional subject lines and messaging
  const subject = approved 
    ? "✨ Your testimonial has been published!" 
    : "Update regarding your testimonial submission";

  const headline = approved ? "Testimonial Published!" : "Testimonial Update";
  
  const statusMessage = approved 
    ? `Great news! Your testimonial was approved and is now officially live on the portfolio site.`
    : `Thank you so much for taking the time to share your feedback. After reviewing your testimonial submission, I have decided not to publish it on the main portfolio page at this time.`;

  // Text fallback content for email clients blocking HTML
  const plainTextFallback = `Hi ${name},\n\n${statusMessage}${feedback ? `\n\nNote from Earl: "${feedback}"` : ""}\n\nBest regards,\nEarl`;

  try {
    await transporter.sendMail({
      from: `"Earl's Portfolio" <${gmailUser}>`,
      to,
      subject,
      text: plainTextFallback,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${headline}</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f9fafb; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
            .wrapper { width: 100%; table-layout: fixed; background-color: #f9fafb; padding: 40px 0; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; border: 1px solid #e5e7eb; box-shadow: 0 1px 3px rgba(0,0,0,0.05); overflow: hidden; }
            .content { padding: 32px; text-align: left; }
            .logo-container { text-align: center; margin-bottom: 24px; }
            .logo-img { display: inline-block; vertical-align: middle; border-radius: 8px; }
            h1 { font-size: 22px; font-weight: 700; color: #111827; margin: 0 0 16px 0; line-height: 1.3; text-align: center; }
            .salutation { font-size: 16px; font-weight: 600; color: #111827; margin-bottom: 12px; }
            p { font-size: 15px; color: #4b5563; line-height: 1.6; margin: 0 0 16px 0; }
            .feedback-box { background-color: #f3f4f6; padding: 16px; border-left: 4px solid #9ca3af; border-radius: 6px; margin: 24px 0; }
            .feedback-title { font-size: 14px; font-weight: 700; color: #374151; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px; }
            .feedback-text { font-size: 14px; color: #4b5563; font-style: italic; margin: 0; line-height: 1.5; }
            .btn-container { text-align: center; margin: 28px 0 12px 0; }
            .btn { background-color: #2563eb; color: #ffffff !important; text-decoration: none; padding: 12px 32px; font-size: 15px; font-weight: 600; border-radius: 6px; display: inline-block; }
            .footer { font-size: 13px; color: #9ca3af; line-height: 1.5; margin-top: 32px; border-top: 1px solid #f3f4f6; padding-top: 24px; }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="container">
              <div class="content">
                
                <!-- Logo -->
                <div class="logo-container">
                  <img src="${logoUrl}" alt="Earl's Portfolio" width="48" height="48" class="logo-img" />
                </div>

                <h1>${headline}</h1>
                
                <div class="salutation">Hi ${name},</div>
                <p>${statusMessage}</p>
                
                <!-- Optional Feedback Block -->
                ${feedback ? `
                  <div class="feedback-box">
                    <div class="feedback-title">Message from Earl:</div>
                    <p class="feedback-text">"${feedback}"</p>
                  </div>
                ` : ''}

                <!-- Button for live view (Only shows up if Approved) -->
                ${approved ? `
                  <div class="btn-container">
                    <a href="${appUrl}#testimonials" class="btn" target="_blank">View Live Site</a>
                  </div>
                ` : ''}

                <div class="footer">
                  <p style="margin: 0;">Warm regards,<br><strong>Earl Jan Do</strong></p>
                </div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Failed to send moderation email:", errorMessage);
    return { success: false, error: errorMessage };
  }
}