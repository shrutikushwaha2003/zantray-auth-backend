import nodemailer from "nodemailer";

export const sendOtpEmail = async (to, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Zantray Support" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Password Reset OTP",
    text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
  });
};
