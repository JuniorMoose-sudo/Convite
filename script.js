// Elementos principais
const envelope = document.getElementById("envelope");
const convite = document.getElementById("convite");
const loadingScreen = document.getElementById("loadingScreen");
const musicToggle = document.getElementById("musicToggle");
const bgMusic = document.getElementById("bgMusic");

let aberto = false;
let musicStarted = false;
let isMusicPlaying = false;

// Data do casamento
const weddingDate = new Date('2024-12-15T18:00:00').getTime();

// Loading Screen
window.addEventListener('load', () => {
  setTimeout(() => {
    loadingScreen.classList.add('fade-out');
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 1000);
  }, 2000);
});

// Animação do envelope
envelope.addEventListener("click", () => {
  if (!aberto) {
    envelope.classList.add("open");
    setTimeout(() => convite.classList.add("show"), 800);
    aberto = true;
    
    // Iniciar música na primeira interação
    if (!musicStarted) {
      startBackgroundMusic();
      musicStarted = true;
    }
  } else {
    envelope.classList.remove("open");
    convite.classList.remove("show");
    aberto = false;
  }
});

// Controle de música
function startBackgroundMusic() {
  bgMusic.volume = 0.3;
  bgMusic.play().then(() => {
    isMusicPlaying = true;
    musicToggle.innerHTML = '🎵';
  }).catch(e => {
    console.log("Reprodução automática bloqueada. Clique para ativar.");
    musicToggle.innerHTML = '🔇';
  });
}

musicToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  
  if (isMusicPlaying) {
    bgMusic.pause();
    isMusicPlaying = false;
    musicToggle.innerHTML = '🔇';
  } else {
    bgMusic.play();
    isMusicPlaying = true;
    musicToggle.innerHTML = '🎵';
  }
});

// Confirmação de presença
document.getElementById("confirmar").addEventListener("click", (e) => {
  e.preventDefault();
  const mensagem = encodeURIComponent(
    "Olá! 💌 Estou muito feliz em confirmar minha presença no casamento. Que seja um dia inesquecível! 💍✨"
  );
  const telefone = "5583991314075";
  window.open(`https://wa.me/${telefone}?text=${mensagem}`, "_blank");
});

// Prevenir comportamento de arrastar na imagem
document.querySelector('.convite-img').addEventListener('dragstart', (e) => {
  e.preventDefault();
});

// Parar música ao sair da página
window.addEventListener('beforeunload', () => {
  bgMusic.pause();
  bgMusic.currentTime = 0;
});

// Parar música ao clicar em qualquer link
document.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    bgMusic.pause();
    bgMusic.currentTime = 0;
  });
});

// (Opcional) Pausar música ao trocar de aba
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    bgMusic.pause();
  } else if (isMusicPlaying) {
    bgMusic.play();
  }
});
