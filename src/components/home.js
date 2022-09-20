import { onNavigate } from "../main.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js";
import { collection, addDoc, doc, onSnapshot  } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js';
import { db } from "../lib/firebase.js";

export const home = () => {
  const divContainer = document.createElement("div");
  const header = document.createElement("header");
  const logoHome = document.createElement("img");
  const profileImage = document.createElement("img");
  const logout = document.createElement("button");
  const commentContainer = document.createElement("section");
  const writeComment = document.createElement("textarea");
  const shareButton = document.createElement("button");
  const commentSharedContainer = document.createElement("section");
  const comment = document.createElement("p");

  header.setAttribute("id", "header");
  logoHome.src = "../imgs/logo2.png";
  logoHome.setAttribute("id", "logo-home");
  profileImage.src = "../imgs/profile.png";
  profileImage.setAttribute("id", "profile");
  logout.textContent = "Log out";
  logout.setAttribute("id", "logout");
  writeComment.setAttribute(
    "placeholder",
    "Share something with the community..."
  );
  writeComment.setAttribute('id', 'post')
  shareButton.textContent = "Share";
  shareButton.setAttribute("id", "share");

  header.append(logoHome, profileImage, logout);
  commentContainer.append(writeComment, shareButton);

  logout.addEventListener("click", () => {
    onNavigate("/");
  });

/*   shareButton.addEventListener("click", () => {
    commentSharedContainer.appendChild((comment.textContent = "Hola!"));
  }); */

  //Function to validate the user session
  const auth = getAuth();
  const user = auth.currentUser;
  
  if (user) {
    console.log('User is signed in')
      //Enviar posts a la base de datos

const sendPosts = async () => {

  try {
    const docRef = await addDoc(collection(db, "posts"), {
      post: writeComment.value,
    });
    console.log("Document written with ID: ", docRef.id);
    writePosts();
    clean();
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  }


  } else {
    console.log('No user is signed in') 
  }


shareButton.addEventListener("click", sendPosts)

const writePosts = async () => { 
  const querySnapshot = await getDocs(collection(db, "posts"));
  //Data in firestore, method querySnapshop
    let post = "";
    querySnapshot.forEach((doc) => {
      post += `<div>${doc.data().post}</div>`
      console.log(`${doc.id} => ${doc.data()}`);
    });
    commentSharedContainer.innerHTML = post
  }

function clean () {
  writeComment.value = "";
}

  divContainer.append(header, commentContainer, commentSharedContainer);
  return divContainer;
};
