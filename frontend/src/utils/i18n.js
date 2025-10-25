import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Header
      'nav.home': 'Home',
      'nav.booking': 'Booking',
      'nav.services': 'Services',
      'nav.portfolio': 'Gallery',
      'nav.gallery': 'Stores',
      'nav.about': 'About Us',
      'nav.products': 'Products',
      'nav.locations': 'Locations',
      'nav.contact': 'Contact',
      'language.switch': '中文',
      
      // Hero Section
      'hero.title': 'TOP HAIR',
      'hero.subtitle': 'Professional Hair Studio',
      'hero.description': 'Professional hairstyle design services for those who want to change their look, helping you showcase your best self',
      'hero.cta': 'BOOK NOW',
      
      // Services
      'services.title': 'Our Services',
      'services.subtitle': 'Professional hair care services',
      'services.cutting.name': 'CUTTING',
      'services.cutting.description': 'Provide spectacular, architecturally sound solutions that customers love',
      'services.styling.name': 'STYLING',
      'services.styling.description': 'Enhance style with finishing, color, and styling techniques',
      'services.coloring.name': 'COLORING',
      'services.coloring.description': 'Apply artificial treatments and valuable services',
      'services.viewAll': 'VIEW ALL SERVICES',
      'services.portfolio': 'GALLERY',
      'services.haircut.name': 'Haircut',
      'services.haircut.description': 'Professional haircut and styling',
      'services.color.name': 'Hair Coloring',
      'services.color.description': 'Professional hair coloring and highlights',
      'services.perm.name': 'Hair Perming',
      'services.perm.description': 'Professional hair perming and styling',
      'services.cutcolor.name': 'Cut + Color',
      'services.cutcolor.description': 'Haircut with coloring service',
      'services.cutperm.name': 'Cut + Perm',
      'services.cutperm.description': 'Haircut with perming service',
      'services.others.name': 'Others',
      'services.others.description': 'Other customized services',
      
      // Locations
      'locations.title': 'Our Locations',
      'locations.subtitle': 'Conveniently located across Auckland',
      'location.1.name': 'CBD Branch',
      'location.1.address': 'Queen Street, Auckland CBD',
      'location.1.hours': 'Mon-Sat: 9AM-7PM',
      'location.2.name': 'North Shore Branch',
      'location.2.address': 'Takapuna, North Shore',
      'location.2.hours': 'Mon-Sat: 9AM-7PM',
      'location.3.name': 'East Auckland Branch',
      'location.3.address': 'Howick, East Auckland',
      'location.3.hours': 'Mon-Sat: 9AM-7PM',
      'location.4.name': 'West Auckland Branch',
      'location.4.address': 'Henderson, West Auckland',
      'location.4.hours': 'Mon-Sat: 9AM-7PM',
      
      // Booking Form
      'booking.title': 'Book Your Appointment',
      'booking.subtitle': 'Choose your service and preferred time',
      // About
      'about.title': 'About Us',
      'about.subtitle': 'Get to know TOP HAIR',
      'about.history.title': 'Our Story',
      'about.history.content': 'Founded in Auckland, TOP HAIR has been dedicated to craftsmanship and innovation. From our first store to four distinct locations across the city, we have served thousands of clients with professionalism and care. Our team blends classic techniques with modern aesthetics to create styles that are uniquely yours.',
      'about.gallery.title': 'Our Stores Gallery',
      'about.founder.title': 'Founder',
      'about.founder.name': 'David',
      'about.founder.bio': 'In 2002, I founded Top Hair Salon with a vision: hairstyles do more than change how we look—they transform how we feel and express ourselves. My goal was to create a space where every client could discover the colors and styles that truly reflect who they are. I believe that trends aren\'t about following the crowd, but about embracing your own attitude and lifestyle. At Top Hair, we combine professional craftsmanship with creative inspiration to deliver a unique, personalized fashion experience for every guest.',
      'booking.tabs.book': 'Book Appointment',
      'booking.tabs.search': 'Search Appointment',
      'form.name': 'Full Name',
      'form.email': 'Email Address',
      'form.phone': 'Phone Number',
      'form.service': 'Service Type',
      'form.location': 'Location',
      'form.date': 'Preferred Date',
      'form.time': 'Preferred Time',
      'form.notes': 'Special Requests',
      'form.submit': 'Book Appointment',
      'form.loading': 'Booking...',
      'form.success': 'Appointment booked successfully! Our stylist will contact you soon to confirm the time. Please check your email or phone.',
      'form.error': 'Error booking appointment. Please try again.',
      'form.required': 'This field is required',
      'form.invalid.email': 'Please enter a valid email address',
      'form.invalid.phone': 'Please enter a valid phone number',
      'form.search.submit': 'Search',
      'form.search.loading': 'Searching...',
      'form.search.success': 'Found {{count}} appointment(s)',
      'form.search.error': 'Search failed. Please try again.',
      'form.search.phone_or_email_required': 'Please provide phone or email',
      'form.search.contact': 'Phone or Email',
      'form.search.results': 'Search Results',
      'form.search.no_results': 'No appointments found',
      'form.cancel.button': 'Cancel Appointment',
      'form.cancel.success': 'Appointment cancelled successfully!',
      'form.cancel.error': 'Failed to cancel appointment. Please try again.',
      'form.cancel.loading': 'Cancelling...',
      'form.cancel.dialog.title': 'Confirm Cancellation',
      'form.cancel.dialog.message': 'Are you sure you want to cancel this appointment? We will notify the store.',
      'form.cancel.dialog.yes': 'Yes, Cancel',
      'form.cancel.dialog.no': 'No, Keep',
      'status.pending': 'Pending',
      'status.confirmed': 'Confirmed',
      'status.completed': 'Completed',
      'status.cancelled': 'Cancelled',
      
      // Footer
      'footer.contact': 'Address',
      'footer.address': '<div><strong>City:</strong> 09-3771667<br/>175B Queen Street, Auckland city</div><div><strong>Newmarket:</strong> 09-5290977<br/>38 Remuera Road, Newmarket</div><div><strong>Albany:</strong> 09-4481666<br/>Unit 4B, 14 Corinthian Drive, Albany Auckland</div><div><strong>Balmoral:</strong> 09-6317928<br/>579 Dominion Road, Balmoral</div>',
      'footer.phone': '',
      'footer.email': 'tophair777@gmail.com',
      'footer.hours': 'Business Hours',
      'footer.hours.detail': '<div><strong>City:</strong><br/>Tue-Sat: 10am-7pm<br/>Sun-Mon: 11am-7pm</div>',
      'footer.hours.sunday': '<div><strong>Albany, Newmarket, Balmoral:</strong><br/>Open 7 days<br/>10am-7pm</div>',
      'footer.contactUs': 'Contact Us',
      'footer.wechat': 'WeChat: TOPHAIR_NZ',
      'footer.instagram': 'Instagram: @tophair_nz',
      'footer.emailContact': 'Email: tophair777@gmail.com',
      'footer.copyright': '© 2024 TOP HAIR. All rights reserved.',
      
      // Time slots
      'time.9am': '9:00 AM',
      'time.10am': '10:00 AM',
      'time.11am': '11:00 AM',
      'time.12pm': '12:00 PM',
      'time.1pm': '1:00 PM',
      'time.2pm': '2:00 PM',
      'time.3pm': '3:00 PM',
      'time.4pm': '4:00 PM',
      'time.5pm': '5:00 PM',
      'time.6pm': '6:00 PM',
      
      // Gallery
      'gallery.title': 'Our Gallery',
      'gallery.subtitle': 'Discover our latest hair transformations',
      'gallery.all': 'All Works',
      'gallery.haircut': 'Haircuts',
      'gallery.color': 'Hair Color',
      'gallery.perm': 'Hair Perm',
      
      // Products
      'products.title': 'Our Products',
      'products.subtitle': 'Professional hair care products and tools',
      'products.all': 'All Products',
      'products.shampoo': 'Shampoo',
      'products.conditioner': 'Conditioner',
      'products.styling': 'Styling',
      'products.color': 'Hair Color',
      'products.tools': 'Tools',
      'products.addToCart': 'Add to Cart',
      'products.outOfStock': 'Out of Stock',
      'products.feature.loreal': 'L’Oréal Professional color range with salon-grade lasting shine.',
      'products.feature.kerastase': 'Kérastase premium care for tailored repair and strength.',
      
      // Stores
      'stores.title': 'Our Stores',
      'stores.subtitle': 'Visit us at one of our four convenient locations',
      'stores.city.name': 'City Branch',
      'stores.city.address': '175B Queen Street, Auckland City',
      'stores.city.phone': '09-3771667',
      'stores.city.hours': 'Tue-Sat: 10am-7pm, Sun-Mon: 11am-7pm',
      'stores.city.description': 'Our flagship store in the heart of Auckland CBD, offering premium hair services in a modern, luxurious setting.',
      'stores.newmarket.name': 'Newmarket Branch',
      'stores.newmarket.address': '38 Remuera Road, Newmarket',
      'stores.newmarket.phone': '09-5290977',
      'stores.newmarket.hours': 'Open 7 days, 10am-7pm',
      'stores.newmarket.description': 'Located in the trendy Newmarket district, featuring contemporary design and expert stylists.',
      'stores.albany.name': 'Albany Branch',
      'stores.albany.address': 'Unit 4B, 14 Corinthian Drive, Albany',
      'stores.albany.phone': '09-4481666',
      'stores.albany.hours': 'Open 7 days, 10am-7pm',
      'stores.albany.description': 'Our spacious Albany location with state-of-the-art facilities and experienced professionals.',
      'stores.balmoral.name': 'Balmoral Branch',
      'stores.balmoral.address': '579 Dominion Road, Balmoral',
      'stores.balmoral.phone': '09-6317928',
      'stores.balmoral.hours': 'Open 7 days, 10am-7pm',
      'stores.balmoral.description': 'A cozy neighborhood salon providing personalized service and exceptional hair care.',

      // Team
      'team.title': 'Our Team',
      'team.subtitle': 'Meet our talented stylists across all locations',
      
      // Newmarket Store
      'team.newmarket.title': 'Newmarket Store',
      'team.allen.name': 'Allen',
      'team.allen.role': 'Senior Stylist',
      'team.allen.description': 'Started in the hairdressing industry in 2008, learning and practicing in China, Japan, Korea and other countries. Specializes in designing hairstyles and colors based on face shape, occupation, skin tone, and dressing style. Worked at M Element Styling Chain in Australia in 2022. Passed assessment and joined Auckland\'s Top Hair chain in 2023!',
      
      'team.fei.name': 'Fei',
      'team.fei.role': 'Hair Designer',
      'team.fei.description': 'Over 10 years of experience in hair design. Specializes in cutting, coloring (trendy colors), perming, celebrity styling, feather extensions... Sensitive to fashion trends, able to design the most suitable hairstyle based on customer\'s face shape, temperament, and dressing style. Passionate about the hairdressing industry with attention to detail. Looking forward to meeting you!',
      
      'team.ying.name': 'Ying',
      'team.ying.role': 'Color Specialist',
      'team.ying.description': 'Graduated from Auckland Professional Hairdressing Academy, especially skilled in creative matching of trendy hair colors. With unique fashion vision and cutting-edge concepts, combined with exquisite techniques, integrates professional skills into every creation, presenting an exclusive and perfect fashion experience.',
      
      // North Shore Store
      'team.northshore.title': 'North Shore Store',
      'team.tony.name': 'Tony',
      'team.tony.role': 'Master Stylist',
      'team.tony.description': 'Over 10 years in the beauty industry. Studied professional hairdressing courses at Singapore ITE, Goldwell perm courses, and Japan Hoyu advanced color courses. Can design exclusive styles based on customer\'s face shape, height proportion, and occupation. Specializes in Paris balayage, trendy colors, color matching styling perms, Barbie curls, micro-dynamic perms, tin foil perms, afro curls, etc.',
      
      'team.lee.name': 'Lee',
      'team.lee.role': 'Senior Stylist',
      'team.lee.description': 'Nearly 30 years in the beauty industry. Attended advanced training at Sassoon, Toni&Guy, and Beijing Master Xu Kai\'s masterclass. Later established own private studio. Participated in L\'Oréal Paris Beijing ceremony. This industry requires continuous learning and innovation. I will use my years of experience and aesthetic sense to create a confident and perfect you!',
      
      'team.xu.name': 'Xu',
      'team.xu.role': 'Hair Artist',
      'team.xu.description': 'Started in hairdressing in 1996. Multiple visits to Guangzhou, Shenzhen, Hong Kong, Macau, and Europe for observation and learning. Whether precision cutting or perming and coloring, especially women\'s hairstyle design, I can design based on the relationship between face shape and hairstyle, coordination of hairstyle and makeup, and integration of hairstyle with overall styling. Received recognition and favor from customers.',
      
      'team.hyman.name': 'Hyman',
      'team.hyman.role': 'Styling Expert',
      'team.hyman.description': 'Years of experience with craftsman spirit. Multiple visits to Japan\'s Peek-a-boo Hair Academy for learning. I believe hairstyle and personal style are complementary. With my years of professional skills and communication abilities, I provide the most professional advice based on each customer\'s hair quality, hair volume, head shape and bone structure, and individual differences, to create the perfect hairstyle for you.',
      
      // Dominion Road Store
      'team.dominion.title': 'Dominion Road Store',
      'team.yuan.name': 'Yuan',
      'team.yuan.role': 'Master Stylist',
      'team.yuan.description': 'Nearly 40 years in the hairdressing industry. Experienced China\'s hairdressing industry from its budding period through development to the current prosperous modern era. Witnessed the arduous journey of China\'s hairdressing industry development over decades, fulfilling generations\' pursuit of beauty. I have no endpoint, I will always be on the road...',
      
      
      'team.yu.name': 'Yu',
      'team.yu.role': 'Creative Stylist',
      'team.yu.description': 'I believe hairstyle is not just external decoration, but the best way to show personality and confidence. Therefore, I focus on communication with each customer to understand their preferences and style, in order to provide the most suitable advice and service. Every customer is my important partner. I will help everyone get the best hairstyle experience in a relaxed atmosphere.',
      
      // City Store
      'team.city.title': 'City Store',
      'team.joe.name': 'Joe',
      'team.joe.role': 'Senior Stylist',
      'team.joe.description': 'Studied and graduated from Fukuoka Belle Epoque Beauty College in Japan and Sevilles The School of Hairdressing. Over 10 years of experience. Humble personality with excellent ability to understand customer needs. Enjoys the pleasure brought by design. Solid professional foundation with strong innovation consciousness. Has high insights into image design and the overall coordination of hairstyle with clothing.',
      
      'team.liang.name': 'Liang',
      'team.liang.role': 'Hair Designer',
      'team.liang.description': 'A hairdresser who understands you doesn\'t need too much complex communication. Serve public perception, design niche aesthetics. You bring your ideas, I provide my expertise, together creating beauty that belongs exclusively to you!',
      
      'team.gavin.name': 'Gavin',
      'team.gavin.role': 'Master Stylist',
      'team.gavin.description': 'Entered the industry in 2010. 2011-2014: Joined Beijing Dongtian Styling Sanlitun Store. 2015-2018: Worked at Shenzhen IN STYLE. 2018-2022: Established private high-end hair studio in Shenyang. Advanced training and graduation from Shanghai Sassoon, Shanghai God Hands, UK TONI&GUY, Japan PEEKABOO. Specializes in designing hairstyles based on face shape. There\'s no standard for aesthetics - what I love is high-class.'
    }
  },
  zh: {
    translation: {
      // Header
      'nav.home': '首页',
      'nav.booking': '预约',
      'nav.services': '服务',
      'nav.portfolio': '作品展示',
      'nav.gallery': '门店',
      'nav.about': '关于我们',
      'nav.products': '产品展示',
      'nav.locations': '门店',
      'nav.contact': '联系',
      'language.switch': 'English',
      
      // Hero Section
      'hero.title': 'TOP HAIR顶点沙龙',
      'hero.subtitle': '专业发型工作室',
      'hero.description': '为想要改变造型的你提供专业发型设计服务，让您展现最美的一面',
      'hero.cta': '立即预约',
      
      // Services
      'services.title': '我们的服务',
      'services.subtitle': '专业美发护理服务',
      'services.cutting.name': '理发',
      'services.cutting.description': '提供令人惊艳、结构合理的解决方案，深受客户喜爱',
      'services.styling.name': '造型',
      'services.styling.description': '通过整理、染色和造型技术提升风格',
      'services.coloring.name': '染发',
      'services.coloring.description': '提供人工护理和有价值的服务',
      'services.viewAll': '查看所有服务',
      'services.portfolio': '作品集',
      'services.haircut.name': '理发',
      'services.haircut.description': '专业理发和造型',
      'services.color.name': '染发',
      'services.color.description': '专业染发和挑染',
      'services.perm.name': '烫发',
      'services.perm.description': '专业烫发和造型',
      'services.cutcolor.name': '理发+染发',
      'services.cutcolor.description': '理发配合染发服务',
      'services.cutperm.name': '理发+烫发',
      'services.cutperm.description': '理发配合烫发服务',
      'services.others.name': '其他',
      'services.others.description': '其他自定义服务',
      
      // Locations
      'locations.title': '我们的门店',
      'locations.subtitle': '遍布奥克兰的便利位置',
      'location.1.name': 'City店',
      'location.1.address': '皇后街，奥克兰市中心',
      'location.1.hours': '周一至周六：上午9点-晚上7点',
      'location.2.name': '北岸店',
      'location.2.address': '塔卡普纳，北岸',
      'location.2.hours': '周一至周六：上午9点-晚上7点',
      'location.3.name': 'newmarket店',
      'location.3.address': '豪威克，东奥克兰',
      'location.3.hours': '周一至周六：上午9点-晚上7点',
      'location.4.name': 'dominion Rd店',
      'location.4.address': '亨德森，西奥克兰',
      'location.4.hours': '周一至周六：上午9点-晚上7点',
      
      // Booking Form
      'booking.title': '预约服务',
      'booking.subtitle': '选择您的服务和首选时间',
      // About
      'about.title': '关于我们',
      'about.subtitle': '走近 TOP HAIR',
      'about.history.title': '品牌故事',
      'about.history.content': 'TOP HAIR 源于奥克兰，坚持专业工艺与创意表达。从第一家门店到如今遍布城市的四家分店，我们始终以专业与细致服务每一位顾客；团队融合经典技法与现代美学，为你打造专属风格。',
      'about.gallery.title': '门店相册',
      'about.founder.title': '创始人',
      'about.founder.name': 'David',
      'about.founder.bio': '2002年，我创办了 Top Hair 顶点沙龙。一直以来，我坚信发型不仅能改变外表，更能影响一个人的心情与气质。创立这家沙龙的初心，是希望让每一位走进来的顾客，都能在这里找到最适合自己的色彩与风格。在我看来，潮流从来不是盲目的追随，而是一种自我态度与生活方式。正因如此，我希望通过 Top Hair，以专业的技艺和创意的灵感，为每一位顾客打造独一无二的时尚体验。',
      'booking.tabs.book': '预约服务',
      'booking.tabs.search': '查询预约',
      'form.name': '姓名',
      'form.email': '邮箱地址',
      'form.phone': '电话号码',
      'form.service': '服务类型',
      'form.location': '门店位置',
      'form.date': '首选日期',
      'form.time': '首选时间',
      'form.notes': '特殊要求',
      'form.submit': '预约服务',
      'form.loading': '预约中...',
      'form.success': '预约成功！理发师会尽快跟您联系确认时间是否合适，请注意您的邮箱或手机。',
      'form.error': '预约失败，请重试。',
      'form.required': '此字段为必填项',
      'form.invalid.email': '请输入有效的邮箱地址',
      'form.invalid.phone': '请输入有效的电话号码',
      'form.search.submit': '查询',
      'form.search.loading': '查询中...',
      'form.search.success': '找到 {{count}} 个预约',
      'form.search.error': '查询失败，请重试。',
      'form.search.phone_or_email_required': '请提供电话号码或邮箱地址',
      'form.search.contact': '电话号码或邮箱',
      'form.search.results': '查询结果',
      'form.search.no_results': '未找到预约记录',
      'form.cancel.button': '取消预约',
      'form.cancel.success': '预约已成功取消！',
      'form.cancel.error': '取消预约失败，请重试。',
      'form.cancel.loading': '取消中...',
      'form.cancel.dialog.title': '确认取消预约',
      'form.cancel.dialog.message': '您确定要取消这个预约吗？取消后我们将通知店铺。',
      'form.cancel.dialog.yes': '确认取消',
      'form.cancel.dialog.no': '不取消',
      'status.pending': '待确认',
      'status.confirmed': '已确认',
      'status.completed': '已完成',
      'status.cancelled': '已取消',
      
      // Footer
      'footer.contact': '地址',
      'footer.address': '<div><strong>City:</strong> 09-3771667<br/>175B Queen Street, Auckland city</div><div><strong>Newmarket:</strong> 09-5290977<br/>38 Remuera Road Newmarket</div><div><strong>Albany:</strong> 09-4481666<br/>Unit 4B 14 Corinthian Drive Albany Auckland</div><div><strong>Balmoral:</strong> 09-6317928<br/>579 Dominion Road, Balmoral</div>',
      'footer.phone': '',
      'footer.email': 'tophair777@gmail.com',
      'footer.hours': '营业时间',
      'footer.hours.detail': '<div><strong>City店:</strong><br/>周二到周六: 10am-7pm<br/>周日和周一: 11am-7pm</div>',
      'footer.hours.sunday': '<div><strong>Albany, Newmarket, Balmoral:</strong><br/>每天营业<br/>上午10:00 - 晚上7:00</div>',
      'footer.contactUs': '联系我们',
      'footer.wechat': '微信: TOPHAIR_NZ',
      'footer.instagram': 'Instagram: @tophair_nz',
      'footer.emailContact': '邮箱: tophair777@gmail.com',
      'footer.copyright': '© 2024 TOP HAIR 顶点理发。保留所有权利。',
      
      // Time slots
      'time.9am': '上午9:00',
      'time.10am': '上午10:00',
      'time.11am': '上午11:00',
      'time.12pm': '中午12:00',
      'time.1pm': '下午1:00',
      'time.2pm': '下午2:00',
      'time.3pm': '下午3:00',
      'time.4pm': '下午4:00',
      'time.5pm': '下午5:00',
      'time.6pm': '下午6:00',
      
      // Gallery
      'gallery.title': '作品展示',
      'gallery.subtitle': '欣赏我们最新的发型作品',
      'gallery.all': '全部作品',
      'gallery.haircut': '理发作品',
      'gallery.color': '染发作品',
      'gallery.perm': '烫发作品',
      
      // Products
      'products.title': '产品展示',
      'products.subtitle': '专业美发护理产品和工具',
      'products.all': '全部产品',
      'products.shampoo': '洗护',
      'products.conditioner': '护发素',
      'products.styling': '造型产品',
      'products.color': '染发产品',
      'products.tools': '美发工具',
      'products.addToCart': '加入购物车',
      'products.outOfStock': '缺货',
      'products.feature.loreal': '染发采用 L’Oréal 专业系列，色泽饱满持久，沙龙同款体验。',
      'products.feature.kerastase': '洗护选用 Kérastase 奢护系列，针对发质定制修护与强韧。',
      
      // Stores
      'stores.title': '我们的门店',
      'stores.subtitle': '欢迎光临我们的四家便利门店',
      'stores.city.name': 'City店',
      'stores.city.address': '175B Queen Street, Auckland City',
      'stores.city.phone': '09-3771667',
      'stores.city.hours': '周二至周六: 10am-7pm, 周日和周一: 11am-7pm',
      'stores.city.description': '位于奥克兰CBD核心地带的旗舰店，在现代奢华的环境中提供高端美发服务。',
      'stores.newmarket.name': 'newmarket店',
      'stores.newmarket.address': '38 Remuera Road, Newmarket',
      'stores.newmarket.phone': '09-5290977',
      'stores.newmarket.hours': '每天营业, 10am-7pm',
      'stores.newmarket.description': '位于时尚的Newmarket区，拥有现代设计和专业造型师。',
      'stores.albany.name': '北岸店',
      'stores.albany.address': 'Unit 4B, 14 Corinthian Drive, Albany',
      'stores.albany.phone': '09-4481666',
      'stores.albany.hours': '每天营业, 10am-7pm',
      'stores.albany.description': '宽敞的Albany门店，配备最先进的设施和经验丰富的专业人士。',
      'stores.balmoral.name': 'dominion Rd店',
      'stores.balmoral.address': '579 Dominion Road, Balmoral',
      'stores.balmoral.phone': '09-6317928',
      'stores.balmoral.hours': '每天营业, 10am-7pm',
      'stores.balmoral.description': '温馨的社区沙龙，提供个性化服务和卓越的美发护理。',

      // Team
      'team.title': '我们的团队',
      'team.subtitle': '认识我们各门店的才华横溢的发型师',
      
      // Newmarket Store
      'team.newmarket.title': 'newmarket店',
      'team.allen.name': 'Allen',
      'team.allen.role': '高级发型师',
      'team.allen.description': '2008 从事美发行业，从国内到日本、韩国等地参观及实践学习，擅长根据脸型职业肤色，穿搭风格设计发型及色彩，2022 年澳大利亚 M 元素造型连锁，2023 年考核进入奥克兰美发连锁 Top hair!',
      
      'team.fei.name': '阿飞 Fei',
      'team.fei.role': '发型设计师',
      'team.fei.description': '从业10年以上发型设计，擅长剪发、染发(潮色)、烫发，网红造型、羽毛接发…对时尚潮流趋势敏感，能够根据客户的脸型、气质，穿搭风格设计，最适合的发型。热爱美发行业，注重细节，期待与你的相遇!',
      
      'team.ying.name': 'Ying',
      'team.ying.role': '色彩专家',
      'team.ying.description': '毕业于奥克兰专业美发学院，尤其擅长潮流发色的创意搭配。凭借独到的时尚眼光与前沿理念，结合精湛技艺，将专业技术融入每一次创作，呈现出专属而完美的时尚体验',
      
      // North Shore Store
      'team.northshore.title': '北岸店',
      'team.tony.name': 'Tony',
      'team.tony.role': '首席发型师',
      'team.tony.description': '从事美业十余年，曾在新加坡 ITE 学习美发专业课程，歌薇烫发课程、日本 hoyu 高级色彩课程，可根据颜客脸型、身高比例、职业、设计专属造型。擅长巴黎画染、潮色、色彩搭配造型烫、芭比须、微分动感烫、锡纸烫、黑人须等。',
      
      'team.lee.name': 'Lee',
      'team.lee.role': '高级发型师',
      'team.lee.description': '跨入美业近 30余载，参加过沙直、Toni&guy、北京徐凯大师班的进修，后成立了自己的私人工作室，期间参加过巴黎欧莱雅北京盛典，这个行业需要不断学习和创新，我会用我多年的经验和美感，给您塑造一个自信完美的你!',
      
      'team.xu.name': '小许 Xu',
      'team.xu.role': '发型艺术家',
      'team.xu.description': '自 1996 年开始美发行业，多次到广州、深圳、香港、澳门欧洲等地参观学习，无论是精剪，还是烫染，尤其是女士发型设计，我都能根据脸型与发型的关系，发型与妆容的搭配，发型与整体造型的结合等方面进行设计，受到了顾客的认可和亲睐。看到顾客们，乘兴而来，满意而归，我都会感到由衷的欣感!',
      
      'team.hyman.name': 'Hyman',
      'team.hyman.role': '造型专家',
      'team.hyman.description': '从业多年，秉乘着匠人精神，曾多次赴日本 peek-a-boo 美发学院学习。我觉得发型与个人风格是互补的，用我多年专业的技术与沟通能，会根据每个客人发质，发量、头型头骨，自身不同给予最专业的建议，做出更符合您完美的发型。',
      
      // Dominion Road Store
      'team.dominion.title': 'Dominion rd店',
      'team.yuan.name': '阿远 Yuan',
      'team.yuan.role': '首席发型师',
      'team.yuan.description': '从事美发行业近 40 余年，经历了中国美发业从萌芽期到发展期以至现代美发业的蓬勃期，见证了中国美发业几十年发展的艰辛历程，完成了几代人对于美的追求，我没有终点，我将一直在路上….',
      
      
      'team.yu.name': '小宇 Yu',
      'team.yu.role': '创意发型师',
      'team.yu.description': '我相信发型不仅仅是一种外在的装饰，更是展现个性和自信的最佳方式。因此，我注重与每位客户的沟通了解他们的喜好和风格，以便能够提供最合适的建议和服务。每位客户都是我的重要合作伙伴，我会让大家在放松的氛围中获得最佳的发型体验。让我为你们的发型带来鲜活的灵感。来我们的沙龙，让我们一起创造属于你们的独特风格!期待与你们的相遇和合作!',
      
      // City Store
      'team.city.title': 'CITY店',
      'team.joe.name': 'Joe',
      'team.joe.role': '高级发型师',
      'team.joe.description': '曾在日本 福岡 ベルエポック 美容專門学校学习毕业于Sevilles The School Of Hairdressing 从业十余年 为人谦和,对顾客的需求有着很好的理解能力,喜欢设计带来的乐趣专业基础扎实，创新意识强对形象设计以及发型和整体的服装搭配有着很高的见解，喜欢从追求细节上的改变让顾客满意',
      
      'team.liang.name': 'Liang 梁',
      'team.liang.role': '发型设计师',
      'team.liang.description': '懂你的发型师不需要太多复杂的沟通，服务大众认知，设计小众审美，你带着你的想法，我给予我的专业，共同打造出专属你的美!',
      
      'team.gavin.name': 'Gavin',
      'team.gavin.role': '首席发型师',
      'team.gavin.description': '2010 年入行，2011-2014年 加入北京东田造型三里屯店，2015-2018年 工作于深圳IN STYLE，2018-2022年在沈阳成立私人高级发型工作室先后进修，毕业于上海沙宣，上海 God hands、英国TONI&GUY 、日本 PEEKABOO，擅长根据脸型设计发型，审美无标准，我爱即高级'
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    }
  });

export default i18n;