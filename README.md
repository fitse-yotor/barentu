# SocialHub - Social Media Management SaaS Platform

A clean, professional UI for a cloud-based Social Media Management SaaS platform built with React and TypeScript.

## 🚀 Quick Start

```bash
npm install
npm start
```

Visit `http://localhost:3000` to see the landing page and try the demo accounts.

## 🎭 Demo User Accounts

Try different user roles to see how the interface adapts:

| Role | Email | Password | Key Features |
|------|-------|----------|--------------|
| **Super Admin** | sarah@socialhub.com | demo123 | Create SM managers, recharge credits, customize website, system reports |
| **Social Media Manager** | michael@agency.com | demo123 | Create sub-managers, manage accounts, create posts, assign clients |
| **Sub Social Media Manager** | emily@agency.com | demo123 | View, edit, create posts and manage post calendar |
| **Client** | david@company.com | demo123 | Basic access to assigned social media accounts |

## 🎨 Design System

### Color Palette
- **Primary Brand**: Deep Blue (#2E4A9E)
- **Secondary**: Indigo (#4F46E5)  
- **Accent**: Sky Blue (#18A0FB)
- **Background**: Soft White (#F8FAFC)
- **Text**: Dark Gray (#1F2937) / Gray (#6B7280)

### Social Media Colors
- Facebook: #1877F2
- Instagram: #E1306C
- Twitter/X: #111827
- LinkedIn: #0A66C2
- TikTok: #000000

## 🚀 Features

### Authentication & Landing
- **Professional Landing Page** with pricing and features
- **Role-based Login** with demo accounts
- **Responsive Design** for all screen sizes

### Dashboard & Analytics
- **Role-specific Dashboards** with different data views
- **Analytics Cards** with trend indicators
- **Platform Performance Charts** using Recharts
- **Real-time Credit Tracking**

### Content Management
- **Content Calendar** with drag-and-drop scheduling
- **Multi-platform Post Creator** with media upload
- **Post Status Tracking** (draft, scheduled, published, failed)
- **Credit-based Publishing System**

### User Management
- **Role-based Navigation** (System Owner, Manager, Sub-Manager, User)
- **Team Management Interface** 
- **Permission-based Feature Access**
- **User-specific Data Views**

## 🛠 Tech Stack

- React 18 with TypeScript
- Tailwind CSS for styling
- Heroicons for icons
- Recharts for analytics
- React Calendar for scheduling

## 🎯 User Roles & Permissions

### Super Admin
- **Create Social Media Managers**: Add and manage SM managers
- **Credit Management**: Recharge credits for managers and monitor usage
- **Website Customization**: Customize platform branding and appearance
- **System Settings**: Configure platform-wide settings and features
- **Reports & Analytics**: View platform-wide reports and user-based analytics
- **Revenue Monitoring**: Track credit sales and platform revenue

### Social Media Manager
- **Create Sub-Managers**: Add and manage sub social media managers
- **Social Account Configuration**: Add and configure social media accounts
- **Post Management**: Create, edit, and manage posts across platforms
- **Post Calendar**: Schedule and manage content calendar
- **Client Assignment**: Assign clients and social media accounts to sub-managers
- **Personalized Dashboard**: View manager-specific analytics and data

### Sub Social Media Manager
- **View Social Media Posts**: Access assigned posts and content
- **Edit Posts**: Modify existing posts within permissions
- **Create Posts**: Create new posts for assigned accounts
- **Post Calendar**: View and manage post scheduling calendar
- **Limited Analytics**: View performance data for assigned accounts

### Client
- **Basic Dashboard**: View assigned account overview
- **Limited Post Access**: View posts for assigned accounts only
- **Account Information**: Access basic social media account data

## 📱 Components

### Layout Components
- `Sidebar`: Role-based navigation with user info
- `Header`: Search, notifications, and page titles
- `LandingPage`: Marketing page with pricing
- `LoginPage`: Authentication with demo accounts

### Dashboard Components
- `Dashboard`: Role-specific analytics overview
- `StatsCard`: Reusable analytics card component
- `PlatformStats`: Charts for platform performance
- `RecentPosts`: Post activity feed

### Content Components
- `CalendarView`: Monthly calendar with post scheduling
- `PostCreator`: Multi-platform post creation modal
- `DemoCredentials`: Login helper component

## 🎨 Design Goals

- Minimal, clean SaaS interface
- High contrast for accessibility
- Consistent color usage across components
- Role-based UI adaptation
- Professional appearance suitable for agencies
- Scalable design for enterprise usage

## 🔄 Data Flow

The application uses role-based mock data that adapts based on the logged-in user:

- **System Owners** see platform-wide statistics and all users
- **Managers** see their team and account data
- **Sub-Managers** see limited team and assigned accounts
- **Users** see only their content and assigned accounts

Each role has different navigation options, data views, and available features.