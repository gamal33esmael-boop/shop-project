if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
    document.getElementById("themeButton").innerText = "Light Mode";
}

let themeBtn = document.getElementById("themeButton");
themeBtn.addEventListener("click", function() {
    document.body.classList.toggle("dark");
    let isDark = document.body.classList.contains("dark");
    localStorage.setItem("darkMode", isDark);
    this.innerText = isDark ? "Light Mode" : "Dark Mode";
});

let currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (currentUser) {
    document.getElementById("userName").innerText = "👋 " + currentUser.name;
}

document.getElementById("logoutBtn").addEventListener("click", function() {
    localStorage.removeItem("currentUser");
    location.href = "login.html";
});

let allProducts = [];

let xhr = new XMLHttpRequest();
xhr.open("GET", "https://fakestoreapi.com/products");
xhr.send("");

xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        allProducts = JSON.parse(xhr.response);
        displayProducts(allProducts);
    }
};

function filterProducts(category) {
    let tabs = document.querySelectorAll(".tab");
    tabs.forEach(function(tab) { tab.classList.remove("active"); });
    event.target.classList.add("active");

    if (category === "all") {
        displayProducts(allProducts);
    } else {
        let filtered = allProducts.filter(function(p) {
            return p.category === category;
        });
        displayProducts(filtered);
    }
}

function displayProducts(products) {
    let grid = document.getElementById("productGrid");
    grid.innerHTML = "";
    for (let i = 0; i < products.length; i++) {
        let card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <img src="${products[i].image}" alt="${products[i].title}" />
            <h3>${products[i].title}</h3>
            <span class="price">$${products[i].price}</span>
        `;
        card.addEventListener("click", function() {
            document.cookie = "productId=" + products[i].id;
            location.href = "details.html";
        });
        grid.appendChild(card);
    }
}
