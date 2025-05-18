require('dotenv').config();
const dotenv = require('dotenv')
const nodemailer = require('nodemailer');
const twilio = require('twilio')
const { Vonage } = require('@vonage/server-sdk')
const { addNotification } = require('./addNotifications');
const { v4: uuidv4 } = require('uuid');


const vonage = new Vonage({
  apiKey: process.env.apiKey,
  apiSecret: process.env.apiSecret
})

const from = "Sender"

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.emailId,
      pass: process.env.app-pass,
    },
});
const client = twilio(accountSid,authToken);
const phoneNo = process.env.phoneNo || +9100000000;

async function sendNotifications({type,title,message,recipient}){
    if(!type || !message || !title){
        throw new Error('Error in sending notifications,Missing fields')
    }
    const userId = uuidv4();

    if(type === 'gmail'){ 
        await transporter.sendMail({
            from: process.env.emailId,
            to: recipient,
            subject:title,
            text: message
        });
    }
    else if(type === 'sms'){
        await vonage.sms.send({
            to:recipient,
            from:from,
            text:message,
        })
    }else if (type !== 'in-app') {
        throw new Error('Invalid notification type');
    }
    addNotification(userId, { type, title, message });
    return userId;
}

module.exports = { sendNotifications, getUserNotifications: require('./addNotifications').getUserNotifications };