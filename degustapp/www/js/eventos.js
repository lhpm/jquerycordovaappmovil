$(document).on("pagecreate","#eventos", function(){

refresh();
    $(document).on('click', '#ref', function() {
      refresh();
    });

function refresh(){

    $.ajax({

            beforeSend: function() { $.mobile.loading("show"); },
            complete: function() { $.mobile.loading("hide"); },
            async:true,
            cache: true,
            //url: 'http://luismachadoportafolio.com.co/degustappgenjson/json_degustapp/eventos.php',
            url: 'http://127.0.0.1/degustappgenjson/json_degustapp/eventos.php',
            type: "POST",
            encoding:"UTF-8",
            dataType: "JSON",
            success: function (data) {

     $("#evento").empty();

    for (var i=0; i<data.length; i++){

     $("#evento").append("<a data-transition=\"slide\" data-details2='" + JSON.stringify(data[i]) + "' href='#paginaeventos'><div class=\"nd2-card\"><div class=\"card-media\"><img src=\""+data[i].logo+"\"><div class=\'card-media-overlay with-background\'><div class=\"card-title has-supporting-text\"><h3 class=\"card-primary-title\">"+data[i].evento+"</h3><h5 class=\"card-subtitle\">"+data[i].descripcion+"</h5></div><div class=\"card-action\"><div class=\"row between-xs\"><div class=\"col-xs-12\"><div class=\"box\"><a href=\"tel:"+data[i].contacto+"\" class=\"ui-btn ui-btn-inline\"><img src=\"css/images/icons-png/phone-white.png\"></a></div></div></div></div></div></div></div></a>");
     };//Fin ciclo For
     $("#evento").listview("refresh");
     
      //OJO NO VOY A USAR li sino DIV CAMBIO on("click", "LI a" por on("click", "div a"
      $("#evento").on("click", "div a", function(e){

        var obj = $(this).data("details2");

        $("#Eventos").empty();

        $("#Eventos").append("<img src=\"" + obj.logo + "\">");

        $("#Eventos").append("<p><br /><strong>NOMBRE DEL EVENTO: "+ obj.evento +"</strong></p>");

        $("#Eventos").append("<p><br /><strong>DESCRIPCION: "+ obj.descripcion +"</strong></p>");

        $("#Eventos").append("<div data-role=\"collapsible-set\"><div data-role=\"collapsible\"><h3>FECHA DE INICIO</h3><p>" + obj.fecha_inicio + "</p></div><div data-role=\"collapsible\"><h3>FECHA FINAL</h3><p>" + obj.fecha_final + "</p></div><div data-role=\"collapsible\"><h3>CONTACTO O CELULAR</h3><p>" + obj.contacto + "</div></div>");

        $('#Eventos').trigger('create');

     });

   },//Fin success data
    error: function(jqXHR, exception){

    var msg = '';
    if (jqXHR.status === 0){
      msg = 'No hay conexión';
    }else if (jqXHR.status == 404){
      msg = 'No hubo respuesta';
    }else if (jqXHR.status == 500){
      msg = 'Error en el servidor 500';
    }else if (jqXHR.status === 'parseerror'){
      msg = 'Error en cadena';
    }else if (jqXHR.status === 'timeout'){
      msg = 'Fuera de tiempo';
    }else if (jqXHR.status === 'abort'){
      msg = 'Se abortó la conexión';
    }else {
      msg = 'Error desconocido'
    }
    alert(msg);
   },//jqXHR

  });
}
});