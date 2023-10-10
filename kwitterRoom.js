
//ADICIONE SEUS LINKS FIREBASE
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

userName = localStorage.getItem("userName");

document.getElementById("userName").innerHTML = "Bem-vindo(a) " + userName + "!";

function addRoom() {
  room_name = document.getElementById("room_name").value;

  firebase.database().ref("/").child(room_name).update({
    purpose: "adding room name"
  });

  localStorage.setItem("room_name", room_name);

  window.location = "kwitter_page.html"
}

function getData() {
  firebase.database().ref("/").on('value', function (snapshot) {
    document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      roomNames = childKey;
      console.log("Room Name -" + roomNames);
      row = "<div class='room_name' id="+roomNames+" onclick='redirectToRoomName(this.id)' >#" +roomNames +"</div><hr>";
        document.getElementById("output").innerHTML += row;
    });
  });

}

        getData();

        function redirectToRoomName(name)
        {
          console.log(name);
        localStorage.setItem("room_name", name);
        window.location = "kwitter_page.html";
}

        function logout() {
          localStorage.removeItem("userName");
        localStorage.removeItem("room_name");
        window.location = "index.html";
}
