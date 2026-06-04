const matches = [
    { id: 1, teamA: "Mexique", teamB: "Afrique du Sud", codeA: "mx", codeB: "za", date: "11 Juin 2026", time: "18:00", venue: "Estadio Azteca", city: "Mexico City", price: 200 },
    { id: 2, teamA: "États-Unis", teamB: "Paraguay", codeA: "us", codeB: "py", date: "12 Juin 2026", time: "20:00", venue: "SoFi Stadium", city: "Los Angeles", price: 250 },
    { id: 3, teamA: "Canada", teamB: "Bosnie", codeA: "ca", codeB: "ba", date: "12 Juin 2026", time: "17:00", venue: "BMO Field", city: "Toronto", price: 180 },
    { id: 4, teamA: "Brésil", teamB: "Maroc", codeA: "br", codeB: "ma", date: "13 Juin 2026", time: "19:30", venue: "MetLife Stadium", city: "New York/NJ", price: 300 },
    { id: 5, teamA: "France", teamB: "Sénégal", codeA: "fr", codeB: "sn", date: "18 Juin 2026", time: "21:00", venue: "Mercedes-Benz Stadium", city: "Atlanta", price: 280 },
    { id: 6, teamA: "Finale", teamB: "TBD", codeA: "un", codeB: "un", date: "19 Juillet 2026", time: "15:00", venue: "MetLife Stadium", city: "New York/NJ", price: 1500 }
];

const stadiums = [
    { name: "MetLife Stadium", city: "New York/NJ", image: "https://images.unsplash.com/photo-1517262330716-58340d895397?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { name: "SoFi Stadium", city: "Los Angeles", image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { name: "Estadio Azteca", city: "Mexico City", image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }
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
            <p style="font-size: 0.8rem; margin-top: 10px; color: #666;">Marchand : <strong>${DESTINATION_NUMBER}</strong></p>
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
        alert("Envoi de " + item.finalPrice + "$ vers " + DESTINATION_NUMBER + "...\nConfirmez sur votre téléphone.");
    }

    // Succès simulé et téléchargement du billet
    setTimeout(() => {
        generatePDFTicket(item);
        alert("Paiement réussi ! Votre billet PDF a été généré et téléchargé.");
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

    // Design du billet
    doc.setFillColor(0, 27, 72); // Bleu FIFA
    doc.rect(0, 0, 200, 25, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.text("FIFA WORLD CUP 2026 OFFICIAL TICKET", 10, 15);
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(22);
    doc.text(`${item.teamA} VS ${item.teamB}`, 10, 45);
    
    doc.setFontSize(12);
    doc.text(`DATE: ${item.date}`, 10, 60);
    doc.text(`HEURE: ${item.time}`, 10, 70);
    doc.text(`STADE: ${item.venue}`, 10, 80);
    doc.text(`VILLE: ${item.city}`, 10, 90);
    
    doc.setDrawColor(200, 157, 60); // Or FIFA
    doc.setLineWidth(1);
    doc.line(140, 30, 140, 90);
    
    doc.setFontSize(14);
    doc.text("CATÉGORIE", 150, 45);
    doc.setFontSize(18);
    doc.setTextColor(209, 18, 66);
    doc.text(item.category, 150, 55);
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.text("TICKET ID: " + Math.random().toString(36).substr(2, 9).toUpperCase(), 150, 85);

    doc.save(`Ticket_WC2026_${item.teamA}_${item.category}.pdf`);
}
