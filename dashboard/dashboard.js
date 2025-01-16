// Dashboard Functionality
document.addEventListener('DOMContentLoaded', () => {
    const tileContainer = document.getElementById('tile-container');
    const addTileBtn = document.getElementById('add-tile-btn');
    const addTileModal = document.getElementById('add-tile-modal');
    const closeModalBtn = document.querySelector('.close');
    const addTileForm = document.getElementById('add-tile-form');
    const currentTimeEl = document.getElementById('current-time');
    const currentDateEl = document.getElementById('current-date');

    // Time and Date Display
    function updateDateTime() {
        const now = new Date();
        currentTimeEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        currentDateEl.textContent = now.toLocaleDateString([], { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }
    updateDateTime();
    setInterval(updateDateTime, 1000);

    // Tile Management
    const tiles = JSON.parse(localStorage.getItem('dashboardTiles') || '[]');

    function saveTiles() {
        localStorage.setItem('dashboardTiles', JSON.stringify(tiles));
    }

    function renderTiles() {
        tileContainer.innerHTML = '';
        tiles.forEach((tile, index) => {
            const tileEl = document.createElement('a');
            tileEl.href = tile.url;
            tileEl.target = '_blank';
            tileEl.classList.add('tile');
            
            // Add Material Symbol icon
            const iconEl = document.createElement('span');
            iconEl.classList.add('material-symbols-outlined');
            iconEl.textContent = tile.icon;
            tileEl.appendChild(iconEl);

            const nameEl = document.createElement('div');
            nameEl.textContent = tile.name;
            nameEl.classList.add('tile-name');
            tileEl.appendChild(nameEl);

            // Add delete button with Material Symbol
            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete-tile');
            const deleteIcon = document.createElement('span');
            deleteIcon.classList.add('material-symbols-outlined');
            deleteIcon.textContent = 'close';
            deleteBtn.appendChild(deleteIcon);
            
            deleteBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                tiles.splice(index, 1);
                saveTiles();
                renderTiles();
            });
            tileEl.appendChild(deleteBtn);

            tileContainer.appendChild(tileEl);
        });
    }

    // Modal Interactions
    addTileBtn.addEventListener('click', () => {
        addTileModal.style.display = 'block';
    });

    closeModalBtn.addEventListener('click', () => {
        addTileModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === addTileModal) {
            addTileModal.style.display = 'none';
        }
    });

    // Add Tile Form Submission
    addTileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('tile-name').value;
        const url = document.getElementById('tile-url').value;
        const icon = document.getElementById('tile-icon').value;

        tiles.push({ name, url, icon });
        saveTiles();
        renderTiles();

        // Reset form and close modal
        addTileForm.reset();
        addTileModal.style.display = 'none';
    });

    // Initial render
    renderTiles();
});
