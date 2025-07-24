        const scaleWrapper = document.getElementById('scale-wrapper');
        const container = document.getElementById('collage-container');
        const items = document.querySelectorAll('.draggable-item');
        const saveButton = document.getElementById('save-button');


        const savedLayout = [{offsetX: 94, offsetY: -32, zIndex: "47"}, {offsetX: 163, offsetY: -88, zIndex: "52"}, {offsetX: 22, offsetY: -168, zIndex: "41"}, {offsetX: 113, offsetY: 205, zIndex: "46"}, {offsetX: -288, offsetY: 46, zIndex: "39"}, {offsetX: -226, offsetY: -227, zIndex: "1"}, {offsetX: 219, offsetY: -178, zIndex: "51"}, {offsetX: 129, offsetY: -278, zIndex: "26"}, {offsetX: -54, offsetY: 36, zIndex: "45"}, {offsetX: -274, offsetY: -167, zIndex: "42"},{offsetX: -326, offsetY: -207, zIndex: "40"},{offsetX: -410, offsetY: 257, zIndex: "43"},{offsetX: -73, offsetY: -217, zIndex: "25"} ]

        let currentScale = 1;

        // --- Responsive Scaling Function ---
        function updateScale() {
            const designWidth = 700;
            const designHeight = 700;
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;

            // Calculate scale based on the smaller of width or height ratio
            const scaleX = screenWidth / designWidth;
            const scaleY = screenHeight / designHeight;
            currentScale = Math.min(scaleX, scaleY);
            
            // On screens larger than the design, don't scale up.
            if (screenWidth > designWidth && screenHeight > designHeight) {
                currentScale = 1;
            }

            container.style.transform = `scale(${currentScale})`;
            // Adjust the wrapper's height and width to match the scaled content
            scaleWrapper.style.height = `${designHeight * currentScale}px`;
            scaleWrapper.style.width = `${designWidth * currentScale}px`;
        }

        // --- Layout Application Function ---
        function applyLayout(layout) {
            if (layout.length !== items.length) {
                console.error("Saved layout does not match the number of items on the page.");
                return;
            }
            const designWidth = 700;
            const designHeight = 700;

            items.forEach((item, index) => {
                const pos = layout[index];
                const newLeft = (designWidth / 2) + pos.offsetX - (item.offsetWidth / 2);
                const newTop = (designHeight / 2) + pos.offsetY - (item.offsetHeight / 2);

                item.style.left = `${newLeft}px`;
                item.style.top = `${newTop}px`;
                item.style.zIndex = pos.zIndex;
            });
        }

        // --- On Page Load: Apply layout and scale ---
        window.addEventListener('load', () => {
            if (savedLayout && savedLayout.length > 0) {
                applyLayout(savedLayout);
            } else {
                // Fallback to random positions if no layout is saved
                items.forEach(item => {
                    item.style.left = `${Math.random() * (700 - item.offsetWidth)}px`;
                    item.style.top = `${Math.random() * (700 - item.offsetHeight)}px`;
                });
            }
            updateScale();
        });
        
        // Update scale on window resize
        window.addEventListener('resize', updateScale);

        // --- Save Button Logic (Center-based) ---
        if(saveButton) {
        saveButton.addEventListener('click', () => {
            const layoutData = [];
            const containerCenterX = 700 / 2;
            const containerCenterY = 700 / 2;

            items.forEach(item => {
                const itemCenterX = item.offsetLeft + item.offsetWidth / 2;
                const itemCenterY = item.offsetTop + item.offsetHeight / 2;
                const offsetX = itemCenterX - containerCenterX;
                const offsetY = itemCenterY - containerCenterY;

                layoutData.push({
                    offsetX: Math.round(offsetX),
                    offsetY: Math.round(offsetY),
                    zIndex: item.style.zIndex || '1'
                });
            });
            console.log("Copy the array below and paste it into the 'savedLayout' variable:");
            console.log(layoutData);
            alert("Center-based layout data printed to developer console! (Press F12)");
        });
    }

        // --- Drag and Drop Logic (with scaling) ---
        let activeItem = null;
        let initialX, initialY, initialLeft, initialTop;
        let highestZIndex = items.length;

        items.forEach(item => {
            item.addEventListener('mousedown', (e) => {
                e.preventDefault();
                activeItem = item;
                activeItem.style.zIndex = ++highestZIndex;
                
                initialX = e.clientX;
                initialY = e.clientY;
                initialLeft = activeItem.offsetLeft;
                initialTop = activeItem.offsetTop;
            });
        });

        window.addEventListener('mousemove', (e) => {
            if (activeItem) {
                e.preventDefault();
                const dx = (e.clientX - initialX) / currentScale;
                const dy = (e.clientY - initialY) / currentScale;
                activeItem.style.left = `${initialLeft + dx}px`;
                activeItem.style.top = `${initialTop + dy}px`;
            }
        });

        window.addEventListener('mouseup', () => {
            activeItem = null;
        });