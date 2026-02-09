# Laravel Backend for Social Media Management SaaS

## 📋 Overview

This specification outlines the complete Laravel backend API for the Social Media Management SaaS platform. The backend provides RESTful APIs for authentication, user management, post scheduling, credit management, analytics, and social media integrations.

## 📁 Documentation Structure

### 1. **requirements.md**
Complete requirements document with:
- User stories and acceptance criteria
- All 10 core feature areas
- API endpoint structure
- Database schema requirements
- Non-functional requirements
- Testing requirements

### 2. **IMPLEMENTATION_PLAN.md**
Step-by-step implementation guide with:
- 12 development phases
- Week-by-week breakdown
- Technology stack details
- Development best practices
- Timeline estimates (16 weeks total)

### 3. **API_REFERENCE.md**
Quick API reference guide with:
- All endpoint examples
- Request/response formats
- Authentication details
- Error handling
- Rate limiting
- Pagination and filtering

## 🎯 Key Features

### Core Functionality
1. **Authentication & Authorization** - Sanctum-based API authentication with role-based access
2. **User Management** - Multi-role user system (Super Admin, Manager, Sub-Manager, Client)
3. **Post Management** - Create, schedule, and publish posts to multiple platforms
4. **Credit System** - Credit-based usage tracking and management
5. **Social Media Integration** - Connect and publish to Facebook, Instagram, Twitter, LinkedIn, TikTok
6. **Post Scheduling** - Queue-based automated publishing
7. **Analytics & Reporting** - Comprehensive analytics for all user roles
8. **AI Features** - AI-powered content generation and insights
9. **Website Customization** - White-label platform settings
10. **Notifications** - Email and in-app notifications

## 🛠 Technology Stack

### Backend
- **Framework**: Laravel 10.x
- **PHP**: 8.1+
- **Database**: MySQL 8.0 / PostgreSQL 14+
- **Cache/Queue**: Redis 6+
- **Authentication**: Laravel Sanctum
- **File Storage**: AWS S3 / Local

### Key Packages
- `laravel/sanctum` - API authentication
- `spatie/laravel-permission` - Roles & permissions
- `intervention/image` - Image processing
- `guzzlehttp/guzzle` - HTTP client
- `laravel/horizon` - Queue monitoring
- `laravel/telescope` - Debugging

### External APIs
- OpenAI API - AI content generation
- Facebook Graph API - Facebook/Instagram
- Twitter API v2 - Twitter/X
- LinkedIn API - LinkedIn
- TikTok API - TikTok

## 📊 Database Schema

### Core Tables
- `users` - User accounts with roles and credits
- `posts` - Social media posts
- `media` - Post media files
- `social_accounts` - Connected social media accounts
- `credit_transactions` - Credit usage history
- `credit_packages` - Available credit packages
- `settings` - Platform configuration
- `notifications` - User notifications

## 🚀 Getting Started

### Prerequisites
- PHP 8.1 or higher
- Composer
- MySQL 8.0 or PostgreSQL 14+
- Redis
- Node.js & NPM (for asset compilation)

### Installation Steps

1. **Clone Repository**
```bash
git clone <repository-url>
cd laravel-backend
```

2. **Install Dependencies**
```bash
composer install
npm install
```

3. **Environment Setup**
```bash
cp .env.example .env
php artisan key:generate
```

4. **Configure Database**
Edit `.env` file:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=socialhub
DB_USERNAME=root
DB_PASSWORD=
```

5. **Run Migrations**
```bash
php artisan migrate
```

6. **Seed Database**
```bash
php artisan db:seed
```

7. **Start Development Server**
```bash
php artisan serve
```

8. **Start Queue Worker**
```bash
php artisan queue:work
```

## 📝 Development Workflow

### Phase 1: Foundation (Week 1)
- Set up Laravel project
- Configure database and Redis
- Create migrations
- Set up models and relationships

### Phase 2: Authentication (Week 2)
- Implement Sanctum authentication
- Create auth endpoints
- Set up role-based permissions

### Phase 3: User Management (Week 3)
- User CRUD operations
- Manager/sub-manager creation
- Client management

### Phase 4: Credit System (Week 4)
- Credit balance tracking
- Transaction logging
- Credit packages

### Phase 5-6: Post Management (Week 5-6)
- Post CRUD with media upload
- Scheduling system
- Calendar view

### Phase 7-8: Social Media Integration (Week 7-8)
- OAuth connections
- Platform API integrations
- Automated publishing

### Phase 9: Analytics (Week 9)
- Dashboard statistics
- User analytics
- Platform-wide reporting

### Phase 10: AI Features (Week 10)
- OpenAI integration
- Content generation
- AI insights

### Phase 11: Notifications (Week 11)
- Email system
- In-app notifications

### Phase 12: Settings (Week 12)
- Platform customization
- Branding configuration

### Phase 13-14: Testing (Week 13-14)
- Unit tests
- Feature tests
- Integration tests

### Phase 15-16: Deployment (Week 15-16)
- API documentation
- Docker setup
- Production deployment

## 🧪 Testing

### Run Tests
```bash
# Run all tests
php artisan test

