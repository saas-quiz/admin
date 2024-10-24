import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { google } from "googleapis";
import SMTPTransport from "nodemailer/lib/smtp-transport";

// // MAILTRAP nodemailer config
// const mailtrapTransporter = nodemailer.createTransport({
//   host: process.env.MAILTRAP_HOST,
//   port: process.env.MAILTRAP_PORT,
//   secure: Boolean(process.env.NODE_SECURE),
//   auth: {
//     user: process.env.MAILTRAP_USER,
//     pass: process.env.MAILTRAP_PASS,
//   },
// } as SMTPTransport.Options);

// google oauth config
const oAuth2Client = new google.auth.OAuth2(
  process.env.OAUTH_CLIENT_ID,
  process.env.OAUTH_CLIENT_SECRET,
  process.env.OAUTH_REDIRECT_URI
);
oAuth2Client.setCredentials({
  refresh_token: process.env.OAUTH_REFRESH_TOKEN,
});

export async function POST(req: NextRequest) {
  const {
    to,
    subject,
    body,
  }: {
    to: {
      name: string;
      address: string;
    }[];
    subject: string;
    body: { text: string; html: string };
  } = await req.json();

  if (!to || !subject || !body) {
    return NextResponse.json({ ok: false, error: "Missing required fields" });
  }
  if (!body.html && !body.text) {
    return NextResponse.json({ ok: false, error: "Email body is missing" });
  }
  if (!Array.isArray(to) || to.length === 0) {
    return NextResponse.json({ ok: false, error: "Invalid recipient" });
  }

  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const googleTransport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.OAUTH_USER,
        clientId: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    } as SMTPTransport.Options);

    const sender = {
      name: process.env.SENDER_NAME!,
      address: process.env.SENDER_ADDRESS!,
    };

    const info = await googleTransport.sendMail({
      from: sender,
      to,
      subject,
      text: body.text,
      html: body.html,
    });

    return NextResponse.json({ ok: true, message: "Email sent successfully", data: info });
  } catch (error: any) {
    console.error(error?.message);
    return NextResponse.json({ ok: false, error: "Something went wrong" });
  }
}
