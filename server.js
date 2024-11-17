const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(bodyParser.json());

// Serve static files (e.g., your HTML and JavaScript)
app.use(express.static('public'));

// API endpoint to save email
app.post('/save-email', (req, res) => {
    const email = req.body.email;

    if (email) {
        // Append email to the file
        fs.appendFile('emails.txt', email + '\n', (err) => {
            if (err) {
                console.error('Error writing to file', err);
                return res.status(500).send('Error saving email');
            }
            res.send('Email saved successfully');
        });
    } else {
        res.status(400).send('No email provided');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
