if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
}

let btn = document.getElementById("signupButton");
btn.addEventListener("click", function(e) {
    e.preventDefault();
    let email    = document.getElementById("signupEmail").value;
    let name     = document.getElementById("signupName").value;
    let age      = document.getElementById("signupAge").value;
    let password = document.getElementById("signupPassword").value;

    document.getElementById("nameError").innerText  = "";
    document.getElementById("ageError").innerText   = "";
    document.getElementById("emailError").innerText = "";

    let nameRegex = /^[a-zA-Z\s]{3,}$/;
    if (!nameRegex.test(name)) {
        document.getElementById("nameError").innerText = "Name must be letters only, min 3 characters";
        return;
    }

    if (age === "" || age < 10 || age > 100) {
        document.getElementById("ageError").innerText = "Age must be between 10 and 100";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let existingUser = users.find(function(u) {
        return u.email === email;
    });

    if (existingUser) {
        document.getElementById("emailError").innerText = "Email already exists!";
    } else {
        users.push({ email: email, name: name, age: Number(age), password: password });
        localStorage.setItem("users", JSON.stringify(users));

        let successMsg = document.createElement("div");
        successMsg.innerText = "✅ Account created successfully! Redirecting to login...";
        successMsg.style.cssText = `
            position: fixed;
            top: 24px;
            right: 24px;
            background: #28a745;
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            font-size: 15px;
            font-weight: 600;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            z-index: 9999;
            animation: fadeIn 0.3s ease;
        `;
        document.body.appendChild(successMsg);

        setTimeout(function() {
            location.href = "Login.html";
        }, 2000);
    }
});