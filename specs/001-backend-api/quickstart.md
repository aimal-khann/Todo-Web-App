# Quickstart Guide: Professional Todo Manager Backend API

**Feature**: 001-backend-api | **Date**: 2026-01-02

## Development Setup

### Prerequisites
- Python 3.10+
- PostgreSQL (or access to Neon Serverless PostgreSQL)
- Docker and Docker Compose (optional, for local development)

### Initial Setup

1. **Create the backend directory structure**:
```bash
mkdir -p backend/src/{models,api/v1,core,schemas,utils}
mkdir -p backend/alembic/versions
```

2. **Install Python dependencies**:
```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install fastapi uvicorn sqlmodel python-jose bcrypt passlib[bcrypt] alembic python-dotenv pytest httpx
```

3. **Create requirements.txt**:
```txt
fastapi==0.104.1
uvicorn[standard]==0.24.0
sqlmodel==0.0.16
python-jose[cryptography]==3.3.0
bcrypt==4.1.1
passlib==1.7.4
alembic==1.13.1
python-dotenv==1.0.0
pytest==7.4.3
httpx==0.25.2
```

4. **Set up environment variables**:
Create a `.env` file based on `.env.example`:
```env
DATABASE_URL=postgresql+asyncpg://username:password@localhost/dbname
SECRET_KEY=your-super-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### Database Setup

1. **Initialize Alembic**:
```bash
cd backend
alembic init alembic
```

2. **Configure Alembic** (update `alembic.ini` and `alembic/env.py` to use your database settings)

3. **Create initial migration**:
```bash
alembic revision --autogenerate -m "Initial migration"
alembic upgrade head
```

## Project Structure

```
backend/
├── src/
│   ├── main.py              # Application entry point
│   ├── models/              # SQLModel database models
│   │   ├── __init__.py
│   │   ├── user.py          # User model
│   │   └── task.py          # Task model
│   ├── api/                 # API route definitions
│   │   ├── __init__.py
│   │   └── v1/              # API version 1
│   │       ├── __init__.py
│   │       ├── auth.py      # Authentication endpoints
│   │       └── tasks.py     # Task endpoints
│   ├── core/                # Core functionality
│   │   ├── __init__.py
│   │   ├── config.py        # Configuration
│   │   ├── security.py      # Security utilities
│   │   └── database.py      # Database utilities
│   ├── schemas/             # Pydantic schemas
│   │   ├── __init__.py
│   │   ├── user.py          # User schemas
│   │   └── task.py          # Task schemas
│   └── utils/               # Utility functions
│       ├── __init__.py
│       └── helpers.py
├── alembic/
│   ├── versions/            # Migration files
│   └── env.py               # Alembic configuration
├── alembic.ini             # Alembic settings
├── requirements.txt        # Python dependencies
├── Dockerfile              # Container configuration
└── docker-compose.yml      # Service orchestration
```

## Running the Application

### Development
```bash
# Activate virtual environment
source venv/bin/activate

# Run the application
uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
```

### With Docker (optional)
```bash
# Build and run with Docker Compose
docker-compose up --build
```

## API Endpoints

### Authentication (`/api/v1/auth`)
- `POST /register` - Create new user account
- `POST /login` - Authenticate user and return JWT
- `GET /me` - Get current user info (requires valid JWT)

### Tasks (`/api/v1/tasks`)
- `GET /` - List user's tasks (requires valid JWT)
- `POST /` - Create new task (requires valid JWT)
- `GET /{id}` - Get specific task (requires valid JWT)
- `PUT /{id}` - Update task (requires valid JWT)
- `DELETE /{id}` - Delete task (requires valid JWT)

## Testing

### Run tests
```bash
pytest
```

### Test structure
```
tests/
├── unit/              # Unit tests for individual components
├── integration/       # Integration tests for API endpoints
└── contract/          # Contract tests for API schemas
```

## Frontend Integration

### API Client Setup
The frontend will need to implement an API client that:
1. Stores JWT tokens after login
2. Includes the token in the Authorization header for protected endpoints
3. Handles token expiration and refresh
4. Maps API responses to frontend data structures

### Example API Call
```typescript
// Example of how frontend will call the backend
const response = await fetch('/api/v1/tasks/', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${jwtToken}`,
    'Content-Type': 'application/json'
  }
});
```

## Next Steps

1. Implement the core models (User and Task)
2. Set up the database connection and session management
3. Create the security module with JWT handling
4. Implement authentication endpoints
5. Implement task management endpoints
6. Add proper error handling and validation
7. Write tests for all endpoints
8. Integrate with the frontend