import nodemailer from "nodemailer";

export const sendOtpEmail = async (to, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Zantray Auth" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Your OTP for Zantray",
      text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("OTP Email sent:", info.response);

  } catch (error) {
    console.error("Email send failed:", error.message);
    throw error; 
  }
};
