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
    // console.log("req.body =", req.body);
    // console.log("Type:", typeof req.body);
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
router.get('/:id', (req, res) => {
    const id = req.params.id;
    db.get(`SELECT * FROM reservations WHERE id = ?`, [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (!row) {
            res.status(404).json({ error: 'Réservation non trouvée' });
        } else {
            res.json(row);
        }
    });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  
  db.run('DELETE FROM reservations WHERE id = ?', [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ success: true, deleted: this.changes });  // this.changes = nombre de lignes supprimées
    }
  });
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { nom, email, telephone, date, heure, nb_personnes, commentaire } = req.body;
  
  db.run(
    `UPDATE reservations 
     SET nom = ?, email = ?, telephone = ?, date = ?, heure = ?, nb_personnes = ?, commentaire = ?
     WHERE id = ?`,
    [nom, email, telephone, date, heure, nb_personnes, commentaire, id],  // ← id à la fin !
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ success: true, updated: this.changes });
      }
    }
  );
});

module.exports = router;