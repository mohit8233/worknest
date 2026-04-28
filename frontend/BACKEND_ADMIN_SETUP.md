# Job Finder Backend + Admin/User Dashboard Setup

## Frontend run

```bash
npm install
npm run dev
```

Create `.env` in project root:

```env
VITE_API_URL=http://localhost:5000/api
```

## Backend run

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Fill backend `.env`:

```env
PORT=5000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
EMAIL_USER=yourgmail@gmail.com
EMAIL_PASS=your_gmail_app_password
ADMIN_EMAIL=admin@gmail.com
```

## Routes

### Auth

```txt
POST /api/auth/register
POST /api/auth/login
```

### Jobs

```txt
GET    /api/jobs
POST   /api/jobs/create
PATCH  /api/jobs/update/:id
DELETE /api/jobs/delete/:id
```

### Applications

```txt
POST  /api/applications/apply
GET   /api/applications/my
GET   /api/applications/all
PATCH /api/applications/status/:id
```

## Frontend pages

```txt
/user dashboard  -> /dashboard
/admin dashboard -> /admin/dashboard
```

## EmailJS replacement

Old EmailJS code is removed from `src/components/ApplyForm.jsx`.
Now form submits to backend API:

```js
POST /api/applications/apply
```

Backend saves the application in MongoDB and sends email using Nodemailer.

## Admin login

For testing, signup page has role select. Select `Admin` and register.
For real production, remove role select from frontend and create admin manually from MongoDB.
