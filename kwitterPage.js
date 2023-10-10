const firebaseConfig = {
      apiKey: "AIzaSyDJbdajCaQgCqRqIwJMMd4PxIlcdRUFhvM",
      authDomain: "vamos-conversar-6406a.firebaseapp.com",
      databaseURL: "https://vamos-conversar-6406a-default-rtdb.firebaseio.com",
      projectId: "vamos-conversar-6406a",
      storageBucket: "vamos-conversar-6406a.appspot.com",
      messagingSenderId: "21965423696",
      appId: "1:21965423696:web:406f2f0154949efcf73d55"
    };
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    
    userName = localStorage.getItem("userName"); roomName = localStorage.getItem("roomName");
    
    function send()
{
  msg = document.getElementById("msg").value;
  firebase.database().ref(roomName).push({
      name: userName,
      message:msg,
      like:0
  });

  document.getElementById("msg").value = "";
}


function getData() { firebase.database().ref("/"+roomName).on('value', function(snapshot)
 { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot)
  { childKey  = childSnapshot.key; childData = 
      childSnapshot.val(); if(childKey != "purpose") {
         firebaseMessageId = childKey;
         messageData = childData;
console.log(firebaseMessageId);
console.log(messageData);
name = messageData["name"];
message = messageData["message"];
like = messageData["like"];
nameWithTag = "<h4> "+ name +"<img class='user_tick' src='tick.png'><h4>";
messageWithTag = "<h4 class='message_h4'>" + message + "</h4>";
likeButton = "<button class='btn btn-warning' id=" +firebaseMessageId+"value="+like+"onclick='updateLike(this.id)'>";
spanWithTag = "<span class='glyphicon glyphicon-thumbs-up'> Like: "+like+"</span></button><hr>"

row = nameWithTag + messageWithTag + likeButton + spanWithTag;
document.getElementById("output").innerHTML += row;
//Fim do código
      } });  }); }


getData();  

function updateLike(messageId)
{
      console.log("botão like pressionado - " + messageId );
      button_id = messageId;
      likes = document.getElementById(button_id).value;
      uptatedLikes = Number(likes) + 1;
      console.log(updatedLikes);


      firebase.database().ref(roomName).child(messageId).update({
            like : updatedLikes
      });
}

function logout() {
      localStorage.removeItem("userName");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}
