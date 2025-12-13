const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./server/database.db', (err) => {
    if (err) {
        console.error("Erreur de connexion:", err.message);
    } else {
        console.log("Connecté à la base de données");

        // Création de la table
        const createTableSQL = `
        CREATE TABLE IF NOT EXISTS reservations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nom TEXT NOT NULL,
        email TEXT NOT NULL,
        telephone TEXT,
        date TEXT NOT NULL,
        heure TEXT NOT NULL,
        nb_personnes INTEGER NOT NULL,
        commentaire TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
        `;

        db.run(createTableSQL, (err) => {
            if (err) {
                console.error("Erreur création table:", err.message)
            } else {
                console.log("Table 'reservations' créée")
            }
        })
    }
});



module.exports = db;