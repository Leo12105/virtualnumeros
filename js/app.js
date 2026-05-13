import { numbersData } from './numbers.js';

const countries = ["Todos", "USA", "UK", "Canada", "Mexico", "Brazil", "Spain", "India"];

function createFilters() {
  const container = document.getElementById('filters');
  countries.forEach(country => {
    const btn = document.createElement('button');
    btn.className = `px-6 py-2.5 rounded-xl font-medium transition-all ${country === "Todos" ? 
      'bg-blue-600 text-white' : 'bg-gray-800 hover:bg-gray-700'}`;
    btn.textContent = country;
    btn.onclick = () => filterByCountry(country, btn);
    container.appendChild(btn);
  });
}

function filterByCountry(selected, clickedBtn) {
  document.querySelectorAll('#filters button').forEach(btn => {
    btn.classList.remove('bg-blue-600', 'text-white');
    btn.classList.add('bg-gray-800', 'hover:bg-gray-700');
  });
  clickedBtn.classList.add('bg-blue-600', 'text-white');
  clickedBtn.classList.remove('bg-gray-800', 'hover:bg-gray-700');

  const filtered = selected === "Todos" 
    ? numbersData 
    : numbersData.filter(n => n.country === selected);

  renderNumbers(filtered);
}

function copyNumber(number) {
  navigator.clipboard.writeText(number);
  
  const toast = document.createElement('div');
  toast.className = 'fixed bottom-5 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-2xl shadow-xl toast';
  toast.textContent = `✅ Copiado: ${number}`;
  document.body.appendChild(toast);
  
  setTimeout(() => toast.remove(), 2500);
}

function renderNumbers(data) {
  const tbody = document.getElementById('numbersBody');
  tbody.innerHTML = '';

  data.forEach(item => {
    const row = document.createElement('tr');
    row.className = 'border-b border-gray-700 hover:bg-gray-800 transition-colors';
    row.innerHTML = `
      <td class="p-5 font-medium">${item.flag} ${item.country}</td>
      <td class="p-5 font-mono text-xl">${item.number}</td>
      <td class="p-5 text-center">
        <button onclick="copyNumber('${item.number}')" 
                class="bg-blue-600 hover:bg-blue-700 px-6 py-2.5 rounded-xl text-sm font-medium transition">
          <i class="fas fa-copy mr-2"></i>Copiar
        </button>
      </td>
      <td class="p-5 text-center text-gray-400 text-sm">${item.updated}</td>
    `;
    tbody.appendChild(row);
  });
}

// Inicializar
createFilters();
renderNumbers(numbersData);

// Hacer copyNumber disponible globalmente
window.copyNumber = copyNumber;
