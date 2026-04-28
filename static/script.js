const chat = document.getElementById('chat');
const input = document.getElementById('input');
const sendBtn = document.getElementById('send-btn');

// Charge l'historique depuis localStorage ou démarre vide
let history = JSON.parse(localStorage.getItem('chat_history')) || [];

// Réaffiche les messages au chargement
history.forEach(msg => {
  if (msg.role !== 'system') {
    addMessage(msg.role === 'user' ? 'user' : 'bot', msg.content);
  }
});

// Auto-resize du textarea
input.addEventListener('input', () => {
  input.style.height = 'auto';
  input.style.height = input.scrollHeight + 'px';
});

// Envoyer avec Entrée
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

sendBtn.addEventListener('click', sendMessage);

function addMessage(role, text) {
  const div = document.createElement('div');
  div.classList.add('message', role === 'user' ? 'user' : 'bot');

  const label = document.createElement('div');
  label.classList.add('label');
  label.textContent = role === 'user' ? 'TOI' : 'MAÎTRE CHIEN';

  const bubble = document.createElement('div');
  bubble.classList.add('bubble');
  bubble.textContent = text;

  div.appendChild(label);
  div.appendChild(bubble);
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;

  return div;
}

function addTyping() {
  const div = document.createElement('div');
  div.classList.add('message', 'bot', 'typing');

  const label = document.createElement('div');
  label.classList.add('label');
  label.textContent = 'MAÎTRE CHIEN';

  const bubble = document.createElement('div');
  bubble.classList.add('bubble');
  bubble.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';

  div.appendChild(label);
  div.appendChild(bubble);
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;

  return div;
}

async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addMessage('user', text);
  input.value = '';
  input.style.height = 'auto';
  sendBtn.disabled = true;

  history.push({ role: 'user', content: text });
  localStorage.setItem('chat_history', JSON.stringify(history));

  const typingDiv = addTyping();

  try {
    const res = await fetch('/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: history.slice(-10) })
    });

    const data = await res.json();
    const reply = data.response;

    typingDiv.remove();
    addMessage('bot', reply);

    history.push({ role: 'assistant', content: reply });
    localStorage.setItem('chat_history', JSON.stringify(history));

  } catch (err) {
    typingDiv.remove();
    addMessage('bot', 'Erreur de connexion. Réessaie.');
  }

  sendBtn.disabled = false;
  input.focus();
}