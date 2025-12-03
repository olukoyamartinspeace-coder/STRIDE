# TradeStride - B2B E-commerce Platform

A premium B2B wholesale e-commerce platform connecting retailers with verified wholesalers. Built with Next.js 14, TypeScript, Prisma, and Tailwind CSS.

## 🚀 Features

### For Retailers
- Browse products with advanced filtering (category, price range, search)
- View bulk pricing tiers
- Chat and negotiate prices with wholesalers
- Secure escrow payment system
- Order tracking and delivery updates
- Review and rate products

### For Wholesalers
- Product catalog management with bulk pricing
- Real-time chat negotiation with buyers
- Order management and delivery tracking
- Business verification workflow
- Analytics dashboard

### For Administrators
- Platform analytics and insights
- User verification queue
- Dispute management
- Platform settings and configuration

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Prisma ORM (SQLite for dev, PostgreSQL/MySQL for production)
- **Authentication**: JWT with bcryptjs
- **UI Components**: Custom components with Lucide React icons
- **Animations**: Framer Motion

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Git

### Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd wholesale-ecommerce-b2b
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
cp .env.example .env
```

Edit `.env` and add:
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-super-secret-jwt-key"
```

4. **Setup database**
```bash
npx prisma generate
npx prisma migrate dev
npx prisma db seed
```

5. **Run development server**
```bash
npm run dev
```

Visit `http://localhost:3000`

## 🗂️ Project Structure

```
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication pages
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   ├── products/          # Product pages
│   ├── orders/            # Order management
│   └── chats/             # Chat system
├── components/            # React components
│   ├── admin/            # Admin components
│   ├── cart/             # Cart components
│   ├── chat/             # Chat components
│   ├── orders/           # Order components
│   ├── reviews/          # Review components
│   └── ui/               # UI components
├── lib/                   # Utility libraries
├── prisma/               # Database schema and migrations
└── public/               # Static assets
```

## 🔑 Key Routes

### Public Routes
- `/` - Landing page
- `/login` - User login
- `/signup` - User registration
- `/products` - Product catalog
- `/products/[id]` - Product details

### Authenticated Routes
- `/cart` - Shopping cart
- `/checkout` - Checkout process
- `/orders` - Order list
- `/orders/[id]` - Order details
- `/chats` - Chat conversations
- `/wholesaler/products` - Wholesaler product management

### Admin Routes
- `/admin` - Admin dashboard
- `/admin/users` - User management
- `/admin/users/verification` - Verification queue
- `/admin/disputes` - Dispute management
- `/admin/settings` - Platform settings

## 🔐 Authentication

The platform uses JWT-based authentication with role-based access control:
- **Retailers**: Auto-verified on signup
- **Wholesalers**: Manual verification required
- **Admins**: Platform management access

## 💳 Payment System

- Multiple payment gateways (Paystack, Flutterwave, Stripe, PayPal)
- Escrow payment protection
- Funds held until delivery confirmation

## 📊 Database Schema

Key models:
- **User**: Authentication and profiles
- **Product**: Product catalog with bulk pricing
- **Order**: Order management with escrow
- **Chat**: Real-time messaging
- **Review**: Product reviews and ratings

See `prisma/schema.prisma` for complete schema.

## 🚀 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy

## 🧪 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Database Commands

```bash
npx prisma studio              # Open Prisma Studio
npx prisma migrate dev         # Create and apply migration
npx prisma generate            # Generate Prisma Client
npx prisma db seed             # Seed database
```

## 🎨 Design System

- **Primary Color**: Deep Blue (#1e3a8a)
- **Secondary Color**: Gold (#f59e0b)
- **Fonts**: Inter (body), Outfit (headings)
- **Theme**: Light/Dark mode support

## 📝 License

Proprietary - All rights reserved

## 🤝 Support

For support, email support@tradestride.com

---

**Built with ❤️ for B2B Commerce**
