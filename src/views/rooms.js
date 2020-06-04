const place = document.querySelector('main');
import '../styles/Rooms.css';

let buttonsDOM = [];

class Storage {
  static saveRooms(rooms) {
    localStorage.setItem('rooms', JSON.stringify(rooms))
  }
  static getRoom(id) {
    let rooms = JSON.parse(localStorage.getItem('rooms'));
    return rooms.find(room => room.id === parseInt(id));
  }
  static saveCart(cartRooms) {
    localStorage.setItem('cartRooms', JSON.stringify(cartRooms))
  }
}


export const rooms = () => {

  fetch('http://localhost:3000/rooms')
    .then(response => response.json())
    .then(data => {

      let rooms = data;
      const containerRooms = document.createElement('div');
      place.appendChild(containerRooms);
      containerRooms.classList.add('container-rooms');
      Storage.saveRooms(rooms);

      let startDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).toLocaleDateString().replace(".", "-");
      startDate = startDate.replace(".", "-");
      startDate = startDate.split("-").reverse().join("-");

      let endDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString().replace(".", "-");
      endDate = endDate.replace(".", "-");
      endDate = endDate.split("-").reverse().join("-");

      rooms = rooms.map(room => {
        const roomUl = document.createElement('ul');
        containerRooms.appendChild(roomUl);
        const roomImage = room.image;
        roomUl.innerHTML = `  <li>
                <div class="container-room">
                  <div class="room-image">
                    <img src=${room.image} alt="image" />
                  </div>
                  <div class="room-info">
                    <ul>
                      <li>
                        <div>
                          <div><strong>${room.name}</strong></div>
                          <div>Ilość łożek: ${room.beds}</div>
                          <div>Liczba gości: ${room.guests}</div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="room-cart">
                    <ul>
                      <li><strong>Cena za dobę pobytu: ${room.price} zł</strong></li>
                      <li><label htmlFor="date">Wybierz termin pobytu:</label></li>
                      <li class="input-container"><input id=${room.id} min=${startDate} max=${endDate} class="start" type="date" /><input id=${room.id} value="od"
                          max=${endDate} class="end" type="date" /></li>
                      <li><button class='add-to-cart room-button primary' data-id=${room.id}>Dodaj do koszyka</button></li>
                    </ul>
                  </div>
                </div>
              </li>`
      });

    })
    .then(() => {

      const buttons = [...document.querySelectorAll('.add-to-cart')];
      buttonsDOM = buttons;
      buttons.forEach(button => {
        let id = button.dataset.id;

        button.addEventListener('click', event => {

          let cartRooms = JSON.parse(localStorage.getItem('cartRooms')) ? JSON.parse(localStorage.getItem('cartRooms')) : [];

          let x = Storage.getRoom(id);
          let y = x.id;
          const st = document.getElementById(y)

          let valueX = new Date(st.value)
          const en = document.getElementById(y).nextSibling;
          let valueY = new Date(en.value);
          let duration = Math.ceil(((((valueY - valueX) / 1000) / 60) / 60) / 24);

          const firstDay = valueX.toLocaleDateString();
          const lastDay = valueY.toLocaleDateString();

          if (duration > 0) {
            let cartItem = { ...Storage.getRoom(id), amount: duration, startDate: firstDay, endDate: lastDay };
            cartRooms = [...cartRooms, cartItem];
            Storage.saveCart(cartRooms);
            st.value = '';
            en.value = '';
            alert(`Dodano do koszyka ${Storage.getRoom(id).name} w dniach od ${firstDay} do ${lastDay}.`);
          }
        })
      })
    })
}