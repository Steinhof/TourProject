(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{XvMQ:function(e,t,n){},u2Ty:function(e,t,n){"use strict";n.r(t);n("TeQF"),n("QWBl"),n("+2oP"),n("FZtP"),n("R5XZ");n("XvMQ");"loading"in HTMLImageElement.prototype&&document.querySelectorAll('img[loading="lazy"]').forEach((function(e){e.dataset.src&&(e.src=e.dataset.src),e.dataset.srcset&&(e.srcset=e.dataset.srcset)})),"IntersectionObserver"in window?document.addEventListener("DOMContentLoaded",(function(){var e=[].slice.call(document.querySelectorAll("img.lazyload")),t=new IntersectionObserver((function(e){return e.forEach((function(e){if(e.isIntersecting){var n=e.target;n.dataset.src&&(n.src=n.dataset.src),n.dataset.srcset&&(n.srcset=n.dataset.srcset),n.classList.remove("lazyload"),t.unobserve(n)}}))}));e.forEach((function(e){t.observe(e)}))})):document.addEventListener("DOMContentLoaded",(function(){var e=[].slice.call(document.querySelectorAll("img.lazyload")),t=!1,n=function n(){t||(t=!0,setTimeout((function(){e.forEach((function(t){t.getBoundingClientRect().top<=window.innerHeight&&t.getBoundingClientRect().bottom>=0&&"none"!==getComputedStyle(t).display&&(t.dataset.src&&(t.src=t.dataset.src),t.dataset.srcset&&(t.srcset=t.dataset.srcset),t.classList.remove("lazyload"),0===(e=e.filter((function(e){return e!==t}))).length&&(document.removeEventListener("scroll",n),window.removeEventListener("resize",n),window.removeEventListener("orientationchange",n)))})),t=!1}),200))};document.addEventListener("scroll",n),window.addEventListener("resize",n),window.addEventListener("orientationchange",n)})),document.addEventListener("DOMContentLoaded",(function(){var e=document.querySelectorAll("video.lazyload");if("IntersectionObserver"in window){var t=new IntersectionObserver((function(e,n){e.forEach((function(e){if(e.isIntersecting){for(var n in e.target.children){var r=e.target.children[n];"SOURCE"===r.tagName&&(r.src=r.dataset.src)}e.target.load(),e.target.classList.remove("lazyload"),t.unobserve(e.target)}}))}));e.forEach((function(e){t.observe(e)}))}})),"serviceWorker"in navigator&&(navigator.serviceWorker.controller?console.log("Active service worker found, no need to register"):navigator.serviceWorker.register("sw.js").then((function(e){return console.log("Service worker has been registered, scope: "+e.scope),navigator.serviceWorker.ready})).catch((function(e){return console.log(e)})))}},[["u2Ty",3,1,2]]]);