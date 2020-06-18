
const place = document.querySelector('main');

export const home = () => {
    let rooms = JSON.parse(localStorage.getItem('cartRooms')) !== null ? JSON.parse(localStorage.getItem('cartRooms')) : [];

    fetch('http://localhost:3000/headerList')
        .then(response => response.json())
        .then(data => {
            let headerList = data;

            const headerContainer = document.createElement('div');
            place.appendChild(headerContainer);
            headerContainer.classList.add('header-container');

            headerList = headerList.map(item => {
                const img = document.createElement('img');
                headerContainer.appendChild(img);
                img.setAttribute('src', item.image);
                img.classList.add('header-image');
                const h1 = document.createElement('h1')
                headerContainer.appendChild(h1);
                h1.innerHTML = item.text;
                h1.classList.add('header-text');
            })

        })
        .then(() => {
            const container = document.createElement('div');
            place.appendChild(container);
            container.classList.add('container');

            //invitation
            const invitation = document.createElement('div');
            container.appendChild(invitation);
            invitation.classList.add('invitation');
            const invitationH1 = document.createElement('p');
            invitation.appendChild(invitationH1);
            invitationH1.textContent = 'Zapraszamy do naszego SPA';

            //relax
            const divRelax = document.createElement('div');
            container.appendChild(divRelax);
            divRelax.classList.add('relax');
            const divTextR = document.createElement('div');
            divRelax.appendChild(divTextR);
            const pTextR = document.createElement('p');
            divTextR.appendChild(pTextR);
            pTextR.innerText = `Doświadcz relaksu, 
            na który zasługujesz`;
            const pTextR2 = document.createElement('p');
            divTextR.appendChild(pTextR2);
            pTextR2.innerText = `Poczuj magię miejsca idealnego do odpoczynku, 
            świeżego powietrza, blisko natury 
            i z dala od miejskiego zgiełku.`;
            const shadow = document.createElement('p');
            divTextR.appendChild(shadow);
            const divImgR = document.createElement('div');
            divRelax.appendChild(divImgR);
            divImgR.classList.add('relax-image');
            const relaxImage = document.createElement('img');
            divImgR.appendChild(relaxImage);
            relaxImage.setAttribute('src', "https://images.tinypic.pl/i/01008/ke7rcoddqia7.jpg");

            //nature
            const divNature = document.createElement('div');
            container.appendChild(divNature);
            divNature.classList.add('nature');
            const divImgN = document.createElement('div');
            divNature.appendChild(divImgN);
            divImgN.classList.add('nature-image');
            const natureImage = document.createElement('img');
            divImgN.appendChild(natureImage);
            natureImage.setAttribute('src', "https://images.tinypic.pl/i/01008/nkoadzhlh1e7.jpg");

            //motto
            const divMotto = document.createElement('div');
            container.appendChild(divMotto);
            divMotto.classList.add('motto');
            const pTextM = document.createElement('p');
            divMotto.appendChild(pTextM);
            pTextM.innerText = 'Odkryj prawdziwą sztukę relaksu w naszym SPA';

            //quotation
            const divQuotation = document.createElement('div');
            container.appendChild(divQuotation);
            divQuotation.classList.add('quotation');
            const divImgQ = document.createElement('div');
            divQuotation.appendChild(divImgQ);
            divImgQ.classList.add('quotation-image');
            const quotationImage = document.createElement('img');
            divImgQ.appendChild(quotationImage);
            quotationImage.setAttribute('src', "https://images.tinypic.pl/i/01008/2lu7jg8e3cr4.jpg");
            const divTextQ = document.createElement('div');
            divQuotation.appendChild(divTextQ);
            const icon = document.createElement('i');
            icon.classList.add('fa');
            icon.classList.add('fa-quote-right');
            divTextQ.appendChild(icon);
            const pTextQ = document.createElement('p');
            divTextQ.appendChild(pTextQ);
            pTextQ.innerText = `Każdy klinet jest inny, 
            ma własne oczekiwania. 
            Z atencją na nawiasy 
            i DRY staramy się realizować te potrzeby.`;
            const pTextQ2 = document.createElement('p');
            divTextQ.appendChild(pTextQ2);
            pTextQ2.innerText = 'Joanna Kowalska';
            const pTextQ3 = document.createElement('p');
            divTextQ.appendChild(pTextQ3);
            pTextQ3.innerText = 'Główny Manager IT SPA';




            //nature
            const divTextN = document.createElement('div');
            divNature.appendChild(divTextN);
            const pTextN = document.createElement('p');
            divTextN.appendChild(pTextN);
            pTextN.innerText = 'Poczuj kojący wpływ natury';
            const pTextN2 = document.createElement('p');
            divTextN.appendChild(pTextN2);
            pTextN2.innerText = `Zachłyśnij się świeżym powietrzem pobliskiego rezerwatu przyrody. Odkrywaj leśne szlaki turystyczne, zaciszne miejsca 
            i atrakcje tej okolicy. 

            Wypocznij z dala od miasta.`;
            const shadowN = document.createElement('p');
            divTextN.appendChild(shadowN);
        })
}

