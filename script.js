// Informations d'identification pour l'admin
const adminEmail = "martinbuchardpeenaert@gmail.com";
const adminPassword = "1234";

// Variables globales
let isAdmin = false;
let username = "";
let messages = [];

// Connexion
document.getElementById("login-btn").addEventListener("click", function() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    username = document.getElementById("username").value || "Anonyme";

    if (email === adminEmail && password === adminPassword) {
        isAdmin = true;
    }

    document.getElementById("login-container").style.display = "none";
    document.getElementById("chat-container").style.display = "block";
    updateChat();
});

// Envoi d'un message
document.getElementById("send-btn").addEventListener("click", function() {
    const messageText = document.getElementById("message-input").value;
    const imageFile = document.getElementById("image-input").files[0];

    if (messageText || imageFile) {
        const message = {
            username: username,
            text: messageText,
            image: imageFile ? URL.createObjectURL(imageFile) : null
        };
        messages.push(message);
        updateChat();
    }

    document.getElementById("message-input").value = "";
    document.getElementById("image-input").value = null;
});

// Mise à jour du chat
function updateChat() {
    const chatBox = document.getElementById("chat-box");
    chatBox.innerHTML = "";

    messages.forEach((msg, index) => {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message");
        messageElement.innerHTML = `<strong>${msg.username}:</strong> ${msg.text}`;
        if (msg.image) {
            messageElement.innerHTML += `<br><img src="${msg.image}" width="100px">`;
        }

        if (isAdmin) {
            const deleteBtn = document.createElement("span");
            deleteBtn.classList.add("delete-btn");
            deleteBtn.textContent = " Supprimer";
            deleteBtn.onclick = () => deleteMessage(index);
            messageElement.appendChild(deleteBtn);
        }

        chatBox.appendChild(messageElement);
    });
}

// Suppression d'un message (admin uniquement)
function deleteMessage(index) {
    messages.splice(index, 1);
    updateChat();
}

