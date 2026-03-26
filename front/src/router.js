// ============================================
// KSIA Smart Airport – Simple Hash Router
// ============================================
import { bus } from './utils/helpers.js';

const routes = {};

export function registerRoute(path, handler) {
    routes[path] = handler;
}

export function initRouter() {
    window.addEventListener('hashchange', handleRoute);
    // Initial route
    handleRoute();
}

function handleRoute() {
    const hash = window.location.hash.replace('#', '') || 'dashboard';
    bus.emit('route:change', hash);
    if (routes[hash]) {
        routes[hash]();
    }
}

export function navigateTo(path) {
    window.location.hash = path;
}
