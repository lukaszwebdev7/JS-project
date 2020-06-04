const place = document.querySelector('main');
import '../styles/Treatments.css';

let buttonsDOM = [];

class Storage {
  static saveTreatments(treatments) {
    localStorage.setItem('treatments', JSON.stringify(treatments))
  }
  static getTreatment(id) {
    let treatments = JSON.parse(localStorage.getItem('treatments'));
    return treatments.find(treatment => treatment.id === parseInt(id));
  }
  static saveCart(cartTreatments) {
    localStorage.setItem('cartTreatments', JSON.stringify(cartTreatments))
  }
}


export const treatments = () => {

  fetch('http://localhost:3000/treatments')
    .then(response => response.json())
    .then(data => {
      let treatments = data;
      const containerTreatments = document.createElement('div');
      place.appendChild(containerTreatments);
      containerTreatments.classList.add('container-treatments');
      Storage.saveTreatments(treatments);

      treatments = treatments.map(treatment => {
        const roomUl = document.createElement('ul');
        containerTreatments.appendChild(roomUl);
        roomUl.innerHTML = `
              <li>
                <div class="container-treatment">
                  <div class="treatment-image">
                    <img src=${treatment.image} alt="image" />
                  </div>
                  <div class="treatment-info">
                    <ul>
                      <li>
                        <div>
                          <div><strong>${treatment.name}</strong></div>
                          <div>Zabieg na: ${treatment.area}</div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="treatment-cart">
                    <ul>
                      <li><strong>Cena: ${treatment.price} zł</strong></li>
                      <li>Ilość zabiegów: <select id=${treatment.id}><option>0</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option></select></li>
                      <li><button class='add-to-cart treatment-button primary ' data-id=${treatment.id}>Dodaj do koszyka</button></li>
                    </ul>
                  </div>
                </div>
              </li>
                `
      });

    })
    .then(() => {
      const buttons = [...document.querySelectorAll('.add-to-cart')];
      buttonsDOM = buttons;
      buttons.forEach(button => {
        let id = button.dataset.id;
        const select = document.getElementById(id);
        button.addEventListener('click', event => {
          const x = select.value;
          let cartTreatments = JSON.parse(localStorage.getItem('cartTreatments')) ? JSON.parse(localStorage.getItem('cartTreatments')) : [];
          let cartItem = { ...Storage.getTreatment(id), amount: x };
          cartTreatments = [...cartTreatments, cartItem];
          Storage.saveCart(cartTreatments)
        })
      })
    })
}