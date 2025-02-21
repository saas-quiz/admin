import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const {
      to,
      subject,
      body,
      participantId,
      attachment,
    }: {
      to: { name: string; address: string }[];
      subject: string;
      body: { text?: string; html?: string };
      participantId?: string;
      attachment?: { filename: string; content: string; mimeType: string };
    } = await req.json();

    if (!to || !subject || !body) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }
    if (!body.html && !body.text) {
      return NextResponse.json({ ok: false, error: "Email body is missing" }, { status: 400 });
    }
    if (!Array.isArray(to) || to.length === 0) {
      return NextResponse.json({ ok: false, error: "Invalid recipient" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT) || 587, // Ensure port is a number
      secure: false, // Use `true` for port 465
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"${process.env.EMAIL_USERNAME}" <${process.env.EMAIL_USER}>`,
      to: to.map((recipient) => `${recipient.name} <${recipient.address}>`),
      subject,
      text: body.text || "", // Ensure text fallback
      html: body.html || "", // Ensure HTML fallback
    };

    // If an attachment exists, add it
    if (attachment) {
      // @ts-ignore
      mailOptions.attachments = [
        {
          filename: attachment.filename,
          content: Buffer.from(attachment.content, "base64"), // Decode Base64
          contentType: attachment.mimeType, // e.g., "application/pdf"
        },
      ];
    }

    const info = await transporter.sendMail(mailOptions);

    if (info.messageId && participantId) {
      await prisma.quizParticipant.update({
        where: { id: participantId },
        data: { sentEmailId: info.messageId },
      });
    }

    return NextResponse.json({
      ok: true,
      message: "Email sent successfully",
      data: info,
    });
  } catch (error: any) {
    console.error("Email Sending Error:", error.message);
    return NextResponse.json({ ok: false, error: error.message || "Something went wrong" }, { status: 500 });
  }
}
