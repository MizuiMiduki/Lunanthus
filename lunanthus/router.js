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

            if (route.script) {
                const existingScript = document.querySelector(`script[src="${route.script}"]`);
                if (existingScript) {
                    existingScript.remove();
                }

                const script = document.createElement("script");
                script.src = route.script + `?t=${Date.now()}`;
                script.type = "module";
                document.body.appendChild(script);
            }
        } else {
            app.innerHTML = "<h1>404<br>Not Found</h1>";
        }
    };

    window.addEventListener("popstate", renderPage);

    document.body.addEventListener("click", (event) => {
        const target = event.target.closest("a");
        if (target && target.href && target.origin === location.origin) {
            const pathname = new URL(target.href).pathname;
            if (routes.default.some(r => r.path === pathname)) {
                event.preventDefault();
                history.pushState(null, "", pathname);
                renderPage();
            }
        }
    });

    renderPage();
});
