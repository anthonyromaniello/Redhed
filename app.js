const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware for parsing JSON (for API routes like /reserve)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (CSS, JS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/index', (req, res) => {
    res.render('index');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/news', (req, res) => {
    res.render('news');
});

app.get('/merch', (req, res) => {
    res.render('merch');
});

// Serve Posts.json for the news page
app.get('/data/Posts.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'data', 'Posts.json'));
});

// API route for merchandise reservation (if you implement backend)
app.post('/reserve', (req, res) => {
    const { customerId, merchId } = req.body;
    // TODO: Add database logic here to save the reservation
    console.log(`Reservation request: Customer ${customerId}, Merch ${merchId}`);
    res.json({ message: 'Reservation received! (Backend not yet implemented)' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});