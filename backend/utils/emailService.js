const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

// 发型师邮箱配置
const stylistEmails = {
    '1': 'tophair777@gmail.com',
    '2': 'tophair777@gmail.com',
    '3': 'tophair777@gmail.com',
    '4': 'tophair777@gmail.com',
};

// 获取服务类型名称
const getServiceName = (service) => {
    const serviceMap = {
        'haircut': '剪发',
        'color': '染发',
        'perm': '烫发',
        'cut-color': '剪发+染发',
        'cut-perm': '剪发+烫发',
        'others': '其他服务'
    };
    return serviceMap[service] || service;
};

// 获取门店位置名称
const getLocationName = (location) => {
    const locationMap = {
        '1': 'City店',
        '2': '北岸店',
        '3': 'Newmarket店',
        '4': 'Dominion Rd店'
    };
    return locationMap[location] || `门店${location}`;
};

// 转换时间为12小时制
const convertTo12Hour = (time24) => {
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? '下午' : '上午';
    const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour === 12 ? 12 : hour;
    return `${ampm}${hour12}:${minutes}`;
};

// 发送预约通知邮件
const sendBookingNotification = async(appointmentData) => {
    try {
        console.log('📧 开始发送邮件通知...');

        // 格式化日期
        const appointmentDate = new Date(appointmentData.appointmentDate);
        const formattedDate = appointmentDate.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        });

        const formattedTime = convertTo12Hour(appointmentData.appointmentTime);

        // 简洁的邮件内容
        const emailContent = `🎉 新预约通知 - TOP HAIR ${getLocationName(appointmentData.location)}

👤 客户信息
客户姓名：${appointmentData.customerName}
联系电话：${appointmentData.phone}
电子邮箱：${appointmentData.email}

✂️ 预约信息
服务项目：${getServiceName(appointmentData.service)}
预约店铺：${getLocationName(appointmentData.location)}
预约时间：${formattedDate} ${formattedTime}

${appointmentData.notes ? `📝 客户备注\n${appointmentData.notes}\n\n` : ''}⚠️ 请尽快联系客户确认预约

--
TOP HAIR 在线预约系统
`;

        const { data, error } = await resend.emails.send({
            from: 'TOP HAIR <onboarding@resend.dev>',
            to: [stylistEmails[appointmentData.location]],
            subject: `🎉 新预约 - ${getLocationName(appointmentData.location)} - ${appointmentData.customerName}`,
            text: emailContent,
        });

        if (error) {
            console.error('❌ Resend API 错误:', error);
            throw error;
        }

        console.log(`✅ 邮件发送成功！`);
        console.log(`📧 发送到: ${stylistEmails[appointmentData.location]}`);
        console.log(`🆔 邮件ID: ${data.id}`);

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

        // 格式化日期
        const appointmentDate = new Date(appointmentData.appointmentDate);
        const formattedDate = appointmentDate.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        });

        const formattedTime = convertTo12Hour(appointmentData.appointmentTime);

        // 简洁的取消邮件内容
        const emailContent = `❌ 预约取消通知 - TOP HAIR ${getLocationName(appointmentData.location)}

👤 客户信息
客户姓名：${appointmentData.customerName}
联系电话：${appointmentData.phone}
电子邮箱：${appointmentData.email}

✂️ 已取消预约
服务项目：${getServiceName(appointmentData.service)}
预约店铺：${getLocationName(appointmentData.location)}
预约时间：${formattedDate} ${formattedTime}

${appointmentData.notes ? `📝 客户备注\n${appointmentData.notes}\n\n` : ''}⚠️ 该预约已被客户取消，请更新日程安排

--
TOP HAIR 在线预约系统
`;

        const { data, error } = await resend.emails.send({
            from: 'TOP HAIR <onboarding@resend.dev>',
            to: [stylistEmails[appointmentData.location]],
            subject: `❌ 预约取消 - ${getLocationName(appointmentData.location)} - ${appointmentData.customerName}`,
            text: emailContent,
        });

        if (error) {
            console.error('❌ Resend API 错误:', error);
            throw error;
        }

        console.log('✅ 取消通知发送成功！');
        console.log('📧 发送到:', stylistEmails[appointmentData.location]);
        console.log('🆔 邮件ID:', data.id);
        
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