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
let filteredProducts = [];
let currentPage = 1;
let itemsPerPage = 9;

let allowedCategories = [
    "smartphones",
    "laptops",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "sunglasses",
    "automotive",
    "motorcycle"
];

let xhr = new XMLHttpRequest();
xhr.open("GET", "https://dummyjson.com/products?limit=200");
xhr.send("");

xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        let data = JSON.parse(xhr.response);
        allProducts = data.products.filter(function(p) {
            return allowedCategories.indexOf(p.category) !== -1;
        });
        filteredProducts = allProducts;
        currentPage = 1;
        displayProducts();
    }
};

function filterProducts(category) {
    let tabs = document.querySelectorAll(".tab");
    tabs.forEach(function(tab) { tab.classList.remove("active"); });
    event.target.classList.add("active");

    if (category === "all") {
        filteredProducts = allProducts;
    } else {
        filteredProducts = allProducts.filter(function(p) {
            return p.category === category;
        });
    }
    currentPage = 1;
    displayProducts();
}

function displayProducts() {
    let grid = document.getElementById("productGrid");
    grid.innerHTML = "";

    let start = (currentPage - 1) * itemsPerPage;
    let end   = start + itemsPerPage;
    let pageProducts = filteredProducts.slice(start, end);

    for (let i = 0; i < pageProducts.length; i++) {
        let card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <img src="${pageProducts[i].thumbnail}" alt="${pageProducts[i].title}" />
            <h3>${pageProducts[i].title}</h3>
            <span class="price">$${pageProducts[i].price}</span>
        `;
        card.addEventListener("click", function() {
            document.cookie = "productId=" + pageProducts[i].id;
            location.href = "details.html";
        });
        grid.appendChild(card);
    }

    displayPagination();
}

function displayPagination() {
    let totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    let pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    let prevBtn = document.createElement("button");
    prevBtn.innerText = "← Prev";
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener("click", function() {
        currentPage--;
        displayProducts();
        window.scrollTo(0, 0);
    });
    pagination.appendChild(prevBtn);

    for (let i = 1; i <= totalPages; i++) {
        let pageBtn = document.createElement("button");
        pageBtn.innerText = i;
        if (i === currentPage) pageBtn.classList.add("active-page");
        pageBtn.addEventListener("click", function() {
            currentPage = i;
            displayProducts();
            window.scrollTo(0, 0);
        });
        pagination.appendChild(pageBtn);
    }

    let nextBtn = document.createElement("button");
    nextBtn.innerText = "Next →";
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener("click", function() {
        currentPage++;
        displayProducts();
        window.scrollTo(0, 0);
    });
    pagination.appendChild(nextBtn);
}
