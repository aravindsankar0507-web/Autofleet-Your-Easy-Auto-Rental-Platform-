# UngalRent - Production-Grade Rental Marketplace

## 📋 Product Strategy Summary

**Vision**: Create a location-based bike and car rental marketplace inspired by the discovery and booking experience of food delivery apps (Zomato/Swiggy), but redesigned for automobile rentals with a premium, modern feel.

**Mission**: Make vehicle rental as convenient as ordering food - discover nearby rental shops, browse available vehicles, book instantly, and enjoy seamless pickup/return.

**Target Users**:
- Urban commuters needing daily/weekly transport
- Tourists exploring cities
- Business travelers requiring reliable vehicles
- Event-goers needing premium rides

---

## 🗺️ Sitemap

```
ungalrent.com
├── / (Homepage)
│   ├── Location-aware hero search
│   ├── Featured nearby shops
│   ├── Trending categories
│   ├── Best deals
│   └── Why choose us
│
├── /auth (Login/Signup)
│   ├── Email authentication
│   ├── Role selection (Customer/Vendor)
│   └── Social login ready
│
├── /search (Search Results)
│   ├── Filter sidebar
│   ├── Sort options
│   └── Vehicle grid
│
├── /shop/[id] (Shop Detail)
│   ├── Image gallery
│   ├── Vehicle catalog
│   ├── Reviews
│   └── Booking CTA
│
├── /vehicle/[id] (Vehicle Detail)
│   ├── Photo gallery
│   ├── Specifications
│   ├── Pricing tiers
│   ├── Rental terms
│   └── Reviews
│
├── /checkout (Booking Flow)
│   ├── Date/time selection
│   ├── KYC upload
│   ├── Coupon apply
│   └── Payment
│
├── /booking-status (Tracking)
│   ├── Status timeline
│   └── Support contact
│
├── /profile (User Dashboard)
│   ├── Personal info
│   ├── KYC status
│   └── Settings
│
├── /bookings (History)
│   ├── Active bookings
│   ├── Past bookings
│   └── Cancellation
│
├── /wishlist (Favorites)
│   └── Saved vehicles
│
├── /vendor (Vendor Panel)
│   ├── /vendor/dashboard
│   ├── /vendor/inventory
│   └── /vendor/bookings
│
└── /admin (Admin Panel)
    ├── /admin/dashboard
    ├── /admin/kyc
    └── /admin/vendors
```

---

## 🔄 User Flow

```
1. DISCOVERY
   User opens app → Location permission → See nearby shops → Browse vehicles

2. SEARCH & FILTER
   Search by location/type → Apply filters (price, category, fuel) → Sort results

3. SELECTION
   View shop → Browse vehicles → Select vehicle → View details

4. BOOKING
   Select pickup/return → Check availability → Apply coupon → Calculate total

5. KYC & PAYMENT
   Upload driving license → Upload ID proof → Make payment → Confirm

6. TRACKING
   Receive confirmation → View booking → Track status → Pickup vehicle

7. RETURN
   Return vehicle → Inspection → Deposit refund → Leave review
```

---

## 🗄️ Database Schema (Summary)

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `users` | Authentication & profiles | id, name, email, phone, password, role, kycStatus |
| `shops` | Rental shop profiles | id, ownerId, name, address, coordinates, rating, categories |
| `vehicles` | Vehicle inventory | id, shopId, make, model, category, pricePerDay, availabilityStatus |
| `bookings` | Rental transactions | id, userId, vehicleId, pickupDatetime, dropoffDatetime, status |
| `reviews` | User ratings | id, bookingId, rating, comment |
| `offers` | Coupon codes | id, code, discountType, discountValue, validTo |
| `addresses` | Saved locations | id, userId, label, address, coordinates |
| `cities` | Platform cities | id, name, state, coordinates |

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get profile
- `PUT /api/auth/profile` - Update profile
- `POST /api/auth/kyc` - Upload KYC documents
- `POST /api/auth/wishlist` - Add to wishlist
- `DELETE /api/auth/wishlist/:id` - Remove from wishlist

