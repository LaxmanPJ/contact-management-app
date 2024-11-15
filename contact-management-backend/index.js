const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000',
}));

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'contact_management'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

// Routes

// Create a new contact
app.post('/contacts', (req, res) => {
    const { firstName, lastName, email, phone, company, jobTitle } = req.body;
    const sql = 'INSERT INTO contacts (firstName, lastName, email, phone, company, jobTitle) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [firstName, lastName, email, phone, company, jobTitle], (err, result) => {
        if (err) throw err;
        res.send({ message: 'Contact added', contactId: result.insertId });
    });
});

// Get all contacts
app.get('/contacts', (req, res) => {
    const sql = 'SELECT * FROM contacts';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Update a contact
app.put('/contacts/:id', (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, phone, company, jobTitle } = req.body;
    const sql = 'UPDATE contacts SET firstName = ?, lastName = ?, email = ?, phone = ?, company = ?, jobTitle = ? WHERE id = ?';
    db.query(sql, [firstName, lastName, email, phone, company, jobTitle, id], (err, result) => {
        if (err) throw err;
        res.send({ message: 'Contact updated' });
    });
});

// Delete a contact
app.delete('/contacts/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM contacts WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.send({ message: 'Contact deleted' });
    });
});

// Start server
app.listen(5000, () => {
    console.log('Server started on port 5000');
});