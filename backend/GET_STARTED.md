# Get Started with MongoDB Atlas

## 🚀 Quick Setup (3 Steps)

### Step 1: Create .env File

Create a `.env` file in the `backend` directory with this content:

```env
PORT=5000
MONGODB_URI=mongodb+srv://finaluser:YOUR_PASSWORD@cluster0.kn36sme.mongodb.net/ecommerce?retryWrites=true&w=majority
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

**⚠️ Replace `YOUR_PASSWORD` with your actual MongoDB Atlas password!**

### Step 2: Whitelist Your IP in MongoDB Atlas

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Click **"Network Access"** → **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (adds `0.0.0.0/0`)
4. Click **"Confirm"**

### Step 3: Start the Server

```bash
cd backend
npm install
npm start
```

You should see:
```
✅ MongoDB Connected: cluster0-shard-00-00.kn36sme.mongodb.net
📊 Database: ecommerce
Server is running on port 5000
```

## 📦 Seed Sample Data

After the server starts, seed the database:

```bash
npm run seed
```

You should see:
```
✅ Successfully seeded 12 products
```

## ✅ Test the API

```bash
# Get all products
curl http://localhost:5000/api/products

# Health check
curl http://localhost:5000/health
```

## 🐛 Troubleshooting

### Connection Error?
- ✅ Check your password in `.env` file
- ✅ Verify IP is whitelisted in MongoDB Atlas
- ✅ Check database user permissions
- ✅ Verify connection string format

### Need More Help?
See `MONGODB_SETUP.md` for detailed instructions.

## 📝 Your Connection String

```
mongodb+srv://finaluser:<db_password>@cluster0.kn36sme.mongodb.net/?appName=Cluster0
```

**Update it to:**
```
mongodb+srv://finaluser:YOUR_PASSWORD@cluster0.kn36sme.mongodb.net/ecommerce?retryWrites=true&w=majority
```

**Changes made:**
1. Replace `<db_password>` with your actual password
2. Add `/ecommerce` before the `?` (database name)
3. Add `?retryWrites=true&w=majority` (connection options)

## 🎉 You're Ready!

Once connected, you can:
- ✅ Browse products via API
- ✅ Add items to cart
- ✅ Test all endpoints
- ✅ Connect frontend to backend

