/*
 * If lazy attribute active, else use a fallback func
 */
export default function lazyLoadingImages() {
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach((img: any) => {
            if (img.dataset.src) {
                img.src = img.dataset.src!;
            }
            if (img.dataset.srcset) {
                img.srcset = img.dataset.srcset;
            }
        });
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            const lazyImages = document.querySelectorAll('img.lazyload');
            if ('IntersectionObserver' in window) {
                const lazyImageObserver = new IntersectionObserver(
                    (entries: any[]) => {
                        return entries.forEach(
                            (item: IntersectionObserverEntry) => {
                                if (item.isIntersecting) {
                                    const lazyImage = item.target as HTMLImageElement;
                                    if (lazyImage.dataset.src) {
                                        lazyImage.src = lazyImage.dataset.src;
                                    }
                                    if (lazyImage.dataset.srcset) {
                                        lazyImage.srcset =
                                            lazyImage.dataset.srcset;
                                    }
                                    lazyImage.classList.remove('lazyload');
                                    lazyImageObserver.unobserve(lazyImage);
                                }
                            },
                        );
                    },
                );

                lazyImages.forEach(lazyImage => {
                    lazyImageObserver.observe(lazyImage);
                });
            } else {
                // Possibly fallback to a more compatible method here
            }
        });
    }
}
