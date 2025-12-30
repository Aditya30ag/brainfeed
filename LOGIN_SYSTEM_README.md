# Brainfeed Login System Documentation

## Overview

The Brainfeed platform now includes a comprehensive login system with role-based access control. The system supports three types of users:
- **Public Users**: Can view approved articles without login
- **Article Writers**: Can post articles, add thumbnails, and view their analytics
- **Admin**: Can approve/reject articles, view overall analytics, and manage the platform

## Hardcoded Login Credentials

### Admin Account
- **Username**: `admin`
- **Password**: `password123`
- **Capabilities**:
  - View overall analytics dashboard
  - Approve or reject articles submitted by writers
  - See which writers are getting the most clicks
  - Analyze content performance and user engagement
  - View all pending articles

### Writer Accounts (4 Writers)
1. **Writer 1**
   - **Username**: `writer1`
   - **Password**: `password123`

2. **Writer 2**
   - **Username**: `writer2`
   - **Password**: `password123`

3. **Writer 3**
   - **Username**: `writer3`
   - **Password**: `password123`

4. **Writer 4**
   - **Username**: `writer4`
   - **Password**: `password123`

**Writer Capabilities**:
- Post new articles with thumbnails
- View their own articles
- See article status (pending, approved, rejected)
- Track analytics for each article (number of clicks)
- View total statistics (total articles, approved articles, pending articles, total clicks)

## How to Access

### For Writers and Admin
1. Navigate to `/login` or click the Login button in the navbar
2. Enter your username and password
3. You'll be automatically redirected to your appropriate dashboard:
   - **Admin** → `/admin/dashboard`
   - **Writers** → `/writer/dashboard`

### Role-Based Route Protection
- **Admin users cannot access** `/writer/dashboard` - they will be redirected to `/admin/dashboard`
- **Writer users cannot access** `/admin/dashboard` - they will be redirected to `/writer/dashboard`
- Unauthenticated users trying to access either dashboard will be redirected to `/login`
- The navbar dynamically shows role-appropriate dashboard links:
  - Admin sees the **Admin Dashboard** icon (bar chart)
  - Writers see the **Writer Dashboard** icon (file text)
  - Non-authenticated users see the **Login** button

### For Public Users
- No login required
- Can freely browse and read approved articles
- Full access to all public content

## Features

### Writer Dashboard Features

#### 1. **Statistics Overview**
   - Total Articles: Number of articles you've submitted
   - Approved Articles: Articles that are live on the platform
   - Pending Articles: Articles awaiting admin approval
   - Total Clicks: Cumulative views across all your articles

#### 2. **Create New Article**
   - Title (auto-generates slug)
   - Slug (URL-friendly identifier)
   - Excerpt (brief description)
   - Content (main article body)
   - Cover Image (thumbnail URL)
   - Category selection
   - Author selection
   - Read time (in minutes)

#### 3. **My Articles Tab**
   - View all your submitted articles
   - See status of each article (pending, approved, rejected)
   - Track individual article performance (clicks)
   - View publication dates

### Admin Dashboard Features

#### 1. **Overall Statistics**
   - Total user sessions
   - Total events tracked
   - Number of pending articles
   - Total article clicks across platform

#### 2. **Pending Approvals Tab**
   - List of all articles awaiting approval
   - Article details (title, excerpt, author, category)
   - **Approve** button to publish articles
   - **Reject** button to decline articles
   - Submission date tracking

#### 3. **Writer Analytics Tab**
   - Performance metrics for each writer:
     - Total articles submitted
     - Number of approved articles
     - Total clicks received
     - Average clicks per article
   - Sorted by most clicks (top performers first)
   - **Top Content by Clicks**: See which articles are performing best

#### 4. **Overall Analytics Tab**
   - Top articles by views (bar chart)
   - Event breakdown (pie chart)
   - User behavior insights:
     - Average scroll depth
     - Chat sessions
     - Chat engagement rate

## Article Workflow

### For Writers:
1. **Create Article** → Submit for approval (Status: `pending`)
2. **Wait for Admin Review** → Admin reviews the article
3. **Approval/Rejection** → Admin approves or rejects
   - If **Approved** → Article goes live (Status: `approved`)
   - If **Rejected** → Article not published (Status: `rejected`)

