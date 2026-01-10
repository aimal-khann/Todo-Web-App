# Professional Todo Manager

A full-stack todo management application with authentication, dashboard analytics, and responsive UI.

## Project Structure

- `frontend/` - Next.js 16+ frontend with TypeScript, Tailwind CSS, and Zustand
- `backend/` - FastAPI backend with SQLModel, PostgreSQL, and JWT authentication

## Frontend Deployment (Vercel)

The frontend is ready for Vercel deployment:

1. The build process completes successfully
2. A `vercel.json` configuration file is provided
3. Environment variables are properly configured

To deploy to Vercel:
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the Next.js project
3. Add the required environment variables:
   - `NEXT_PUBLIC_API_BASE_URL`: URL of your deployed backend API

## Backend Deployment

The backend can be deployed using Docker or to a cloud platform that supports Python applications:

### Docker Deployment
```bash
# Build and run the Docker container
docker build -t todo-backend .
docker run -p 8000:8000 todo-backend
```

### Using Docker Compose
```bash
docker-compose up -d
```

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_BASE_URL=https://your-backend-url/api/v1
```

### Backend (.env)
```
DATABASE_URL=postgresql+asyncpg://user:password@host:port/database
SECRET_KEY=your-super-secret-key-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login and get JWT token
- `GET /api/v1/auth/me` - Get current user info

### Tasks
- `GET /api/v1/tasks/` - Get user's tasks
- `POST /api/v1/tasks/` - Create a new task
- `GET /api/v1/tasks/{id}` - Get a specific task
- `PUT /api/v1/tasks/{id}` - Update a task
- `DELETE /api/v1/tasks/{id}` - Delete a task
- `GET /api/v1/tasks/stats` - Get dashboard statistics

## Features

- User authentication with JWT tokens
- Task management (create, read, update, delete)
- Dashboard with analytics (tasks due soon, completed today, productivity score)
- Responsive UI with modern design
- TypeScript type safety
- Form validation

## Technologies Used

### Frontend
- Next.js 16+
- TypeScript
- Tailwind CSS
- Framer Motion (animations)
- Zustand (state management)
- React Hook Form
- Axios (API calls)

### Backend
- FastAPI
- SQLModel
- PostgreSQL
- JWT authentication
- Alembic (database migrations)

## Local Development

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn src.main:app --reload
```