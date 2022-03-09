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

const raw_user = $('#test').html();
const user_name = raw_user.split(' ')[2];

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const chat_db = database.ref('/event/chat/');

// Send message to db
$('#chat-form').submit(function (event) {
  event.preventDefault();

  let message = $('#chat-message').val();

  chat_db.push().set({
    sender: user_name,
    message: message,
    chatTextDB: message,
  });
  $('#chat-message').val('');
});

// Listen for incoming messages

chat_db.orderByChild('event').on('child_added', function (snapshot) {
  let html = `<li>${snapshot.val().sender} : ${
    snapshot.val().message
  }</li>`;

  $('#messages').append(html);
});
