import {
  auth, publish, onGetPost, deletePost,
} from '../lib/firebase.js';
import { signout } from './signOut.js';

export const home = () => {
  const divContainer = document.createElement('div');
  const header = document.createElement('header');
  const logoHome = document.createElement('img');
  const logout = document.createElement('button');
  const sectionContainer = document.createElement('section');
  const postForm = document.createElement('form');
  const nameUser = document.createElement('h1');
  const writeComment = document.createElement('textarea');
  const errorCharacters = document.createElement('p');
  const shareButton = document.createElement('button');
  const comment = document.createElement('section');

  divContainer.setAttribute('id', 'body-home');
  header.setAttribute('id', 'header');
  logoHome.src = 'src/imgs/logo2.png';
  logoHome.setAttribute('id', 'logo-home');
  logout.textContent = 'Log out';
  logout.setAttribute('id', 'logout');
  sectionContainer.setAttribute('class', 'section-home');
  postForm.setAttribute('class', 'section-home');
  nameUser.setAttribute('id', 'name-user');
  writeComment.setAttribute('id', 'post-container');
  writeComment.setAttribute(
    'placeholder',
    'Share something less than 300 characters with the community ...',
  );
  writeComment.setAttribute('maxlength', 299);
  shareButton.textContent = 'Share';
  shareButton.setAttribute('id', 'share');
  shareButton.disabled = true;

  header.append(logoHome, logout);
  postForm.append(nameUser, writeComment, errorCharacters, shareButton);
  sectionContainer.append(postForm, comment);

  logout.addEventListener('click', () => {
    signout();
  });

  const user = auth.currentUser;

  onGetPost((querySnapshot) => {
    const user = auth.currentUser;
    nameUser.textContent = `Welcome ${user.email} !`;
    let html = '';
    let htmlDelete = '';
    querySnapshot.forEach((doc) => {
      const postData = doc.data();
      if (user.email === postData.user) {
        htmlDelete = `
          <i class="fa-sharp fa-solid fa-trash" data-id="${doc.id}"></i>
          <i class="fa-sharp fa-solid fa-pencil"></i>`;
      } else {
        htmlDelete = '';
      }
      html += `
          <article class="post-content">
          <div class= "container-header-post">
            <img id= "profile-home" src="src/imgs/profile.png" alt="Profile Image">
            <h2 id ="header-post">${postData.user}</h2>
            <span id="delete-edit"> ${htmlDelete} </span>
          </div>
          <p class="post-user">${postData.posts}</p>
          <div class = "like-comment">
          <span class = "icon-container">
            <i class="fa-regular fa-heart"></i>
            <p>Like</p>
          </span>
          <span class= "icon-container">
            <img class ="comment-img" src="src/imgs/comment.png" alt="Profile Image">
            <p>Comment</p>
          </span>
          </div>
          </article>
          `;
    });
    comment.innerHTML = html;

    // Delete post
    const deteleTrash = comment.querySelectorAll('.fa-trash');

    deteleTrash.forEach((trash) => {
      trash.addEventListener('click', ({ target: { dataset } }) => {
        if (window.confirm('Do you really want to delete?')) {
          deletePost(dataset.id);
        }
      });
    });
  });

  writeComment.addEventListener('input', (event) => {
    const { value } = event.target;
    // console.log(value);
    if (value !== '') {
      shareButton.disabled = false;
    } else {
      shareButton.disabled = true;
    }
  });

  shareButton.addEventListener('click', (e) => {
    e.preventDefault();
    const postUser = postForm['post-container'];
    const userID = user.email;
    publish(postUser.value, userID);
    postForm.reset();
  });

  divContainer.append(header, sectionContainer);
  return divContainer;
};
