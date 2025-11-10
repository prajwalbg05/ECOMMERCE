# Backend Source Directory

This directory contains all backend server code.

## Structure

- `config/` - Configuration files (database, environment variables)
- `models/` - MongoDB Mongoose schemas
- `routes/` - API route definitions
- `controllers/` - Request handlers
- `services/` - Business logic layer
- `middleware/` - Express middleware (auth, validation, errors)
- `utils/` - Utility functions (JWT, bcrypt, validators)

## Architecture Flow

```
Request → Route → Middleware → Controller → Service → Model → Database
                                                           ↓
Response ← Route ← Controller ← Service ← Model ← Database
```

