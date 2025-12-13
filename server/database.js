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
                console.error("Erreur création table:", err.message);
            } else {
                console.log("Table 'reservations' créée");

                insertTestData();
            }
        })
    }
});

function insertTestData() {
    db.get('SELECT COUNT(*) as count FROM reservations', (err, row) => {
        if (err) {
            console.error("Erreur de vérification:", err.message);
        } else if (row.count === 0) {
            console.log("Insertion des données de test...");

            const testReservations = [
                //faut mettre les données de test ici.
                ['Willy Pottier', 'willy@test.com', '0612345678', '2024-12-20', '19:00', 2, 'Table près de la fenêtre'],
                ['Lorline Niles', 'lorline@test.com', '0698765432', '2024-12-21', '20:00', 4, 'Anniversaire'],
                ['Sophie Martin', 'sophie@test.com', '0645678901', '2024-12-22', '19:30', 3, 'Menu végétarien']
            ];

            const insertSQL = `
            INSERT INTO reservations (nom, email, telephone, date, heure, nb_personnes, commentaire)
            VALUES (?, ?, ?, ?, ?, ?, ?)`; //faut créer la requête SQL pour insérer les données ici.

            testReservations.forEach((reservation, index) => {
                db.run(insertSQL, reservation, (err) => {//faut faire un callback apparemment.
                    if (err) {
                        console.error(`Erreur insertion réservation ${index + 1}:`, err.message)
                    } else {
                        console.log(`Réservation ${index + 1} insérée`)
                    }
                });
            });
        } else {
            console.log(`Table déjà remplie (${row.count} réservations)`)
        }
    })
}

module.exports = db;