const nodemailer = require('nodemailer');

const sendBookingNotification =async(appointmentData) => {
    try{
        console.log('Start sending email notification...');

        const transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            }
        });

        //定义每个店铺的发型师邮箱
        const stylistEmails = {
            '1': '邮箱1',
            '2': '邮箱2',
            '3': '邮箱3',
            '4': '邮箱4',
        };

        //创建邮件内容
        const emailContent = 
        `NEW BOOKING NOTIFICATION - TOP HAIR Store${appointmentData.location}
        BOOKING DERAILS:
        Customer Name: ${appointmentData.customerName}
        Phone Number: ${appointmentData.phone}
        Email Address: ${appointmentData.email}
        Service Requested: ${appointmentData.service}
        Appointment Date: ${new Date(appointmentData.appointmentDate).toLocalDateString('en-NZ')}
        Appointment Time:${appointmentData.appointmentTime}
        Customer Notes: ${appointmentData.notes || 'No special requirements'}

        Please contact the customer as soon as possible to confirm the appointment.

        ----
        TOP Hair Automatic Booking System
        Auckland, New Zealand
        `;

        const mailOptions ={
            from: process.env.GMAIL_USER,
            to: stylistEmails[appointmentData.location],
            subject: `New Booking Alert - TOP Hair Store ${appointmentData.location}`,
            text: emailContent
        };

        const result = await transporter.sendMail(mailOptions);

        console.log(`Email sent successfully to Store ${appointmentData.location} stylist.`)
        console.log(`Message ID: ${result.messageId}`);

        return result;

        }catch(error){
            console.error('Failed to send email notification:', error.message);
            throw error;
        };
};

module.exports ={
    sendBookingNotification
}