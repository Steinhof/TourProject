import lazyLoadingImages from './abstraction/layout/lazyImages';
import registerServiceWorker from './implementation/serviceWorker/registerServiceWorker';
import lazyLoadingVideos from './abstraction/layout/lazyVideos';

// Sass module
import styles from '../sass/main.sass';

styles();

// Lazy loading images
lazyLoadingImages();

// Lazy loading video
lazyLoadingVideos();

// Service Worker
registerServiceWorker();
