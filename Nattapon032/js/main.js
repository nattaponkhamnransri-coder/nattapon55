// 1) สลับโหมดสว่าง/มืด (จำค่าไว้ใน localStorage)
function applyTheme(t){
  document.documentElement.setAttribute('data-bs-theme', t);
  const b = document.getElementById('themeBtn');
  if (b) b.innerHTML = t === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
}
function toggleTheme(){
  const next = document.documentElement.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', next);
  applyTheme(next);
}
// 2) ค้นหา/กรองบริการ
function filterServices(){
  const q = document.getElementById('search').value.trim().toLowerCase();
  const cat = document.getElementById('category').value;
  let shown = 0;
  document.querySelectorAll('.service').forEach(el => {
    const ok = el.textContent.toLowerCase().includes(q) && (cat === 'all' || el.dataset.cat === cat);
    el.classList.toggle('d-none', !ok);
    if (ok) shown++;
  });
  document.getElementById('noResult').classList.toggle('d-none', shown > 0);
}
// 3) ตรวจสอบแบบฟอร์ม
function validateContactForm(e){
  e.preventDefault();
  const form = e.target;
  let valid = true;
  form.querySelectorAll('input,textarea').forEach(f => {
    const ok = f.checkValidity();
    f.classList.toggle('is-invalid', !ok);
    f.classList.toggle('is-valid', ok);
    if (!ok) valid = false;
  });
  document.getElementById('formOk').classList.toggle('d-none', !valid);
  if (valid) { form.reset(); form.querySelectorAll('.is-valid').forEach(f => f.classList.remove('is-valid')); }
}
// API: Open-Meteo (บุรีรัมย์) พร้อม loading + error handling
async function loadWeather(){
  const box = document.getElementById('weather');
  const url = 'https://api.open-meteo.com/v1/forecast?latitude=14.99&longitude=103.10&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m&timezone=Asia%2FBangkok';
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const c = (await res.json()).current;
    const tip = c.temperature_2m >= 35 ? 'อากาศร้อนจัด ไม่ควรพาสัตว์เลี้ยงเดินบนพื้นถนนช่วงกลางวัน' :
                c.precipitation > 0 ? 'ฝนตก ระวังสัตว์เลี้ยงเปียกชื้นและเป็นหวัด' : 'อากาศเหมาะแก่การพาสัตว์เลี้ยงเดินเล่น';
    box.className = 'alert alert-info';
    box.innerHTML = `<i class="fa-solid fa-temperature-half"></i> อุณหภูมิ <strong>${c.temperature_2m}°C</strong> · ความชื้น ${c.relative_humidity_2m}% · ฝน ${c.precipitation} มม. · ลม ${c.wind_speed_10m} กม./ชม.<br>${tip}`;
  } catch (err) {
    box.className = 'alert alert-danger';
    box.textContent = 'ไม่สามารถโหลดข้อมูลสภาพอากาศได้ กรุณาลองใหม่ภายหลัง';
    console.error(err);
  }
}
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(localStorage.getItem('theme') || 'light');
  document.getElementById('themeBtn').addEventListener('click', toggleTheme);
  if (document.getElementById('search')) {
    document.getElementById('search').addEventListener('input', filterServices);
    document.getElementById('category').addEventListener('change', filterServices);
  }
  if (document.getElementById('weather')) loadWeather();
  const f = document.getElementById('contactForm');
  if (f) f.addEventListener('submit', validateContactForm);
});
