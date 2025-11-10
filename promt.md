PROMPTS
1) You are an expert full-stack architect. Design a complete technical architecture for a modern E-Commerce web application that enables users to explore products, view product details, and manage a shopping cart.
Use the following stack:
•	Frontend: React.js with React Router for navigation
•	Backend: Node.js with Express.js
•	Database: MongoDB Atlas
Include:
1.	High-level system architecture (frontend, backend, database, and API flow)
2.	Folder structure for both frontend and backend
3.	API design (endpoints, methods, and data schemas)
4.	Basic authentication and state management plan
5.	Deployment suggestions (like Render, Vercel, or Netlify + MongoDB Atlas)


2) Now let’s start with the React.js frontend.
I want three main pages — Home (product listing), Product Details, and Cart.
Use React Router and functional components only
Frontend:
•  Browse a list of products
•  Click to view individual product details
•  Add/remove products from the shopping cart
•  View the cart summary and total price

3) Can you give me sample dummy JSON data for products with fields like id, title, price, image, and description?”
4)“Add minimal but modern CSS styling using Flexbox or Grid — keep it responsive.”
5)“Include the cart logic using React Context API — I want to see add/remove functionality working.”
6) Now, I need a backend for the same E-Commerce app.
Create an Express server that connects to MongoDB Atlas.
Routes: /api/products, /api/products/:id, /api/cart, and /api/cart/:id.
7) Can you also include .env file setup for the MongoDB URL and API base URL?
8) Help me connect the React frontend with the Node backend.
I’ll use Axios for API calls. Please show how to fetch all products and display them on the homepage.
9)I have attached the image which shows the error while executing. Go through it and check where the error occurred and solve/fix the error. 
10) Now that both are connected, give me the npm scripts to run both backend and frontend together using concurrently.
11) Can you guide me on implementing a simple search bar that filters products dynamically in React using a useState hook?

