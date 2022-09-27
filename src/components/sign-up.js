import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js';
import { onNavigate } from '../../main.js';
import { app } from '../lib/firebase.js';
import { githubLogin } from './github.js';

export const signUp = () => {
  const divContainer = document.createElement('div');
  const logo = document.createElement('img');
  const divInputs = document.createElement('div');
  const p = document.createElement('p');
  const boxName = document.createElement('input');
  const boxLastName = document.createElement('input');
  const boxEmail = document.createElement('input');
  const boxPassword = document.createElement('input');
  const boxConfirmPassword = document.createElement('input');
  const signUpButton = document.createElement('button');
  const pMessage = document.createElement('p');
  const sectionOr = document.createElement('img');
  const signUpTwitter = document.createElement('img');
  const signUpGitHub = document.createElement('img');
  const signUpGoogle = document.createElement('img');
  const footer = document.createElement('footer');

  const paraError = document.createElement('p');
  const paraCongrats = document.createElement('p');

  logo.src = 'src/imgs/logo.png';
  logo.classList.add('logoTech');
  divInputs.setAttribute('class', 'containerInputs');
  p.textContent = 'Sing up';
  p.setAttribute('id', 'text');
  boxName.setAttribute('type', 'text');
  boxName.setAttribute('class', 'inputs');
  boxName.placeholder = 'Write your name';
  boxLastName.setAttribute('type', 'text');
  boxLastName.setAttribute('class', 'inputs');
  boxLastName.placeholder = 'Write your last name';
  boxEmail.setAttribute('type', 'email');
  boxEmail.placeholder = 'email@something.com';
  boxEmail.setAttribute('class', 'inputs');
  boxPassword.setAttribute('type', 'password');
  boxPassword.placeholder = 'password';
  boxPassword.setAttribute('class', 'inputs');
  boxConfirmPassword.setAttribute('type', 'password');
  boxConfirmPassword.placeholder = 'Confirm your password';
  boxConfirmPassword.setAttribute('class', 'inputs');
  pMessage.textContent = ' By clicking “Sign up”, you agree to our terms of service, privacy policy and cookie policy.';
  pMessage.setAttribute('id', 'pMessage');
  signUpButton.textContent = 'Sign Up';
  signUpButton.setAttribute('class', 'purpleButton');

  divInputs.append(boxName, boxLastName, boxEmail, boxPassword, boxConfirmPassword, paraError, paraCongrats, signUpButton, pMessage);

  sectionOr.src = 'src/imgs/sectionOr.png';
  signUpTwitter.src = 'src/imgs/twitter.png';
  signUpTwitter.setAttribute('class', 'signUpIcon');
  signUpGitHub.src = 'src/imgs/github.png';
  signUpGitHub.setAttribute('class', 'signUpIcon');
  signUpGoogle.src = 'src/imgs/google.png';
  signUpGoogle.setAttribute('class', 'signUpIcon');
  footer.textContent = '2022';
  paraError.setAttribute('class', 'errorMessage');
  paraCongrats.setAttribute('id', 'congrats');

  const auth = getAuth(app);

  const createAccount = async () => {
    const getName = boxName.value;
    const getLastName = boxLastName.value;
    const signUpEmail = boxEmail.value;
    const signUpPassword = boxPassword.value;
    const confirmPasword = boxConfirmPassword.value;

    try {
      if (signUpPassword !== confirmPasword) throw Error('The password does not match');
      const userCredencial = await createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword, confirmPasword, getName, getLastName);
      const user = userCredencial.user;
      paraError.innerHTML = '';
      function congrats() {
        onNavigate('/CDMX013-social-network/check');
      }
      setTimeout(congrats, 1000);
    } catch (error) {
      paraError.innerHTML = error;

      if (error.code === 'auth/invalid-email') {
        paraError.style.display = 'block';
        paraError.style.opacity = '1';
        paraError.innerHTML = 'Your email is incorrect';
      }
      if (error.code === 'auth/email-already-in-use') {
        paraError.style.display = 'block';
        paraError.style.opacity = '1';
        paraError.innerHTML = 'The e-mail already exist.';
      }

      if (error.code === 'auth/weak-password') {
        paraError.style.display = 'block';
        paraError.style.opacity = '1';
        paraError.innerHTML = 'Your password length should be at least 6 characters';
      }
      if (error.code === 'auth/network-request-failed') {
        paraError.style.display = 'block';
        paraError.style.opacity = '1';
        paraError.innerHTML = 'Connection fail';
      }

      if (signUpEmail === '' && signUpPassword === '' && confirmPasword === '') {
        paraError.innerHTML = 'Please, fill out all fields';
      } else if (boxEmail.value === '') {
        paraError.innerHTML = 'Please write an e-mail address';
      } else if (boxPassword.value === '') {
        paraError.innerHTML = 'Please write a password';
      } else if (boxConfirmPassword.value === '') {
        paraError.innerHTML = 'Please confirm your password';
      }
    }
  };

  signUpButton.addEventListener('click', createAccount);

  logo.addEventListener('click', () => {
    onNavigate('/CDMX013-social-network/');
  });

  signUpGitHub.addEventListener('click', githubLogin);

  divContainer.append(
    logo,
    p,
    divInputs,
    signUpGitHub,
    footer,
  );

  divContainer.setAttribute('class', 'container');

  return divContainer;
};
