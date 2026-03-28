// Dark mode
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark');
}

function getCookie(name) {
    let cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        let c = cookies[i].trim();
        if (c.startsWith(name + "=")) {
            return c.substring(name.length + 1);
        }
    }
    return null;
}

let productId = getCookie("productId");
console.log(productId);
let xhr = new XMLHttpRequest();
xhr.open("GET", "https://dummyjson.com/products/" + productId);
xhr.send("");

xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        let product = JSON.parse(xhr.response);
let container = document.getElementById("detailsContainer");
container.innerHTML = `
    <img src="${product.thumbnail}" alt="${product.title}" />
    <div class="info">
        <h2>${product.title}</h2>
        <span class="price">$${product.price}</span>
        <p>${product.description}</p>
    </div>
`;   }
    }