# Run specific test suite
php artisan test --testsuite=Feature

# Run with coverage
php artisan test --coverage
```

### Test Structure
- `tests/Unit/` - Unit tests for models and services
- `tests/Feature/` - Feature tests for API endpoints
- `tests/Integration/` - Integration tests for external APIs

## 📚 API Documentation

### Base URL
```
Development: http://localhost:8000/api
Production: https://api.yourdomain.com/api
```

### Authentication
All authenticated requests require Bearer token:
```
Authorization: Bearer {token}
```

### Key Endpoints
- `POST /api/register` - Register user
- `POST /api/login` - Login user
- `GET /api/posts` - List posts
- `POST /api/posts` - Create post
- `GET /api/analytics/dashboard` - Get analytics
- `POST /api/ai/generate-content` - Generate AI content

See **API_REFERENCE.md** for complete endpoint documentation.

## 🔒 Security

### Best Practices
- All passwords hashed with bcrypt
- API tokens encrypted
- SQL injection prevention (Eloquent ORM)
- XSS protection
- CSRF protection
- Rate limiting on all endpoints
- HTTPS required in production

### Environment Variables
Never commit sensitive data:
- Database credentials
- API keys
- OAuth secrets
- Encryption keys

## 📈 Performance

### Optimization Strategies
- Database indexing
- Redis caching
- Eager loading (prevent N+1)
- Queue for heavy operations
- Image optimization
- API response caching

### Monitoring
- Laravel Telescope for debugging
- Laravel Horizon for queue monitoring
- Error logging with Sentry/Bugsnag
- Performance monitoring with New Relic

## 🚢 Deployment

### Docker Setup
```bash
# Build image
docker build -t socialhub-api .

# Run container
docker-compose up -d
```

### Production Checklist
- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] Queue workers running
- [ ] Cron jobs configured
- [ ] SSL certificate installed
- [ ] Error monitoring enabled
- [ ] Backups configured
- [ ] Rate limiting configured
- [ ] API documentation published

## 🤝 Integration with React Frontend

### CORS Configuration
Configure in `config/cors.php`:
```php
'paths' => ['api/*'],
'allowed_origins' => ['http://localhost:3000'],
'allowed_methods' => ['*'],
'allowed_headers' => ['*'],
```

### API Client Setup (Frontend)
```javascript
// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

## 📞 Support & Resources

### Documentation
- [Laravel Documentation](https://laravel.com/docs)
- [Laravel Sanctum](https://laravel.com/docs/sanctum)
- [Laravel Queue](https://laravel.com/docs/queues)

### Community
- Laravel Discord
- Laravel Forums
- Stack Overflow

## 📅 Timeline

### MVP (Phases 1-7)
**Duration**: 9 weeks (2.25 months)
- Core functionality
- Authentication
- Post management
- Social media integration

### Full Features
**Duration**: 16 weeks (4 months)
- All features including AI
- Complete testing
- Production deployment

## ✅ Success Criteria

- [ ] All API endpoints functional
- [ ] Authentication working
- [ ] Posts can be scheduled and published
- [ ] Social media integrations working
- [ ] Credit system operational
- [ ] Analytics accurate
- [ ] AI features integrated
- [ ] 80%+ test coverage
- [ ] API documentation complete
- [ ] Production deployment successful

## 🎯 Next Steps

1. **Review Requirements** - Read `requirements.md` thoroughly
2. **Set Up Environment** - Install Laravel and dependencies
3. **Follow Implementation Plan** - Use `IMPLEMENTATION_PLAN.md` as guide
4. **Reference API Docs** - Use `API_REFERENCE.md` for endpoint details
5. **Start Building** - Begin with Phase 1 (Foundation)
6. **Test Continuously** - Write tests as you build
7. **Document Progress** - Keep documentation updated

## 📄 License

[Your License Here]

## 👥 Contributors

[Your Team Here]

---

**Ready to build?** Start with the Implementation Plan and follow the phases step by step!
