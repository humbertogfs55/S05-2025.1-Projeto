document.addEventListener('DOMContentLoaded', () => {
    const settingsIcon = document.getElementById('settingsIcon');
    const themeDialog = document.getElementById('themeDialog');
    const closeDialog = document.getElementById('closeDialog');
    const lightModeButton = document.getElementById('lightModeButton');
    const darkModeButton = document.getElementById('darkModeButton');

    settingsIcon.addEventListener('click', () => {
        themeDialog.showModal();
    });

    closeDialog.addEventListener('click', () => {
        themeDialog.close();
    });

    lightModeButton.addEventListener('click', () => {
        document.body.setAttribute("data-theme", "light");
        themeDialog.close();
    });

    darkModeButton.addEventListener('click', () => {
        document.body.setAttribute("data-theme", "dark");
        themeDialog.close();
    });
});

const events = [
    {
        id: 1,
        title: 'Semana do Software 2025',
        date: '12/05',
        time: '10:00',
        location: 'Salão de Eventos',
        type: 'tech',
        description: 'Uma semana inteira dedicada à tecnologia e inovação, com palestras, workshops e hackathons.',
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800&h=400'
    },
    {
        id: 2,
        title: 'Workshop de IoT',
        date: '12/01',
        time: '08:00',
        location: 'Laboratório CS&I',
        type: 'tech',
        description: 'Workshop prático sobre Internet das Coisas e suas aplicações na indústria 4.0.',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800&h=400'
    },
    {
        id: 3,
        title: 'Festa dos Alunos 2025',
        date: '18/05',
        time: '19:00',
        location: 'Área Esportiva do Inatel',
        type: 'cultural',
        description: 'Venha comemorar a melhor Festa dos Alunos de todos os tempos!',
        image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800&h=400'
    },
    {
        id: 4,
        title: 'Feira de Oportunidades',
        date: '04/05',
        time: '10:00',
        location: 'Salão de Eventos',
        type: 'academic',
        description: 'Venha conhecer empresas e projetos com destaque na área da engenharia.',
        image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800&h=400'
    }
];
const carousel = document.querySelector('.carousel');
let index = 0;
let autoSlide;

//dinamic add event cards to news
function populateCarousel() {
    if (!carousel) return;

    events.forEach(event => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${event.image}" alt="${event.title}">
            <div class="info">
                <h3>${event.title}</h3>
                <p>${event.description}</p>
                <p>
                    <span class="material-symbols-outlined icon">event</span> ${event.date} às ${event.time} 
                    <span class="material-symbols-outlined icon">pin_drop</span> ${event.location}
                </p>
            </div>
        `;

        card.addEventListener("mouseenter", pauseAutoSlide);
        card.addEventListener("mouseleave", resetAutoSlide);
        carousel.appendChild(card);
    });
    startAutoSlide();
}

// Controle do carrossel
function nextCard() {
    index = (index + 1) % events.length;
    updateCarousel();
    resetAutoSlide();
}

function prevCard() {
    index = (index - 1 + events.length) % events.length;
    updateCarousel();
    resetAutoSlide();
}

function updateCarousel() {
    carousel.style.transform = `translateX(-${index * 100}%)`;
}

function startAutoSlide() {
    autoSlide = setInterval(nextCard, 5000);
}

function pauseAutoSlide() {
    clearInterval(autoSlide);
}

function resetAutoSlide() {
    clearInterval(autoSlide);
    startAutoSlide();
}

// Adicionando interatividade
document.getElementById('nextBtn').addEventListener('click', nextCard);
document.getElementById('prevBtn').addEventListener('click', prevCard);

// Arrastar no celular
let startX;
carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});
carousel.addEventListener('touchend', (e) => {
    let endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) nextCard();
    if (endX - startX > 50) prevCard();
});

document.addEventListener('DOMContentLoaded', populateCarousel);