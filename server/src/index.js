import express from 'express' 
import dotenv from 'dotenv'
import { connectDB } from './lib/db.js'
import authRoutes from './routes/auth.route.js'
import pagesRoutes from './routes/pages.route.js'
import documentRoutes from './routes/document.route.js'
import cookieParser from 'cookie-parser'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express();
dotenv.config();

const PORT = process.env.PORT || 1000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "../public/pages/Main/index.html"));
});
app.use('/api/auth', authRoutes);
app.use('/api/pages', pagesRoutes);
app.use('/api/docs', documentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