### Shops
- `GET /api/shops` - Get nearby shops (with geolocation)
- `GET /api/shops/:id` - Get shop details
- `GET /api/shops/:id/vehicles` - Get shop's vehicles
- `POST /api/shops` - Create shop (vendor)
- `PUT /api/shops/:id` - Update shop

### Vehicles
- `GET /api/vehicles` - Search vehicles with filters
- `GET /api/vehicles/:id` - Get vehicle details
- `GET /api/vehicles/:id/availability` - Check availability
- `POST /api/vehicles` - Add vehicle (vendor)
- `PUT /api/vehicles/:id` - Update vehicle

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/my` - Get user's bookings
- `GET /api/bookings/:id` - Get booking details
- `PUT /api/bookings/:id/status` - Update status (vendor)
- `PUT /api/bookings/:id/payment` - Update payment
- `PUT /api/bookings/:id/cancel` - Cancel booking
- `POST /api/bookings/:id/review` - Add review

### Admin
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/kyc/pending` - Pending KYC
- `PUT /api/admin/kyc/:userId` - Verify KYC
- `GET /api/admin/shops/pending` - Pending shops
- `PUT /api/admin/shops/:shopId` - Verify shop
- `GET /api/admin/users` - List users
- `GET /api/admin/offers` - Manage coupons

---

## 🎨 UI Design System

### Color Palette
| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `--primary` | #FFD700 | #FFD700 | CTAs, highlights |
| `--primary-light` | #FFF9E6 | #3D3500 | Hover states |
| `--foreground` | #111111 | #F8F9FA | Primary text |
| `--background` | #FFFFFF | #111111 | Page bg |
| `--background-alt` | #F8F9FA | #1A1A1A | Sections |
| `--border` | #E0E0E0 | #333333 | Dividers |
| `--success` | #4CAF50 | #4CAF50 | Positive |
| `--error` | #FF3B30 | #FF3B30 | Errors |

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: 700 weight, compact
- **Body**: 400/500 weight
- **Sizes**: 3.5rem → 0.75rem scale

### Components
- **Cards**: 12px radius, subtle shadow, hover lift
- **Buttons**: 8px radius, primary gold, dark text
- **Inputs**: Clean borders, focus ring
- **Badges**: Rounded pills, category colors

### Animations
- **Transitions**: 0.2s ease default
- **Hover**: translateY(-4px) + shadow increase
- **Page**: Staggered fade-in-up
- **Loading**: Skeleton shimmer
- **Micro**: Scale on click, heart fill

---

## 🧩 Frontend Component Plan

### Core Layout
- [x] Header (sticky, auth state, location)
- [x] Footer (links, city selector)
- [x] Sidebar (user/vendor/admin variants)

### Navigation
- [x] Logo (SVG)
- [x] CategoryCarousel
- [x] FilterSidebar

### Cards & Display
- [x] ShopCard (image, rating, distance, price)
- [x] VehicleCard (specs, pricing, wishlist)
- [x] StatCard (dashboard metrics)
- [x] ImageGallery
- [x] SpecsGrid

### Forms & Inputs
- [x] DateRangePicker
- [x] FileUploader
- [x] BookingModal
- [x] PaymentSummary

### Feedback
- [x] SkeletonLoader
- [x] Toast notifications
- [ ] Loading spinners
- [ ] Empty states

### New Components Needed
- [ ] VehicleCompare
- [ ] RecentlyViewed
- [ ] SavedAddresses
- [ ] CouponInput
- [ ] BookingTimeline

---

## 👥 Module Summary

### Customer Module
✅ Registration/Login
✅ Location-based search
✅ Vehicle browsing & details
✅ Booking flow (select → checkout → confirm)
✅ KYC upload
✅ Wishlist
✅ Booking history
✅ Reviews & ratings
✅ Profile management

