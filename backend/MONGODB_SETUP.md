# MongoDB Atlas Setup Instructions

## Your Connection String

```
mongodb+srv://finaluser:<db_password>@cluster0.kn36sme.mongodb.net/?appName=Cluster0
```

## Step 1: Complete Your Connection String

You need to:
1. **Replace `<db_password>`** with your actual MongoDB Atlas database password
2. **Add a database name** (e.g., `/ecommerce`) before the `?`

### Final Connection String Format:
```
mongodb+srv://finaluser:YOUR_PASSWORD@cluster0.kn36sme.mongodb.net/ecommerce?retryWrites=true&w=majority
```

## Step 2: Create .env File

1. Create a `.env` file in the `backend` directory
2. Add your connection string:

```env
PORT=5000
MONGODB_URI=mongodb+srv://finaluser:YOUR_PASSWORD@cluster0.kn36sme.mongodb.net/ecommerce?retryWrites=true&w=majority
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

**⚠️ Important:** Replace `YOUR_PASSWORD` with your actual database password!

## Step 3: Configure MongoDB Atlas

### A. Whitelist Your IP Address

1. Go to [MongoDB Atlas Dashboard](https://cloud.mongodb.com/)
2. Click on **"Network Access"** in the left sidebar
3. Click **"Add IP Address"**
4. For development, click **"Allow Access from Anywhere"** (adds `0.0.0.0/0`)
5. Click **"Confirm"**

### B. Verify Database User

1. Go to **"Database Access"** in the left sidebar
2. Verify user `finaluser` exists
3. Make sure the user has **"Read and write to any database"** permissions
4. If you need to reset the password:
   - Click **"Edit"** on the user
   - Set a new password
   - Update your `.env` file with the new password

## Step 4: Test Connection

1. Install dependencies (if not already done):
   ```bash
   cd backend
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```

3. You should see:
   ```
   MongoDB Connected: cluster0-shard-00-00.kn36sme.mongodb.net
   Server is running on port 5000 in development mode
   ```

4. If you see connection errors, check:
   - Password is correct in `.env` file
   - IP address is whitelisted in MongoDB Atlas
   - Database user has correct permissions
   - Connection string format is correct

## Step 5: Seed Sample Data

After successful connection, seed the database:

```bash
npm run seed
```

You should see:
```
✅ Successfully seeded 12 products
```

## Troubleshooting

### Error: "Authentication failed"
- **Solution:** Check your password in `.env` file
- Verify username is `finaluser`
- Reset password in MongoDB Atlas if needed

### Error: "IP not whitelisted"
- **Solution:** Add your IP to MongoDB Atlas Network Access
- Or use `0.0.0.0/0` for development (allows all IPs)

### Error: "Invalid connection string"
- **Solution:** 
  - Make sure database name is included (e.g., `/ecommerce`)
  - Check for extra spaces
  - Verify the connection string format

### Error: "Connection timeout"
- **Solution:**
  - Check internet connection
  - Verify MongoDB Atlas cluster is running
  - Check firewall settings

## Security Best Practices

1. **Never commit `.env` file** - It's already in `.gitignore`
2. **Use strong passwords** - For database user
3. **Restrict IP access** - For production, use specific IPs only
4. **Use environment variables** - Different credentials for dev/prod

## Connection String Breakdown

```
mongodb+srv://[username]:[password]@[cluster]/[database]?[options]
```

- **Username:** `finaluser`
- **Password:** Your database password
- **Cluster:** `cluster0.kn36sme.mongodb.net`
- **Database:** `ecommerce` (you need to add this)
- **Options:** `retryWrites=true&w=majority`

## Quick Reference

### Complete .env File Example:
```env
PORT=5000
MONGODB_URI=mongodb+srv://finaluser:your_actual_password_here@cluster0.kn36sme.mongodb.net/ecommerce?retryWrites=true&w=majority
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### Test Connection:
```bash
# Start server
npm start

# Seed data
npm run seed

# Test API
curl http://localhost:5000/api/products
```

## Next Steps

1. ✅ Create `.env` file with your connection string
2. ✅ Whitelist IP address in MongoDB Atlas
3. ✅ Start backend server
4. ✅ Seed sample data
5. ✅ Test API endpoints
6. ✅ Connect frontend to backend

## Need Help?

If you encounter issues:
- Check MongoDB Atlas dashboard
- Verify network access settings
- Check database user permissions
- Review connection string format
- Check server logs for detailed errors

