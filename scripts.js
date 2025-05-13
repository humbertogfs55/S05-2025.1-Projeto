document.addEventListener('DOMContentLoaded', () => {
    const settingsIcon = document.getElementById('settingsIcon');
    const themeDialog = document.getElementById('themeDialog');
    const closeDialog = document.getElementById('closeDialog');
    const lightModeButton = document.getElementById('lightModeButton');
    const darkModeButton = document.getElementById('darkModeButton');

    // Apply saved theme on page load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.setAttribute('data-theme', savedTheme);
    }

    settingsIcon.addEventListener('click', () => {
        themeDialog.showModal();
    });

    closeDialog.addEventListener('click', () => {
        themeDialog.close();
    });

    lightModeButton.addEventListener('click', () => {
        document.body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light'); // Save theme to localStorage
        themeDialog.close();
    });

    darkModeButton.addEventListener('click', () => {
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark'); // Save theme to localStorage
        themeDialog.close();
    });

    const menuIcon = document.getElementById('menuIcon');
    const sidePanel = document.getElementById('sidePanel');
    const closePanel = document.getElementById('closePanel');

    if (menuIcon && sidePanel && closePanel) {
        menuIcon.addEventListener('click', () => {
            sidePanel.classList.add('open');
        });

        closePanel.addEventListener('click', () => {
            sidePanel.classList.remove('open');
        });

        // Close side panel when clicking outside
        document.addEventListener('click', (event) => {
            if (!sidePanel.contains(event.target) && !menuIcon.contains(event.target)) {
                sidePanel.classList.remove('open');
            }
        });
    } else {
        console.error('Menu button or side panel elements not found.');
    }

    carousel = document.querySelector('.carousel'); // Initialize carousel after DOM is loaded
    if (!carousel) {
        console.error('Carousel element not found.');
        return;
    }

    // Call fetchEvents to populate the carousel
    fetchEvents();

    // Add interactivity for carousel navigation
    document.getElementById('nextBtn').addEventListener('click', nextCard);
    document.getElementById('prevBtn').addEventListener('click', prevCard);

    // Add touch support for mobile devices
    let startX;
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    carousel.addEventListener('touchend', (e) => {
        let endX = e.changedTouches[0].clientX;
        if (startX - endX > 50) nextCard();
        if (endX - startX > 50) prevCard();
    });
});

let events = [];
let carousel; // Declare the carousel variable
let autoSlide; // Declare autoSlide for the interval
let index = 0; // Declare index to track the current slide

async function fetchEvents() {
    try {
        const response = await fetch('events.json');
        events = await response.json();
        populateCarousel();
    } catch (error) {
        console.error('Error loading events:', error);
    }
}

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