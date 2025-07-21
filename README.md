# Addis Software Project

![Project Demo](https://via.placeholder.com/1200x600/007bff/ffffff?text=Addis+Software+Project+Demo)
*A sleek, full-stack web application meticulously crafted with a custom Webpack React frontend and a robust Node.js/Express backend.*

---

## 🚀 Live Demo

Experience the application in action: [https://addis-test-project-2.vercel.app/](https://addis-test-project-2.vercel.app/)

---

## 💡 Project Overview

Addis Software Project is designed to be a scalable and maintainable full-stack solution, showcasing best practices in modern web development. The frontend, powered by React and a custom Webpack configuration, delivers a highly optimized and performant user experience. The backend, built with Node.js and Express, provides a robust and efficient API for data management and business logic.

---

## 📂 Project Structure

Addis-Software-Project/
│
├── Addis-Frontend/  # ⚛️ React frontend (custom Webpack configuration)
└── Addis-Backend/   # 🌐 Node.js/Express backend


---

## 🛠️ Getting Started

Follow these simple steps to get your local development environment up and running.

### 1. Clone the Repository

Begin by cloning the project to your local machine:

```bash
git clone [https://github.com/your-username/Addis-Software-Project.git](https://github.com/your-username/Addis-Software-Project.git)
cd Addis-Software-Project
2. Setup Backend
Navigate to the Addis-Backend directory:

Bash

cd Addis-Backend
Environment Variables
Create a .env file in the Addis-Backend directory and populate it with the following environment variables.

Note: The .env file content is provided here for your convenience during setup. In a real-world scenario, sensitive information like API keys and database URIs should be handled with extreme care and never committed directly to version control.

CLOUDINARY_CLOUD_NAME=dx3d8zvcs
CLOUDINARY_API_KEY=825392158487624
CLOUDINARY_API_SECRET=xGczTl8qQqO3dmLsIC1z2mnOq4U
MONGODB_URI=mongodb+srv://loariftech:addissoftware@cluster0.nio2zql.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
PORT=8000
Install Dependencies and Start Server
Install the necessary backend dependencies and start the Node.js server:

Bash

npm install
npm start
The backend server will typically run on http://localhost:8000.

3. Setup Frontend
Open a new terminal window and navigate back to the root of the project, then into the Addis-Frontend directory:

Bash

cd ../Addis-Frontend
Environment Variables
Create a .env file in the Addis-Frontend directory with the following variable:

API_BASE_URL=http://localhost:8000/api
Install Dependencies and Start Dev Server
Install the frontend dependencies and launch the React development server:

Bash

npm install
npm start
The frontend development server will typically open your browser to http://localhost:9001.
```
📦 Webpack Configuration (Frontend)
The frontend of this project leverages a custom Webpack configuration to provide optimal performance and development experience. Here's a breakdown of its key aspects:

Entry Point: ./src/index.jsx - The main file where Webpack starts building the dependency graph.

Output: Bundled files are meticulously organized and output to the dist/ folder, ready for deployment.

Loaders
Webpack loaders enable the processing of various file types. For this project, we utilize:

babel-loader: Essential for transpiling modern JavaScript/JSX into browser-compatible JavaScript, ensuring broad compatibility.

@svgr/webpack: Transforms SVG files into ready-to-use React components, making icon management a breeze.

css-loader and style-loader: Work in tandem to process CSS files and inject them directly into the DOM, allowing for scoped and global styling.

Asset loader: Efficiently handles images, fonts, and other static assets, optimizing their delivery for the web.

Plugins
Plugins extend Webpack's capabilities for a wide range of tasks:

HtmlWebpackPlugin: Dynamically generates an index.html file and injects the bundled scripts, simplifying deployment.

dotenv-webpack: Seamlessly loads environment variables from your .env file into the frontend build, ensuring secure configuration.

Development Server
Our Webpack development server is configured for a smooth and efficient development workflow:

JavaScript

devServer: {
  static: path.join(__dirname, "public"),
  port: 9001,
  hot: true,
  open: true,
  historyApiFallback: true, // Supports SPA routing
}
Runs on port 9001: Easily accessible at http://localhost:9001.

Hot Module Replacement (HMR) enabled: Provides a super-fast development experience by updating modules in the browser without a full page refresh.

Automatically opens browser on start: Get straight to coding without manually opening your browser.

Supports SPA routing fallback: Ensures that client-side routing in React applications works flawlessly, even on direct URL access or page refreshes.

✨ Features
Custom Webpack Setup: Highly optimized and tailored build process for superior performance.

React Frontend: Modern, component-based UI for a dynamic user experience.

Node.js/Express Backend: Robust and scalable API for handling server-side logic and data.

MongoDB Integration: Flexible NoSQL database for efficient data storage.

Cloudinary Integration: Seamless image and video asset management.

Environment Variable Management: Secure handling of sensitive data.

Hot Module Replacement: Rapid development feedback loop.

SPA Routing: Smooth navigation within the application.
