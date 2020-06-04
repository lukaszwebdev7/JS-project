import $ from 'jquery';
import { oops } from '../views/oops'

export class Router {
    constructor(routes) {
        this.routes = routes;
        this.outlet;
        this.body = $(document.body);
    }
    mount(outlet) {
        this.outlet = outlet;
        this.body.on('routechange', (event, detail) => {
            const { path } = detail;
            this.navigate(path);
        })
    }

    init() {
        const path = location.pathname;
        this.navigate(path);
    }

    get(path) {
        return this.routes.find(route => route.path === path);
    }
    has(path) {
        return this.get(path) !== undefined;
    }
    navigate(path, data = {}) {
        if (this.has(path)) {
            //osługuje istniejącą scieżkę
            //const x = this.get(path);
            //const component = x.component;
            //const html = component();

            //a z pomocą ES6
            const { component } = this.get(path);
            const html = component();

            //renderuje nowy widok wewnątrz elementu "outlet"

            this.outlet.empty().append(html);
        } else {
            // obsługuje nieistniejącą ścieżkę
            const html = oops();
            this.outlet.empty().append(html);

        }
        history.pushState(data, '', path);
    }
}