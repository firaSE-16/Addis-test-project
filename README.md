# Addis Software Project

A full-stack web application built with a custom Webpack React frontend and a Node.js backend. This project is currently live at [https://addis-test-project-2.vercel.app/](https://addis-test-project-2.vercel.app/)

---

## 🌐 Live Demo

👉 [Visit the Live Site](https://addis-test-project-2.vercel.app/)

---

## 📁 Project Structure

# Addis-Software-Project/
│
├── Addis-Frontend/ → Frontend built with React, Webpack
└── Addis-Backend/ → Backend built with Node.js/Express

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/Addis-Software-Project.git
cd Addis-Software-Project
cd Addis-Backend
```
.env ```CLOUDINARY_CLOUD_NAME=dx3d8zvcs
CLOUDINARY_API_KEY=825392158487624
CLOUDINARY_API_SECRET=xGczTl8qQqO3dmLsIC1z2mnOq4U
PORT=8000
MONGODB_URI=mongodb+srv://loariftech:addissoftware@cluster0.nio2zql.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
PORT=8000```

npm install  
npm start 
```bash
cd ../Addis-Frontend ```
.env ```
API_BASE_URL=http://localhost:8000/api


⚙️ Webpack Configuration (Frontend)
The project uses a custom Webpack configuration to bundle React and other frontend assets.

Key Features:
Entry Point: ./src/index.jsx

Output: Bundled files output to dist/ folder

Loaders:

babel-loader: Transpile JS/JSX

@svgr/webpack: Load SVGs as React components

css-loader, style-loader: Handle CSS

Asset loader for images

Plugins:

HtmlWebpackPlugin: Inject scripts into index.html

dotenv-webpack: Load environment variables from .env

Dev Server:

Port: 9001

Hot reload

Supports SPA routing with historyApiFallback

js
Copy
Edit
devServer: {
  static: path.join(__dirname, "public"),
  port: 9001,
  hot: true,
  open: true,
  historyApiFallback: true,
}


