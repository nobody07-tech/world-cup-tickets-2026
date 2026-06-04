const matches = [
    { id: 1, teamA: "Mexique", teamB: "Afrique du Sud", codeA: "mx", codeB: "za", date: "11 Juin 2026", venue: "Estadio Azteca", city: "Mexico City", price: 200 },
    { id: 2, teamA: "États-Unis", teamB: "Paraguay", codeA: "us", codeB: "py", date: "12 Juin 2026", venue: "SoFi Stadium", city: "Los Angeles", price: 250 },
    { id: 3, teamA: "Canada", teamB: "Bosnie", codeA: "ca", codeB: "ba", date: "12 Juin 2026", venue: "BMO Field", city: "Toronto", price: 180 },
    { id: 4, teamA: "Brésil", teamB: "Maroc", codeA: "br", codeB: "ma", date: "13 Juin 2026", venue: "MetLife Stadium", city: "New York/NJ", price: 300 },
    { id: 5, teamA: "France", teamB: "Qualifié", codeA: "fr", codeB: "un", date: "18 Juin 2026", venue: "Mercedes-Benz Stadium", city: "Atlanta", price: 280 },
    { id: 6, teamA: "Finale", teamB: "TBD", codeA: "un", codeB: "un", date: "19 Juillet 2026", venue: "MetLife Stadium", city: "New York/NJ", price: 1500 }
];

let cart = [];
const DESTINATION_NUMBER = "655043923";

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
        const flagA = match.codeA !== 'un' ? `https://flagcdn.com/w40/${match.codeA}.png` : 'https://flagcdn.com/w40/un.png';
        const flagB = match.codeB !== 'un' ? `https://flagcdn.com/w40/${match.codeB}.png` : 'https://flagcdn.com/w40/un.png';

        const card = document.createElement('div');
        card.className = 'match-card';
        card.innerHTML = `
            <div class="match-header">${match.date}</div>
            <div class="match-body">
                <div class="teams">
                    <div class="team">
                        <img src="${flagA}" alt="${match.teamA}" class="flag-img">
                        <span>${match.teamA}</span>
                    </div>
                    <span class="vs">vs</span>
                    <div class="team">
                        <img src="${flagB}" alt="${match.teamB}" class="flag-img">
                        <span>${match.teamB}</span>
                    </div>
                </div>
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
    cart = [match];
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
            <p style="font-size: 0.8rem; margin-top: 10px; color: #666;">Transfert vers le compte marchand : <strong>${DESTINATION_NUMBER}</strong></p>
        </div>
    `;
    
    modal.style.display = 'block';
}

function processPayment(method) {
    const item = cart[0];
    if (method === 'orange') {
        const phone = document.getElementById('orange-phone').value;
        if (!phone) {
            alert("Veuillez entrer votre numéro Orange Money.");
            return;
        }
        alert("INFO : Veuillez envoyer le montant de " + item.price + "$ au numéro marchand " + DESTINATION_NUMBER + ".\n\nUne demande de confirmation Push sera envoyée au " + phone + ".");
    } else {
        alert("Paiement par carte en cours de traitement... Validé !");
    }
    
    // Simuler le succès
    setTimeout(() => {
        alert("Succès ! Votre billet pour " + item.teamA + " vs " + item.teamB + " a été validé. Vous recevrez un SMS de confirmation sous peu.");
        document.getElementById('payment-modal').style.display = 'none';
        cart = [];
        updateCartUI();
    }, 1500);
}
