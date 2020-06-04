// import {home} from '../views/home';
// import {rooms} from '../views/rooms';
// import {treatments} from '../views/treatments';
// import {bookings} from '../views/bookings';

// jeśli chcemy wszystkie pliki można zrobić prostszy zapis jak poniżej odwołujac się do katalogu z "beczką" (index.js --barell)

import { home, rooms, treatments, bookings, oops, login } from '../views';


export const routes = [
    { name: 'Home', path: '/', component: home, data: {} },
    { name: 'Rooms', path: '/rooms', component: rooms, data: {} },
    { name: 'Treatments', path: '/treatments', component: treatments, data: {} },
    { name: "Cart", path: '/bookings', component: bookings, data: {} },
    { name: "Login", path: '/login', component: login, data: {} }
]