// 🔹 CONFIGURAZIONE FIREBASE (Sostituisci con i tuoi dati!)
const firebaseConfig = {
    apiKey: "AIzaSyASzC4SV5EAG0eIc7O6o6oerj08jbMIEQ0",
  authDomain: "wallpaper-72fe4.firebaseapp.com",
  projectId: "wallpaper-72fe4",
  storageBucket: "wallpaper-72fe4.firebasestorage.app",
  messagingSenderId: "877172055854",
  appId: "1:877172055854:web:1581b99e87b519e10964bf",
  measurementId: "G-3L0DKJ3468"
};

// 🔹 Inizializza Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("download-btn")) {
        event.preventDefault();
        
        const imageUrl = event.target.dataset.image;
        
        setTimeout(() => {
            window.open(imageUrl, "_blank");
        }, 3000);
    }
});


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

    function loadWallpapers(category) {
    wallpapersContainer.innerHTML = "";

    const storageRef = storage.ref("wallpapers");

    storageRef.listAll().then(result => {
        result.items.forEach(itemRef => {
            itemRef.getDownloadURL().then(url => {
                const wallpaper = document.createElement("div");
                wallpaper.classList.add("wallpaper-item");
                wallpaper.innerHTML = `
                    <img src="${url}" alt="${category} Wallpaper">
                    <button class="download-btn" data-image="${url}">Download</button>
                `;
                wallpapersContainer.appendChild(wallpaper);
            });
        });
    }).catch(error => {
        console.error("Errore nel caricamento delle immagini:", error);
    });
}


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
uploadButton.addEventListener("click", () => {
    const file = imageUpload.files[0];
    const selectedCategories = Array.from(categorySelect.selectedOptions).map(option => option.value);

    if (file) {
        const storageRef = storage.ref(`wallpapers/${file.name}`);
        const uploadTask = storageRef.put(file);

        uploadTask.on("state_changed", 
            snapshot => {
                console.log(`Caricamento: ${(snapshot.bytesTransferred / snapshot.totalBytes) * 100}%`);
            }, 
            error => {
                console.error("Errore nel caricamento:", error);
            }, 
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                    console.log(`File disponibile all'URL: ${downloadURL}`);
                    alert("Upload completato!");

                    // Puoi aggiornare il database con il link dell'immagine
                });
            }
        );
    } else {
        alert("Seleziona un file prima di caricare!");
    }
});



