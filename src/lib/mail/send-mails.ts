import {
  EmailVerificationTemplate,
  PasswordResetTemplate,
} from "@/components/email/template-mail";
import { sendEmail } from "./mail";

export function sendPasswordResetEmail({
  user,
  url,
}: {
  user: { email: string; name: string };
  url: string;
}) {
  return sendEmail({
    from: process.env.RESEND_USER!,
    to: user.email,
    subject: "",
    template: PasswordResetTemplate.replace("{{name}}", user.name).replace(
      "{{url}}",
      url
    ),
  });
}

export function sendVerificationEmail({
  user,
  url,
}: {
  user: { email: string; name: string };
  url: string;
}) {
  return sendEmail({
    from: process.env.RESEND_USER!,
    to: user.email,
    subject: "",
    template: EmailVerificationTemplate.replace("{{name}}", user.name).replace(
      "{{url}}",
      url
    ),
  });
}
