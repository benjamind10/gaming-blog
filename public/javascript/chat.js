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
function sendMessage() {
  let message = $('#chat-message').val();

  chat_db.push().set({
    sender: user_name,
    message: message,
    chatTextDB: message,
  });
  $('#chat-message').val('');

  return false;
}

// Listen for incoming messages

chat_db.orderByChild('event').on('child_added', function (snapshot) {
  let html = '';
  html += "<li id='message-" + snapshot.key + "'>";
  // Show delete button if message is sent by me
  if (snapshot.val().sender == user_name) {
    html +=
      "<button data-id='" +
      snapshot.key +
      "' onclick='deleteMessage(this);'>";
    html += 'Delete';
    html += '</button>';
  }

  html += snapshot.val().sender + ': ' + snapshot.val().message;
  html += '</li>';

  $('#messages').append(html);
});

function deleteMessage(self) {
  // get message ID
  var messageId = self.getAttribute('data-id');

  // delete message
  chat_db.child(messageId).remove();
}

// attach listener for delete message
chat_db.on('child_removed', function (snapshot) {
  // remove message node
  document.getElementById('message-' + snapshot.key).innerHTML =
    'This message has been removed';
});

// JQUERY REQUEST TO TRY COD API
function requestAPI() {
  var settings = {
    url: 'https://www.callofduty.com/api/papi-client/leaderboards/v2/title/mw/platform/psn/time/alltime/type/core/mode/career/page/1',
    method: 'GET',
    timeout: 0,
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
  });
}
