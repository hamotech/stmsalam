import menuStructure from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    const menuContainer = document.getElementById('menuContainer');
    const categoryTabs = document.getElementById('categoryTabs');
    const menuSearch = document.getElementById('menuSearch');
    const cartBar = document.getElementById('cartBar');
    const cartCount = document.getElementById('cartCount');

    let cartTotal = 0;

    /**
     * Parsing Logic:
     * 1. Remove extension
     * 2. Extract price (last appearing number)
     * 3. Clean name (replace underscores with spaces, remove price/SGD/SDG patterns)
     */
    function parseFileName(fileName) {
        // 1. Strip extension
        const nameWithoutExt = fileName.substring(0, fileName.lastIndexOf('.')) || fileName;
        
        // 2. Extract Price 
        // Logic: Find the numeric value (e.g., 2.50) using regex
        const priceMatch = nameWithoutExt.match(/(\d+\.\d+)/);
        const price = priceMatch ? parseFloat(priceMatch[0]) : 0.00;

        // 3. Extract Name
        // Logic: Remove parentheses, "SGD", "SDG", numbers, and replace underscore with space
        let name = nameWithoutExt
            .replace(/\(.*?\)/g, '')    // Remove anything in parentheses
            .replace(/SGD|SDG/gi, '')    // Remove currency codes
            .replace(/(\d+\.\d+)/g, '')  // Remove the price number
            .replace(/_/g, ' ')          // Replace underscores with spaces
            .trim();

        // 4. Capitalize (Word by Word)
        name = name.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');

        return {
            original: fileName,
            name: name || "Delicious Item",
            price: price.toFixed(2)
        };
    }

    function renderMenu(searchTerm = '') {
        menuContainer.innerHTML = '';
        categoryTabs.innerHTML = '<div class="tab active" data-category="all">All Items</div>';

        Object.keys(menuStructure).forEach(category => {
            const products = menuStructure[category];
            const parsedProducts = products.map(p => parseFileName(p));
            
            // Filter if searching
            const filteredProducts = parsedProducts.filter(p => 
                p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                category.toLowerCase().includes(searchTerm.toLowerCase())
            );

            if (filteredProducts.length === 0) return;

            // Add tab
            const tab = document.createElement('div');
            tab.className = 'tab';
            tab.dataset.category = category.replace(/\s+/g, '-');
            tab.innerText = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
            categoryTabs.appendChild(tab);

            // Create Section
            const section = document.createElement('div');
            section.className = 'category-section';
            section.id = category.replace(/\s+/g, '-');
            
            section.innerHTML = `
                <h2 class="category-title">${category}</h2>
                <div class="product-grid">
                    ${filteredProducts.map(p => `
                        <div class="product-card">
                            <div class="product-img">
                                <img src="../SMT FOOD/SMT FOOD/${category}/${p.original}" alt="${p.name}" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500'">
                                <span class="price-tag">$${p.price}</span>
                            </div>
                            <div class="product-info">
                                <h3 class="product-name">${p.name}</h3>
                                <p class="product-desc">Authentic taste of STM Salam. Prepared fresh, served hot.</p>
                                <button class="add-btn" data-name="${p.name}">
                                    <i class="fa-solid fa-plus"></i> Add to Order
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
            menuContainer.appendChild(section);
        });

        setupTabInteraction();
        setupAddButtons();
    }

    function setupTabInteraction() {
        const tabs = document.querySelectorAll('.tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                const catId = tab.dataset.category;
                if (catId === 'all') {
                    document.querySelectorAll('.category-section').forEach(s => s.style.display = 'block');
                } else {
                    document.querySelectorAll('.category-section').forEach(s => {
                        s.style.display = s.id === catId ? 'block' : 'none';
                    });
                }
            });
        });
    }

    function setupAddButtons() {
        document.querySelectorAll('.add-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                cartTotal++;
                cartCount.innerText = cartTotal;
                cartBar.classList.remove('hidden');
                
                // Mini animation
                btn.innerHTML = '<i class="fa-solid fa-check"></i> Added!';
                setTimeout(() => {
                    btn.innerHTML = '<i class="fa-solid fa-plus"></i> Add to Order';
                }, 1000);
            });
        });
    }

    // Search Interaction
    menuSearch.addEventListener('input', (e) => {
        renderMenu(e.target.value);
    });

    function renderGallery() {
        const galleryGrid = document.getElementById('galleryGrid');
        if (!galleryGrid) return;

        const media = ["v1.mp4","v2.mp4","v3.mp4","WhatsApp Image 2026-04-08 at 10.56.53 PM.jpeg","WhatsApp Image 2026-04-08 at 10.57.21 PM.jpeg","WhatsApp Image 2026-04-08 at 8.22.51 PM.jpeg","WhatsApp Image 2026-04-08 at 8.22.59 PM.jpeg","WhatsApp Image 2026-04-08 at 8.26.13 PM.jpeg","WhatsApp Image 2026-04-08 at 8.33.52 PM.jpeg","WhatsApp Image 2026-04-08 at 8.34.04 PM.jpeg","WhatsApp Image 2026-04-08 at 8.34.35 PM.jpeg","WhatsApp Image 2026-04-08 at 8.34.50 PM.jpeg","WhatsApp Image 2026-04-08 at 8.36.05 PM.jpeg","WhatsApp Image 2026-04-08 at 8.42.54 PM (1).jpeg","WhatsApp Image 2026-04-08 at 8.42.54 PM (2).jpeg","WhatsApp Image 2026-04-08 at 8.42.54 PM (3).jpeg","WhatsApp Image 2026-04-08 at 8.42.54 PM (4).jpeg","WhatsApp Image 2026-04-08 at 8.42.54 PM (5).jpeg","WhatsApp Image 2026-04-08 at 8.42.54 PM (6).jpeg","WhatsApp Image 2026-04-08 at 8.42.54 PM.jpeg","WhatsApp Video 2026-04-08 at 8.25.12 PM.mp4","WhatsApp Video 2026-04-08 at 8.25.15 PM (1).mp4","WhatsApp Video 2026-04-08 at 8.25.15 PM.mp4","WhatsApp Video 2026-04-08 at 8.31.20 PM.mp4"];

        galleryGrid.innerHTML = media.map(file => {
            const isVideo = file.toLowerCase().endsWith('.mp4') || file.toLowerCase().endsWith('.mov');
            const url = `../aboutusimage/${file}`;
            return `
                <div class="gallery-item">
                    ${isVideo ? 
                        `<video src="${url}" muted loop onmouseover="this.play()" onmouseout="this.pause()"></video>` : 
                        `<img src="${url}" alt="Gallery">`}
                    <div class="gallery-overlay">
                        <i class="fa-solid ${isVideo ? 'fa-play' : 'fa-magnifying-glass-plus'}"></i>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Initial Render
    renderMenu();
    renderGallery();
});
