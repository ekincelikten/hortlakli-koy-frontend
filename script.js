const socket = io('https://hortlakli-koy.onrender.com');
let nickname = '';
let role = '';

function joinGame() {
  nickname = document.getElementById('nickname').value;
  if (!nickname) return alert("Lütfen nick girin.");
  socket.emit('joinGame', nickname);
}

socket.on('assignRole', (data) => {
  role = data.role;
  document.getElementById('role').innerText = 'Rol: ' + role;
});

socket.on('phaseChange', (phase) => {
  document.getElementById('phase').innerText = 'Faz: ' + (phase === 'day' ? 'Gündüz' : 'Gece');
});

socket.on('updatePlayers', (players) => {
  const avatarsDiv = document.getElementById('avatars');
  avatarsDiv.innerHTML = '';
  players.forEach(p => {
    const div = document.createElement('div');
    div.className = 'avatar';
    div.innerHTML = `<img src="${p.avatar}" /><div>${p.nickname}</div>`;
    avatarsDiv.appendChild(div);
  });
});

function sendMessage() {
  const input = document.getElementById('chatInput');
  const msg = input.value.trim();
  if (!msg) return;
  socket.emit('chatMessage', { text: msg });
  input.value = '';
}

socket.on('chatMessage', (msg) => {
  const messages = document.getElementById('messages');
  const div = document.createElement('div');
  div.innerText = msg;
  messages.appendChild(div);
});