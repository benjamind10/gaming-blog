// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAoOLv7zrtMcYecHoFXpUqjAcPNfg34Euc',
  authDomain: 'gaming-blog-c3dc2.firebaseapp.com',
  databaseURL:
    'https://gaming-blog-c3dc2-default-rtdb.firebaseio.com/',
  projectId: 'gaming-blog-c3dc2',
  storageBucket: 'gaming-blog-c3dc2.appspot.com',
  messagingSenderId: '591427989407',
  appId: '1:591427989407:web:e42f288f007b6bb1af57aa',
};

const user_name = $('#test').html();
console.log(user_name);

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const chatDB = database.ref('/event/chat/');

$('#chat-form').submit(function (event) {
  event.preventDefault();

  let message = $('#chat-message').val();

  chatDB.push().set({
    sender: user_name,
    message: message,
  });
  $('#chat-message').val('');
});
