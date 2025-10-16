/* === ANIMASI PARTIKEL FUTURISTIK === */
const canvas = document.getElementById("particle-bg");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const particleCount = 120;
const particles = Array.from({ length: particleCount }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 2 + 1,
  dx: (Math.random() - 0.5) * 0.8,
  dy: (Math.random() - 0.5) * 0.8,
}));

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0, 217, 255, 0.8)";
  particles.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

/* === PHYSICSLAB - Kalkulator Fisika Modern === */

// Elemen utama
const formulaSelect = document.getElementById("formulaSelect");
const inputArea = document.getElementById("inputArea");
const calculateBtn = document.getElementById("calculateBtn");
const resultDiv = document.getElementById("result");

// Event Listener
formulaSelect.addEventListener("change", showInputs);
calculateBtn.addEventListener("click", calculate);

// === Fungsi menampilkan input dinamis ===
function showInputs() {
  const type = formulaSelect.value;
  inputArea.innerHTML = "";
  resultDiv.innerHTML = "";

  const fields = {
    glb: ["Jarak (meter)", "Waktu (detik)"],
    newton: ["Massa (kg)", "Percepatan (m/s²)"],
    ep: ["Massa (kg)", "Tinggi (meter)"],
    ek: ["Massa (kg)", "Kecepatan (m/s)"],
    tekanan: ["Gaya (Newton)", "Luas Permukaan (m²)"],
    usaha: ["Gaya (Newton)", "Perpindahan (meter)"],
  };

  if (!fields[type]) {
    inputArea.innerHTML = `<p>Pilih rumus untuk mulai menghitung.</p>`;
    return;
  }

  // Buat input sesuai rumus
  inputArea.innerHTML = fields[type]
    .map(
      (label, index) =>
        `<input type="number" id="val${index}" placeholder="${label}" required />`
    )
    .join("");
}

// === Fungsi perhitungan ===
function calculate() {
  const type = formulaSelect.value;
  if (!type) {
    resultDiv.textContent = "⚠️ Pilih jenis rumus terlebih dahulu!";
    return;
  }

  const get = (id) => parseFloat(document.getElementById(id)?.value || 0);
  let result = 0;

  try {
    switch (type) {
      case "glb": {
        const s = get("val0"), t = get("val1");
        if (t <= 0) throw "Waktu tidak boleh nol!";
        result = s / t;
        showResult(`Kecepatan = ${result.toFixed(2)} m/s`);
        break;
      }

      case "newton": {
        const m = get("val0"), a = get("val1");
        result = m * a;
        showResult(`Gaya = ${result.toFixed(2)} N`);
        break;
      }

      case "ep": {
        const m = get("val0"), h = get("val1");
        result = m * 9.8 * h;
        showResult(`Energi Potensial = ${result.toFixed(2)} J`);
        break;
      }

      case "ek": {
        const m = get("val0"), v = get("val1");
        result = 0.5 * m * v ** 2;
        showResult(`Energi Kinetik = ${result.toFixed(2)} J`);
        break;
      }

      case "tekanan": {
        const F = get("val0"), A = get("val1");
        if (A <= 0) throw "Luas tidak boleh nol!";
        result = F / A;
        showResult(`Tekanan = ${result.toFixed(2)} Pa`);
        break;
      }

      case "usaha": {
        const F = get("val0"), s = get("val1");
        result = F * s;
        showResult(`Usaha = ${result.toFixed(2)} J`);
        break;
      }

      default:
        showResult("⚠️ Pilih jenis perhitungan terlebih dahulu.");
    }
  } catch (err) {
    showResult(`❌ Error: ${err}`);
  }
}

// === Fungsi animasi hasil ===
function showResult(text) {
  resultDiv.textContent = text;
  resultDiv.style.opacity = 0;
  resultDiv.style.transform = "translateY(10px)";
  setTimeout(() => {
    resultDiv.style.transition = "all 0.6s ease";
    resultDiv.style.opacity = 1;
    resultDiv.style.transform = "translateY(0)";
  }, 50);
}