### Vendor Module
✅ Shop profile management
✅ Vehicle inventory (CRUD)
✅ Availability calendar
✅ Pricing management
✅ Booking acceptance/rejection
✅ Dashboard analytics

### Admin Module
✅ User management
✅ KYC verification
✅ Vendor approval
✅ Coupon management
✅ Basic reporting
✅ City management

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | Next.js 14 (App Router) |
| **Styling** | CSS Modules + CSS Variables |
| **State** | React Context (theme, toast) |
| **Backend** | Node.js + Express |
| **Database** | PostgreSQL + Prisma |
| **Auth** | JWT + bcrypt |
| **Maps** | Leaflet (free) or Google Maps |
| **Images** | Next.js Image |
| **Deploy** | Vercel (frontend) + Render (backend) |

---

## 🚀 Launch-Ready Master Prompt

```
Build a production-grade location-based bike and car rental marketplace called "UngalRent" using Next.js 14, PostgreSQL with Prisma, and Express backend.

CORE FEATURES:
1. Location-based shop discovery with geolocation search
2. Vehicle catalog with filters (category, price, fuel, transmission)
3. Multi-step booking flow with date selection, KYC upload, coupon codes
4. User authentication (JWT) with role-based access (customer/vendor/admin)
5. Vendor dashboard for inventory and booking management
6. Admin panel for KYC verification and vendor approval
7. Wishlist, booking history, reviews and ratings

DESIGN:
- Primary color: #FFD700 (gold)
- Background: white with subtle gray sections
- Dark mode support with CSS variables
- Premium cards with 12px radius and subtle shadows
- Skeleton loading states
- Toast notifications
- Smooth animations with stagger effects

DATABASE:
- Users (id, name, email, phone, password, role, kycStatus)
- Shops (id, ownerId, name, address, coordinates, rating, categories)
- Vehicles (id, shopId, make, model, category, pricePerDay, images)
- Bookings (id, userId, vehicleId, pickupDatetime, dropoffDatetime, status)
- Reviews, Offers, Addresses, Cities tables

API ENDPOINTS:
- POST /auth/register, POST /auth/login
- GET /shops?lat=&lng=&radius= (geolocation)
- GET /vehicles?category=&priceMin=&priceMax=
- POST /bookings, GET /bookings/my
- Admin: KYC verification, vendor approval, coupon management

SEED DATA:
- 1 admin, 1 vendor, 1 customer
- 1 shop with 6 vehicles (bikes, scooters, cars, EV)
- 3 coupon codes
- 7 Indian cities
```

---

## 📦 Deliverables Checklist

| # | Deliverable | Status |
|---|-------------|--------|
| 1 | Product strategy summary | ✅ Complete |
| 2 | Full feature map | ✅ Complete |
| 3 | User flow | ✅ Complete |
| 4 | Sitemap | ✅ Complete |
| 5 | Database schema | ✅ Complete |
| 6 | API endpoints list | ✅ Complete |
| 7 | Wireframe structure | ✅ In pages |
| 8 | UI design system | ✅ Complete |
| 9 | Frontend component plan | ✅ Complete |
| 10 | Admin/vendor/customer modules | ✅ Complete |
| 11 | Suggested tech stack | ✅ Complete |
| 12 | Launch-ready master prompt | ✅ Complete |

---

## 🏁 Next Steps

1. **Set up PostgreSQL** - Install PostgreSQL and create database
2. **Install dependencies** - Run `npm install` in /server
3. **Generate Prisma** - Run `npx prisma generate`
4. **Push schema** - Run `npx prisma db push`
5. **Seed data** - Run `npm run db:seed`
6. **Start backend** - Run `npm run dev` in /server
7. **Start frontend** - Run `npm run dev` in root
8. **Test flows** - Register → Search → Book → Complete