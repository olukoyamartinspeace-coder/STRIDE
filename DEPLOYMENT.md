# TradeStride Deployment Guide

This guide covers deploying the TradeStride B2B e-commerce platform to production.

## Prerequisites

- Node.js 18+ installed
- A production database (PostgreSQL or MySQL recommended)
- A deployment platform account (Vercel, Railway, AWS, etc.)
- Domain name (optional)

## 🗄️ Database Setup

### Switch from SQLite to PostgreSQL

1. **Update Prisma Schema**

Edit `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"  // Change from sqlite
  url      = env("DATABASE_URL")
}
```

2. **Setup Production Database**

Options:
- **Vercel Postgres**: Built-in Vercel integration
- **Supabase**: Free PostgreSQL with generous limits
- **Railway**: Easy PostgreSQL deployment
- **AWS RDS**: Enterprise-grade managed database

Get your database connection string, format:
```
postgresql://username:password@host:5432/database?schema=public
```

3. **Run Migrations**

```bash
# Set production database URL
export DATABASE_URL="your-production-database-url"

# Generate Prisma Client
npx prisma generate

# Push schema to production
npx prisma db push

# Or use migrations (recommended)
npx prisma migrate deploy

# Seed initial data
npx prisma db seed
```

## 🔐 Environment Variables

Create a `.env.production` file with:

```env
# Database
DATABASE_URL="your-production-postgresql-url"

# Authentication
JWT_SECRET="your-super-secret-production-jwt-key-min-32-chars"

# Payment Gateways (Optional - for production payments)
PAYSTACK_SECRET_KEY="your-paystack-secret-key"
FLUTTERWAVE_SECRET_KEY="your-flutterwave-secret-key"
STRIPE_SECRET_KEY="your-stripe-secret-key"
PAYPAL_CLIENT_ID="your-paypal-client-id"
PAYPAL_CLIENT_SECRET="your-paypal-client-secret"

# App URL
NEXT_PUBLIC_APP_URL="https://your-domain.com"

# Email (Optional - for notifications)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"
```

## 🚀 Deploy to Vercel (Recommended)

### Step 1: Prepare Your Repository

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

### Step 3: Set Environment Variables

In Vercel dashboard:
1. Go to Settings → Environment Variables
2. Add all variables from `.env.production`
3. Make sure to set correct production values

### Step 4: Deploy

Click "Deploy" - Vercel will:
- Install dependencies
- Run `prisma generate`
- Build the Next.js app
- Deploy to global CDN

### Step 5: Setup Database

After first deployment:
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link project
vercel link

# Run migrations
vercel env pull .env.production.local
npx prisma migrate deploy
npx prisma db seed
```

## 🐳 Docker Deployment (Alternative)

### Create Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY prisma ./prisma
RUN npx prisma generate

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### Create docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://user:password@db:5432/tradestride
      - JWT_SECRET=your-secret
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=tradestride
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### Deploy

```bash
docker-compose up -d
```

## 🌐 Deploy to Railway

1. Go to [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Railway will auto-detect Next.js
5. Add PostgreSQL database from dashboard
6. Set environment variables
7. Deploy

## 📋 Post-Deployment Checklist

- [ ] Database migrations applied
- [ ] Initial categories seeded
- [ ] Environment variables configured
- [ ] JWT secret is secure (min 32 characters)
- [ ] SSL/HTTPS enabled
- [ ] Domain configured (if applicable)
- [ ] Test user registration
- [ ] Test login flow
- [ ] Test product creation
- [ ] Test checkout flow
- [ ] Test admin access
- [ ] Monitor error logs
- [ ] Setup monitoring (Sentry, LogRocket, etc.)

## 🔧 Production Optimization

### 1. Enable Caching

Add to `next.config.js`:
```javascript
module.exports = {
  // Enable image optimization
  images: {
    domains: ['your-cdn-domain.com'],
  },
  
  // Enable SWC minification
  swcMinify: true,
}
```

### 2. Setup CDN for Static Assets

Upload images to:
- Cloudinary
- AWS S3
- Vercel Blob Storage

### 3. Enable Analytics

Add to `app/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### 4. Setup Error Monitoring

Install Sentry:
```bash
npm install @sentry/nextjs
```

## 🐛 Troubleshooting

### Build Fails

```bash
# Clear cache
rm -rf .next
npm run build
```

### Database Connection Issues

- Verify DATABASE_URL is correct
- Check database is accessible
- Ensure Prisma Client is generated

### Authentication Issues

- Verify JWT_SECRET is set
- Check token expiration settings
- Ensure bcrypt is working

## 📊 Monitoring

### Setup Health Check

Create `app/api/health/route.ts`:
```typescript
export async function GET() {
  return Response.json({ status: 'ok', timestamp: new Date() })
}
```

### Monitor with Uptime Robot

- Add health check endpoint
- Set up email alerts
- Monitor response times

## 🔄 Updates & Maintenance

### Deploy Updates

```bash
git add .
git commit -m "Your update message"
git push origin main
```

Vercel will auto-deploy on push to main.

### Database Migrations

```bash
# Create migration
npx prisma migrate dev --name your_migration_name

# Deploy to production
npx prisma migrate deploy
```

## 📞 Support

For deployment issues, contact: deploy@tradestride.com

---

**Deployment Status**: 🟢 Production Ready
