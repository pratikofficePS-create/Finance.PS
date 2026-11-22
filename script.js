const searchInput = document.querySelector('#job-search');
const cityFilter = document.querySelector('#city-filter');
const processFilter = document.querySelector('#process-filter');
const jobCards = [...document.querySelectorAll('.job-card')];
const resultCount = document.querySelector('#result-count');
const emptyState = document.querySelector('#empty-state');

function filterJobs() {
  const query = searchInput.value.trim().toLowerCase();
  const city = cityFilter.value;
  const process = processFilter.value;
  let count = 0;
  jobCards.forEach((card) => {
    const matches = (!city || card.dataset.city === city) &&
      (!process || card.dataset.process === process) &&
      (!query || `${card.dataset.search} ${card.dataset.city} ${card.textContent}`.toLowerCase().includes(query));
    card.hidden = !matches;
    if (matches) count += 1;
  });
  resultCount.textContent = `Example roles · ${count} shown`;
  emptyState.hidden = count > 0;
}

document.querySelector('#search-button').addEventListener('click', filterJobs);
searchInput.addEventListener('input', filterJobs);
cityFilter.addEventListener('change', filterJobs);
processFilter.addEventListener('change', filterJobs);
document.querySelector('#clear-filters').addEventListener('click', () => {
  searchInput.value = '';
  cityFilter.value = '';
  processFilter.value = '';
  filterJobs();
});

document.querySelectorAll('.job-save').forEach((saveButton) => {
  saveButton.setAttribute('role', 'button');
  saveButton.setAttribute('tabindex', '0');
  saveButton.setAttribute('aria-pressed', 'false');
  const toggleSaved = () => {
    const saved = saveButton.classList.toggle('saved');
    saveButton.textContent = saved ? '♥' : '♡';
    saveButton.setAttribute('aria-pressed', String(saved));
    saveButton.setAttribute('aria-label', saved ? 'Remove saved role' : 'Save role');
  };
  saveButton.addEventListener('click', toggleSaved);
  saveButton.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleSaved();
    }
  });
});

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');
menuButton.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  menuButton.textContent = open ? '×' : '☰';
});
navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
  menuButton.textContent = '☰';
}));

document.querySelector('#newsletter-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const message = document.querySelector('#newsletter-message');
  message.textContent = 'Thanks for your interest. Newsletter signup will be available soon.';
  message.style.color = '#dcedaa';
  event.target.reset();
});

filterJobs();
