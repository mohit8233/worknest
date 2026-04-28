

# 💼 WorkNest – Job Finder Portal

A full-stack Job Finder web application built using the MERN stack.  
Users can explore jobs, apply with resumes, and admins can manage hiring workflows.

---

## 🌐 Live Demo

🔗 Frontend: https://your-frontend.vercel.app  
🔗 Backend API: https://your-backend.onrender.com  

---

## 📌 Features

### 👤 User Features
- 🔍 Browse jobs by category
- 🔎 Search jobs by title & location
- 📄 View job details
- 📨 Apply for jobs with resume upload
- 🔔 Receive notifications
- 🧾 Track applied jobs

---

### 🛠️ Admin Features
- ➕ Create new jobs
- ✏️ Update job details
- ❌ Delete jobs
- ⭐ Mark jobs as featured
- 📊 View all applications
- ✅ Accept / Reject candidates
- 📈 Dashboard analytics

---

### ⚡ Smart Features
- ⏳ Job expiry system (auto hide expired jobs)
- 🚀 Upcoming jobs highlight (HOC)
- 🌙 Dark / Light theme support
- 📩 Newsletter subscription system
- 🔐 JWT Authentication

---

## 🧰 Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication

### Deployment
- Frontend → Vercel  
- Backend → Render  
- Database → MongoDB Atlas  

---

## 📁 Project Structure

WorkNest/
│
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── assets/
│ │ ├── components/
│ │ │ ├── Header.jsx
│ │ │ ├── Footer.jsx
│ │ │ ├── JobCard.jsx
│ │ │ └── ApplyForm.jsx
│ │ │
│ │ ├── pages/
│ │ │ ├── Home.jsx
│ │ │ ├── Jobs.jsx
│ │ │ ├── Dashboard.jsx
│ │ │ ├── Login.jsx
│ │ │ └── Signup.jsx
│ │ │
│ │ ├── context/
│ │ │ └── AuthContext.jsx
│ │ │
│ │ ├── api/
│ │ │ └── api.js
│ │ │
│ │ ├── hoc/
│ │ │ └── withUpcomingHighlight.jsx
│ │ │
│ │ ├── App.jsx
│ │ └── main.jsx
│ │
│ ├── package.json
│ └── vite.config.js
│
├── backend/
│ ├── config/
│ │ └── db.js
│ │
│ ├── models/
│ │ ├── userModel.js
│ │ ├── jobModel.js
│ │ ├── applicationModel.js
│ │ └── notificationModel.js
│ │
│ ├── controllers/
│ │ ├── authController.js
│ │ ├── jobController.js
│ │ ├── applicationController.js
│ │ └── notificationController.js
│ │
│ ├── routes/
│ │ ├── authRoutes.js
│ │ ├── jobRoutes.js
│ │ ├── applicationRoutes.js
│ │ └── notificationRoutes.js
│ │
│ ├── uploads/
│ │ └── resumes/
│ │
│ ├── server.js
│ ├── package.json
│ └── .env
│
└── README.md


---

## ⚙️ Environment Variables

### Frontend (.env)

VITE_API_URL=https://your-backend.onrender.com/api


---

### Backend (.env)

PORT=5000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key


---

## 🚀 Installation & Setup

### 1️⃣ Clone Repository

git clone https://github.com/your-username/worknest.git

cd worknest


---

### 2️⃣ Setup Backend

cd backend
npm install
npm start


---

### 3️⃣ Setup Frontend

cd frontend
npm install
npm run dev


---

## 📸 Screenshots

(Add your UI screenshots here)

---

## 🧠 Learning Highlights

- Full MERN Stack Development
- REST API Integration
- Authentication (JWT)
- File Upload (Resume)
- Real-world UI with Tailwind CSS
- Deployment (Vercel + Render)

---

## 🚀 Future Improvements

- 📧 Email notifications system
- 📊 Advanced analytics dashboard
- 📱 Mobile responsiveness
- 💬 Chat between recruiter & user

---

## 👤 Author

**Mohit Singh**  
📧 mohitbanna085@gmail.com  
🔗 https://github.com/mohit8233
---

## ⭐ Support

If you like this project, please ⭐ the repository!
