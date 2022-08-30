import pkg from 'nodemailer';
const nodemailer = pkg;

async function sendEmail(subject,dest, message) {
    try {
        let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          service: "gmail",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: process.env.senderEmail,
            pass: process.env.senderPassword
          },
          tls: {
            rejectUnauthorized: false
        }
        });
      
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: process.env.senderEmail,
            to: dest,
          subject: subject, // Subject line
          text: "Hello world?", // plain text body
          html: message, // html body
        });
    } catch (error) {
        // res.status(500).json({message:'email error'})
        console.log(`catch err ${error}`);
    }
}


export default sendEmail