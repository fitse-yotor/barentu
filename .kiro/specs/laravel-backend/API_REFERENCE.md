# API Reference - Quick Guide

## Base URL
```
Development: http://localhost:8000/api
Production: https://api.yourdomain.com/api
```

## Authentication
All authenticated endpoints require Bearer token in header:
```
Authorization: Bearer {token}
```

---

## Authentication Endpoints

### Register
```http
POST /api/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "password_confirmation": "password123"
}

Response: 201 Created
{
  "user": { ... },
  "token": "1|abc123..."
}
```

### Login
```http
POST /api/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: 200 OK
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "social_media_manager",
    "credits": 500
  },
  "token": "1|abc123..."
}
```

### Logout
```http
POST /api/logout
Authorization: Bearer {token}

Response: 200 OK
{
  "message": "Logged out successfully"
}
```

### Get Current User
```http
GET /api/user
Authorization: Bearer {token}

Response: 200 OK
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "role": "social_media_manager",
  "credits": 500,
  "manager_id": null
}
```

---

## User Management Endpoints

### List Users
```http
GET /api/users?role=social_media_manager&page=1
Authorization: Bearer {token}

Response: 200 OK
{
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "social_media_manager",
      "credits": 500,
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "meta": {
    "current_page": 1,
    "total": 50
  }
}
```

### Create User
```http
POST /api/users
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "password": "password123",
  "role": "sub_social_media_manager",
  "credits": 100
}

Response: 201 Created
{
  "id": 2,
  "name": "Jane Smith",
  "email": "jane@example.com",
  "role": "sub_social_media_manager",
  "credits": 100
}
```

### Update User
```http
PUT /api/users/2
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Jane Doe",
  "credits": 150
}

Response: 200 OK
{
  "id": 2,
  "name": "Jane Doe",
  "credits": 150
}
```

### Delete User
```http
DELETE /api/users/2
Authorization: Bearer {token}

Response: 204 No Content
```

---

## Post Management Endpoints

### List Posts
```http
GET /api/posts?status=scheduled&platform=facebook&page=1
Authorization: Bearer {token}

Response: 200 OK
{
  "data": [
    {
      "id": 1,
      "content": "Check out our new product!",
      "platforms": ["facebook", "instagram"],
      "status": "scheduled",
      "scheduled_at": "2024-02-01T14:00:00Z",
      "credits_used": 2,
      "media": [
        {
          "id": 1,
          "type": "image",
          "url": "https://storage.com/image.jpg"
        }
      ],
      "author": {
        "id": 1,
        "name": "John Doe"
      }
    }
  ],
  "meta": {
    "current_page": 1,
    "total": 25
  }
}
```

### Create Post
```http
POST /api/posts
Authorization: Bearer {token}
Content-Type: multipart/form-data

{
  "content": "Exciting news coming soon!",
  "platforms": ["facebook", "instagram", "twitter"],
  "status": "scheduled",
  "scheduled_at": "2024-02-01T14:00:00Z",
  "media[]": [File, File]
}

Response: 201 Created
{
  "id": 2,
  "content": "Exciting news coming soon!",
  "platforms": ["facebook", "instagram", "twitter"],
  "status": "scheduled",
  "scheduled_at": "2024-02-01T14:00:00Z",
  "credits_used": 3,
  "media": [...]
}
```

### Get Post
```http
GET /api/posts/1
Authorization: Bearer {token}

Response: 200 OK
{
  "id": 1,
  "content": "Check out our new product!",
  "platforms": ["facebook", "instagram"],
  "status": "published",
  "published_at": "2024-01-15T14:00:00Z",
  "credits_used": 2,
  "media": [...],
  "author": {...}
}
```

### Update Post
```http
PUT /api/posts/1
Authorization: Bearer {token}
Content-Type: application/json

{
  "content": "Updated content",
  "scheduled_at": "2024-02-02T15:00:00Z"
}

Response: 200 OK
{
  "id": 1,
  "content": "Updated content",
  "scheduled_at": "2024-02-02T15:00:00Z"
}
```

### Delete Post
```http
DELETE /api/posts/1
Authorization: Bearer {token}

Response: 200 OK
{
  "message": "Post deleted successfully",
  "credits_refunded": 2
}
```

