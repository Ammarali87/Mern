import express from 'express';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running Kofta...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// commit and push vs commit and sync