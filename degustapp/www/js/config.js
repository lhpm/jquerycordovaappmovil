$(document).on("pagecreate","#configuracion", function(){

    var db=openDatabase('Favo','2.0','Base de datos favoritosd', 3*1024*1024);
    $("#conf").append("<button id=\"vaciar\">Vaciar Favoritos</button>");

    $("#conexion").append("<a onclick=\"checkConnection()\" class=\"ui-btn ui-btn-icon-block\" data-transition=\"none\" style=\"color: #000000;\"><i class='zmdi zmdi-info zmd-3x'></i>CHEQUEAR CONEXION</a>");


    // SISTEMA BORRADO FAVORITOS
$(document).on('pageinit', function() {
    $(document).on('click', '#vaciar', function() {

    db.transaction(function(tx){

      tx.executeSql('DELETE FROM favoritosd');
      alert("Borrado Exitoso");
    
    }); //db.transaction

      var page = jQuery(event.target);
     
    });
});
// FIN SISTEMA VACIAR

    $('#conf').trigger('create');


    


});