### Get Calendar Posts
```http
GET /api/posts/calendar?start_date=2024-02-01&end_date=2024-02-29
Authorization: Bearer {token}

Response: 200 OK
{
  "2024-02-01": [
    {
      "id": 1,
      "content": "...",
      "scheduled_at": "2024-02-01T14:00:00Z"
    }
  ],
  "2024-02-15": [...]
}
```

---

## Credit Management Endpoints

### Get Credit Balance
```http
GET /api/credits/balance
Authorization: Bearer {token}

Response: 200 OK
{
  "balance": 450,
  "total_earned": 500,
  "total_spent": 50
}
```

### Get Credit History
```http
GET /api/credits/history?page=1
Authorization: Bearer {token}

Response: 200 OK
{
  "data": [
    {
      "id": 1,
      "amount": -2,
      "type": "usage",
      "description": "Post created on Facebook, Instagram",
      "reference_id": 1,
      "created_at": "2024-01-15T14:00:00Z"
    },
    {
      "id": 2,
      "amount": 500,
      "type": "purchase",
      "description": "Credit package purchased",
      "created_at": "2024-01-01T10:00:00Z"
    }
  ]
}
```

### Get Credit Packages
```http
GET /api/credits/packages
Authorization: Bearer {token}

Response: 200 OK
{
  "data": [
    {
      "id": 1,
      "name": "Starter",
      "credits": 100,
      "price": 29.00,
      "description": "Perfect for small businesses"
    },
    {
      "id": 2,
      "name": "Professional",
      "credits": 300,
      "price": 79.00,
      "description": "For growing agencies"
    }
  ]
}
```

### Purchase Credits
```http
POST /api/credits/purchase
Authorization: Bearer {token}
Content-Type: application/json

{
  "package_id": 1,
  "payment_method": "stripe",
  "payment_token": "tok_abc123"
}

Response: 200 OK
{
  "transaction_id": 123,
  "credits_added": 100,
  "new_balance": 550,
  "amount_paid": 29.00
}
```

---

## Social Account Endpoints

### List Social Accounts
```http
GET /api/social-accounts
Authorization: Bearer {token}

Response: 200 OK
{
  "data": [
    {
      "id": 1,
      "platform": "facebook",
      "username": "mycompany",
      "display_name": "My Company",
      "is_connected": true,
      "followers": 15420,
      "last_synced_at": "2024-01-15T10:00:00Z"
    }
  ]
}
```

### Connect Social Account
```http
POST /api/social-accounts
Authorization: Bearer {token}
Content-Type: application/json

{
  "platform": "instagram",
  "access_token": "IGQVJXabc123...",
  "username": "mycompany"
}

Response: 201 Created
{
  "id": 2,
  "platform": "instagram",
  "username": "mycompany",
  "is_connected": true
}
```

### Disconnect Social Account
```http
DELETE /api/social-accounts/1
Authorization: Bearer {token}

Response: 204 No Content
```

### Refresh Account Data
```http
POST /api/social-accounts/1/refresh
Authorization: Bearer {token}

Response: 200 OK
{
  "id": 1,
  "followers": 15500,
  "last_synced_at": "2024-01-16T10:00:00Z"
}
```

---

## Analytics Endpoints

### Get Dashboard Analytics
```http
GET /api/analytics/dashboard
Authorization: Bearer {token}

Response: 200 OK
{
  "total_posts": 125,
  "scheduled_posts": 15,
  "published_posts": 110,
  "credits_used": 250,
  "credits_remaining": 250,
  "platform_stats": {
    "facebook": 45,
    "instagram": 50,
    "twitter": 30
  }
}
```

### Get Post Analytics
```http
GET /api/analytics/posts?start_date=2024-01-01&end_date=2024-01-31
Authorization: Bearer {token}

Response: 200 OK
{
  "total_posts": 50,
  "by_platform": {
    "facebook": 20,
    "instagram": 18,
    "twitter": 12
  },
  "by_status": {
    "published": 45,
    "scheduled": 3,
    "draft": 2
  },
  "engagement_rate": 5.2
}
```

### Get Platform-Wide Stats (Admin Only)
```http
GET /api/analytics/platform
Authorization: Bearer {token}

Response: 200 OK
{
  "total_users": 1247,
  "total_posts": 25420,
  "total_credits_sold": 75230,
  "revenue": 45230.00,
  "users_by_role": {
    "super_admin": 1,
    "social_media_manager": 24,
    "sub_social_media_manager": 67,
    "user": 1155
  }
}
```

