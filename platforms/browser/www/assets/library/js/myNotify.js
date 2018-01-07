var notifyMe=function(options) {	
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }
  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification(options.title,options);
    //notification.sound // should return 'audio/alert.mp3'
    //alert('1');
    
     notification.onclick = function () {
		window.focus();
		var cPFD=new clearPushFlagOnDatabase();
	  };
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification(options.title,options);
      }else{
		 alert('else denied'); 
	  }
    });
  }else{
	  alert('else');
  }
  // At last, if the user has denied notifications, and you 
  // want to be respectful there is no need to bother them any more.
}

Notification.onclick=function(event){
	alert('aaa');
}
