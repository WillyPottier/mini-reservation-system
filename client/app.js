const API_URL = 'http://localhost:3000/api/reservations';

// Récupérer le formulaire
const form = document.getElementById('reservation-form');
const messageDiv = document.getElementById('message');
const reservationsList = document.getElementById('reservations-list');

// Charger les réservations au démarrage
document.addEventListener('DOMContentLoaded', () => {
  loadReservations();
});

// Soumettre le formulaire
form.addEventListener('submit', async (e) => {
  e.preventDefault(); // Empêche le rechargement de la page
  
  // Récupérer les données du formulaire
  const reservation = {
    nom: document.getElementById('nom').value,
    email: document.getElementById('email').value,
    telephone: document.getElementById('telephone').value,
    date: document.getElementById('date').value,
    heure: document.getElementById('heure').value,
    nb_personnes: parseInt(document.getElementById('nb_personnes').value),
    commentaire: document.getElementById('commentaire').value
  };
  
  try {
    // Envoyer la requête POST à l'API
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reservation)
    });
    
    const data = await response.json();
    
    if (response.ok) {
      // Succès
      showMessage('Réservation créée avec succès !', 'success');
      form.reset(); // Vider le formulaire
      loadReservations(); // Recharger la liste
    } else {
      // Erreur de validation
      showMessage('Erreur : ' + (data.errors ? data.errors.join(', ') : data.error), 'error');
    }
  } catch (error) {
    showMessage('Erreur de connexion au serveur', 'error');
    console.error(error);
  }
});

// Charger toutes les réservations
async function loadReservations() {
  try {
    const response = await fetch(API_URL);
    const reservations = await response.json();
    
    // Afficher les réservations
    displayReservations(reservations);
  } catch (error) {
    console.error('Erreur chargement réservations:', error);
  }
}

// Afficher les réservations
function displayReservations(reservations) {
  if (reservations.length === 0) {
    reservationsList.innerHTML = '<p>Aucune réservation pour le moment.</p>';
    return;
  }
  
  reservationsList.innerHTML = reservations.map(res => `
    <div class="reservation-card">
      <h3>${res.nom}</h3>
      <p><strong>Email:</strong> ${res.email}</p>
      <p><strong>Téléphone:</strong> ${res.telephone || 'Non renseigné'}</p>
      <p><strong>Date:</strong> ${res.date} à ${res.heure}</p>
      <p><strong>Nombre de personnes:</strong> ${res.nb_personnes}</p>
      ${res.commentaire ? `<p><strong>Commentaire:</strong> ${res.commentaire}</p>` : ''}
      <div class="reservation-actions">
        <button class="btn-delete" onclick="deleteReservation(${res.id})">Supprimer</button>
      </div>
    </div>
  `).join('');
}

// Supprimer une réservation
async function deleteReservation(id) {
  if (!confirm('Êtes-vous sûr de vouloir supprimer cette réservation ?')) {
    return;
  }
  
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
    
    if (response.ok) {
      showMessage('Réservation supprimée avec succès !', 'success');
      loadReservations(); // Recharger la liste
    } else {
      showMessage('Erreur lors de la suppression', 'error');
    }
  } catch (error) {
    showMessage('Erreur de connexion au serveur', 'error');
    console.error(error);
  }
}

// Afficher un message
function showMessage(text, type) {
  messageDiv.textContent = text;
  messageDiv.className = type;
  
  // Masquer après 5 secondes
  setTimeout(() => {
    messageDiv.style.display = 'none';
  }, 5000);
}