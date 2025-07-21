const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); 
const albumRoutes = require('./routes/albumRoutes'); 
const songRoutes = require('./routes/songRoutes'); 

dotenv.config();
connectDB(); 

const app = express();

const corsOptions = {
  origin: ['https://addis-test-project-phi.vercel.app/'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, 
};
app.use(cors(corsOptions)); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use('/api', albumRoutes); 
app.use('/api', songRoutes); 

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

