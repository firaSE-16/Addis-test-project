Addis Software Project
A full-stack web application built with a custom Webpack React frontend and a Node.js/Express backend.

Live Demo: https://addis-test-project-2.vercel.app/

Project Structure

Addis-Software-Project/
│
├── Addis-Frontend/  # React frontend (custom Webpack)
└── Addis-Backend/   # Node.js/Express backend
Getting Started
1. Clone the repository

git clone https://github.com/your-username/Addis-Software-Project.git
cd Addis-Software-Project
2. Setup Backend

cd Addis-Backend

I am sharing the .env file content here only to save your time during this project’s setup process. This is not a usual practice for me, and I do it here solely to make things easier and faster for you, not because I am careless or lazy.

Create a .env file with the following environment variables:

CLOUDINARY_CLOUD_NAME=dx3d8zvcs
CLOUDINARY_API_KEY=825392158487624
CLOUDINARY_API_SECRET=xGczTl8qQqO3dmLsIC1z2mnOq4U
MONGODB_URI=mongodb+srv://loariftech:addissoftware@cluster0.nio2zql.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
PORT=8000
Install dependencies and start the backend server:


npm install
npm start
3. Setup Frontend
Open a new terminal and run:


cd ../Addis-Frontend
Create a .env file with:


API_BASE_URL=http://localhost:8000/api
Install dependencies and start the frontend dev server:


npm install
npm start
Webpack Configuration (Frontend)
Entry Point: ./src/index.jsx

Output: Bundled files output to dist/ folder

Loaders:
babel-loader: Transpiles JS/JSX to browser-compatible JavaScript

@svgr/webpack: Imports SVGs as React components

css-loader and style-loader: Process and inject CSS styles

Asset loader: Handles images and other static assets

Plugins:
HtmlWebpackPlugin: Injects bundled scripts into index.html

dotenv-webpack: Loads environment variables from .env into the frontend build

Dev Server:
js
Copy
Edit
devServer: {
  static: path.join(__dirname, "public"),
  port: 9001,
  hot: true,
  open: true,
  historyApiFallback: true, // Supports SPA routing
}
Runs on port 9001

Hot Module Replacement enabled for faster development

Automatically opens browser on start

Supports SPA routing fallback

