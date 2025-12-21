// Middleware de validation pour réservations

function validateReservation(req, res, next) {
    const { nom, email, date, heure, nb_personnes } = req.body;
    const errors = [];

    //Champs obligatoires
    if (!nom) errors.push ("Nom obligatoire");
    if (!email) errors.push ("Email obligatoire");
    if (!date) errors.push ("Date obligatoire");
    if (!heure) errors.push ("Heure obligatoire");
    if (!nb_personnes) errors.push ("Nombre de personnes obligatoire");

    //Format email
    if (email && !email.includes("@")) {
        errors.push("Email invalide");
    };

    //Nombre de personnes
    if (nb_personnes < 1 || nb_personnes > 10) {
        errors.push("Nombre de personnes entre 1 et 10");
    };

    //S'il y a des erreurs
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    };

    //Tout est ok
    next();
}

module.exports = { validateReservation };