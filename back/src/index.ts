import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

// Middleware to enable CORS
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from the frontend
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Simple route to check the server
app.get('/', (req: Request, res: Response) => {
  res.send('I hate Node.js, damn it!');
});

// More complex API route
app.get('/api/greet', (req: Request, res: Response) => {
  const name = req.query.name || 'Stranger';
  res.json({ message: `Hello, ${name}!` });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
