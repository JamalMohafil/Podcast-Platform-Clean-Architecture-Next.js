export interface IEmailService {
  sendEmail(options: {
    to: string;
    subject: string;
    body: string;
  }): Promise<void>;
}
