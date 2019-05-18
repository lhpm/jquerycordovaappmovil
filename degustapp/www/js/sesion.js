$(document).on("pagecreate","#directorio", function(){


      //Muestra icono de carga
    var interval = setInterval(function(){
        $.mobile.loading('show');
        clearInterval(interval);
    },2);

    $.ajax({
            async:true,
            cache: true,
            //url: 'https://luismachadoportafolio.com.co/degustappgenjson/json_degustapp/degustapp.php',
            url: 'http://127.0.0.1/degustappgenjson/json_degustapp/degustapp.php',
            type: "GET",
            encoding:"UTF-8",
            dataType: "JSON",
            success: function (data) {

     $("#lista").empty();

    for (var i=0; i<data.length; i++){


    $("#lista").append("<a data-transition=\"slide\" data-details='" + JSON.stringify(data[i]) + "' href='#paginadetalles'><div class=\"nd2-card\"><div class=\"card-media\"><img src=\""+data[i].RUTALOGO+"\"><div class=\'card-media-overlay with-background\'><div class=\"card-title has-supporting-text\"><h3 class=\"card-primary-title\">"+data[i].NOMBRE+"</h3><h5 class=\"card-subtitle\">"+data[i].DESCCOMIDA+"</h5></div><div class=\"card-action\"><div class=\"row between-xs\"><div class=\"col-xs-12\"><div class=\"box\"><a href=\"tel:"+data[i].TELEEFONO+"\" class=\"ui-btn ui-btn-inline\" style=\"margin-left:1%;margin-right:28%;\"><img src=\"css/images/icons-png/phone-white.png\"></a><a href=\"mapa1.html?lat="+data[i].COORDENADAX+"&lon="+data[i].COORDENADAY+"&nom="+data[i].NOMBRE+"\" class=\"ui-btn ui-btn-inline\" style=\"margin-left:47%;\" data-role=\"button\" rel=\"external\"><img src=\"css/images/icons-png/location-white.png\"></a></div></div></div></div></div></div></div></a>");
     };//Fin ciclo For
//var mapcoor = new google.maps.LatLng(+data[i].COORDENADAX+, +data[i].COORDENADAY+);
     
     $("#lista").listview("refresh");
     
      //OJO NO VOY A USAR li sino DIV CAMBIO on("click", "LI a" por on("click", "div a"
      $("#lista").on("click", "div a", function(e){

        var obj = $(this).data("details");
        var fid = "";// variable auxiliar para el puntaje

        $("#Detalles").empty();

        $("#Detalles").append("<img src=\"" + obj.RUTALOGO +  "\">");

        $("#Detalles").append("<br /><strong>"+ obj.NOMCORTO +"</strong><i id=\"despuesclick\" class=\"\"></i><button id=\"fav\" class=\"fff\">Añadir a Favoritos<i class=\"zmdi zmdi-star\" style=\"color:darkred;font-size:1.8em;\"></i></button><label id=\"recordlocal\"></label><br>");

        $("#Detalles").append("<div class=\"perfil\"><br>PUNTAJE:<b>" + obj.PUNTAJE +"</b> IDGRUPO:<b>" + obj.IDGRUPO +"</b></div>");

        $("#Detalles").append("<input type=\"hidden\" id=\"id\" value="+ obj.IDEMPRESA +"><input type=\"range\" name=\"slider-fill-mini\" id=\"puntaje\" data-mini=\"true\" data-highlight=\"true\" data-theme=\"b\" data-track-theme=\"b\" value=\"5\" min=\"0\" max=\"5\"><div id=\"btn-list\"><button id=\"guardardatos\">Califica el establecimiento</button></div>");

        $("#Detalles").append("<div data-role=\"collapsible-set\"><div data-role=\"collapsible\"><h3>TIPO DE COMIDA</h3><p>" + obj.DESCCOMIDA + "</p></div><div data-role=\"collapsible\"><h3>DESCRIPCION</h3><p>" + obj.DESCRIPCION + "</p></div><div data-role=\"collapsible\"><h3>CONTACTO</h3><p>" + obj.TELEEFONO + " - " + obj.CELULAR1 +  " - " + obj.CELULAR2 +  "</p><br>" + obj.DIRECCION + "</div></div>");

        
        // SISTEMA PUNTAJE O FAVORITOS
$(document).on('pageinit', function() {
    $(document).on('click', '#guardardatos', function() {
      var page = jQuery(event.target);

        alert('¡ Gracias !');
        //$.mobile.changePage("#promociones", {transition:"slideup", role:"dialog"});
        //$.mobile.changePage('page2.html', { dataUrl : "page2.html?paremeter=123", data : { 'paremeter' : '123' }, reloadPage : true, changeHash : true });

//$(this).remove(); REMOVER ELEMENTOS DESPUES DEL CLICK
// SISTEMA PUNTAJE
var fpuntaje = $("#puntaje").val();

var fid = $("#id").val();

  $("#puntaje").val(" ");
        $.ajax({
    type:"POST",
    url: "http://127.0.0.1/degustappgenjson/phpinsert/insertar.php",
    data:({puntaje: fpuntaje, id: fid}),
    cache: false,
    datatype:"text",
    });

    });
});
// FIN SISTEMA PUNTAJE

$(document).on('pageinit', function() {
    $(document).on('click', '#fav', function() {
      var page = jQuery(event.target);



        alert('¡ Favoritos !');

// Sistema favoritos
    var f_id = obj.IDEMPRESA;
    $.ajax({
    type:"POST",
    url: "http://127.0.0.1/degustappgenjson/phpinsert/favoritos.php",
    data:({id: f_id, usuario: obj.NOMCORTO, nom_empresa: obj.NOMCORTO, ruta_logo: obj.RUTALOGO,}),
    cache: false,
    datatype:"text",
    });

  $(this).remove("#fav");

  $("#despuesclick").addClass("zmdi zmdi-star");
  $("#despuesclick").html(obj.NOMCORTO);


  /* Guardando los datos en el LocalStorage*/
  localStorage.setItem("recordlocal", JSON.stringify(data[1]));
  /* FIN Guardando LocalStorage*/
  
    });
});

// Mostrando los datos en Localstorage
// Imprimo a través de la eqtiqueta label id=recordlocal
$(document).ready(function(){
  var recordlocal = localStorage.getItem("recordlocal");

    document.getElementById("recordlocal").innerHTML = recordlocal;

});
// FIN Mostrando Localstorage

        $('#Detalles').trigger('create');

     });

      //Oculta icono de carga
      var interval = setInterval(function(){
        $.mobile.loading('hide');
        clearInterval(interval);
      },2);

   },//Fin success data

  });

});