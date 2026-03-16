// Simulação de promoções
const promocoesSimuladas = [
  'Promoção: Smartphone com 30% de desconto!',
  'Oferta: Notebook por R$ 1999!',
  'Desconto: Fone Bluetooth por R$ 99!'
];

async function exibirPromocoes() {
  const ul = document.getElementById('promocoes');
  if (ul) {
    ul.innerHTML = '';
    // Requisição ao backend Render
    const resp = await fetch('https://monitor-promocoes-telegram.onrender.com/promocoes');
    const data = await resp.json();
    (data.promocoes || []).forEach(promo => {
      const li = document.createElement('li');
      li.textContent = promo;
      ul.appendChild(li);
    });
  }
}

document.getElementById('atualizar')?.addEventListener('click', exibirPromocoes);
exibirPromocoes();

document.getElementById('configForm')?.addEventListener('submit', async function(e) {
  e.preventDefault();
  const grupo = document.getElementById('grupo').value;
  const keywords = document.getElementById('keywords').value.split(',').map(k => k.trim());
  // Requisição ao backend Render
  const resp = await fetch('https://monitor-promocoes-telegram.onrender.com/config', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ grupo, keywords })
  });
  const data = await resp.json();
  alert('Configuração: ' + (data.success ? 'OK' : 'Falha'));
});

// Evento para botão Entrar
document.getElementById('btnEntrar')?.addEventListener('click', () => {
  document.getElementById('modalTelegram').classList.remove('hidden');
});
document.getElementById('fecharModal')?.addEventListener('click', () => {
  document.getElementById('modalTelegram').classList.add('hidden');
});
document.getElementById('telegramLogin')?.addEventListener('click', (e) => {
  e.preventDefault();
  alert('Autenticação via Telegram simulada!');
  document.getElementById('modalTelegram').classList.add('hidden');
});
document.getElementById('telegramLoginForm')?.addEventListener('submit', async function(e) {
  e.preventDefault();
  const telegramNumber = document.getElementById('telegramNumber').value;
  const res = await fetch('https://monitor-promocoes-telegram.onrender.com/auth/telegram-login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ telegramNumber })
  });
  const data = await res.json();
  if (data.token) {
    localStorage.setItem('token', data.token);
    window.location.href = '/frontend/promocoes.html';
  } else {
    alert('Login via Telegram falhou');
  }
});
