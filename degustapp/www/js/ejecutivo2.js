var res = "#ejecutivo2";

$(document).on("pagecreate",""+res+"", function(){


    var db=openDatabase('Favo','2.0','Base de datos favoritosd', 3*1024*1024);

    var res = "#ejecutivo2";

    if (res == "#ejecutivo2"){

      var category = 6;

      var cinter = "#ejecutivo22";

    }


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
            data:({qq: category}),
            url: 'http://luismachadoportafolio.com.co/degustappgenjson/json_degustapp/local.php',
            //url: 'http://127.0.0.1/degustappgenjson/json_degustapp/local.php',
            //url: 'json/clientes.json',
            type: "POST",
            encoding:"UTF-8",
            dataType: "JSON",
            success: function (data) {

     $(cinter).empty();

    for (var i=0; i<data.length; i++){

    $(cinter).append("<li data-icon=\"plus\"><a data-transition=\"slide\" data-details2='" + JSON.stringify(data[i]) + "' href='#paginadetalles'><img src=\""+data[i].RUTALOGO+"\"><h3>"+data[i].NOMBRE+"</h3><p>"+data[i].DESCRIPCION+"</p></a></li>");
     };//Fin ciclo For
     
     $(cinter).listview("refresh");
     
      //OJO NO VOY A USAR DIV sino li CAMBIO on("click", "LI a" por on("click", "div a"
      $(cinter).on("click", "li a", function(e){

        var obj = $(this).data("details2");
        var fid = "";// variable auxiliar para el puntaje

        $("#Titulo").empty();

        $("#Head").empty();

        $("#Detalles").empty();

        $("#Titulo").append("<i>"+ obj.NOMCORTO +"</i>");

        $("#Head").append("<input type=\"hidden\" id=\"nom_fav\" value="+ obj.NOMCORTO +">");

        $("#Detalles").append("<div class=\"imagen\" style=\"\"><img style=\"width:100%;height:99%;margin:0px;\" src=\""+obj.RUTALOGO+"\" /><div class=\"imgTitulo\" style=\"width:100%;text-align:center;font-size:6vw;margin-top:-20%;margin-left:-5%;color:white;\"><a href=\"tel:"+obj.TELEEFONO+"\" class=\"ui-btn ui-btn-inline\" style=\"margin-left:-10px;\"><img src=\"icon/ic_action_phone_start.png\"></a><a href=\"mapa1.html?lat="+obj.COORDENADAX+"&lon="+obj.COORDENADAY+"&nom="+obj.NOMBRE+"\" class=\"ui-btn ui-btn-inline\" style=\"margin-left:0px;\" data-role=\"button\" rel=\"external\"><img src=\"icon/ic_action_location.png\"></a><i id=\"despuesclick\" style=\"color:white;font-size:40px;\"></i><i id=\"fav\" class=\"zmdi zmdi-star zmd-fw\" style=\"cursor:pointer;color:white;font-size:40px;\"></i><a href=\"#\" class=\"ui-btn ui-btn-inline\" style=\"margin-left:0px;\" data-role=\"button\" rel=\"external\"><img src=\"icon/ic_action_tag.png\"></a></div></div>");

        $("#Detalles").append("<div class=\"perfil\"><br />PUNTAJE:<input type=\"hidden\" id=\"pactual\" value="+ obj.PUNTAJE +"><i id=\"puntajeactual\">" + obj.PUNTAJE +"</i><i id=\"ptotal\"></i></div>");

        $("#Detalles").append("<input type=\"hidden\" id=\"id\" value="+ obj.IDEMPRESA +"><select name=\"select-custom-18\" id=\"puntaje\" data-native-menu=\"true\"><option value=\"1\">Malo</option><option value=\"2\">Aceptable</option><option value=\"3\">Bueno</option><option value=\"4\">Excelente</option></select><div id=\"btn-list\"><button id=\"guardardatos\">Califica el establecimiento</button></div>");

        $("#Detalles").append("<div class=\"ui-grid-a\"><div class=\"ui-block-a\"><font style=\"font-size:3.5vw;\"><strong>Teléfono:</strong><br />" + obj.TELEEFONO + "</font></div><div class=\"ui-block-b\"><font style=\"font-size:3.5vw;\"><strong>Celulares:</strong><br />" + obj.CELULAR1 +  " - " + obj.CELULAR2 +  "</font></div></div>");

        $("#Detalles").append("<div class=\"ui-grid-a\" style=\"margin-top:10px;\"><div class=\"ui-block-a\"><font style=\"font-size:3.5vw;\"><strong>Tipo de Comida:</strong><br />" + obj.DESCCOMIDA + "</font></div><div class=\"ui-block-b\"><font style=\"font-size:3.5vw;\"><strong>Dirección:</strong><br />" + obj.DIRECCION + "</font></div></div>");

        $("#Detalles").append("<p><br /></p>");

// SISTEMA PUNTAJE
$(document).on('pageinit', function() {
    $(document).on('click', '#guardardatos', function() {
      var page = jQuery(event.target);

var fpuntaje = $("#puntaje").val();

var fid = $("#id").val();

var ppactual = $("#pactual").val();

  $("#puntaje").val(" ");
    $.ajax({
    type:"POST",
    url: "http://luismachadoportafolio.com.co/degustappgenjson/phpinsert/insertar.php",
    //url: "http://127.0.0.1/degustappgenjson/phpinsert/insertar.php",
    data:({puntaje: fpuntaje, id: fid}),
    cache: false,
    datatype:"text",
    });
        var pppp = JSON.parse(ppactual)+JSON.parse(fpuntaje);

        var puntajetotal = JSON.stringify(pppp);

        $("#puntajeactual").css("display", "none");
        $("#ptotal").html(puntajetotal).css("color", "darkgreen");
        
    });
});
// FIN SISTEMA PUNTAJE

        db.transaction(function(tx)
        {
          tx.executeSql('SELECT * FROM favoritosd',[],function(tx,results)
          {
            var len=results.rows.length;
            for (j=0;j<len;j++)
            {

             if(obj.IDEMPRESA == results.rows.item(j).id){
             //alert(obj.NOMCORTO);
             $("#fav").css("display","none");
             $("#despuesclick").addClass("zmdi zmdi-favorite zmd-fw");
             }
            }
          });
        });


$(document).on('pageinit', function() {

    $(document).on('click', '#fav', function() {

      var fid = $("#id").val();

       var fnom_fav = $("#nom_fav").val();

       db.transaction(function(tx){

        tx.executeSql('CREATE TABLE IF NOT EXISTS favoritosd (id int primary key,ruta_logo,nombre,celular,direccion)');

        tx.executeSql('INSERT INTO favoritosd (id,ruta_logo,nombre,celular,direccion) VALUES ("'+fid+'","'+obj.RUTALOGO+'","'+fnom_fav+'","'+obj.CELULAR1+'","'+obj.DIRECCION+'")');
       
    });

  $(this).remove("#fav");

  $("#despuesclick").addClass("zmdi zmdi-favorite zmd-fw");

  //$("#despuesclick").html(fnom_fav);

  $.domCache("#despuesclick").remove();


      var page = jQuery(event.target);

        //alert('¡ Favoritos !');
    });

  });

      $('#Detalles').trigger('create');


     }); //Fin lista on click

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



  });//Fin ajax JSON
}
});//Fin página eje