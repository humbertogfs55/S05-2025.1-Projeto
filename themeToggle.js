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
