import nodemailer from "nodemailer";
import { logger } from "./logger";

const FROM = `BeePod AI <${process.env.SMTP_USER ?? "info@beepodai.com"}>`;

function transporter() {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.zoho.com",
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: (process.env.SMTP_PORT ?? "465") === "465",
    auth: { user, pass },
  });
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export async function sendPreorderConfirmation(input: { name: string; email: string }) {
  const mailer = transporter();
  if (!mailer) {
    logger.warn("SMTP is not configured, so the pre-order confirmation was not sent");
    return false;
  }

  const greeting = input.name ? `Hi ${input.name},` : "Hi,";
  const text = [
    greeting,
    "",
    "Thank you for pre-ordering BeePod AI and for being among our first users!",
    "",
    "Your BeePod is expected to be delivered on or before November 5, 2026. We are currently in mass production following several product iterations. More delivery details will be shared closer to the date.",
    "",
    "For payment-related questions, please contact Aysher at aysher@beepodai.com.",
    "",
    "BeePod AI",
  ].join("\n");

  const html = `
    <p>${escapeHtml(greeting)}</p>
    <p>Thank you for pre-ordering BeePod AI and for being among our first users!</p>
    <p>Your BeePod is expected to be delivered on or before <strong>November 5, 2026</strong>. We are currently in mass production following several product iterations. More delivery details will be shared closer to the date.</p>
    <p>For payment-related questions, please contact Aysher at <a href="mailto:aysher@beepodai.com">aysher@beepodai.com</a>.</p>
    <p>BeePod AI</p>
  `;

  await mailer.sendMail({
    from: FROM,
    to: input.email,
    replyTo: "aysher@beepodai.com",
    subject: "Your BeePod AI pre-order — delivery from November 5, 2026",
    text,
    html,
  });

  return true;
}
