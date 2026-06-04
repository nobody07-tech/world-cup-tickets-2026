const matches = [
    { id: 1, teamA: "États-Unis", teamB: "TBD", date: "12 Juin 2026", venue: "SoFi Stadium", city: "Los Angeles", price: 250 },
    { id: 2, teamA: "Brésil", teamB: "TBD", date: "15 Juin 2026", venue: "Hard Rock Stadium", city: "Miami", price: 300 },
    { id: 3, teamA: "France", teamB: "TBD", date: "18 Juin 2026", venue: "MetLife Stadium", city: "New York/NJ", price: 280 },
    { id: 4, teamA: "Argentine", teamB: "TBD", date: "20 Juin 2026", venue: "AT&T Stadium", city: "Dallas", price: 350 },
    { id: 5, teamA: "Mexique", teamB: "TBD", date: "11 Juin 2026", venue: "Estadio Azteca", city: "Mexico City", price: 200 },
    { id: 6, teamA: "Finale", teamB: "TBD", date: "19 Juillet 2026", venue: "MetLife Stadium", city: "New York/NJ", price: 1500 }
];

let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    displayMatches(matches);

    // Filter Search
    const searchInput = document.getElementById('search-city');
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = matches.filter(m => m.city.toLowerCase().includes(term));
        displayMatches(filtered);
    });

    // Payment Tabs
    const btnOrange = document.getElementById('pay-orange');
    const btnCard = document.getElementById('pay-card');
    const formOrange = document.getElementById('orange-form');
    const formCard = document.getElementById('card-form');

    btnOrange.addEventListener('click', () => {
        btnOrange.classList.add('active');
        btnCard.classList.remove('active');
        formOrange.classList.remove('hidden');
        formCard.classList.add('hidden');
    });

    btnCard.addEventListener('click', () => {
        btnCard.classList.add('active');
        btnOrange.classList.remove('active');
        formCard.classList.remove('hidden');
        formOrange.classList.add('hidden');
    });

    // Close Modal
    document.querySelector('.close-modal').onclick = () => {
        document.getElementById('payment-modal').style.display = 'none';
    };
});

function displayMatches(matchesToDisplay) {
    const grid = document.getElementById('match-grid');
    grid.innerHTML = '';

    matchesToDisplay.forEach(match => {
        const card = document.createElement('div');
        card.className = 'match-card';
        card.innerHTML = `
            <div class="match-header">${match.date}</div>
            <div class="match-body">
                <div class="teams">${match.teamA} vs ${match.teamB}</div>
                <div class="venue-info">${match.venue}, ${match.city}</div>
                <div class="price-tag">${match.price} $</div>
                <button class="btn-book" onclick="addToCart(${match.id})">Réserver mon billet</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function addToCart(matchId) {
    const match = matches.find(m => m.id === matchId);
    cart = [match]; // Simplement un billet à la fois pour cette version
    updateCartUI();
    openPaymentModal();
}

function updateCartUI() {
    document.getElementById('cart-count').innerText = cart.length;
}

function openPaymentModal() {
    const modal = document.getElementById('payment-modal');
    const summary = document.getElementById('order-summary');
    const item = cart[0];
    
    summary.innerHTML = `
        <div style="background: #f0f0f0; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
            <p><strong>Match:</strong> ${item.teamA} vs ${item.teamB}</p>
            <p><strong>Lieu:</strong> ${item.city}</p>
            <p><strong>Total:</strong> <span style="color: #d11242; font-weight: bold;">${item.price} $</span></p>
        </div>
    `;
    
    modal.style.display = 'block';
}

function processPayment(method) {
    if (method === 'orange') {
        const phone = document.getElementById('orange-phone').value;
        if (!phone) {
            alert("Veuillez entrer votre numéro Orange Money.");
            return;
        }
        alert("Demande de paiement envoyée sur votre téléphone Orange Money (" + phone + "). Veuillez confirmer avec votre code secret.");
    } else {
        alert("Paiement par carte validé. Merci pour votre achat !");
    }
    
    // Reset
    document.getElementById('payment-modal').style.display = 'none';
    cart = [];
    updateCartUI();
    
    // Simulate Confirmation
    setTimeout(() => {
        alert("Félicitations ! Vos billets pour le match " + cart[0]?.teamA || "sélectionné" + " vous ont été envoyés par email.");
    }, 2000);
}
