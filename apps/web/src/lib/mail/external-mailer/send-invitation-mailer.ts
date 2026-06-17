import nodemailer from "nodemailer";

// Ensure environment variables exist before crashing silently
const gmailUser = process.env.GMAIL_USER;
const gmailPass = process.env.GMAIL_APP_PASSWORD;
const appUrl = process.env.NEXT_PUBLIC_APP_URL;

// Hosted logo URL from your Supabase bucket
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

export async function sendInvitationEmail(toEmail: string, token: string): Promise<{ success: boolean; error?: string }> {
  // Construct the full magic link
  const inviteLink = `${appUrl}/?token=${token}#testimonials`;

  try {
    await transporter.sendMail({
      from: `"Earl's Portfolio" <${gmailUser}>`,
      to: toEmail,
      subject: "✨ You've been invited to leave a testimonial",
      // Text fallback for email clients that block HTML
      text: `You were invited to leave a testimonial on Earl's Portfolio. Copy and paste this link into your browser to continue: ${inviteLink}. This link expires in 7 days.`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Testimonial Invitation</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f9fafb; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
            .wrapper { width: 100%; table-layout: fixed; background-color: #f9fafb; padding: 40px 0; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; border: 1px solid #e5e7eb; box-shadow: 0 1px 3px rgba(0,0,0,0.05); overflow: hidden; }
            .content { padding: 32px; text-align: center; }
            .logo-container { margin-bottom: 24px; }
            .logo-img { display: inline-block; vertical-align: middle; border-radius: 8px; }
            h1 { font-size: 22px; font-weight: 700; color: #111827; margin: 0 0 12px 0; line-height: 1.3; }
            p { font-size: 16px; color: #4b5563; line-height: 1.6; margin: 0 0 24px 0; }
            .btn-container { margin: 32px 0; }
            .btn { background-color: #2563eb; color: #ffffff !important; text-decoration: none; padding: 12px 32px; font-size: 15px; font-weight: 600; border-radius: 6px; display: inline-block; transition: background-color 0.2s; }
            .footer { font-size: 13px; color: #9ca3af; line-height: 1.5; margin-top: 32px; border-top: 1px solid #f3f4f6; padding-top: 24px; }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="container">
              <div class="content">
                
                <div class="logo-container">
                  <img
                    src="${logoUrl}"
                    alt="Earl's Portfolio"
                    width="48"
                    height="48"
                    class="logo-img"
                  />
                </div>

                <h1>Share Your Experience</h1>
                <p>Hi there! You've been invited to leave a testimonial. Your feedback means a lot and helps showcase the impact of our work together.</p>
                <div class="btn-container">
                  <a href="${inviteLink}" class="btn" target="_blank">Leave a Testimonial</a>
                </div>
                <div class="footer">
                  <p style="margin-bottom: 4px;">This secure invitation link expires in <strong>7 days</strong>.</p>
                  <p style="font-size: 12px; margin: 0;">If you weren't expecting this email, you can safely ignore it.</p>
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
    // Return the error string for better debugging context up the chain
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Nodemailer Error:", errorMessage);
    return { success: false, error: errorMessage };
  }
}