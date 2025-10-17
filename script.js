// ===== DARK MODE & TOGGLE =====
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

document.addEventListener('DOMContentLoaded', () => {
  // Muat preferensi tema
  const theme = localStorage.getItem('theme');
  if (theme === 'dark') {
    document.body.classList.add('dark-mode');
  }

  // Tambah tombol toggle dark mode
  const btn = document.createElement('button');
  btn.textContent = '🌓 Mode';
  btn.id = 'darkToggle';
  btn.className = 'dark-toggle';
  btn.addEventListener('click', () => {
    toggleDarkMode();
    playClickSound();
  });
  document.body.appendChild(btn);

  // Inisialisasi kalkulator jika di halaman kalkulator
  const select = document.getElementById('formulaSelect');
  const inputArea = document.getElementById('inputArea');
  const calculateBtn = document.getElementById('calculateBtn');
  const result = document.getElementById('result');

  if (select && inputArea && calculateBtn && result) {
    select.addEventListener('change', () => {
      const sel = select.value;
      inputArea.innerHTML = '';

      const mapInputs = {
        ep: ['massa', 'gravitasi', 'tinggi'],
        ek: ['massa', 'kecepatan'],
        newton: ['massa', 'percepatan'],
        glb: ['kecepatan', 'waktu'],
        tekanan: ['gaya', 'luas'],
        usaha: ['gaya', 'jarak']
      };
      const ph = {
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

      if (mapInputs[sel]) {
        mapInputs[sel].forEach(id => {
          const inp = document.createElement('input');
          inp.type = 'number';
          inp.id = id;
          inp.placeholder = ph[id];
          inputArea.appendChild(inp);
        });
      }
    });

    calculateBtn.addEventListener('click', () => {
      const sel = select.value;
      function gv(id) {
        return parseFloat(document.getElementById(id)?.value) || 0;
      }
      let out = '';
      switch (sel) {
        case 'ep':
          out = `Energi Potensial = ${(gv('massa') * gv('gravitasi') * gv('tinggi')).toFixed(2)} J`;
          break;
        case 'ek':
          out = `Energi Kinetik = ${(0.5 * gv('massa') * gv('kecepatan') ** 2).toFixed(2)} J`;
          break;
        case 'newton':
          out = `Gaya = ${(gv('massa') * gv('percepatan')).toFixed(2)} N`;
          break;
        case 'glb':
          out = `Jarak = ${(gv('kecepatan') * gv('waktu')).toFixed(2)} m`;
          break;
        case 'tekanan':
          // hindari pembagian dengan nol
          if (gv('luas') === 0) {
            out = 'Luas tidak boleh nol';
          } else {
            out = `Tekanan = ${(gv('gaya') / gv('luas')).toFixed(2)} Pa`;
          }
          break;
        case 'usaha':
          out = `Usaha = ${(gv('gaya') * gv('jarak')).toFixed(2)} J`;
          break;
        default:
          out = 'Silakan pilih dan isi rumus.';
      }
      result.textContent = out;
      playClickSound();
    });
  }
});

// ===== SUARA KLIK =====
const clickSound = new Audio('click.mp3');
clickSound.volume = 0.2;

function playClickSound() {
  clickSound.currentTime = 0;
  clickSound.play().catch(e => {
    // fallback jika audio tidak bisa dimainkan
    // console.log('Audio click gagal: ', e);
  });
}

document.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON' || e.target.classList.contains('start-button')) {
    playClickSound();
  }
});
