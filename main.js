const BASE_URL = "http://127.0.0.1:5678";

// Health Check
document.getElementById("checkHealth").addEventListener("click", async () => {
  const el = document.getElementById("healthStatus");
  try {
    const res = await fetch(`${BASE_URL}/api/health`);
    const data = await res.json();
    el.textContent = "✅ API OK: " + JSON.stringify(data);
  } catch (err) {
    el.textContent = "❌ API ERROR";
  }
});

// Scan Barcode
document.getElementById("scanBtn").addEventListener("click", async () => {
  const kode = document.getElementById("barcodeInput").value;
  const resultDiv = document.getElementById("scanResult");

  if (!kode) return alert("Isi barcode dulu");

  try {
    const res = await fetch(`${BASE_URL}/api/scan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ kode_barcode: kode })
    });

    const data = await res.json();

    resultDiv.innerHTML = `
      <p><b>Kode:</b> ${kode}</p>
      <p><b>Nama:</b> ${data.nama_rawmaterial || "-"}</p>
      <p><b>Merk:</b> ${data.merk_type || "-"}</p>
    `;
  } catch (err) {
    resultDiv.textContent = "Error scan";
  }
});

// Load History
document.getElementById("loadHistory").addEventListener("click", async () => {
  const table = document.getElementById("historyTable");

  try {
    const res = await fetch(`${BASE_URL}/api/history?limit=10&page=1`);
    const data = await res.json();

    table.innerHTML = "";

    data.rows.forEach(item => {
      const row = `
        <tr>
          <td>${item.kode_barcode}</td>
          <td>${item.nama_rawmaterial || "-"}</td>
          <td>${item.merk_type || "-"}</td>
          <td>${item.created_at || "-"}</td>
        </tr>
      `;
      table.innerHTML += row;
    });

  } catch (err) {
    table.innerHTML = `<tr><td colspan="4">Error load data</td></tr>`;
  }
});