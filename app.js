import express from 'express';
import morgan from 'morgan';
import cors from 'cors'

import indexRoutes from "./routes/index.js"
import productsRoutes from "./routes/products.js"
import storagesRoutes from "./routes/storage.js"
import authRoutes from "./routes/auth.js"


const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


//routes
app.use(indexRoutes);
app.use(productsRoutes);
app.use(storagesRoutes);
app.use(authRoutes);


export default app;