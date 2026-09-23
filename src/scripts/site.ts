export {};

const themeButtons = document.querySelectorAll<HTMLButtonElement>('[data-theme-choice]');

function updateTheme(theme: 'light' | 'dark') {
  document.documentElement.dataset.theme = theme;
  themeButtons.forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.themeChoice === theme));
  });
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#17191f' : '#F6F4EF');
}

updateTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
themeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const theme = button.dataset.themeChoice === 'dark' ? 'dark' : 'light';
    updateTheme(theme);
    try { localStorage.setItem('gitclient-theme', theme); } catch {}
  });
});

const menu = document.querySelector<HTMLButtonElement>('.menu-toggle');
const navigation = document.querySelector<HTMLElement>('#main-navigation');
function closeMenu() {
  menu?.setAttribute('aria-expanded', 'false');
  navigation?.classList.remove('is-open');
}
menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  navigation?.classList.toggle('is-open', open);
});
navigation?.addEventListener('click', (event) => {
  if ((event.target as HTMLElement).closest('a')) closeMenu();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menu.focus();
  }
});
document.documentElement.classList.add('js-ready');