### For Admin:
1. **Review Pending Articles** → Check article content and quality
2. **Approve** → Article becomes visible to public users
3. **Reject** → Article stays hidden, writer can see rejection status

### For Public Users:
- Can only see `approved` articles
- No login required
- Articles automatically tracked for clicks when viewed

## Technical Implementation

### Authentication
- Session-based authentication using `express-session`
- Password hashing with `bcryptjs` (bcrypt rounds: 10)
- Middleware protection for routes:
  - `requireAuth`: Requires any logged-in user
  - `requireWriter`: Requires writer or admin role
  - `requireAdmin`: Requires admin role only

### Database Schema

#### Users Table
```sql
- id (auto-increment)
- username (unique)
- password (hashed)
- role (admin/writer)
- name (display name)
- created_at
```

#### Articles Table (Updated)
```sql
- id
- title
- slug (unique)
- excerpt
- content
- cover_image
- category_id (foreign key)
- author_id (foreign key)
- writer_id (foreign key to users) - NEW
- status (pending/approved/rejected) - NEW
- clicks (default: 0) - NEW
- published_at
- created_at
```

### API Endpoints

#### Authentication
- `POST /api/auth/login` - Login with username/password
- `POST /api/auth/logout` - Logout current user
- `GET /api/auth/me` - Get current user info

#### Articles
- `GET /api/articles` - List articles (filtered by status for public)
- `GET /api/articles/:slug` - Get single article
- `POST /api/articles` - Create article (writer only)
- `PATCH /api/articles/:id/status` - Update article status (admin only)
- `POST /api/articles/:id/click` - Track article click

#### Other
- `GET /api/categories` - List all categories
- `GET /api/authors` - List all authors

## Security Features

1. **Password Security**: All passwords are hashed using bcrypt
2. **Session Management**: Secure HTTP-only cookies
3. **Role-Based Access**: Middleware protection on routes
4. **CSRF Protection**: Session-based tokens
5. **SQL Injection Prevention**: Parameterized queries via Drizzle ORM

## Starting the Application

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# The application will be available at:
# http://localhost:5000
```

## Usage Examples

### Example 1: Writer Posts Article
1. Login as `writer1`
2. Navigate to "Create New Article" tab
3. Fill in article details:
   - Title: "Understanding Quantum Computing"
   - Select category and author
   - Add content and cover image
4. Click "Submit Article"
5. Article status: **Pending**
6. Wait for admin approval

### Example 2: Admin Approves Article
1. Login as `admin`
2. Navigate to "Pending Approval" tab
3. See "Understanding Quantum Computing" in the list
4. Review article details
5. Click "Approve"
6. Article status changes to **Approved**
7. Article now visible to public users

### Example 3: Tracking Performance
1. Login as `writer1`
2. Navigate to "My Articles" tab
3. See all your articles with:
   - Current status
   - Number of clicks
   - Publication date
4. Track which articles are performing best

### Example 4: Admin Reviews Writer Performance
1. Login as `admin`
2. Navigate to "Writer Analytics" tab
3. See all writers ranked by performance:
   - Most clicked articles at the top
   - Total articles and approval rates
   - Average performance metrics

## Notes

- All passwords are currently set to `password123` for demo purposes
- In production, enforce strong password policies
- Session duration: 7 days
- Article clicks are tracked automatically when users view articles
- Only approved articles appear in public listings
- Writers can only see their own articles
- Admin can see all articles regardless of status

## Troubleshooting

### Cannot Login
- Verify username and password are correct
- Check that database is properly seeded with users
- Clear browser cookies and try again

### Article Not Showing After Approval
- Verify article status is "approved" in database
- Check that article has all required fields
- Clear cache and refresh page

### Click Tracking Not Working
- Ensure article ID is valid
- Check browser console for errors
- Verify API endpoint is accessible

## Future Enhancements

Potential improvements for the system:
- Password reset functionality
- Email notifications for article approval/rejection
- Rich text editor for article content
- Image upload functionality (instead of URLs)
- Article editing capability
- Comments and ratings system
- Writer profiles and bios
- Advanced analytics (time on page, scroll depth per article)
- Export analytics to CSV/PDF
- Article scheduling for future publication

