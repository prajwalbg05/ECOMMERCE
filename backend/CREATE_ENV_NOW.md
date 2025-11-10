# Create .env File - Quick Instructions

## ⚡ Quick Fix for the Error

The error shows: `MONGODB_URI is not defined in environment variables`

### Solution: Create .env File

**Option 1: Using PowerShell (Recommended)**

Run this command in the `backend` directory:

```powershell
Copy-Item env.template .env
```

Then edit `.env` and replace `<db_password>` with your actual MongoDB Atlas password.

**Option 2: Manual Creation**

1. Create a new file named `.env` in the `backend` directory
2. Copy and paste this content:

```env
PORT=5000
MONGODB_URI=mongodb+srv://finaluser:YOUR_PASSWORD@cluster0.kn36sme.mongodb.net/ecommerce?retryWrites=true&w=majority
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

3. Replace `YOUR_PASSWORD` with your actual MongoDB Atlas password
4. Save the file

**Option 3: Using Command Line**

```powershell
@"
PORT=5000
MONGODB_URI=mongodb+srv://finaluser:YOUR_PASSWORD@cluster0.kn36sme.mongodb.net/ecommerce?retryWrites=true&w=majority
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
"@ | Out-File -FilePath .env -Encoding utf8
```

(Remember to replace `YOUR_PASSWORD` with your actual password)

## ✅ After Creating .env File

1. **Update the password** in `.env` file (replace `<db_password>` or `YOUR_PASSWORD`)
2. **Whitelist your IP** in MongoDB Atlas (if not already done)
3. **Start the server** again:
   ```powershell
   npm start
   ```

## 🔍 Verify .env File

Check if the file was created:

```powershell
Test-Path .env
```

Should return: `True`

View the contents:

```powershell
Get-Content .env
```

## ⚠️ Important

- The `.env` file is in `.gitignore` (won't be committed to Git)
- Keep your password secure
- Never share your `.env` file publicly

## 🎯 Next Steps

1. ✅ Create `.env` file
2. ✅ Add your MongoDB password
3. ✅ Whitelist IP in MongoDB Atlas
4. ✅ Run `npm start`
5. ✅ Run `npm run seed` to add sample data

