import '../styles/Bookings.css';
const regeneratorRuntime = require("regenerator-runtime");
const place = document.querySelector('main');

class Storage {
    static saveCartRooms(rooms) {
        localStorage.setItem('cartRooms', JSON.stringify(rooms))
    }
    static saveCartTreatments(treatments) {
        localStorage.setItem('cartTreatments', JSON.stringify(treatments))
    }
}

export const bookings = () => {

    let rooms = JSON.parse(localStorage.getItem('cartRooms')) !== null ? JSON.parse(localStorage.getItem('cartRooms')) : [];
    let treatments = JSON.parse(localStorage.getItem('cartTreatments')) !== null ? JSON.parse(localStorage.getItem('cartTreatments')) : [];

    let total = rooms.concat(treatments);

    fetch(rooms)
        .then(() => {

            const cart = document.createElement('div');
            cart.classList.add('cart');
            place.appendChild(cart);
            const cartContent = document.createElement('div');
            cartContent.classList.add('cart-content')
            cart.appendChild(cartContent);

            rooms = rooms.map(room => {
                const divRoomContent = document.createElement('div');
                divRoomContent.classList.add('cart-content-r');
                cartContent.appendChild(divRoomContent);
                divRoomContent.innerHTML = `
                <div>
                    <img src=${room.image} alt="image">
                    </div>
                    <div>
                        <h4>${room.name}</h4>
                        <h5><div><span>${room.startDate}</span> - <span>${room.endDate}</span></div></h5>
                        <span class="remove-item-r" data-id=${room.id}>Usuń z koszyka</span>
                    </div>
                    `;
                const line = document.createElement('div');
                line.classList.add('line');
                cartContent.appendChild(line);
                const span = document.createElement('span')
                line.appendChild(span);
            })

            treatments = treatments.map(treatment => {
                const divTreatmentContent = document.createElement('div');
                divTreatmentContent.classList.add('cart-content-t');
                cartContent.appendChild(divTreatmentContent);
                divTreatmentContent.innerHTML = `
                <div>
                <img src=${treatment.image} alt="image">
                </div>
                <div>
                    <h4>${treatment.name}</h4>
                    <h5> ${treatment.price} zł/zabieg</h5>
                    <span class="remove-item-t" data-id=${treatment.id}>Usuń z koszyka</span>
                </div>
                <div>
                    <i class="fa fa-chevron-up treatment-up" data-id=${treatment.id}></i>
                    <p class="item-amount">${treatment.amount}</p>
                    <i class="fa fa-chevron-down treatment-down" data-id=${treatment.id}></i>
                </div>
                `;
                const line = document.createElement('div');
                line.classList.add('line');
                cartContent.appendChild(line);
                const span = document.createElement('span')
                line.appendChild(span);
            })
        })
        .then(() => {
            const cartContent = document.createElement('div');
            cartContent.classList.add('total-content')
            place.appendChild(cartContent);
            const cartTotal = document.createElement('div');
            cartTotal.classList.add('cart-total');
            cartContent.appendChild(cartTotal);

            let tempTotal = 0;

            total.map((item) => {
                tempTotal += item.price * item.amount;
            })

            if (total.length > 0) {
                cartTotal.innerText = `Suma: ` + parseFloat(tempTotal.toFixed(2)) + ` zł`;
                const clearButton = document.createElement('button');
                cartContent.appendChild(clearButton);
                clearButton.innerText = 'Usuń wszystko';
                clearButton.classList.add('clear-cart');
                const div = document.createElement('div');
                cartContent.appendChild(div);
                let a = document.createElement('a');
                div.appendChild(a);
                a.setAttribute('href', "/login");
                const nextButton = document.createElement('button');
                a.appendChild(nextButton);
                nextButton.innerText = 'Przejdź do logowania';
                nextButton.classList.add('next-button');
            }



            let rooms = JSON.parse(localStorage.getItem('cartRooms')) !== null ? JSON.parse(localStorage.getItem('cartRooms')) : [];
            let treatments = JSON.parse(localStorage.getItem('cartTreatments')) !== null ? JSON.parse(localStorage.getItem('cartTreatments')) : [];

            function removeItem(id) {
                rooms = rooms.filter(item => item.id !== id);
                treatments = treatments.filter(item => item.id !== id);
                Storage.saveCartRooms(rooms);
                Storage.saveCartTreatments(treatments);
                cartContent.innerHTML = '';
            }

            if (total.length > 0) {
                const clearBtn = document.querySelector('.clear-cart');
                clearBtn.addEventListener('click', () => {
                    let cartItems = total.map(room => room.id);
                    cartItems.forEach(id => removeItem(id));
                    while (cartContent.children.length > 0) {
                        cartContent.removeChild(cartContent.children[0])
                    }
                });

                const cartContent = document.querySelector('.cart-content');

                cartContent.addEventListener('click', async event => {

                    function sum() {
                        total = rooms.concat(treatments);
                        let tempTotal = 0;
                        total.map((item) => {
                            tempTotal += item.price * item.amount;
                        })
                        cartTotal.innerText = `Suma: ` + parseFloat(tempTotal.toFixed(2)) + ` zł`;
                    }

                    if (event.target.classList.contains('remove-item-r')) {
                        let removeItem = event.target;
                        let id = removeItem.dataset.id;
                        cartContent.removeChild(removeItem.parentElement.parentElement);
                        rooms = rooms.filter(item => item.id !== parseInt(id));
                        Storage.saveCartRooms(rooms);

                        sum();
                        total = rooms.concat(treatments);

                        const content = document.querySelector('.total-content');
                        if (total.length === 0) {
                            content.innerHTML = "";
                        }
                    }
                    else if (event.target.classList.contains('remove-item-t')) {
                        let removeItem = event.target;
                        let id = removeItem.dataset.id;
                        cartContent.removeChild(removeItem.parentElement.parentElement);
                        treatments = treatments.filter(item => item.id !== parseInt(id));
                        Storage.saveCartTreatments(treatments);

                        sum()
                        total = treatments.concat(rooms);

                        const content = document.querySelector('.total-content');
                        if (total.length === 0) {
                            content.innerHTML = "";
                        }
                    }
                    else if (event.target.classList.contains('treatment-up')) {
                        let addAmount = event.target;
                        let id = addAmount.dataset.id;
                        let tempItem = await treatments.find(item => item.id === parseInt(id));
                        tempItem.amount = parseInt(tempItem.amount) + 1;
                        Storage.saveCartTreatments(treatments);
                        addAmount.nextElementSibling.innerText = tempItem.amount;

                        sum();
                    }
                    else if (event.target.classList.contains('treatment-down')) {
                        let lowerAmount = event.target;
                        let id = lowerAmount.dataset.id;
                        let tempItem = treatments.find(item => item.id === parseInt(id));
                        tempItem.amount = tempItem.amount - 1;
                        if (tempItem.amount > 0) {
                            lowerAmount.previousElementSibling.innerText = tempItem.amount;
                            Storage.saveCartTreatments(treatments);

                            sum();
                        }
                        else {
                            let removeItem = event.target;
                            let id = removeItem.dataset.id;
                            cartContent.removeChild(removeItem.parentElement.parentElement);
                            treatments = treatments.filter(item => item.id !== parseInt(id));

                            Storage.saveCartTreatments(treatments);

                            total = treatments.concat(rooms);
                            const content = document.querySelector('.total-content');
                            if (total.length === 0) {
                                content.innerHTML = "";
                            }
                            sum()

                            if (total.length === 0) {
                                content.innerHTML = "";
                            }
                        }
                    }
                }
                )
            }
        })
}