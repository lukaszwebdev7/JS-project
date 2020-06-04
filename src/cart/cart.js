//cart.js

import $ from "jquery";

export default class Cart {
    constructor() {
        this.key = 'IT_SPA_CART';

        if (!this.exists()) {
            this.setItSpaCart([]);
        }
    }

    get() {
        const cookies = document.cookie.split('; ');

        //zwraca ciąg znaków ("IT_SPA_CART=wartość") lub undeifed
        return cookies.find(cookie => cookie.startsWith(this.key));
    }

    //aby w przypadku przeładowania towary nie zniknęły z koszyka
    exists() {
        return this.get() !== undefined;
    }

    //metoda która ma zwrócić zawartość koszyka
    getItSpaCart() {
        const cookieValue = this.get().slice(12);
        //"{foo:1, bar:{2, 3, 4}}" -> {foo:1, bar:{[2, 3, 4]}
        const parsedValue = JSON.parse(cookieValue);

        return parsedValue;
    }

    setItSpaCart(value) {
        const stringifiedValue = JSON.stringify(value);
        document.cookie = `${this.key}=${stringifiedValue}`;
    }

    //zakładając że koszyk jest tablicą
    add(item) {
        //dodatje produkt do koszyka
        const cartValue = this.getItSpaCart();
        this.setItSpaCart([...cartValue, item]);
    }

    remove(item) {
        const cartValue = this.getItSpaCart();
        const itemInCart = cartValue.findIndex(val => val.name === item.name);

        if (itemInCart !== -1) {
            cartValue.splice(itemInCart, 1);
            this.setItSpaCart(cartValue);

        }
    }
    //usuwa produkt z koszyka


}





