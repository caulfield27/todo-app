import nodemailer from "nodemailer";

export function createTransport() {
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_SENDER,
      pass: process.env.EMAIL_SENDER_PW,
    },
  });
  
  return transport;
}
