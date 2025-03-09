document.addEventListener("DOMContentLoaded", async () => {
    const routes = await import("/lunanthus/routes.js");
    const app = document.getElementById("app");

    const renderPage = async () => {
        const path = location.pathname;
        const route = routes.default.find(r => r.path === path);
        if (route) {
            const response = await fetch(route.file);
            const html = await response.text();
            app.innerHTML = html;
        } else {
            app.innerHTML = "<h1>404 Not Found</h1>";
        }
    };

    window.addEventListener("popstate", renderPage);
    renderPage();
});
