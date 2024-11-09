const nodemailer = require("nodemailer");

let sendEmail = async (emailOptions) => {
  let transporter = nodemailer.createTransport({
    name: "smtp.gmail.com",
    host: "smtp.gmail.com",
    service: "gmail",
    port: 465,
    secure: false,
    logger: true,
    debug: true,
    auth: {
      user: "shahabbaszaidi65@gmail.com",
      // pass: "orlv vwxm rqyu rrhi", Ecommerce
      pass: "buuj kfyw wixe nuhb",
    },
    tls: {
      rejectUnauthorized: false // Skip certificate verification
    }
  });

  let mailOptions = {
    from: "shahabbaszaidi65@gmail.com",
    to: emailOptions.email,
    subject: emailOptions.subject,
    text: emailOptions.text,
    // html: emailOptions.html,
  };

  const emailRes1 = await transporter.sendMail(mailOptions);

  if (emailRes1.messageId) {
    return true;
  } else {
    return false;
  }
};

module.exports = sendEmail;
