const nodemailer = require('nodemailer');
const hbs = require('express-handlebars');
const dotenv = require('dotenv');
dotenv.config();


const smtpTransport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
    port: 465,
    secure:true,
    secureConnection: false,
    logger: false,
    debug: true,
    auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASSWORD
    }
}
);

let mailOptions = {
   from: 'irshuirshath007@gmail.com',
   to: 'mrirshathbscit@gmail.com', 
   title: 'Subject',
   text: "Mail content here."
}

smtpTransport.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } 
  
  else {
    console.log('Email sent: ' + info.response);
  }
});