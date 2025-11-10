# MongoDB Atlas Setup Guide

## Connection String

Your MongoDB Atlas connection string:
```
mongodb+srv://finaluser:<db_password>@cluster0.kn36sme.mongodb.net/?appName=Cluster0
```

## Setup Steps

### 1. Complete the Connection String

You need to:
1. Replace `<db_password>` with your actual database password
2. Add a database name (e.g., `/ecommerce`) before the `?`

**Final format:**
```
mongodb+srv://finaluser:YOUR_PASSWORD@cluster0.kn36sme.mongodb.net/ecommerce?retryWrites=true&w=majority
```

### 2. Configure Backend

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` file and update `MONGODB_URI`:
   ```env
   MONGODB_URI=mongodb+srv://finaluser:YOUR_PASSWORD@cluster0.kn36sme.mongodb.net/ecommerce?retryWrites=true&w=majority
   ```

### 3. MongoDB Atlas Configuration

#### Whitelist IP Address
1. Go to MongoDB Atlas Dashboard
2. Click on "Network Access" in the left sidebar
3. Click "Add IP Address"
4. For development, click "Allow Access from Anywhere" (0.0.0.0/0)
5. Click "Confirm"

#### Database User
1. Go to "Database Access" in the left sidebar
2. Verify your user `finaluser` exists
3. Make sure the user has "Read and write to any database" permissions
4. If you need to reset the password, click "Edit" on the user and set a new password

### 4. Test Connection

1. Start the backend server:
   ```bash
   npm start
   ```

2. You should see:
   ```
   MongoDB Connected: cluster0-shard-00-00.kn36sme.mongodb.net
   Server is running on port 5000
   ```

3. If you see connection errors:
   - Check your password is correct
   - Verify IP address is whitelisted
   - Check database user permissions
   - Verify the connection string format

### 5. Seed Sample Data

After successful connection, seed the database:
```bash
npm run seed
```

You should see:
```
✅ Successfully seeded 12 products
```

## Troubleshooting

### Connection Error: "Authentication failed"
- **Solution:** Check your database password is correct
- Verify the username is `finaluser`
- Reset the password in MongoDB Atlas if needed

### Connection Error: "IP not whitelisted"
- **Solution:** Add your IP address to the whitelist
- Or use `0.0.0.0/0` for development (allows all IPs)

### Connection Error: "Invalid connection string"
- **Solution:** Check the connection string format
- Make sure database name is included (e.g., `/ecommerce`)
- Verify no extra spaces or characters

### Connection Timeout
- **Solution:** Check your internet connection
- Verify MongoDB Atlas cluster is running
- Check firewall settings

## Security Notes

⚠️ **Important Security Tips:**

1. **Never commit `.env` file to Git**
   - The `.env` file is already in `.gitignore`
   - Never share your connection string publicly

2. **Use Strong Passwords**
   - Use a strong, unique password for database user
   - Change password regularly

3. **Restrict IP Access**
   - For production, only whitelist specific IP addresses
   - Don't use `0.0.0.0/0` in production

4. **Use Environment Variables**
   - Store connection string in `.env` file
   - Use different credentials for development and production

## Connection String Format

```
mongodb+srv://[username]:[password]@[cluster].mongodb.net/[database]?[options]
```

**Your connection string breakdown:**
- **Username:** `finaluser`
- **Password:** `<db_password>` (replace with actual password)
- **Cluster:** `cluster0.kn36sme.mongodb.net`
- **Database:** `ecommerce` (add this)
- **Options:** `retryWrites=true&w=majority` (recommended)

## Next Steps

After setting up MongoDB Atlas:

1. ✅ Update `.env` file with connection string
2. ✅ Start backend server: `npm start`
3. ✅ Seed sample data: `npm run seed`
4. ✅ Test API endpoints
5. ✅ Connect frontend to backend

## Need Help?

If you encounter issues:
1. Check MongoDB Atlas dashboard for connection status
2. Verify network access settings
3. Check database user permissions
4. Review connection string format
5. Check server logs for detailed error messages