---

## AI Features Endpoints

### Generate Content
```http
POST /api/ai/generate-content
Authorization: Bearer {token}
Content-Type: application/json

{
  "topic": "social media marketing tips",
  "platforms": ["facebook", "instagram"],
  "tone": "professional"
}

Response: 200 OK
{
  "suggestions": [
    {
      "id": "1",
      "content": "🚀 Boost your social media presence with these proven strategies...",
      "hashtags": ["#SocialMedia", "#Marketing", "#DigitalMarketing"],
      "engagement_score": 8.5,
      "optimal_time": "2:00 PM EST"
    }
  ]
}
```

### Get AI Insights
```http
GET /api/ai/insights
Authorization: Bearer {token}

Response: 200 OK
{
  "trending_hashtags": [
    {
      "hashtag": "#MondayMotivation",
      "growth": "+23%",
      "platforms": ["instagram", "twitter"]
    }
  ],
  "optimal_posting_times": [
    {
      "time": "2:00 PM",
      "engagement_rate": "6.8%",
      "platform": "facebook"
    }
  ],
  "content_recommendations": [
    {
      "type": "behind-the-scenes",
      "performance": "high",
      "suggestion": "Share more behind-the-scenes content"
    }
  ]
}
```

---

## Settings Endpoints

### Get Settings
```http
GET /api/settings
Authorization: Bearer {token}

Response: 200 OK
{
  "platform_name": "SocialHub",
  "logo_url": "https://storage.com/logo.png",
  "primary_color": "#2E4A9E",
  "footer": {
    "company_name": "SocialHub",
    "description": "Professional social media management platform",
    "sections": [...]
  }
}
```

### Update Settings (Admin Only)
```http
PUT /api/settings
Authorization: Bearer {token}
Content-Type: application/json

{
  "platform_name": "MySocialHub",
  "primary_color": "#3B5BA5"
}

Response: 200 OK
{
  "message": "Settings updated successfully",
  "settings": {...}
}
```

---

## Error Responses

### Validation Error (422)
```json
{
  "message": "The given data was invalid.",
  "errors": {
    "email": ["The email field is required."],
    "password": ["The password must be at least 8 characters."]
  }
}
```

### Unauthorized (401)
```json
{
  "message": "Unauthenticated."
}
```

### Forbidden (403)
```json
{
  "message": "This action is unauthorized."
}
```

### Not Found (404)
```json
{
  "message": "Resource not found."
}
```

### Server Error (500)
```json
{
  "message": "Server error occurred.",
  "error": "Error details..."
}
```

---

## Rate Limiting

All endpoints are rate-limited:
- **Authentication endpoints**: 5 requests per minute
- **General API endpoints**: 60 requests per minute
- **AI endpoints**: 10 requests per minute

Rate limit headers:
```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 59
X-RateLimit-Reset: 1640000000
```

---

## Pagination

List endpoints support pagination:
```
?page=1&per_page=15
```

Response includes meta:
```json
{
  "data": [...],
  "meta": {
    "current_page": 1,
    "last_page": 5,
    "per_page": 15,
    "total": 75
  },
  "links": {
    "first": "http://api.com/posts?page=1",
    "last": "http://api.com/posts?page=5",
    "prev": null,
    "next": "http://api.com/posts?page=2"
  }
}
```

---

## Filtering & Sorting

Most list endpoints support filtering:
```
?status=published&platform=facebook&sort=-created_at
```

Common filters:
- `status` - Filter by status
- `platform` - Filter by platform
- `start_date` - Filter by start date
- `end_date` - Filter by end date
- `search` - Search by keyword
- `sort` - Sort by field (prefix with `-` for descending)

---

## File Uploads

Media uploads use multipart/form-data:
```http
POST /api/posts
Content-Type: multipart/form-data

media[]: File (max 10MB for images, 100MB for videos)
```

Supported formats:
- **Images**: jpg, jpeg, png, gif, webp
- **Videos**: mp4, mov, avi

---

## Webhooks (Future)

Webhook events will be sent to registered URLs:
- `post.published` - When a post is published
- `post.failed` - When a post fails to publish
- `credit.low` - When credits are low
- `account.disconnected` - When social account is disconnected
