$(document).ready( function () {
    td_solicitudes();
    $('#dt_solicitudes').DataTable({
        paging: false,
        searching: false,
        ordering: false,
        bDestroy: true,
        language: {
            zeroRecords: "Ningun elemento seleccionado"
        }
    });
} );
function td_solicitudes(){
    $.ajax({
    url: 'json_selectSolicitud.php',
    success: function (obj) {
        $('#dt_solicitudes').DataTable({
            columnDefs: [{width: "5%",targets:0},{width: "30%",targets:1},{className: "dt-right",targets:3}],
            bDestroy: true,
            paging: false,
            searching: false,
            ordering: false,
            data: obj,
            columns: [
                {data : 'fecha_solicitud'},
                {data : 'nombre'},
                {data : 'folio'},
                {data : 'clave_solicita'}
            ]
        });
    },
    error: function (obj) {
        alert(obj.msg);
    }
    });
}
function visor_pedido(folio){
    $.ajax({
        data:{folio:folio},
        url: 'json_selectViewSolicitud.php',
        type: 'POST',
        success: function (obj) {
            $('#list_pedidos_x').empty();
            $('#list_pedidos_x').append(obj);
        },
        error: function (obj) {
            alert(obj.msg);
        }
    });
    $("#txt_cometario").slideUp();
    $('#visor_solicitud').modal('show');
}
function coment(){
    var c = $("#txt_c").text();
    $("#comentario_txt").val(c);
    if(c.length > 0){
        $("#txt_cometario").toggle("slow");
        $("#comentario").toggle("slow");
    }else{
        $("#txt_cometario").toggle("slow");
    }  
}
function abrirPedido(id_pedido){
    $.ajax({
        data:{id_pedido:id_pedido},
        url: 'json_selectPedido.php',
        type: 'POST',
        success: function (obj) {
            $("#articulo").text(obj[0].articulo);
            $("#cantidad").text(obj[0].cantidad);
            $("#detalle_articulo").text(obj[0].detalle_articulo);
            $("#justificacion").text(obj[0].justificacion);
            $("#anexo_codicion").text(obj[0].anexo_codicion);
            $("#destino").text(obj[0].destino);
            if(obj[0].comentario2.toString().length > 1){
                $("#txt_c").text(obj[0].comentario2.toString());
                $("#comentario").slideDown();
                $("#comentario").html(obj[0].comentario);
            }else{
                $("#txt_c").text("");
                $("#comentario").slideUp();
            }
            $("#grado_requerimiento").text(obj[0].grado_requerimiento);
            $("#fecha_requerimiento").text(obj[0].fecha_requerimiento);
            $("#cod_articulo").text(obj[0].cod_articulo);
            $("#nombre").text(obj[0].nombre);
            $("#fecha_solicitud").text(obj[0].fecha_solicitud);
            $("#especialista").text(obj[0].especialista);
            $("#id_pedido").data("id_pedido_x",obj[0].id_pedido);
            $("#txt_cometario").slideUp();
        },
        error: function (obj) {
            alert(obj.msg);
        }
    });
}
function guarda_coment(){
    var id_pedido  = $("#id_pedido").data("id_pedido_x");
    var comentario = $("#comentario_txt").val();
    $.ajax({
        data:{id_pedido:id_pedido,comentario:comentario},
        url: 'json_insertComentario.php',
        type: 'POST',
        success: function (obj) {
            var comentario = obj[0].comentario.toString();
            $("#txt_c").text(comentario);
            $("#comentario_txt").val(comentario);
            coment();
        },
        error: function (obj) {
            alert(obj.msg);
        }
    });
}