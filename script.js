// ===== DARK MODE TOGGLE =====
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// ====== SUARA KLIK ======
const clickSound = new Audio('click.mp3'); // pastikan file ini ada
clickSound.volume = 0.2;

function playClickSound() {
  clickSound.currentTime = 0;
  clickSound.play().catch((e) => {
    console.warn('Gagal memutar suara klik:', e);
  });
}

// ====== SAAT DOKUMEN SIAP ======
document.addEventListener('DOMContentLoaded', () => {
  // Aktifkan tema tersimpan dari localStorage
  const theme = localStorage.getItem('theme');
  if (theme === 'dark') {
    document.body.classList.add('dark-mode');
  }

  // Tambahkan tombol dark mode toggle
  const btn = document.createElement('button');
  btn.textContent = '🌓 Mode';
  btn.id = 'darkToggle';
  btn.className = 'dark-toggle';
  btn.addEventListener('click', () => {
    toggleDarkMode();
    playClickSound();
  });
  document.body.appendChild(btn);

  // Ambil elemen kalkulator
  const select = document.getElementById('formulaSelect');
  const inputArea = document.getElementById('inputArea');
  const calculateBtn = document.getElementById('calculateBtn');
  const result = document.getElementById('result');

  // Validasi: Pastikan ini
