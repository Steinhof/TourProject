import '../sass/main.sass';
import lazyLoadingImages from './abstraction/layout/lazyImages';
import registerServiceWorker from './implementation/serviceWorker/registerServiceWorker';
import lazyLoadingVideos from './abstraction/layout/lazyVideos';

// Lazy loading images
lazyLoadingImages();

// Lazy loading video
lazyLoadingVideos();

// Service Worker
registerServiceWorker();
