// ============================================
// PER Smart Airport – Simple Hash Router
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
    const raw = window.location.hash.replace('#', '') || 'dashboard';
    const [path, queryString] = raw.split('?');
    const params = {};
    if (queryString) {
        queryString.split('&').forEach(pair => {
            const [key, value] = pair.split('=');
            if (key) params[decodeURIComponent(key)] = decodeURIComponent(value || '');
        });
    }
    bus.emit('route:change', path);
    if (routes[path]) {
        routes[path](params);
    }
}

export function navigateTo(path) {
    window.location.hash = path;
}
