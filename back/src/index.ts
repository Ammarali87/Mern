import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Simple route to check the server
app.get('/', (req: Request, res: Response) => {
  res.send('i hate node js dame  !');
});

 // A more complex route
app.get('/kofta', (req: Request, res: Response) => {
  const name = req.query.name || 'Stranger';
  res.json({ message: `Hello, ${name}!` });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
