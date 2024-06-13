const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const usernameContainer = document.getElementById('username-container');
const chatContainer = document.getElementById('chat-container');
const usernameInput = document.getElementById('username-input');
const saveUsernameBtn = document.getElementById('save-username-btn');

let username;
let lastMessageTime = 0;

saveUsernameBtn.addEventListener('click', saveUsername);
sendBtn.addEventListener('click', sendMessage);

function saveUsername() {
    const name = usernameInput.value;
    if (name.length >= 6 && name.length <= 16) {
        document.cookie = `username=${name}; path=/`;
        username = name;
        usernameContainer.style.display = 'none';
        chatContainer.style.display = 'flex';
    } else {
        alert('Username must be between 6 and 16 characters.');
    }
}

function getUsernameFromCookie() {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name === 'username') {
            return value;
        }
    }
    return null;
}

function sendMessage() {
    const message = messageInput.value;
    const now = Date.now();

    if (message.length < 1 || message.length > 1234) {
        alert('Message must be between 1 and 1234 characters.');
        return;
    }

    if (now - lastMessageTime < 2000) {
        alert('You are sending messages too quickly.');
        return;
    }

    chatBox.innerHTML += `<div>${username}: ${message}</div>`;
    sendChannel.send(message);
    messageInput.value = '';
    lastMessageTime = now;
}

function receiveMessage(event) {
    const message = event.data;
    chatBox.innerHTML += `<div>Peer: ${message}</div>`;
}

function setupPeerConnection() {
    localConnection = new RTCPeerConnection();
    remoteConnection = new RTCPeerConnection();

    sendChannel = localConnection.createDataChannel('chat');
    sendChannel.onmessage = receiveMessage;

    remoteConnection.ondatachannel = event => {
        receiveChannel = event.channel;
        receiveChannel.onmessage = receiveMessage;
    };

    localConnection.onicecandidate = event => {
        if (event.candidate) {
            remoteConnection.addIceCandidate(event.candidate);
        }
    };

    remoteConnection.onicecandidate = event => {
        if (event.candidate) {
            localConnection.addIceCandidate(event.candidate);
        }
    };

    localConnection.createOffer()
        .then(offer => localConnection.setLocalDescription(offer))
        .then(() => remoteConnection.setRemoteDescription(localConnection.localDescription))
        .then(() => remoteConnection.createAnswer())
        .then(answer => remoteConnection.setLocalDescription(answer))
        .then(() => localConnection.setRemoteDescription(remoteConnection.localDescription));
}

window.onload = () => {
    username = getUsernameFromCookie();
    if (username) {
        usernameContainer.style.display = 'none';
        chatContainer.style.display = 'flex';
    }
};

setupPeerConnection();