# E-Commerce Frontend

A modern, responsive React.js frontend for an E-Commerce application.

## Features

- 🛍️ Browse products with search functionality
- 📱 Responsive design (mobile, tablet, desktop)
- 🛒 Shopping cart management
- 🔍 Product details page
- 💫 Smooth animations and transitions
- 🎨 Clean and modern UI

## Tech Stack

- **React.js** - UI library
- **React Router** - Navigation
- **Context API** - State management
- **Axios** - HTTP client
- **CSS3** - Styling with Flexbox and Grid

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

3. Start development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── common/       # Reusable components
│   │   ├── product/      # Product components
│   │   └── cart/         # Cart components
│   ├── pages/            # Page components
│   ├── context/          # Context API
│   ├── services/         # API services
│   ├── utils/            # Utility functions
│   ├── App.jsx           # Main app component
│   └── index.js          # Entry point
└── package.json
```

## Components

### Common Components
- **Navbar** - Navigation bar with cart badge
- **Loading** - Loading spinner
- **ErrorMessage** - Error message display

### Product Components
- **ProductCard** - Product card display
- **ProductList** - Grid of product cards

### Cart Components
- **CartItem** - Individual cart item
- **CartSummary** - Cart summary and checkout

## Pages

- **HomePage** - Product listing with search
- **ProductDetailPage** - Product details and add to cart
- **CartPage** - Shopping cart management

## State Management

The application uses React Context API for cart state management:

- **CartContext** - Manages cart state, add/remove/update items
- Provides cart data to all components
- Persists cart to localStorage as fallback

## API Integration

The frontend communicates with the backend API through service functions:

- **productService** - Product API calls
- **cartService** - Cart API calls
- **api.js** - Axios instance with interceptors

### Fallback to Dummy Data

If the backend API is not available, the application uses dummy data from `utils/constants.js`. This allows the frontend to work independently during development.

## Styling

- CSS modules for component styling
- Responsive design with Flexbox and Grid
- Mobile-first approach
- Smooth transitions and animations

## Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## Environment Variables

- `REACT_APP_API_URL` - Backend API URL (default: http://localhost:5000/api)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

The application is built with Create React App. For more information, see the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

## License

MIT

