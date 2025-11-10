# Create .env File

## Quick Setup

1. **Create a new file** named `.env` in the `backend` directory

2. **Copy and paste** the following content:

```env
PORT=5000
MONGODB_URI=mongodb+srv://finaluser:YOUR_PASSWORD@cluster0.kn36sme.mongodb.net/ecommerce?retryWrites=true&w=majority
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

3. **Replace `YOUR_PASSWORD`** with your actual MongoDB Atlas database password

4. **Save the file**

## Important Notes

- ⚠️ **Never commit `.env` file to Git** - It's already in `.gitignore`
- 🔒 **Keep your password secure** - Don't share it publicly
- 📝 **Database name is `ecommerce`** - You can change it if needed
- 🔑 **Password is case-sensitive** - Make sure it matches exactly

## Example

If your password is `MySecurePassword123!`, your `.env` file should look like:

```env
PORT=5000
MONGODB_URI=mongodb+srv://finaluser:MySecurePassword123!@cluster0.kn36sme.mongodb.net/ecommerce?retryWrites=true&w=majority
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

## Next Steps

After creating the `.env` file:

1. Make sure MongoDB Atlas IP whitelist includes your IP (or `0.0.0.0/0` for development)
2. Start the server: `npm start`
3. Seed sample data: `npm run seed`

## Troubleshooting

If you get connection errors:
- Double-check your password
- Verify the connection string format
- Check MongoDB Atlas network access settings
- See `MONGODB_SETUP.md` for detailed instructions

