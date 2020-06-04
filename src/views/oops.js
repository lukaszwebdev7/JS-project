import $ from "jquery";

export const home = () => {
    const fragment = $(new DocumentFragment());

    const h1 = $('<h1>Oops</h1>');
    const p = $('<p>Ooos coś poszło nie tak</p>');

    fragment.append(h1).append(p);
    return fragment;
}