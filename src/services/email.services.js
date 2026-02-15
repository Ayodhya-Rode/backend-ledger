// // import nodemailer from "nodemailer"

// // const transporter = nodemailer.createTransport({
// //   service: 'gmail',
// //   auth: {
// //     type: 'OAuth2',
// //     user: process.env.EMAIL_USER,
// //     clientId: process.env.CLIENT_ID,
// //     clientSecret: process.env.CLIENT_SECRET,
// //     refreshToken: process.env.REFRESH_TOKEN,
// //   },
// // });

// // transporter.verify((error, success) => {
// //   if (error) {
// //     console.error('Error connecting to email server:', error);
// //   } else {
// //     console.log('Email server is ready to send messages');
// //   }
// // });

// // // Function to send email
// // const sendEmail = async (to, subject, text, html) => {
// //   try {
// //     const info = await transporter.sendMail({
// //       from: `"Backend Ledger" <${process.env.EMAIL_USER}>`, // sender address
// //       to, // list of receivers
// //       subject, // Subject line
// //       text, // plain text body
// //       html, // html body
// //     });

// //     console.log('Message sent: %s', info.messageId);
// //     console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
// //   } catch (error) {
// //     console.error('Error sending email:', error);
// //   }
// // };

// // async function sendRegistrationEmail(userEmail, name) {
// //     const subject = 'Welcome to Backend Ledger!';
// //     const text = `Hi ${name},\n\nThank you for registering at Backend Ledger. We're excited to have you on board!\n\nBest regards,\nThe Backend Ledger Team`;
// //     const html = `<p>Hi ${name},</p><p>Thank you for registering at Backend Ledger. We're excited to have you on board!</p><p>Best regards,<br>The Backend Ledger Team</p>`;
  
// //     await sendEmail(userEmail, subject, text, html);
// //   }

// // export default {
// //     sendRegistrationEmail
// // };
// import nodemailer from "nodemailer";

// // Load environment variables
// const { EMAIL_USER, APP_PASSWORD } = process.env;

// // Create transporter with App Password
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: EMAIL_USER,       // your Gmail address
//     pass: APP_PASSWORD,     // your 16-character App Password
//   },
// });

// // Function to send email
// async function sendEmail(to, subject, text, html) {
//   try {
//     const info = await transporter.sendMail({
//       from: `"Backend Ledger" <${EMAIL_USER}>`,
//       to,
//       subject,
//       text,
//       html,
//     });

//     console.log("Message sent: %s", info.messageId);
//     console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//   } catch (error) {
//     console.error("Error sending email:", error);
//   }
// }

// // Example: registration email
// async function sendRegistrationEmail(userEmail, name) {
//   const subject = "Welcome to Backend Ledger!";
//   const text = `Hi ${name},\n\nThank you for registering at Backend Ledger. We're excited to have you on board!\n\nBest regards,\nThe Backend Ledger Team`;
//   const html = `<p>Hi ${name},</p><p>Thank you for registering at Backend Ledger. We're excited to have you on board!</p><p>Best regards,<br>The Backend Ledger Team</p>`;

//   await sendEmail(userEmail, subject, text, html);
// }

// // Export both functions as default object
// export default {
//   sendEmail,
//   sendRegistrationEmail,
// };