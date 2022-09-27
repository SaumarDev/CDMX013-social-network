// Este es el punto de entrada de tu aplicacion
import { start } from './src/components/start.js';
import { login } from './src/components/login.js';
import { signUp } from './src/components/sign-up.js';
import { home } from './src/components/home.js';
import { check } from './src/components/successCreateAccount.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js';
import { auth } from './src/lib/firebase.js';

const root = document.getElementById('root');

const routes = {
  '/CDMX013-social-network/': start,
  '/CDMX013-social-network/login': login,
  '/CDMX013-social-network/signUp': signUp,
  '/CDMX013-social-network/home': home,
  '/CDMX013-social-network/check': check,
};

export const onNavigate = (pathname) => {
  window.history.pushState(
    {},
    pathname,
    window.location.origin + pathname,
  );
  root.removeChild(root.firstChild);
  root.appendChild(routes[pathname]());
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    onNavigate('/CDMX013-social-network/home');
    // const displayName = user.displayName;
    // const email = user.email;
    // const photoURL = user.photoURL;
    // const uid = user.uid;
  } else {
    onNavigate('/CDMX013-social-network/');
  }
});

const path = routes[window.location.pathname];

window.onpopstate = () => {
  root.removeChild(root.firstChild);
  root.append(path());
};

root.appendChild(path());
