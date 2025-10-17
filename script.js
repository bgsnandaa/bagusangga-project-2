// Tampilkan Kalkulator saat tombol "Mulai" ditekan
function showCalculator() {
  document.getElementById('startScreen').classList.add('hidden');
  document.getElementById('calculatorSection').classList.remove('hidden');
}

// Tampilkan input sesuai rumus yang dipilih
document.getElementById('formulaSelect').addEventListener('change', function () {
  const selected = this.value;
  const inputArea = document.getElementById('inputArea');
  inputArea.innerHTML = '';

  switch (selected) {
    case 'ep':
      inputArea.innerHTML = `
        <input type="number" id="massa" placeholder="Massa (kg)" />
        <input type="number" id="gravitasi" placeholder="Gravitasi (m/s²)" value="9.8" />
        <input type="number" id="tinggi" placeholder="Tinggi (m)" />
      `;
      break;

    case 'ek':
      inputArea.innerHTML = `
        <input type="number" id="massa" placeholder="Massa (kg)" />
        <input type="number" id="kecepatan" placeholder="Kecepatan (m/s)" />
      `;
      break;

    case 'newton':
      inputArea.innerHTML = `
        <input type="number" id="massa" placeholder="Massa (kg)" />
        <input type="number" id="percepatan" placeholder="Percepatan (m/s²)" />
      `;
      break;

    case 'glb':
      inputArea.innerHTML = `
        <input type="number" id="kecepatan" placeholder="Kecepatan (m/s)" />
        <input type="number" id="waktu" placeholder="Waktu (s)" />
      `;
      break;

    case 'tekanan':
      inputArea.innerHTML = `
        <input type="number" id="gaya" placeholder="Gaya (N)" />
        <input type="number" id="luas" placeholder="Luas (m²)" />
      `;
      break;

    case 'usaha':
      inputArea.innerHTML = `
        <input type="number" id="gaya" placeholder="Gaya (N)" />
        <input type="number" id="jarak" placeholder="Jarak (m)" />
      `;
      break;
  }
});

// Fungsi bantu untuk ambil nilai input
function getValue(id) {
  return parseFloat(document.getElementById(id)?.value) || 0;
}

// Kalkulasi saat tombol "Hitung" ditekan
document.getElementById('calculateBtn').addEventListener('click', function () {
  const selected = document.getElementById('formulaSelect').value;
  const result = document.getElementById('result');
  let output = '';

  switch (selected) {
    case 'ep':
      const ep = getValue('massa') * getValue('gravitasi') * getValue('tinggi');
      output = `Energi Potensial = ${ep.toFixed(2)} Joule`;
      break;

    case 'ek':
      const ek = 0.5 * getValue('massa') * Math.pow(getValue('kecepatan'), 2);
      output = `Energi Kinetik = ${ek.toFixed(2)} Joule`;
      break;

    case 'newton':
      const f = getValue('massa') * getValue('percepatan');
      output = `Gaya = ${f.toFixed(2)} Newton`;
      break;

    case 'glb':
      const s = getValue('kecepatan') * getValue('waktu');
      output = `Jarak = ${s.toFixed(2)} meter`;
      break;

    case 'tekanan':
      const p = getValue('gaya') / getValue('luas');
      output = `Tekanan = ${p.toFixed(2)} Pascal`;
      break;

    case 'usaha':
      const w = getValue('gaya') * getValue('jarak');
      output = `Usaha = ${w.toFixed(2)} Joule`;
      break;

    default:
      output = 'Silakan pilih rumus dan masukkan data.';
  }

  result.textContent = output;
});
