var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
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

console.log("navigator.geolocation works well");

// onSuccess Callback
// This method accepts a Position object, which contains the
// current GPS coordinates
//
var onSuccess = function(position) {
alert('Latitude: ' + position.coords.latitude + '\n' +
'Longitude: ' + position.coords.longitude + '\n' +
'Altitude: ' + position.coords.altitude + '\n' +
'Accuracy: ' + position.coords.accuracy + '\n' +
'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
'Heading: ' + position.coords.heading + '\n' +
'Speed: ' + position.coords.speed + '\n' +
'Timestamp: ' + position.timestamp + '\n');
};
// onError Callback receives a PositionError object
//
function onError(error) {
alert('code: ' + error.code + '\n' +
'message: ' + error.message + '\n');
}
navigator.geolocation.getCurrentPosition(onSuccess, onError);


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


 /* INICIO ONESIGNAL */

  var notificationOpenedCallback = function(jsonData) {
    console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  };

  window.plugins.OneSignal
    .startInit("ad10848b-f1af-4b80-b95e-c6d5a6588383")
    .handleNotificationOpened(notificationOpenedCallback)
    .endInit();

/* FIN ONESIGNAL */

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