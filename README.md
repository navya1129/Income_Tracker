# CastPro - Acting & Casting Platform

A modern, high-trust, cinematic web application connecting Actors, Directors/Casting Recruiters, and Admins.

## 🎬 Features

### Design System
- **Dark-mode first** with optional light mode toggle
- **Cinematic aesthetic** with film-industry inspired design
- **Premium materials**: Glassmorphism panels, soft gradients, grain texture
- **Smooth animations**: Motion-powered transitions, hover effects, and micro-interactions

### User Roles

#### 🎭 Actors
- **Profile Strength Meter** with animated progress ring
- **Video Portfolio Grid** with emotion-tagged videos and hover previews
- **Application Timeline** tracking status (Applied → Shortlisted → Selected)
- **Profile management** with verification badge

#### 🎥 Directors/Casting Recruiters
- **Role Posting** with multi-step animated form
- **AI-Powered Recommendations** carousel with match scores
- **Shortlist Management** with smooth transitions
- **Applicant Review** with filtering and sorting

#### 👨‍💼 Admin
- **Analytics Dashboard** with animated charts (Recharts integration)
- **User Management** with real-time stats
- **Report Moderation** interface for flagged content
- **Platform Metrics** with trend indicators

### Core Features

#### 🔐 Verification Flow
- Multi-step ID upload with progress animation
- Real-time verification status transitions
- Animated verified badge with pulse effect

#### 💬 Secure Chat
- In-app messaging (unlocked after selection)
- Safety notice banners
- Message status indicators (sent, delivered, read)
- Real-time online status

#### 🎯 Role Listings
- Advanced filter panel (age, gender, emotion, language)
- Animated application modal
- Upload progress tracking
- Featured role highlighting

## 🎨 Design Highlights

### Animations & Micro-interactions
- ✨ Smooth page transitions (fade, slide, scale)
- 🌟 Hover states with glow, blur, and elevation
- 🎖️ Animated verification badges
- ⏳ Loading skeletons with shimmer effects
- 🔘 Button ripple and magnetic hover effects
- 📜 Scroll-based animations and parallax
- 🎬 Video cards with animated overlays

### Color Palette
- **Primary**: Purple (#A855F7) to Pink (#EC4899) gradients
- **Accents**: Blue, Cyan, Green for different sections
- **Dark Mode**: Zinc-950 background with white/5 glass panels
- **Light Mode**: White background with zinc-900/5 glass panels

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Routing**: React Router v7
- **Styling**: Tailwind CSS v4
- **Animations**: Motion (Framer Motion)
- **Icons**: Lucide React
- **Charts**: Recharts
- **Build Tool**: Vite

## 📁 Project Structure

```
/src
  /app
    /components
      /common          # Reusable components (EmptyState, LoadingSkeleton)
      /layout          # Layout components (Navbar)
      /pages           # Main pages
        - LandingPage.tsx
        - ActorDashboard.tsx
        - DirectorDashboard.tsx
        - AdminDashboard.tsx
        - RoleListingPage.tsx
        - ChatPage.tsx
        - VerificationFlow.tsx
    /context           # React Context (ThemeContext)
    App.tsx            # Main app component with routing
  /styles              # Global styles
    - theme.css        # Theme variables
    - tailwind.css     # Tailwind config
    - fonts.css        # Font imports
```

## 🚀 Getting Started

The application is ready to run! Navigate through different sections:

1. **Landing Page** (`/`) - Hero section with trust badges
2. **Actor Dashboard** (`/actor`) - Portfolio and applications
3. **Director Dashboard** (`/director`) - Role management and talent discovery
4. **Admin Dashboard** (`/admin`) - Platform analytics and moderation
5. **Role Listings** (`/roles`) - Browse and apply for casting calls
6. **Chat** (`/chat`) - Secure messaging between matched users
7. **Verification** (`/verify`) - ID verification flow

## 🎯 Key User Flows

### For Actors
1. Create profile → Upload portfolio videos → Apply to roles
2. Track application status → Get shortlisted → Unlock chat with director
3. Verify identity to access all features

### For Directors
1. Post casting call → Review AI recommendations → Shortlist candidates
2. View applicant profiles → Select talent → Unlock chat
3. Manage multiple active roles

### Trust & Safety
- ❌ No phone numbers required
- ✅ ID verification for all users
- 🔒 Chat unlocks only after selection
- 🛡️ Content moderation and reporting
- 🔐 Encrypted communication

## 🎨 Theme Toggle

Switch between dark and light modes using the theme toggle in the navigation bar. The application adapts seamlessly with smooth transitions.

## 📱 Responsive Design

The application is fully responsive and works across:
- Desktop (optimized primary experience)
- Tablet
- Mobile (ready for future mobile app)

## 🔮 Future Enhancements

- Real-time notifications
- Video call integration
- Payment processing for premium features
- Mobile app versions (iOS/Android)
- Advanced AI matching algorithms
- Calendar integration for callbacks
- Contract management system

---

Built with 💜 for the entertainment industry
