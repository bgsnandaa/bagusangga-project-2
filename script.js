// === PHYSICSLAB - Kalkulator Fisika Modern ===

// Ambil elemen HTML
const formulaSelect = document.getElementById('formulaSelect');
const inputArea = document.getElementById('inputArea');
const calculateBtn = document.getElementById('calculateBtn');
const resultDiv = document.getElementById('result');

// Event listener
formulaSelect.addEventListener('change', showInputs);
calculateBtn.addEventListener('click', calculate);

// === FUNGSI UNTUK MENAMPILKAN INPUT SESUAI RUMUS ===
function showInputs() {
  const type = formulaSelect.value;
  inputArea.innerHTML = '';
  resultDiv.innerHTML = '';

  switch (type) {
    case 'glb':
      inputArea.innerHTML = `
        <input type="number" id="s" placeholder="Jarak (meter)">
        <input type="number" id="t" placeholder="Waktu (detik)">
      `;
      break;

    case 'newton':
      inputArea.innerHTML = `
        <input type="number" id="m" placeholder="Massa (kg)">
        <input type="number" id="a" placeholder="Percepatan (m/s²)">
      `;
      break;

    case 'ep':
      inputArea.innerHTML = `
        <input type="number" id="m" placeholder="Massa (kg)">
        <input type="number" id="h" placeholder="Tinggi (meter)">
      `;
      break;

    case 'ek':
      inputArea.innerHTML = `
        <input type="number" id="m" placeholder="Massa (kg)">
        <input type="number" id="v" placeholder="Kecepatan (m/s)">
      `;
      break;

    case 'tekanan':
      inputArea.innerHTML = `
        <input type="number" id="F" placeholder="Gaya (Newton)">
        <input type="number" id="A" placeholder="Luas Permukaan (m²)">
      `;
      break;

    case 'usaha':
      inputArea.innerHTML = `
        <input type="number" id="F" placeholder="Gaya (Newton)">
        <input type="number" id="s" placeholder="Perpindahan (meter)">
      `;
      break;

    default:
      inputArea.innerHTML = `<p>Pilih rumus untuk mulai menghitung.</p>`;
  }
}

// === FUNGSI UNTUK MENGHITUNG HASIL ===
function calculate() {
  const type = formulaSelect.value;
  let result = 0;

  switch (type) {
    case 'glb':
      const s = parseFloat(document.getElementById('s').value);
      const t = parseFloat(document.getElementById('t').value);
      if (t === 0 || isNaN(s) || isNaN(t)) {
        resultDiv.textContent = "Masukkan nilai yang benar.";
        return;
      }
      result = s / t;
      resultDiv.textContent = `Kecepatan = ${result.toFixed(2)} m/s`;
      break;

    case 'newton':
      const m1 = parseFloat(document.getElementById('m').value);
      const a = parseFloat(document.getElementById('a').value);
      result = m1 * a;
      resultDiv.textContent = `Gaya = ${result.toFixed(2)} N`;
      break;

    case 'ep':
      const m2 = parseFloat(document.getElementById('m').value);
      const h = parseFloat(document.getElementById('h').value);
      result = m2 * 9.8 * h;
      resultDiv.textContent = `Energi Potensial = ${result.toFixed(2)} J`;
      break;

    case 'ek':
      const m3 = parseFloat(document.getElementById('m').value);
      const v = parseFloat(document.getElementById('v').value);
      result = 0.5 * m3 * v ** 2;
      resultDiv.textContent = `Energi Kinetik = ${result.toFixed(2)} J`;
      break;

    case 'tekanan':
      const F = parseFloat(document.getElementById('F').value);
      const A = parseFloat(document.getElementById('A').value);
      result = F / A;
      resultDiv.textContent = `Tekanan = ${result.toFixed(2)} Pa`;
      break;

    case 'usaha':
      const F2 = parseFloat(document.getElementById('F').value);
      const s2 = parseFloat(document.getElementById('s').value);
      result = F2 * s2;
      resultDiv.textContent = `Usaha = ${result.toFixed(2)} J`;
      break;

    default:
      resultDiv.textContent = 'Silakan pilih rumus terlebih dahulu.';
  }

  // Animasi hasil
  resultDiv.style.animation = 'fadeIn 0.6s ease-in';
}
