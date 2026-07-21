const OVERLAY_ID = 'fcl-loading-overlay';
const HIDDEN_CLASS = 'fcl-loading-hidden';
const REMOVE_FALLBACK_MS = 500;

function getTheme() {
  try {
    return localStorage.getItem('theme') || 'dark';
  } catch (e) {
    return 'dark';
  }
}

function createOverlay() {
  if (document.getElementById(OVERLAY_ID)) return;
  const overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  overlay.setAttribute('data-theme', getTheme() === 'light' ? 'light' : 'dark');
  overlay.innerHTML =
    '<div class="fcl-loading-spinner"></div>' +
    '<div class="fcl-loading-text">FCL 新手文档</div>';
  (document.body || document.documentElement).appendChild(overlay);
}

function hideOverlay() {
  const overlay = document.getElementById(OVERLAY_ID);
  if (!overlay || overlay.classList.contains(HIDDEN_CLASS)) return;

  overlay.classList.add(HIDDEN_CLASS);
  overlay.addEventListener(
    'transitionend',
    (e) => {
      if (e.propertyName === 'opacity') overlay.remove();
    },
    { once: true }
  );
  setTimeout(() => overlay.remove(), REMOVE_FALLBACK_MS);
}

if (typeof window !== 'undefined') {
  // ========== 首屏 ==========
  if (location.pathname === '/') {
    if (document.readyState === 'complete') {
      hideOverlay();
    } else {
      window.addEventListener('load', hideOverlay, { once: true });
      setTimeout(hideOverlay, 3000);
    }
  } else {
    // 非根路径：保险清理（比如从 / 前进后退过来）
    const existing = document.getElementById(OVERLAY_ID);
    if (existing) existing.remove();
  }

  // ========== SPA 软路由切换 ==========
  const origPushState = history.pushState;
  history.pushState = function (...args) {
    const url = args[2];
    let targetPath = '';
    if (typeof url === 'string') {
      targetPath = url.startsWith('http') ? new URL(url).pathname : url;
    }
    if (targetPath === '/') {
      createOverlay();
    }
    return origPushState.apply(this, args);
  };

  window.addEventListener('popstate', () => {
    if (location.pathname === '/') {
      createOverlay();
    }
  });
}

export function onRouteDidUpdate({ previousLocation, location }) {
  if (!previousLocation) return;

  if (location.pathname === '/') {
    // 根路径：新页面渲染完后淡出
    requestAnimationFrame(() => setTimeout(hideOverlay, 50));
  } else {
    // 非根路径：确保 overlay 绝对不存在
    const overlay = document.getElementById(OVERLAY_ID);
    if (overlay) overlay.remove();
  }
}
