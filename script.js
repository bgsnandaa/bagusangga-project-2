// ==== DARK MODE TOGGLE ====

const toggleDarkMode = () => {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

document.addEventListener('DOMContentLoaded', () => {
  // Load theme from localStorage
  const theme = localStorage.getItem('theme');
  if (theme === 'dark') document.body.classList.add('dark-mode');

  // Add dark mode toggle button
  const btn = document.createElement('button');
  btn.textContent = '🌓 Mode';
  btn.id = 'darkToggle';
  btn.className = 'dark-toggle';
  btn.addEventListener('click', () => {
    toggleDarkMode();
    playClickSound();
  });
  document.body.appendChild(btn);
});

// ==== EFEK SUARA TOMBOL ====

const clickSound = new Audio('click.mp3');
clickSound.volume = 0.2;

function playClickSound() {
  clickSound.currentTime = 0;
  clickSound.play();
}

// Tambahkan efek suara ke semua tombol
document.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON' || e.target.classList.contains('start-button')) {
    playClickSound();
  }
});

// ==== KALKULATOR FISIKA ====

document.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById('formulaSelect');
  const inputArea = document.getElementById('inputArea');
  const calculateBtn = document.getElementById('calculateBtn');
  const result = document.getElementById('result');

  if (!select || !inputArea || !calculateBtn || !result) return;

  select.addEventListener('change', function () {
    const selected = this.value;
    inputArea.innerHTML = '';

    const inputs = {
      ep: ['massa', 'gravitasi', 'tinggi'],
      ek: ['massa', 'kecepatan'],
      newton: ['massa', 'percepatan'],
      glb: ['kecepatan', 'waktu'],
      tekanan: ['gaya', 'luas'],
      usaha: ['gaya', 'jarak']
    };

    const placeholders = {
      massa: 'Massa (kg)',
      gravitasi: 'Gravitasi (m/s²)',
      tinggi: 'Tinggi (m)',
      kecepatan: 'Kecepatan (m/s)',
      percepatan: 'Percepatan (m/s²)',
      waktu: 'Waktu (s)',
      gaya: 'Gaya (N)',
      luas: 'Luas (m²)',
      jarak: 'Jarak (m)'
    };

    if (inputs[selected]) {
      inputs[selected].forEach(id => {
        const input = document.createElement('input');
        input.type = 'number';
        input.id = id;
        input.placeholder = placeholders[id];
        inputArea.appendChild(input);
      });
    }
  });

  function getVal(id) {
    return parseFloat(document.getElementById(id)?.value) || 0;
  }

  calculateBtn.addEventListener('click', () => {
    const formula = select.value;
    let output = '';

    switch (formula) {
      case 'ep':
        output = `Energi Potensial = ${(getVal('massa') * getVal('gravitasi') * getVal('tinggi')).toFixed(2)} J`;
        break;
      case 'ek':
        output = `Energi Kinetik = ${(0.5 * getVal('massa') * getVal('kecepatan') ** 2).toFixed(2)} J`;
        break;
      case 'newton':
        output = `Gaya = ${(getVal('massa') * getVal('percepatan')).toFixed(2)} N`;
        break;
      case 'glb':
        output = `Jarak = ${(getVal('kecepatan') * getVal('waktu')).toFixed(2)} m`;
        break;
      case 'tekanan':
        output = `Tekanan = ${(getVal('gaya') / getVal('luas')).toFixed(2)} Pa`;
        break;
      case 'usaha':
        output = `Usaha = ${(getVal('gaya') * getVal('jarak')).toFixed(2)} J`;
        break;
      default:
        output = 'Silakan pilih dan isi rumus.';
    }

    result.textContent = output;
  });
});
