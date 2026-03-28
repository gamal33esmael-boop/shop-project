let btn = document.getElementById("loginButton");

btn.addEventListener("click", function(e) {
    e.preventDefault();
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;
    let users = JSON.parse(localStorage.getItem("users")) || [];

    let foundUser = users.find(function(u) {
        return u.email === email && u.password === password;
    });

    if (foundUser) {
        localStorage.setItem("currentUser", JSON.stringify(foundUser));
        location.href = "home.html";
    } else {
        let errorSpan = document.getElementById("loginError");
        errorSpan.innerHTML = "";
        errorSpan.innerText = "User not found! Do you want to create a new account?";
        let signupLink = document.createElement("a");
        signupLink.href = "Signup.html";
        signupLink.innerText = " Sign up";
        errorSpan.appendChild(document.createElement("br"));
        errorSpan.appendChild(signupLink);
    }
});

if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
}