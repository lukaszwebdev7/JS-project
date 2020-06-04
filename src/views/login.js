import '../styles/Login.css';
const place = document.querySelector('main');

class Storage {
    static saveUserInfo(users) {
        localStorage.setItem('users', JSON.stringify(users))
    }
}

export const login = () => {

    fetch('http://localhost:3000/users')
        .then(response => response.json())
        .then(data => {

            let users = data;
            let allUsers = JSON.parse(localStorage.getItem('users')) !== null ? JSON.parse(localStorage.getItem('users')) : [];

            const container = document.createElement('div');
            container.classList.add('container');
            place.appendChild(container);

            const loginContainer = document.createElement('div');
            container.appendChild(loginContainer);
            loginContainer.classList.add('container-login');
            const log_in = document.createElement('h2');
            loginContainer.appendChild(log_in);
            log_in.innerText = 'Zaloguj się';
            const form = document.createElement('form');
            loginContainer.appendChild(form);
            form.classList.add('form-login');

            const formDiv1 = document.createElement('div');
            form.appendChild(formDiv1);
            const loginL = document.createElement('span');
            formDiv1.appendChild(loginL);
            loginL.innerText = 'Login';
            const inputUsername = document.createElement('input');
            inputUsername.setAttribute('id', 'username');
            formDiv1.appendChild(inputUsername);

            const formDiv2 = document.createElement('div');
            form.appendChild(formDiv2);
            const password = document.createElement('span');
            formDiv2.appendChild(password);
            password.innerText = 'Hasło';
            const inputPassword = document.createElement('input');
            inputPassword.setAttribute('id', 'password');
            formDiv2.appendChild(inputPassword);

            const button = document.createElement('button');
            form.appendChild(button);
            button.setAttribute('type', 'button');
            button.innerText = 'Zaloguj';
            button.onclick = function () { login() };


            function login() {
                let userName = document.getElementById("username").value;
                let password = document.getElementById("password").value;

                for (let i = 0; i < allUsers.length; i++) {

                    const x = allUsers[i].username;
                    const y = userName;
                    if (userName === allUsers[i].username && password === allUsers[i].password) {
                        console.log(userName + " is logged in ! ")
                        container.innerHTML = "Wygrałeś 1 000 000 !!!!!";
                        return
                    }
                }
                console.log("incorrect username or password")
            }

            const registerContainer = document.createElement('div');
            container.appendChild(registerContainer);
            registerContainer.classList.add('container-register');
            const setupAccount = document.createElement('h2');
            registerContainer.appendChild(setupAccount);
            setupAccount.innerText = "Nie masz jeszcze konta ? Zarejestruj się"
            const formR = document.createElement('form');
            registerContainer.appendChild(formR);
            formR.classList.add('form-password');

            const formRDiv1 = document.createElement('div');
            formR.appendChild(formRDiv1);
            const loginR = document.createElement('span');
            formRDiv1.appendChild(loginR);
            loginR.innerText = 'Login';
            const inputUsernameR = document.createElement('input');
            inputUsernameR.setAttribute('id', 'newUser');
            formRDiv1.appendChild(inputUsernameR);

            const formRDiv2 = document.createElement('div');
            formR.appendChild(formRDiv2);
            const passwordR = document.createElement('span');
            formRDiv2.appendChild(passwordR);
            passwordR.innerText = 'Hasło';
            const inputPasswordR = document.createElement('input');
            inputPasswordR.setAttribute('id', 'newPassword');
            formRDiv2.appendChild(inputPasswordR);

            const buttonR = document.createElement('button');
            formR.appendChild(buttonR);
            buttonR.setAttribute('type', 'button');
            buttonR.innerText = 'Rejestruj';
            buttonR.onclick = function () { registerUser() };

            function registerUser() {
                let registerUser = document.getElementById("newUser").value;
                let registerPassword = document.getElementById("newPassword").value;

                for (let i = 0; i < allUsers.length; i++) {
                    if (allUsers[i].username === registerUser) {
                        alert('ta nazwa użytkownika jest już zajęta, wybierz proszę inną')
                        return
                    }
                    else if (registerUser.length < 3) {
                        alert('ta nazwa użytkownika jest zbyt krótka, musi mieć co najmniej 3 znaki')
                        return
                    }
                    else if (registerPassword.length < 10) {
                        alert('to hasło jest zbyt krótkie, musi mieć co najmniej 10 znaków')
                        return
                    }
                }

                let newUser = {
                    "username": registerUser,
                    "password": registerPassword
                }

                allUsers = [...allUsers, newUser];

                Storage.saveUserInfo(allUsers);
                let clearRL = document.getElementById("newUser");
                clearRL.value = '';
                let clearRP = document.getElementById("newPassword");
                clearRP.value = '';
            }

        })

}

