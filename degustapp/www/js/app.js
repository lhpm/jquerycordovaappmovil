var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);

        console.log(cordova.plugins.notification.local.launchDetails);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

cordova.plugins.notification.local.hasPermission(function (granted) {
});
cordova.plugins.notification.local.registerPermission(function (granted) {
});

    cordova.plugins.notification.local.hasPermission(function(granted){
      if(granted == true)
      {
        //notificaciones(title, text);
              var sound = device.platform == 'Android' ? 'file://sound.mp3' :'file://beep.caf';
var date = new Date();
 
cordova.plugins.notification.local.schedule({
    id: 1
    title: "Titulo",
    message: "Mensaje",
    firstAt: date,
    every: 1,
    sound: sound,
    icon: "../icon/ic_action_star_10.png"
});

      }
      else
      {
        cordova.plugins.notification.local.registerPermission(function(granted) {
            if(granted == true)
            {
              //notificaciones(title, text);

var sound = device.platform == 'Android' ? 'file://sound.mp3' :'file://beep.caf';
var date = new Date();
 
cordova.plugins.notification.local.schedule({
    id: 1
    title: "Titulo",
    message: "Mensaje",
    firstAt: date,
    every: 1,
    sound: sound,
    icon: "../icon/ic_action_star_10.png"
});


              
            }
            else
            {
              navigator.notification.alert("No se activaron las notificaciones porque no tiene permisos");
            }
        });
      }
    });

//function notificaciones(title, text){
//cordova.plugins.notification.local.schedule({
//title: 'My first notification',
//text: 'Thats pretty easy...',
//foreground: true
//});
//navigator.notification.alert("Recordatorio activado")
//}
//notificaciones();






/* Script Compartir */


        function shareToFacebook(){
            window.plugins.socialsharing.shareViaFacebook(
                'Message via Facebook', 
                null /* img */, 
                null /* url */, 
                function() {console.log('share ok')}, 
                function(errormsg){alert(errormsg)}
            );
        }
        
        function shareToTwitter(){
            window.plugins.socialsharing.shareViaTwitter(
                'Message via Twitter', 
                null /* img */, 
                null /* url */, 
                function() {console.log('share ok')}, 
                function(errormsg){alert(errormsg)}
            );
        }
        
        function shareToSMS(){
            window.plugins.socialsharing.shareViaSMS(
                'Message via SMS', 
                '1234567890' /* phone numbers comma seperated */, 
                function() {console.log('share ok')}, 
                function(errormsg){alert(errormsg)}
            );
        }
        
        function shareToEmail(){
            window.plugins.socialsharing.shareViaEmail(
                'Message via Email',
                'Subject',
                ['name@companyname.com'] /* to :array or null */, 
                null /* cc :array or null */,
                null /* bcc :array or null */,
                null /* files :array or null */,
                function() {console.log('share ok')}, 
                function(errormsg){alert(errormsg)}
            );
        }
        
        function shareToOptions(){
            window.plugins.socialsharing.share(
                'Descarga Gratis Nuestra Aplicación Móvil en Play Store https://play.google.com/store/apps/details?id=com.arquipamplona.nazareth&hl=es-419'
            );
        }


function checkConnection() {
var networkState = navigator.connection.type;
var states = {};
states[Connection.UNKNOWN] = 'Conexión Desconocida';
states[Connection.ETHERNET] = 'Conexión Ethernet';
states[Connection.WIFI] = 'Conexión WiFi';
states[Connection.CELL_2G] = 'Conexión de celda 2G';
states[Connection.CELL_3G] = 'Conexión de Celda 3G';
states[Connection.CELL_4G] = 'Conexión de Celda 4G';
states[Connection.CELL] = 'Conexión Celda Genérica';
states[Connection.NONE] = 'No hay Conexión Internet';
alert('Connection type: ' + states[networkState]);
}
checkConnection();


document.addEventListener("offline", onOffline, false);
function onOffline() {
alert('¡No existe ninguna conexión!');
}


document.addEventListener("online", onOnline, false);
function onOnline() {
// Handle the online event
var networkState = navigator.connection.type;
if (networkState !== Connection.NONE) {
if (dataFileEntry) {
tryToUploadFile();
}
}
display('Tipo de conexión: ' + networkState);
}