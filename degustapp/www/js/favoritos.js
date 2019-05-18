$(document).on("pagecreate","#favoritos", function(){

      //Muestra icono de carga
    var interval = setInterval(function(){
        $.mobile.loading('show');
        clearInterval(interval);
    },2);

refresh();
    $(document).on('click', '#ref', function() {
      refresh();
    });
function refresh(){
         var db=openDatabase('Favo','2.0','Base de datos favoritosd', 3*1024*1024);
         //alert("BBDD inicializada");


        db.transaction(function(tx)
        {
          tx.executeSql('SELECT id,ruta_logo,nombre,celular,direccion FROM favoritosd ORDER BY nombre ASC',[],function(tx,results)
          {
            var favid = "";
            $("#favoritolistview").empty();
            $("#favoritolistview").append("<p></p>");
            var len=results.rows.length;
            for (j=0;j<len;j++)
            {
             $("#favoritolistview").append("<div id=\"favx\"><li data-icon=\"plus\"><input type=\"hidden\" id=\"id\" value="+results.rows.item(j).id+"><img src="+results.rows.item(j).ruta_logo+" width='100px' height='120px' /><i id=\"delfav\" class=\"zmdi zmdi-favorite zmd-fw\" style=\"cursor:pointer;color:red;font-size:1.6em;\"></i><h3><i>"+results.rows.item(j).nombre+"</i></h3><i><a href=\"tel:"+results.rows.item(j).celular+"\" class=\"ui-btn ui-btn-inline\"><img src=\"css/images/icons-png/phone-black.png\"></a><i style=\"color:black;\">"+results.rows.item(j).direccion+"</h6></i></li></div>");
            };

            $("#favoritolistview").listview("refresh");


      //Oculta icono de carga
      var interval = setInterval(function(){
        $.mobile.loading('hide');
        clearInterval(interval);
      },2);

          });
        });

// SISTEMA BORRAR FAVORITO
$(document).on('pageinit', function() {
    $(document).on('click', '#delfav', function() {

      var favid = $("#id").val();

    db.transaction(function(tx){

      tx.executeSql('DELETE FROM favoritosd WHERE id = ?', [favid]);

       $("#favx").css("display", "none");

       //refresh();
    
    }); //db.transaction

      var page = jQuery(event.target);
     
    });
});
// FIN SISTEMA BORRAR FAVORITO

      $('#favoritolistview').trigger('create');

    }

}); // Fin page create