
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
// Middleware to parse JSON bodies
app.use(express_1.default.json());
// Simple route to check the server
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
// A more complex route
app.get('/api/greet', (req, res) => {
    const name = req.query.name || 'Stranger';
    res.json({ message: `Hello, ${name}!` });
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
