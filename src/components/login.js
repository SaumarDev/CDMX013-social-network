import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js';
import { onNavigate } from '../../main.js';
import { app } from '../lib/firebase.js';
import { githubLogin } from './github.js';
import { googleAuth } from './google.js';

export const login = () => {
  const divContainer = document.createElement('div');
  const logo = document.createElement('img');
  const divInputs = document.createElement('div');
  const p = document.createElement('p');
  const boxEmail = document.createElement('input');
  const boxPassword = document.createElement('input');
  const loginButton = document.createElement('button');
  const pAccount = document.createElement('p');
  const signUpButton = document.createElement('button');
  const divAccount = document.createElement('div');
  const sectionOr = document.createElement('img');
  const loginTwitter = document.createElement('img');
  const loginGitHub = document.createElement('img');
  const loginGoogle = document.createElement('img');
  const footer = document.createElement('footer');
  const paraError = document.createElement('p');

  logo.src = 'src/imgs/logo.png';
  logo.classList.add('logoTech');
  divInputs.setAttribute('class', 'containerInputs');
  p.textContent = 'Log in';
  p.setAttribute('class', 'text');

  boxEmail.setAttribute('type', 'email');
  boxEmail.placeholder = 'email@something.com';
  boxEmail.setAttribute('class', 'inputs');
  boxPassword.setAttribute('type', 'password');
  boxPassword.placeholder = 'password';
  boxPassword.setAttribute('class', 'inputs');
  loginButton.textContent = 'Log in';
  loginButton.setAttribute('class', 'purpleButton');

  divInputs.append(boxEmail, boxPassword, paraError, loginButton);

  pAccount.textContent = " Don't have an account yet? Please,  ";
  pAccount.setAttribute('id', 'pAccount');
  signUpButton.textContent = 'Sign up here ';
  divAccount.append(pAccount, signUpButton);
  divAccount.setAttribute('id', 'divAccount');
  signUpButton.setAttribute('id', 'signUpButton');
  sectionOr.src = 'src/imgs/sectionOr.png';
  loginTwitter.src = 'src/imgs/loginTwitter.png';
  loginTwitter.setAttribute('class', 'loginIcon');
  loginGitHub.src = 'src/imgs/loginGithub.png';
  loginGitHub.setAttribute('class', 'loginIcon');
  loginGoogle.src = 'src/imgs/loginGoogle.png';
  loginGoogle.setAttribute('class', 'loginIcon');
  footer.textContent = '2022';
  paraError.setAttribute('class', 'errorMessage');

  const auth = getAuth(app);

  const firebaseLogIn = async () => {
    const loginEmail = boxEmail.value;
    const loginPassword = boxPassword.value;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      const user = userCredential.user;
      onNavigate('/CDMX013-social-network/home');
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        paraError.style.display = 'block';
        paraError.style.opacity = '1';
        paraError.innerHTML = 'You do not have an account yet';
      }
      if (error.code === 'auth/internal-error') {
        paraError.style.display = 'block';
        paraError.style.opacity = '1';
        paraError.innerHTML = 'Please, write your password';
      }
      if (error.code === 'auth/invalid-email') {
        paraError.style.display = 'block';
        paraError.style.opacity = '1';
        paraError.innerHTML = 'Your email is incorrect';
      }
      if (error.code === 'auth/wrong-password') {
        paraError.style.display = 'block';
        paraError.style.opacity = '1';
        paraError.innerHTML = 'Your password is incorrect';
      }
      if (error.code === 'auth/user-disabled') {
        paraError.style.display = 'block';
        paraError.style.opacity = '1';
        paraError.innerHTML = 'Your account is disabled';
      }
    }
  };

  loginButton.addEventListener('click', firebaseLogIn);

  logo.addEventListener('click', () => {
    onNavigate('/CDMX013-social-network/');
  });

  loginGoogle.addEventListener('click', googleAuth);

  signUpButton.addEventListener('click', () => {
    onNavigate('/CDMX013-social-network/signUp');
  });

  loginGitHub.addEventListener('click', githubLogin);

  divContainer.append(
    logo,
    p,
    divInputs,
    divAccount,
    sectionOr,
    loginGoogle,
    loginGitHub,
    footer,
  );

  divContainer.setAttribute('class', 'container');

  return divContainer;
};
