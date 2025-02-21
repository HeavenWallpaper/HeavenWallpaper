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

    function showLoginModal() {
        const loginModal = document.createElement("div");
        loginModal.innerHTML = `
            <div class="login-modal">
                <h2>Admin Login</h2>
                <input type="password" id="adminPassword" placeholder="Inserisci password">
                <button id="loginButton">Login</button>
            </div>
        `;
        document.body.appendChild(loginModal);

        document.getElementById("loginButton").addEventListener("click", () => {
            const password = document.getElementById("adminPassword").value;
            if (password === "porcaporcaporcamadonna") {
                adminPanel.classList.remove("hidden");
                loginModal.remove();
            }
        });
    }

    adminToggle.addEventListener("click", showLoginModal);

    colors.forEach(color => {
        const btn = document.createElement("button");
        btn.style.background = color.color;
        btn.textContent = color.name;
        btn.onclick = () => loadWallpapersByColor(color.name);
        colorButtons.appendChild(btn);
    });

    categories.forEach(cat => {
        const btn = document.createElement("button");
        btn.style.backgroundImage = `url(${cat.image})`;
        btn.textContent = cat.name;
        btn.classList.add("category-btn");
        btn.onclick = () => loadWallpapers(cat.name);
        categoryMenu.appendChild(btn);
    });

    function loadWallpapers(category) {
        wallpapersContainer.innerHTML = "";
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

    function loadWallpapersByColor(color) {
        wallpapersContainer.innerHTML = "";
        for (let i = 1; i <= 5; i++) {
            const wallpaper = document.createElement("div");
            wallpaper.classList.add("wallpaper-item");
            wallpaper.innerHTML = `
                <img src="images/${color.toLowerCase()}-${i}.jpg" alt="${color} Wallpaper">
                <button class="download-btn" data-image="images/${color.toLowerCase()}-${i}.jpg">Download</button>
            `;
            wallpapersContainer.appendChild(wallpaper);
        }
    }

    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("download-btn")) {
            event.preventDefault();
            setTimeout(() => {
                const imageUrl = event.target.dataset.image;
                window.open(imageUrl, "_blank");
            }, 3000);
        }
    });

    categories.forEach(cat => {
        const option = document.createElement("option");
        option.value = cat.name;
        option.textContent = cat.name;
        categorySelect.appendChild(option);
    });

    colors.forEach(color => {
        const option = document.createElement("option");
        option.value = color.name;
        option.textContent = color.name;
        categorySelect.appendChild(option);
    });

    uploadButton.addEventListener("click", () => {
    const file = imageUpload.files[0];
    const selectedCategories = Array.from(categorySelect.selectedOptions).map(option => option.value);

    if (!file) {
        alert("Seleziona un file prima di caricare!");
        return;
    }

    const formData = new FormData();
    formData.append("file", file);

    fetch("upload.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("File caricato con successo!");
            console.log(`File salvato in: ${data.file} nelle categorie: ${selectedCategories.join(", ")}`);
        } else {
            alert("Errore nel caricamento: " + data.message);
        }
    })
    .catch(error => console.error("Errore:", error));
});


