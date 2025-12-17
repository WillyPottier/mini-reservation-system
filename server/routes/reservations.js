const express = require('express');
const db = require('../database.js');
const router = express.Router();

// Récupérer toutes les réservations
router.get('/', (req, res) => {
    db.all('SELECT * FROM reservations', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

// Créer une nouvelle réservation
router.post('/', (req, res) => {
    const { nom, email, telephone, date, heure, nb_personnes, commentaire } = req.body;
    db.run(`INSERT INTO reservations (nom, email, telephone, date, heure, nb_personnes, commentaire) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [nom, email, telephone, date, heure, nb_personnes, commentaire],
        function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ success: true, id: this.lastID });
        }
    });
});

// Récupérer une réservation
// router.get('/:id', (req, res) => {
//     const id = req.params.id;
//     db.get(`SELECT * FROM reservations WHERE id = ?`, [id], (err, row) => {
//         if (row) {
//             res.status('reservations')
//         } else {
            
//         }
//     })
// })

module.exports = router;