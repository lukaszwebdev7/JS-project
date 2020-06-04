//nav.js
import {navItem} from './nav-item';
import $ from 'jquery';
import {routes} from '../router';

export const nav = () => {
    const fragment = $(new DocumentFragment());

    const navBar = $(`
    <nav class="navbar navbar-expand navbar-dark bg-dark">
    <span class="navbar-brand">IT SPA</span>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
    <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarResponsive">
    <ul class="navbar-nav ml-auto"></ul>
    </div>
    </nav>`);

    //uzupełnij ul elementami li

    const navBarItems = routes.map(route => navItem(route));
    //tutaj trzeba wydzielić do osobnego pliku

    navBar.find('ul').append(navBarItems);

    fragment.append(navBar);

    return fragment;
}