// const nodemailer=require('nodemailer');
// // console.log(nodemailer)
// require('dotenv').config()
// //1. create a transporter object
// const transporter = nodemailer.createTransport({
//     service:'gmail',
//     host:'smtp.gmail.com',
//     port:587,
//     secure:false,
//     auth:{
//         user:'saikrishna.kanteti@gmail.com',
//         pass:process.env.NODEMAILER_PWD
//     }
// })

// // 2. create a reusable function to send emails
// const sendLoginEmail = async(mailDetails,callback)=>{
//         try{
//             const  info = transporter.sendEmail(mailDetails);
//             callback(info)            
//         }
//         catch(err){
//             console.log(err)
//         }
// }


// // 2.2 create a html template for email
// const HTML_TEMPLATE=(text)=>{
//     return  `<!DOCTYPE html>
//     <html>
//       <head>
//         <meta charset="utf-8">
//         <title>NodeMailer Email Template</title>
//         <style>
//           .container {
//             width: 100%;
//             height: 100%;
//             padding: 20px;
//             background-color: #f4f4f4;
//           }
//           .email {
//             width: 80%;
//             margin: 0 auto;
//             background-color: #fff;
//             padding: 20px;
//           }
//           .email-header {
//             background-color: #333;
//             color: #fff;
//             padding: 20px;
//             text-align: center;
//           }
//           .email-body {
//             padding: 20px;
//           }
//           .email-footer {
//             background-color: #333;
//             color: #fff;
//             padding: 20px;
//             text-align: center;
//           }
//         </style>
//       </head>
//       <body>
//         <div class="container">
//           <div class="email">
//             <div class="email-header">
//               <h1>OTP for Reset</h1>
//             </div>
//             <div class="email-body">
//               <p>${text}</p>
//             </div>
//             <div class="email-footer">
//               <p>EMAIL FOOTER</p>
//             </div>
//           </div>
//         </div>
//       </body>
//     </html>
//   `;
// }

// //3. email options

// const message = 'Hello from Nodemailer';
// const options = {
//     from:'saikrishna.kanteti@gmail.com',
//     to:'kantetisaikrishna@gmail.com',
//     subject:'send email in nodejs with Nodemailer and Gmail',
//     html:HTML_TEMPLATE(message)
// }

// // async function emailBuilder(to,subject,text){
// //     try{
// //             const options={
// //                 from:'saikrishna.kanteti@gmail.com',
// //                 to:to,
// //                 subject:subject,
// //                 text:text,
// //                 html:HTML_TEMPLATE(text)
// //             }
// //             sendEmail(options,(info)=>{
// //                 console.log("email sent successfully");
// //                 console.log("message id:",info.messageId);
// //             })
// //     }
// //     catch(err){

// //     }
// // }


// sendLoginEmail(options,(info)=>{
//   console.log("Email sent successfully");
//   console.log(info);
// })

// module.exports ={
//     // sendEmail,
//     HTML_TEMPLATE,
//     // emailBuilder
// }




const nodemailer = require('nodemailer');
require('dotenv').config();

//1. create a transporter object

const transporter = nodemailer.createTransport({
    service:"gmail",
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:"saikrishna.kanteti@gmail.com",
        pass:process.env.GMAIL_APP_KEY
    }
})

// 2. create a reusable function to send emails
const sendEmail = async(mailDetails, callback) => {
    try{
        const info = await transporter.sendMail(mailDetails);
        callback(info)
    } catch(error){
        console.log(error)
    }
}

// 2.2 create a html template for email
const HTML_TEMPLATE = (text) => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>NodeMailer Email Template</title>
          <style>
            .container {
              width: 100%;
              height: 100%;
              padding: 20px;
              background-color: #f4f4f4;
            }
            .email {
              width: 80%;
              margin: 0 auto;
              background-color: #fff;
              padding: 20px;
            }
            .email-header {
              background-color: #333;
              color: #fff;
              padding: 20px;
              text-align: center;
            }
            .email-body {
              padding: 20px;
            }
            .email-footer {
              background-color: #333;
              color: #fff;
              padding: 20px;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="email">
              <div class="email-header">
                <h1>OTP for Reset</h1>
              </div>
              <div class="email-body">
                <p>${text}</p>
              </div>
              <div class="email-footer">
                <p>EMAIL FOOTER</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;
  }
 
  // 3. email options
  const message = 'Hello from NodeMailer';
  const options = {
    from:'saikrishna.kanteti@gmail.com',
    to:'saikrishna.kanteti@gmail.com',
    subject:'Hi Aysush sir, Thankful to your classes am learning nodejs by watching your lectures those are really good and awesome. Thank you very much :-) ',
    text:message,
    html:HTML_TEMPLATE(message)
  }

  // 4. sending email
  // sendEmail(options, (info)=>{
  //   console.log("email sent successfully")
  //   console.log("message id:",info.messageId)
  // })

  async function emailBuilder(to, subject, text) {
    try{
        const options = {
            from:'saikrishna.kanteti@gmail.com',
            to:to,
            subject:subject,
            text:text,
            html:HTML_TEMPLATE(text)
        }
        sendEmail(options, (info)=>{
            console.log("email sent successfully")
            console.log("message id:",info.messageId)
          })

    }catch(error){
          throw new Error(error)
    }
  }

  module.exports = {
        sendEmail,
        HTML_TEMPLATE,
        emailBuilder
  }