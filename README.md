Sure! Here's your complete, polished **README.md** file formatted properly for easy reading and use:

---

# Addis Software Project

A full-stack web application built with a custom Webpack React frontend and a Node.js/Express backend.

**Live Demo:** [https://addis-test-project-2.vercel.app/](https://addis-test-project-2.vercel.app/)

---

## Project Structure

```
Addis-Software-Project/
│
├── Addis-Frontend/  # React frontend (custom Webpack)
└── Addis-Backend/   # Node.js/Express backend
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/firaSE-15/Addis-test-project.git
cd Addis-Software-Project
```

### 2. Setup Backend

```bash
cd Addis-Backend
```

I am sharing the `.env` file content here only to save your time during this project’s setup process. This is not a usual practice for me, and I do it here solely to make things easier and faster for you, not because I am careless or lazy.

Create a `.env` file with the following environment variables:

```
CLOUDINARY_CLOUD_NAME=dx3d8zvcs
CLOUDINARY_API_KEY=825392158487624
CLOUDINARY_API_SECRET=xGczTl8qQqO3dmLsIC1z2mnOq4U
MONGODB_URI=mongodb+srv://loariftech:addissoftware@cluster0.nio2zql.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
PORT=8000
```

Install dependencies and start the backend server:

```bash
npm install
npm start
```

---

### 3. Setup Frontend

Open a new terminal and run:

```bash
cd ../Addis-Frontend
```

Create a `.env` file with:

```
API_BASE_URL=http://localhost:8000/api
```

Install dependencies and start the frontend dev server:

```bash
npm install
npm start
```

---

## Webpack Configuration (Frontend)

* **Entry Point:** `./src/index.jsx`
* **Output:** Bundled files output to `dist/` folder

### Loaders:

* `babel-loader`: Transpiles JS/JSX to browser-compatible JavaScript
* `@svgr/webpack`: Imports SVGs as React components
* `css-loader` and `style-loader`: Process and inject CSS styles
* Asset loader: Handles images and other static assets

### Plugins:

* `HtmlWebpackPlugin`: Injects bundled scripts into `index.html`
* `dotenv-webpack`: Loads environment variables from `.env` into the frontend build

### Dev Server:

```js
devServer: {
  static: path.join(__dirname, "public"),
  port: 9001,
  hot: true,
  open: true,
  historyApiFallback: true, // Supports SPA routing fallback
}
```

* Runs on port **9001**
* Hot Module Replacement enabled for faster development
* Automatically opens browser on start
* Supports SPA routing fallback for React Router or similar

---

## Frontend Testing

### What’s Included

- **Unit and Component Tests:**  
  Two real unit/component tests were added for the React frontend using **Jest** and **React Testing Library**:
  - `src/__tests__/album.test.jsx`: Tests that the Album component renders the album title and artist.
  - `src/__tests__/song.test.jsx`: Tests that the Song component renders the song title and the "Duration:" label.

- **Test Organization:**  
  All test files are located in `src/__tests__/` for easy management and discovery.

- **Jest Configuration:**  
  - Static assets (images, etc.) are mocked for compatibility.
  - The test environment is set to `jsdom` for React DOM support.
  - React Router context is provided in tests using `<MemoryRouter>`.

### How to Run the Tests

1. **Install dependencies** (if you haven’t already):

   ```bash
   cd Addis-Frontend
   npm install
   ```

2. **Run the tests:**

   ```bash
   npm test
   ```

   This will run all tests in the `src/__tests__/` directory using Jest.





---


