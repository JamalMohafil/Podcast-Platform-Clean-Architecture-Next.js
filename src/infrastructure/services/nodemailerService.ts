import { IEmailService } from "@/src/core/domain/services/emailServiceInterface";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT!),
  secure: false,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: true, // الأفضل تفعيله إذا تم إعداد كل شيء صح
  },
});

export const EmailService: IEmailService = {
  sendEmail: async ({ to, subject, body }) => {
    await transporter.sendMail({ to, subject, text: body });
  },
};
