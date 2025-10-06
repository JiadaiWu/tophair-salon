const nodemailer = require('nodemailer');

// Shared email transporter (avoid redefining in different functions)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
    connectionTimeout: 30000,  
    greetingTimeout: 30000,    
    socketTimeout: 60000 
});

// Stylist emails for each store (consistent with appointment creation, using '1'~'4' as store IDs)
const stylistEmails = {
    '1': 'wuzhuo953@gmail.com',
    '2': 'wuzhuo953@gmail.com',
    '3': 'wuzhuo953@gmail.com',
    '4': 'wuzhuo953@gmail.com',
};

const sendBookingNotification =async(appointmentData) => {
    try{
        console.log('Start sending email notification...');

        // Get service type names
        const getServiceName = (service) => {
            const serviceMap = {
                'haircut': '剪发 / Haircut',
                'color': '染发 / Hair Color',
                'perm': '烫发 / Perm',
                'cut-color': '剪发+染发 / Cut + Color',
                'cut-perm': '剪发+烫发 / Cut + Perm',
                'others': '其他服务 / Other Services'
            };
            return serviceMap[service] || service;
        };

        // Get store location names
        const getLocationName = (location) => {
            const locationMap = {
                '1': 'City店 (Queen Street)',
                '2': 'Newmarket店 (Remuera Road)',
                '3': 'Albany店 (Corinthian Drive)',
                '4': 'Balmoral店 (Dominion Road)'
            };
            return locationMap[location] || `Store ${location}`;
        };

        // Format date - English version
        const appointmentDate = new Date(appointmentData.appointmentDate);
        const formattedDateEN = appointmentDate.toLocaleDateString('en-NZ', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Format date - Chinese version
        const formattedDateCN = appointmentDate.toLocaleDateString('zh-CN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Convert time to 12-hour format
        const convertTo12Hour = (time24) => {
            const [hours, minutes] = time24.split(':');
            const hour = parseInt(hours);
            const ampm = hour >= 12 ? 'PM' : 'AM';
            const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
            return `${hour12}:${minutes} ${ampm}`;
        };

        const formattedTime12 = convertTo12Hour(appointmentData.appointmentTime);

        // Create email content - bilingual version
        const emailContent = 
        `🎉 NEW BOOKING NOTIFICATION - TOP HAIR ${getLocationName(appointmentData.location)}
        ────────────────────

        📋 BOOKING DETAILS
        ────────────────────

        👤 Customer Name: ${appointmentData.customerName}
        📞 Phone Number: ${appointmentData.phone}
        📧 Email Address: ${appointmentData.email}
        ✂️ Service Requested: ${getServiceName(appointmentData.service)}
        📍 Location: ${getLocationName(appointmentData.location)}
        📅 Appointment Date: ${formattedDateEN}
        ⏰ Appointment Time: ${formattedTime12}
        📝 Customer Notes: ${appointmentData.notes || 'No special requirements'}

        📞 ACTION REQUIRED
        ────────────────────
        Please contact the customer as soon as possible to confirm the appointment.

        ════════════════════

        📅 新预约通知 - TOP HAIR ${getLocationName(appointmentData.location)}
        ────────────────────

        📋 预约详情
        ────────────────────

        👤 客户姓名: ${appointmentData.customerName}
        📞 电话号码: ${appointmentData.phone}
        📧 邮箱地址: ${appointmentData.email}
        ✂️ 服务类型: ${getServiceName(appointmentData.service)}
        📍 门店位置: ${getLocationName(appointmentData.location)}
        📅 预约日期: ${formattedDateCN}
        ⏰ 预约时间: ${formattedTime12}
        📝 客户备注: ${appointmentData.notes || '无特殊要求'}

        📞 需要处理
        ────────────────────
        请尽快联系客户确认预约。
        `;

        const mailOptions ={
            from: process.env.GMAIL_USER,
            to: stylistEmails[appointmentData.location],
            subject: `🎉 New Booking - ${getLocationName(appointmentData.location)} - ${appointmentData.customerName} - ${formattedDateEN}`,
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

// Send appointment cancellation notification email
const sendCancellationNotification = async (appointmentData) => {
    try {
        // Get service names
        const getServiceName = (service) => {
            const serviceNames = {
                'haircut': 'Hair Cut',
                'cut-color': 'Hair Cut + Color',
                'cut-perm': 'Hair Cut + Perm',
                'color': 'Hair Color',
                'perm': 'Perm',
                'others': 'Other Services'
            };
            return serviceNames[service] || service;
        };

        // Get store names
        const getLocationName = (location) => {
            const locationNames = {
                '1': 'City',
                '2': 'Newmarket',
                '3': 'Albany',
                '4': 'Balmoral'
            };
            return locationNames[location] || location;
        };

        // Format date - English version
        const appointmentDate = new Date(appointmentData.appointmentDate);
        const formattedDateEN = appointmentDate.toLocaleDateString('en-NZ', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Format date - Chinese version
        const formattedDateCN = appointmentDate.toLocaleDateString('zh-CN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Convert time to 12-hour format
        const convertTo12Hour = (time24) => {
            const [hours, minutes] = time24.split(':');
            const hour = parseInt(hours);
            const ampm = hour >= 12 ? 'PM' : 'AM';
            const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
            return `${hour12}:${minutes} ${ampm}`;
        };

        const formattedTime12 = convertTo12Hour(appointmentData.appointmentTime);

        // Create cancellation email content
        const emailContent = 
`❌ APPOINTMENT CANCELLATION - TOP HAIR ${getLocationName(appointmentData.location)}
────────────────────

📋 CANCELLED APPOINTMENT DETAILS
────────────────────

👤 Customer Name: ${appointmentData.customerName}
📞 Phone Number: ${appointmentData.phone}
📧 Email Address: ${appointmentData.email}
✂️ Service Requested: ${getServiceName(appointmentData.service)}
📍 Location: ${getLocationName(appointmentData.location)}
📅 Appointment Date: ${formattedDateEN}
⏰ Appointment Time: ${formattedTime12}
📝 Customer Notes: ${appointmentData.notes || 'No special requirements'}

⚠️ ACTION REQUIRED
────────────────────
This appointment has been cancelled by the customer. Please update your schedule accordingly.

════════════════════

❌ 预约取消通知 - TOP HAIR ${getLocationName(appointmentData.location)}
────────────────────

📋 已取消预约详情
────────────────────

👤 客户姓名: ${appointmentData.customerName}
📞 电话号码: ${appointmentData.phone}
📧 邮箱地址: ${appointmentData.email}
✂️ 服务类型: ${getServiceName(appointmentData.service)}
📍 门店位置: ${getLocationName(appointmentData.location)}
📅 预约日期: ${formattedDateCN}
⏰ 预约时间: ${formattedTime12}
📝 客户备注: ${appointmentData.notes || '无特殊要求'}

⚠️ 需要处理
────────────────────
此预约已被客户取消，请相应更新您的日程安排。
`;

        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: stylistEmails[appointmentData.location],
            subject: `❌ Appointment Cancelled - ${getLocationName(appointmentData.location)} - ${appointmentData.customerName} - ${formattedDateEN}`,
            text: emailContent
        };

        await transporter.sendMail(mailOptions);
        console.log('Cancellation email sent successfully to:', stylistEmails[appointmentData.location]);

    } catch (error) {
        console.error('Failed to send cancellation email:', error.message);
        throw error;
    }
};

module.exports = {
    sendBookingNotification,
    sendCancellationNotification
};