const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

// 发型师邮箱配置
const stylistEmails = {
    '1': 'wuzhuo953@gmail.com',
    '2': 'wuzhuo953@gmail.com',
    '3': 'wuzhuo953@gmail.com',
    '4': 'wuzhuo953@gmail.com',
};

// 获取服务类型名称
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

// 获取门店位置名称
const getLocationName = (location) => {
    const locationMap = {
        '1': 'City店 (Queen Street)',
        '2': 'Newmarket店 (Remuera Road)',
        '3': 'Albany店 (Corinthian Drive)',
        '4': 'Balmoral店 (Dominion Road)'
    };
    return locationMap[location] || `Store ${location}`;
};

// 转换时间为12小时制
const convertTo12Hour = (time24) => {
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${hour12}:${minutes} ${ampm}`;
};

// 发送预约通知邮件
const sendBookingNotification = async(appointmentData) => {
    try {
        console.log('Start sending email notification via Resend...');

        // 格式化日期 - 英文版
        const appointmentDate = new Date(appointmentData.appointmentDate);
        const formattedDateEN = appointmentDate.toLocaleDateString('en-NZ', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // 格式化日期 - 中文版
        const formattedDateCN = appointmentDate.toLocaleDateString('zh-CN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const formattedTime12 = convertTo12Hour(appointmentData.appointmentTime);

        // 创建邮件内容 - 双语版本
        const emailContent = `🎉 NEW BOOKING NOTIFICATION - TOP HAIR ${getLocationName(appointmentData.location)}
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

        const { data, error } = await resend.emails.send({
            from: 'TOP HAIR Booking <onboarding@resend.dev>',
            to: [stylistEmails[appointmentData.location]],
            subject: `🎉 New Booking - ${getLocationName(appointmentData.location)} - ${appointmentData.customerName} - ${formattedDateEN}`,
            text: emailContent,
        });

        if (error) {
            console.error('Resend API error:', error);
            throw error;
        }

        console.log(`Email sent successfully to Store ${appointmentData.location} stylist.`);
        console.log(`Resend Email ID: ${data.id}`);

        return data;

    } catch(error) {
        console.error('Failed to send email notification:', error.message);
        throw error;
    }
};

// 发送预约取消通知邮件
const sendCancellationNotification = async (appointmentData) => {
    try {
        console.log('Sending cancellation notification via Resend...');

        // 格式化日期 - 英文版
        const appointmentDate = new Date(appointmentData.appointmentDate);
        const formattedDateEN = appointmentDate.toLocaleDateString('en-NZ', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // 格式化日期 - 中文版
        const formattedDateCN = appointmentDate.toLocaleDateString('zh-CN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const formattedTime12 = convertTo12Hour(appointmentData.appointmentTime);

        // 创建取消邮件内容
        const emailContent = `❌ APPOINTMENT CANCELLATION - TOP HAIR ${getLocationName(appointmentData.location)}
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

        const { data, error } = await resend.emails.send({
            from: 'TOP HAIR Booking <onboarding@resend.dev>',
            to: [stylistEmails[appointmentData.location]],
            subject: `❌ Appointment Cancelled - ${getLocationName(appointmentData.location)} - ${appointmentData.customerName} - ${formattedDateEN}`,
            text: emailContent,
        });

        if (error) {
            console.error('Resend API error:', error);
            throw error;
        }

        console.log('Cancellation email sent successfully:', data.id);
        return data;

    } catch (error) {
        console.error('Failed to send cancellation email:', error.message);
        throw error;
    }
};

module.exports = {
    sendBookingNotification,
    sendCancellationNotification
};