document.addEventListener("DOMContentLoaded", () => {
    const categories = [
        { name: "Nature", image: "images/nature.jpg" },
        { name: "Space", image: "images/space.jpg" },
        { name: "Abstract", image: "images/abstract.jpg" }
    ];

    const colors = [
        { name: "Green", color: "#28a745" },
        { name: "Blue", color: "#007bff" },
        { name: "Red", color: "#dc3545" }
    ];

    function toggleDropdown(id) {
        const dropdown = document.getElementById(id);
        dropdown.classList.toggle("hidden");
    }

    document.querySelectorAll(".dropdown-btn").forEach(button => {
        button.addEventListener("click", () => {
            toggleDropdown(button.nextElementSibling.id);
        });
    });

    const colorButtons = document.getElementById("colorDropdown");
    const categoryMenu = document.getElementById("categoryDropdown");
    const wallpapersContainer = document.getElementById("wallpapers");
    const adminPanel = document.getElementById("adminPanel");
    const adminToggle = document.getElementById("adminToggle");
    const uploadButton = document.getElementById("uploadButton");
    const categorySelect = document.getElementById("categorySelect");
    const imageUpload = document.getElementById("imageUpload");

    // Populate color buttons
    colors.forEach(color => {
        const btn = document.createElement("button");
        btn.style.background = color.color;
        btn.textContent = color.name;
        btn.onclick = () => console.log(`Selected Color: ${color.name}`);
        colorButtons.appendChild(btn);
    });

    // Populate categories menu
    categories.forEach(cat => {
        const btn = document.createElement("button");
        btn.style.backgroundImage = `url(${cat.image})`;
        btn.textContent = cat.name;
        btn.classList.add("category-btn");
        btn.onclick = () => loadWallpapers(cat.name);
        categoryMenu.appendChild(btn);
    });

    function loadWallpapers(category) {
        wallpapersContainer.innerHTML = ""; // Clear previous wallpapers
        for (let i = 1; i <= 5; i++) {
            const wallpaper = document.createElement("div");
            wallpaper.classList.add("wallpaper-item");
            wallpaper.innerHTML = `
                <img src="images/${category.toLowerCase()}-${i}.jpg" alt="${category} Wallpaper">
                <button class="download-btn" data-image="images/${category.toLowerCase()}-${i}.jpg">Download</button>
            `;
            wallpapersContainer.appendChild(wallpaper);
        }
    }

    document.querySelectorAll(".download-btn").forEach(button => {
        button.addEventListener("click", (event) => {
            const imageUrl = event.target.dataset.image;
            // Inserisci qui il codice dell'annuncio pubblicitario
            console.log("Ad logic goes here");
            window.open(imageUrl, "_blank");
        });
    });

    // Toggle admin panel
    adminToggle.addEventListener("click", () => {
        adminPanel.classList.toggle("hidden");
    });

    // Populate admin category select
    categories.forEach(cat => {
        const option = document.createElement("option");
        option.value = cat.name;
        option.textContent = cat.name;
        categorySelect.appendChild(option);
    });

    // Upload button functionality (mockup)
    uploadButton.addEventListener("click", () => {
        const file = imageUpload.files[0];
        if (file) {
            console.log(`Uploaded: ${file.name} to category ${categorySelect.value}`);
        } else {
            console.log("No file selected");
        }
    });
});
