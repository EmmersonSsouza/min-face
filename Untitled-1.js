// Seleção de elementos
const postForm = document.getElementById('postForm');
const postInput = document.getElementById('postInput');
const postsContainer = document.getElementById('postsContainer');

// Inicializa postagens do LocalStorage
let posts = JSON.parse(localStorage.getItem('posts')) || [];

// Função para renderizar o feed
function renderPosts() {
  postsContainer.innerHTML = '';
  posts.forEach((post, index) => {
    const postCard = document.createElement('div');
    postCard.className = 'post';
    postCard.innerHTML = `
      <div class="post-header">
        <img src="https://via.placeholder.com/40" alt="Foto do perfil">
        <div>
          <span class="user-name">Usuário Fictício</span>
          <span class="post-time">há poucos segundos</span>
        </div>
      </div>
      <div class="post-content">
        <p>${post}</p>
      </div>
      <div class="post-actions">
        <button onclick="editPost(${index})">Editar</button>
        <button onclick="deletePost(${index})">Excluir</button>
      </div>
    `;
    postsContainer.appendChild(postCard);
  });
}

// Função para criar uma nova postagem
postForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const newPost = postInput.value.trim();
  if (newPost) {
    posts.unshift(newPost); // Adiciona ao início do array
    localStorage.setItem('posts', JSON.stringify(posts));
    postInput.value = '';
    renderPosts();
  }
});

// Função para editar uma postagem
function editPost(index) {
  const updatedPost = prompt('Edite sua postagem:', posts[index]);
  if (updatedPost !== null) {
    posts[index] = updatedPost.trim();
    localStorage.setItem('posts', JSON.stringify(posts));
    renderPosts();
  }
}

// Função para excluir uma postagem
function deletePost(index) {
  if (confirm('Tem certeza que deseja excluir esta postagem?')) {
    posts.splice(index, 1);
    localStorage.setItem('posts', JSON.stringify(posts));
    renderPosts();
  }
}

// Renderiza o feed ao carregar a página
renderPosts();
