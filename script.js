/* script.js */

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

const colorButtons = document.getElementById("colorButtons");
const categoryMenu = document.getElementById("categoryMenu");
const categoriesContainer = document.getElementById("categories");
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
    btn.onclick = () => alert(`Selected Color: ${color.name}`);
    colorButtons.appendChild(btn);
});

// Populate categories menu
categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.style.backgroundImage = `url(${cat.image})`;
    btn.textContent = cat.name;
    btn.classList.add("category-btn");
    btn.onclick = () => alert(`Selected Category: ${cat.name}`);
    categoryMenu.appendChild(btn);
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
        alert(`Uploaded: ${file.name} to category ${categorySelect.value}`);
    } else {
        alert("No file selected");
    }
});
