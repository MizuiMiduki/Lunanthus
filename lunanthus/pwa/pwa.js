if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/lunanthus/pwa/sw.js').then(() => {
        console.log("Service Worker Registered");
    });
}
