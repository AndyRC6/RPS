$(document).ready(function(){
	var config = {
    apiKey: "AIzaSyAlrsdArLFUrZDl-kwe3Vm8nNabRmjBCpA",
    authDomain: "rockpaperscissors-1140e.firebaseapp.com",
    databaseURL: "https://rockpaperscissors-1140e.firebaseio.com",
    projectId: "rockpaperscissors-1140e",
    storageBucket: "rockpaperscissors-1140e.appspot.com",
    messagingSenderId: "884902087494"
  };
  firebase.initializeApp(config);
  var db = firebase.database();
  var playerName;
  var playerCount = 0;
  var playerId = Math.floor(Math.random() * 1000000);
  var connectionsRef = db.ref("/players");


	

	db.ref().on("value", function(snapshot){
		var data = snapshot.val();
		playerCount = data.playerCount;
	})

	db.ref("/players").on("child_added", function(snapshot){
		var data = snapshot.val();
		playerCount++;
		db.ref().update({
			playerCount: playerCount
		})

	})

	db.ref("/players").on("child_removed", function(snapshot){
		var data = snapshot.val();
		playerCount--;
		db.ref().update({
			playerCount: playerCount
		})
	})

	db.ref(".info/connected").on("value", function(snapshot) {
		var data = snapshot.val();
  		if (data) {
    		var con = db.ref("/players").push({
    		PlayerName:"none",
    		playerId: playerId

   		 });
    		con.onDisconnect().remove();
  		}
	});
  	
	


})