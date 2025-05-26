document.addEventListener('DOMContentLoaded', () => {
    // Apply saved theme on page load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.setAttribute('data-theme', savedTheme);
    }

    const menuIcon = document.getElementById('menuIcon');
    const settingsIcon = document.getElementById('settingsIcon')
    const sidePanel = document.getElementById('sidePanel');
    const closePanel = document.getElementById('closePanel');
    const interactiveMenu = document.getElementById('interactiveMenu');
    const closeMenu = document.getElementById('closeMenu');
    const userDetailsForm = document.getElementById('userDetailsForm');

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

    // Open the interactive menu
    settingsIcon.addEventListener('click', () => {
        interactiveMenu.showModal();
    });

    // Close the interactive menu on cancel
    closeMenu.addEventListener('click', () => {
        interactiveMenu.close();
    });

    // Handle form submission
    userDetailsForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const linkedin = document.getElementById('linkedin').value;
        const github = document.getElementById('github').value;
        const email = document.getElementById('email').value;

        // Save user details to localStorage
        localStorage.setItem('linkedin', linkedin);
        localStorage.setItem('github', github);
        localStorage.setItem('email', email);

        alert('Seus dados foram salvos!');
        interactiveMenu.close(); // Ensure the modal closes after saving
    });

    // Dynamically load internship options
    loadInternships();
});

async function loadInternships() {
    try {
        const response = await fetch('internship.json');
        const internships = await response.json();
        const mainContainer = document.querySelector('.main-container');

        internships.forEach(internship => {
            const internshipBox = document.createElement('div');
            internshipBox.classList.add('box', 'internship');

            internshipBox.innerHTML = `
                <img src="${internship.image}" alt="${internship.title}">
                <div class="info">
                    <h3>${internship.title}</h3>
                    <p>${internship.requirements}</p>
                    <p>
                        <span class="material-symbols-outlined icon">business</span> ${internship.company}
                        <span class="material-symbols-outlined icon">pin_drop</span> ${internship.location}
                    </p>
                    <p>
                        <span class="material-symbols-outlined icon">event</span> Data Limite: ${internship.applyBy}
                    </p>
                    <button class="apply-btn" data-id="${internship.id}">Inscrever</button>
                </div>
            `;

            mainContainer.appendChild(internshipBox);
        });

        // Add event listeners to all "Apply" buttons
        const applyButtons = document.querySelectorAll('.apply-btn');
        applyButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const internshipId = event.target.getAttribute('data-id');
                alert(`Voce se inscreveu para o estagio!: ${internshipId}`);
            });
        });
    } catch (error) {
        console.error('Error loading internships:', error);
    }
}