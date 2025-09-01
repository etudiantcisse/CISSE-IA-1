const chatBox = document.getElementById('chat-box') || document.querySelector('main#chat-box');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const clearBtn = document.getElementById('clear-btn');
const typingIndicator = document.getElementById('typing-indicator');

function getTime() {
    const d = new Date();
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function createAvatar(sender) {
    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    if (sender === 'user') {
        avatar.style.backgroundImage = "url('https://img.icons8.com/ios-filled/50/ffffff/user-male-circle.png')";
    } else {
        avatar.style.backgroundImage = "url('https://img.icons8.com/ios-filled/50/ffffff/robot-2.png')";
    }
    return avatar;
}


function appendMessage(sender, text, time = null, animated = false) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message ' + sender;
    const avatar = createAvatar(sender);
    const content = document.createElement('div');
    content.className = 'message-content';
    const timestamp = document.createElement('span');
    timestamp.className = 'timestamp';
    timestamp.textContent = time || getTime();

    if (sender === 'bot') {
        // Ajout bouton copier
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.title = 'Copier la réponse';
        copyBtn.innerHTML = '📋';
        copyBtn.onclick = () => {
            navigator.clipboard.writeText(content.textContent);
            copyBtn.innerHTML = '✅';
            setTimeout(() => copyBtn.innerHTML = '📋', 1200);
        };
        content.appendChild(copyBtn);
    }

    if (animated && sender === 'bot') {
        content.classList.add('typing');
        msgDiv.appendChild(avatar);
        msgDiv.appendChild(content);
        msgDiv.appendChild(timestamp);
        chatBox.appendChild(msgDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
        typeWriterEffect(content, text, () => {
            content.classList.remove('typing');
        });
    } else {
        content.textContent = text;
        if (sender === 'bot') {
            // Ajout bouton copier
            const copyBtn = document.createElement('button');
            copyBtn.className = 'copy-btn';
            copyBtn.title = 'Copier la réponse';
            copyBtn.innerHTML = '📋';
            copyBtn.onclick = () => {
                navigator.clipboard.writeText(content.textContent);
                copyBtn.innerHTML = '✅';
                setTimeout(() => copyBtn.innerHTML = '📋', 1200);
            };
            content.appendChild(copyBtn);
        }
        msgDiv.appendChild(avatar);
        msgDiv.appendChild(content);
        msgDiv.appendChild(timestamp);
        chatBox.appendChild(msgDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}

function typeWriterEffect(element, text, callback) {
    let i = 0;
    element.textContent = '';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, 12 + Math.random() * 30);
        } else {
            if (callback) callback();
        }
    }
    type();
}

function showTyping(show = true) {
    typingIndicator.style.display = show ? 'flex' : 'none';
}

function clearChat() {
    chatBox.innerHTML = '';
}

clearBtn.addEventListener('click', clearChat);


chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = userInput.value.trim();
    if (!message) return;
    // Masquer le message d'accueil au 1er message
    const welcome = document.querySelector('.gpt-welcome');
    if (welcome) welcome.style.display = 'none';
    appendMessage('user', message);
    userInput.value = '';
    showTyping(true);
    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
        });
        const data = await response.json();
        showTyping(false);
        appendMessage('bot', data.reply, null, true);
    } catch (err) {
        showTyping(false);
        appendMessage('bot', 'Erreur de connexion.');
    }
});

// Focus input on load
window.onload = () => {
    userInput.focus();
};
