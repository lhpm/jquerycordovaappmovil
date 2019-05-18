$(document).on("pagecreate","#ranking", function(){

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
            url: 'http://luismachadoportafolio.com.co/degustappgenjson/json_degustapp/ranking.php',
            //url: 'http://127.0.0.1/degustappgenjson/json_degustapp/ranking.php',
            type: "GET",
            encoding:"UTF-8",
            dataType: "JSON",
            success: function (data) {

     $("#rankinglistview").empty(); 

    for (var i=0; i<data.length; i++){

     $("#rankinglistview").append("<li data-icon=\"plus\"><a data-transition=\"slide\" data-details5'" + JSON.stringify(data[i]) + "' href='#detallesranking'><img src="+data[i].RUTALOGO+" width=100 height=100/><h3>"+data[i].NOMBRE + " <i>- Puntaje: "+ data[i].PUNTAJE+"</i></h3><h6>"+data[i].DESCRIPCION+"</h6></a></li>");
     };//Fin ciclo For
     $("#rankinglistview").listview("refresh");
     
      //OJO NO VOY A USAR DIV sino li CAMBIO on("click", "DIV a" por on("click", "li a"
      $("#rankinglistview").on("click", "div a", function(e){

        var obj = $(this).data("details5");

        $("#Rankinglistview").empty();

        $("#Rankinglistview").append("<img src=\"" + obj.ruta_logo +  "\">");

        $("#Rankinglistview").append("<br /><H3>"+ obj.nom_empresa +"</H3>");

        $("#Rankinglistview").append("<br /><p>"+ obj.id_usuario +"</p>");

        $("#Rankinglistview").append("<H4>EVENTO: </H4><H4>"+ obj.favorito +"</H4>");

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