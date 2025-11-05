export const EmailVerificationTemplate = `
<div style="font-family: Inter, sans-serif; background-color: #f9fafb; padding: 32px;">
  <div style="max-width: 480px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; padding: 32px; box-shadow: 0 4px 14px rgba(0,0,0,0.08);">
    <h1 style="color: #111827; font-size: 24px; font-weight: 600; margin-bottom: 12px;">
      Welcome, {{name}}! 👋
    </h1>
    <p style="color: #4b5563; margin-bottom: 24px; line-height: 1.6;">
      Please verify your email address to activate your account.
    </p>
    <a href="{{url}}" style="display: inline-block; background-color: #2563eb; color: #fff; font-weight: 500; padding: 12px 24px; border-radius: 8px; text-decoration: none;">
      Verify Email
    </a>
    <p style="color: #9ca3af; font-size: 12px; margin-top: 24px;">
      If you didn’t create an account, you can safely ignore this email.
    </p>
  </div>
</div>
`;

export const PasswordResetTemplate = `
<div style="font-family: Inter, sans-serif; background-color: #f9fafb; padding: 32px;">
  <div style="max-width: 480px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; padding: 32px; box-shadow: 0 4px 14px rgba(0,0,0,0.08);">
    <h1 style="color: #111827; font-size: 24px; font-weight: 600; margin-bottom: 12px;">
      Hello, {{name}} 👋
    </h1>
    <p style="color: #4b5563; margin-bottom: 24px; line-height: 1.6;">
      You requested to reset your password. Click below to continue.
    </p>
    <a href="{{url}}" style="display: inline-block; background-color: #2563eb; color: #fff; font-weight: 500; padding: 12px 24px; border-radius: 8px; text-decoration: none;">
      Reset Password
    </a>
    <p style="color: #9ca3af; font-size: 12px; margin-top: 24px;">
      This link expires in 30 minutes.
    </p>
  </div>
</div>
`;
