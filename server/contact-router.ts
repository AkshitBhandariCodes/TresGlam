import { z } from "zod";
import { createRouter, publicQuery } from "./middleware.js";
import nodemailer from "nodemailer";

export const contactRouter = createRouter({
  send: publicQuery
    .input(
      z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email"),
        phone: z.string().min(10, "Phone must be at least 10 digits"),
        subject: z.string().min(1, "Subject is required"),
        message: z.string().min(1, "Message is required"),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Create a test account if no SMTP credentials are provided
        const testAccount = await nodemailer.createTestAccount();

        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || "smtp.ethereal.email",
          port: parseInt(process.env.SMTP_PORT || "587"),
          secure: false,
          auth: {
            user: process.env.SMTP_USER || testAccount.user,
            pass: process.env.SMTP_PASS || testAccount.pass,
          },
        });

        const mailOptions = {
          from: `"TresGlam Contact Form" <${input.email}>`,
          to: process.env.CONTACT_EMAIL || "info@tresglam.com",
          replyTo: input.email,
          subject: `New Contact Form Submission: ${input.subject}`,
          html: `
            <div style="font-family: 'Poppins', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8fafc;">
              <div style="background: white; border-radius: 16px; padding: 32px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
                <h2 style="color: #0a1628; font-size: 24px; margin-bottom: 24px; border-bottom: 2px solid #FF7900; padding-bottom: 12px;">
                  New Contact Form Submission
                </h2>
                
                <div style="margin-bottom: 16px;">
                  <p style="color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px;">Name</p>
                  <p style="color: #0a1628; font-size: 16px; font-weight: 500;">${input.name}</p>
                </div>
                
                <div style="margin-bottom: 16px;">
                  <p style="color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px;">Email</p>
                  <p style="color: #0a1628; font-size: 16px; font-weight: 500;">${input.email}</p>
                </div>
                
                <div style="margin-bottom: 16px;">
                  <p style="color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px;">Phone</p>
                  <p style="color: #0a1628; font-size: 16px; font-weight: 500;">${input.phone}</p>
                </div>
                
                <div style="margin-bottom: 16px;">
                  <p style="color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px;">Subject</p>
                  <p style="color: #0a1628; font-size: 16px; font-weight: 500;">${input.subject}</p>
                </div>
                
                <div style="margin-bottom: 24px;">
                  <p style="color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px;">Message</p>
                  <p style="color: #0a1628; font-size: 16px; line-height: 1.6; background: #f8fafc; padding: 16px; border-radius: 8px;">${input.message.replace(/\n/g, "<br>")}</p>
                </div>
                
                <div style="border-top: 1px solid #e2e8f0; padding-top: 16px; margin-top: 24px;">
                  <p style="color: #94a3b8; font-size: 12px;">
                    This email was sent from the TresGlam website contact form.
                  </p>
                </div>
              </div>
            </div>
          `,
          text: `Name: ${input.name}\nEmail: ${input.email}\nPhone: ${input.phone}\nSubject: ${input.subject}\nMessage: ${input.message}`,
        };

        const info = await transporter.sendMail(mailOptions);

        const previewUrl = nodemailer.getTestMessageUrl(info);
        if (previewUrl) {
          console.log("Preview URL:", previewUrl);
        }

        return { success: true, messageId: info.messageId };
      } catch (error) {
        console.error("Email send error:", error);
        throw new Error(
          error instanceof Error ? error.message : "Failed to send email"
        );
      }
    }),
});
