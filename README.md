# TOP HAIR - Professional Hair Salon

A modern, bilingual (English/Chinese) hair salon website with appointment booking system, built with React frontend and Node.js backend.

## 🌟 Features

### Frontend Features
- **Responsive Design**: Mobile-first design that works on all devices
- **Bilingual Support**: English and Chinese language switching
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Interactive Gallery**: Showcase of hair styling work
- **Store Locations**: Four salon locations across Auckland
- **Team Profiles**: Detailed stylist information and portfolios
- **Product Showcase**: Professional hair care products
- **Appointment Booking**: Online booking system with real-time availability
- **Appointment Search**: Customers can search and manage their bookings

### Backend Features
- **RESTful API**: Clean API endpoints for all operations
- **MongoDB Integration**: Scalable database for appointments and data
- **Email Notifications**: Automated booking confirmations and cancellations
- **Multi-location Support**: Support for 4 different salon locations
- **Data Validation**: Comprehensive input validation and error handling
- **CORS Support**: Cross-origin resource sharing enabled

## 🏪 Salon Locations

1. **City Branch** - 175B Queen Street, Auckland City (09-3771667)
2. **Newmarket Branch** - 38 Remuera Road, Newmarket (09-5290977)
3. **Albany Branch** - Unit 4B, 14 Corinthian Drive, Albany (09-4481666)
4. **Balmoral Branch** - 579 Dominion Road, Balmoral (09-6317928)

## 🛠️ Tech Stack

### Frontend
- **React 19.1.1** - Modern React with hooks
- **React Router DOM 7.8.2** - Client-side routing
- **React i18next 15.7.2** - Internationalization
- **Axios 1.11.0** - HTTP client for API calls
- **CSS3** - Custom styling with animations

### Backend
- **Node.js** - JavaScript runtime
- **Express 5.1.0** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose 8.17.1** - MongoDB object modeling
- **Nodemailer 7.0.5** - Email service
- **CORS 2.8.5** - Cross-origin resource sharing

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account (or local MongoDB)
- Gmail account for email notifications

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tophair
PORT=5000
NODE_ENV=development
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-app-password
```

4. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## 🚀 Usage

### For Customers
1. **Browse Services**: View available hair services and pricing
2. **Book Appointment**: Fill out the booking form with preferred date/time
3. **Search Bookings**: Use name and contact info to find existing appointments
4. **Cancel Bookings**: Cancel appointments if needed
5. **View Gallery**: Browse stylist work and salon photos
6. **Find Locations**: Get directions and contact info for all branches

### For Salon Staff
1. **Receive Notifications**: Get email alerts for new bookings
2. **Manage Appointments**: View and update appointment status
3. **Customer Communication**: Contact customers for confirmations

## 📱 API Endpoints

### Appointments
- `POST /api/appointments/book` - Create new appointment
- `GET /api/appointments/` - Get all appointments
- `POST /api/appointments/search` - Search appointments by customer info
- `PUT /api/appointments/:id/cancel` - Cancel appointment
- `GET /api/appointments/:id` - Get specific appointment
- `PATCH /api/appointments/:id/status` - Update appointment status
- `GET /api/appointments/location/:locationId` - Get appointments by location

### Response Format
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

## 🌐 Environment Variables

### Backend (.env)
```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
NODE_ENV=development
GMAIL_USER=your_gmail_address
GMAIL_PASS=your_gmail_app_password
```

## 📁 Project Structure

```
tophair/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   └── Appointment.js
│   ├── routes/
│   │   └── appointments.js
│   ├── utils/
│   │   └── emailService.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   │   ├── images/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── utils/
│   │   └── App.js
│   └── package.json
└── README.md
```

## 🎨 Design Features

- **Color Scheme**: Gold (#FFD700) and black theme
- **Typography**: Playfair Display for headings, Inter for body text
- **Animations**: Smooth transitions and hover effects
- **Responsive**: Mobile-first design approach
- **Accessibility**: Proper contrast ratios and keyboard navigation

## 🔧 Development

### Running in Development Mode
```bash
# Backend
cd backend && npm run dev

# Frontend
cd frontend && npm start
```

### Building for Production
```bash
# Frontend
cd frontend && npm run build
```

## 📧 Email Configuration

The system uses Gmail SMTP for sending notifications. To set up:

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password for the application
3. Use the App Password in the `GMAIL_PASS` environment variable

## 🗄️ Database Schema

### Appointment Model
```javascript
{
  customerName: String (required)
  email: String (required)
  phone: String (required)
  service: String (enum: ['haircut', 'color', 'perm', 'cut-color', 'cut-perm', 'others'])
  location: String (enum: ['1', '2', '3', '4'])
  appointmentDate: Date (required)
  appointmentTime: String (required)
  notes: String
  status: String (enum: ['pending', 'confirmed', 'completed', 'cancelled'])
}
```

## 🌍 Internationalization

The website supports both English and Chinese languages:
- Language switching via header button
- All text content is translatable
- Font optimization for Chinese characters
- RTL support ready

## 📱 Mobile Responsiveness

- **Mobile First**: Designed for mobile devices first
- **Breakpoints**: 480px, 768px, 1024px, 1200px
- **Touch Friendly**: Large buttons and touch targets
- **Fast Loading**: Optimized images and code splitting

## 🔒 Security Features

- Input validation and sanitization
- CORS protection
- Environment variable protection
- SQL injection prevention (NoSQL)
- XSS protection

## 📈 Performance

- **Lazy Loading**: Images and components load on demand
- **Code Splitting**: Optimized bundle sizes
- **Image Optimization**: Compressed and responsive images
- **Caching**: Browser caching for static assets

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary software for TOP HAIR salon.

## 📞 Support

For technical support or questions:
- Email: tophair777@gmail.com
- WeChat: TOPHAIR_NZ
- Instagram: @tophair_nz

## 🏆 Credits

- **Design**: Custom design for TOP HAIR brand
- **Development**: Full-stack development team
- **Photography**: Professional salon photography
- **Content**: Bilingual content creation

---

**TOP HAIR** - Where style meets professionalism. Book your appointment today!
