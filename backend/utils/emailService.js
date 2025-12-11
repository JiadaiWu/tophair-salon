const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

// ✅ 从环境变量读取邮箱地址
// 如果没设置环境变量，默认使用 tophair777@gmail.com
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || 'tophair777@gmail.com';

console.log('='.repeat(60));
console.log('📧 EMAIL SERVICE 已加载');
console.log('📬 通知邮箱:', NOTIFICATION_EMAIL);
console.log('='.repeat(60));

// 所有店铺使用同一个邮箱
const stylistEmails = {
    '1': NOTIFICATION_EMAIL,
    '2': NOTIFICATION_EMAIL,
    '3': NOTIFICATION_EMAIL,
    '4': NOTIFICATION_EMAIL,
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
        '2': '北岸店 (North Shore)',
        '3': 'Newmarket店 (Newmarket)',
        '4': 'Dominion Rd店 (Dominion Road)'
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
        console.log('📧 开始发送邮件通知...');
        console.log('📬 目标邮箱:', stylistEmails[appointmentData.location]);

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

        // 创建邮件内容 - 纯中文简洁版
        const emailContent = `🎉 新预约通知 - TOP HAIR ${getLocationName(appointmentData.location)}

👤 客户姓名: ${appointmentData.customerName}
📞 联系电话: ${appointmentData.phone}
📧 邮箱地址: ${appointmentData.email}

✂️ 服务项目: ${getServiceName(appointmentData.service)}
📍 预约店铺: ${getLocationName(appointmentData.location)}
📅 预约日期: ${formattedDateCN}
⏰ 预约时间: ${formattedTime12}

📝 客户备注: ${appointmentData.notes || '无'}

⚠️ 请尽快联系客户确认预约！
`;

        const { data, error } = await resend.emails.send({
            from: 'TOP HAIR Booking <onboarding@resend.dev>',
            to: [stylistEmails[appointmentData.location]],
            subject: `🎉 新预约 - ${getLocationName(appointmentData.location)} - ${appointmentData.customerName}`,
            text: emailContent,
        });

        if (error) {
            console.error('❌ Resend API error:', error);
            throw error;
        }

        console.log(`✅ 邮件发送成功！`);
        console.log(`📧 发送到: ${stylistEmails[appointmentData.location]}`);
        console.log(`🆔 Resend Email ID: ${data.id}`);

        return data;

    } catch(error) {
        console.error('❌ 邮件发送失败:', error.message);
        throw error;
    }
};

// 发送预约取消通知邮件
const sendCancellationNotification = async (appointmentData) => {
    try {
        console.log('📧 发送取消通知...');
        console.log('📬 目标邮箱:', stylistEmails[appointmentData.location]);

        const appointmentDate = new Date(appointmentData.appointmentDate);
        const formattedDateCN = appointmentDate.toLocaleDateString('zh-CN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const formattedTime12 = convertTo12Hour(appointmentData.appointmentTime);

        // 创建取消邮件内容 - 纯中文简洁版
        const emailContent = `❌ 预约取消通知 - TOP HAIR ${getLocationName(appointmentData.location)}

👤 客户姓名: ${appointmentData.customerName}
📞 联系电话: ${appointmentData.phone}
📧 邮箱地址: ${appointmentData.email}

✂️ 服务项目: ${getServiceName(appointmentData.service)}
📍 预约店铺: ${getLocationName(appointmentData.location)}
📅 预约日期: ${formattedDateCN}
⏰ 预约时间: ${formattedTime12}

📝 客户备注: ${appointmentData.notes || '无'}

⚠️ 此预约已被客户取消，请更新您的日程安排。
`;

        const { data, error } = await resend.emails.send({
            from: 'TOP HAIR Booking <onboarding@resend.dev>',
            to: [stylistEmails[appointmentData.location]],
            subject: `❌ 预约取消 - ${getLocationName(appointmentData.location)} - ${appointmentData.customerName}`,
            text: emailContent,
        });

        if (error) {
            console.error('❌ Resend API error:', error);
            throw error;
        }

        console.log('✅ 取消通知发送成功!');
        console.log('📧 发送到:', stylistEmails[appointmentData.location]);
        console.log('🆔 Email ID:', data.id);
        
        return data;

    } catch (error) {
        console.error('❌ 取消通知发送失败:', error.message);
        throw error;
    }
};

module.exports = {
    sendBookingNotification,
    sendCancellationNotification
};