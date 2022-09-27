import { getAuth, signOut } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js';
import { app } from '../lib/firebase.js';
import { onNavigate } from '../../main.js';

const auth = getAuth(app);

export const signout = () => {
  signOut(auth).then(() => {
    onNavigate('/CDMX013-social-network/');
  });
};
