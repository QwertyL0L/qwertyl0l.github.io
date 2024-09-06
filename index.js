const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Function to get a random fact
async function getRandFact() {
    const url = "https://uselessfacts.jsph.pl/random.json?language=en";
    try {
        const response = await fetch(url);
        const factData = await response.json();
        return factData.text;
    } catch (error) {
        console.error('Error fetching fact:', error);
        return "Failed to retrieve a useless fact.";
    }
}

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'simple_home.html'));
});

app.get('/home', (req, res) => {
    res.redirect('/');
});

app.get('/robux', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'robux.html'));
});

app.get('/snake', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'SNAKE.html'));
});

app.get('/about', async (req, res) => {
    const fact = await getRandFact();
    res.render('about.html', { fact });  // You may need a template engine like EJS for this part
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

app.get('/discord', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'discord.html'));
});

app.get('/bot', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'bot.html'));
});

// 404 handler
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
