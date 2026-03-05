import express from 'express';
import cors from 'cors';
import { PORT } from './config/server.js';
import moviesRouter from './routes/moviesRouter.js';
import seatsRouter from './routes/seatsRouter.js';
import purchasesRouter from './routes/purchasesRouter.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.use('/api/movies', moviesRouter);
app.use('/api/seats', seatsRouter);
app.use('/api/purchases', purchasesRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
