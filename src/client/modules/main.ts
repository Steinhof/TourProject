import '../sass/main.sass';
import lazyLoadingImages from './abstraction/layout/layout';
import registerServiceWorker from './implementation/serviceWorker/registerServiceWorker';

// Lazy load
lazyLoadingImages();

// Service Worker
registerServiceWorker();
