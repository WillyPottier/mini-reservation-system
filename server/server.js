const express = require('express');
const cors = require('cors');
const db = require('./database.js');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'API Réservations - Serveur OK',
        status: 'running'
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});