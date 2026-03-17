// Simulação de promoções
const promocoesSimuladas = [
  'Promoção: Smartphone com 30% de desconto!',
  'Oferta: Notebook por R$ 1999!',
  'Desconto: Fone Bluetooth por R$ 99!'
];

const API_BASE_URL = 'https://monitor-promocoes-telegram.onrender.com';

function extrairUserIdDoToken() {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const payloadBase64 = token.split('.')[1];
    if (!payloadBase64) return null;

    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);
    return payload.userId || null;
  } catch (error) {
    return null;
  }
}

async function exibirPromocoes() {
  const ul = document.getElementById('promocoes');
  if (ul) {
    ul.innerHTML = '';
    // Requisição ao backend Render
    const resp = await fetch(`${API_BASE_URL}/promocoes`);
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

async function carregarGruposTelegram() {
  const gruposLista = document.getElementById('gruposTelegram');
  const grupoSelect = document.getElementById('grupoSelect');
  if (!gruposLista || !grupoSelect) return;

  gruposLista.innerHTML = '<li>Carregando grupos...</li>';
  grupoSelect.innerHTML = '<option value="">Selecione um grupo</option>';

  const userId = extrairUserIdDoToken();
  const url = userId
    ? `${API_BASE_URL}/groups?userId=${encodeURIComponent(userId)}`
    : `${API_BASE_URL}/groups`;

  try {
    const resp = await fetch(url);
    const grupos = await resp.json();

    gruposLista.innerHTML = '';

    if (!Array.isArray(grupos) || grupos.length === 0) {
      gruposLista.innerHTML = '<li>Nenhum grupo encontrado para o usuário logado.</li>';
      return;
    }

    grupos.forEach(group => {
      const li = document.createElement('li');
      li.textContent = `${group.group_name} (ID Telegram: ${group.telegram_group_id})`;
      gruposLista.appendChild(li);

      const option = document.createElement('option');
      option.value = String(group.id);
      option.textContent = group.group_name;
      grupoSelect.appendChild(option);
    });
  } catch (error) {
    gruposLista.innerHTML = '<li>Erro ao carregar grupos do Telegram.</li>';
  }
}

async function carregarProdutosMonitorados() {
  const lista = document.getElementById('produtosMonitorados');
  if (!lista) return;

  try {
    const resp = await fetch(`${API_BASE_URL}/keyword-groups`);
    const monitoramentos = await resp.json();

    lista.innerHTML = '';

    if (!Array.isArray(monitoramentos) || monitoramentos.length === 0) {
      lista.innerHTML = '<li>Nenhum produto monitorado cadastrado ainda.</li>';
      return;
    }

    monitoramentos.forEach(item => {
      const li = document.createElement('li');
      const nomeProduto = item?.keyword?.keyword || 'Produto';
      const nomeGrupo = item?.group?.group_name || 'Grupo sem nome';
      li.textContent = `${nomeProduto} - monitorando em ${nomeGrupo}`;
      lista.appendChild(li);
    });
  } catch (error) {
    lista.innerHTML = '<li>Erro ao carregar produtos monitorados.</li>';
  }
}

document.getElementById('atualizarGrupos')?.addEventListener('click', carregarGruposTelegram);

document.getElementById('produtoForm')?.addEventListener('submit', async function (e) {
  e.preventDefault();
  const grupoSelect = document.getElementById('grupoSelect');
  const produtoInput = document.getElementById('produtoMonitorado');

  const groupId = Number(grupoSelect?.value || 0);
  const productName = (produtoInput?.value || '').trim();

  if (!groupId || !productName) {
    alert('Selecione um grupo e informe um produto para monitoramento.');
    return;
  }

  try {
    const userId = extrairUserIdDoToken();

    const keywordResp = await fetch(`${API_BASE_URL}/keywords`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ keyword: productName, userId }),
    });
    const keywordData = await keywordResp.json();

    if (!keywordResp.ok || !keywordData?.id) {
      throw new Error('Falha ao cadastrar produto monitorado.');
    }

    const relationResp = await fetch(`${API_BASE_URL}/keyword-groups`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ keywordId: keywordData.id, groupId }),
    });

    if (!relationResp.ok) {
      throw new Error('Falha ao vincular produto ao grupo.');
    }

    alert('Produto cadastrado para monitoramento com sucesso!');
    produtoInput.value = '';
    await carregarProdutosMonitorados();
  } catch (error) {
    alert('Nao foi possivel cadastrar o produto monitorado.');
  }
});

carregarGruposTelegram();
carregarProdutosMonitorados();

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
  const res = await fetch(`${API_BASE_URL}/auth/telegram-login`, {
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
