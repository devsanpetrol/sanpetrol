$(document).ready( function () {
    get_norm_form_solicitud();
    fecha_actual();
    get_categoria();
    $('#tabla_pedidos').DataTable({
        paging: false,
        searching: false,
        ordering: false,
        bDestroy: true,
        
        createdRow: function ( row, data, index ) {
            $(row).addClass('pointer');
            $('td', row).eq(1).addClass('resalta');
            $('td', row).eq(3).addClass('resalta');
        },
        language: {
            zeroRecords: "Ningun elemento seleccionado"
        },
        columnDefs: [{targets: [9],visible: true,searchable: false},{targets: [11],visible: true,searchable: false}]
    });
    $('.mi-selector').select2({
        placeholder: 'Escriba la descripción del producto...',
        dropdownParent: $('#mod_pedido'),
        
        ajax: { 
            url: 'json_selectArticle.php',
            type: 'post',
            dataType: 'json',
            delay: 500,
            cache: true,
            data: function (params) {
             return { searchTerm: params.term };
            },
            processResults: function (response) {
              return { results: response };
            }
        }
    });
    $( '.mi-selector' ).change(function () {
       var searchTerm = $('.mi-selector').val();
        $.ajax({
            url: 'json_pedido.php',
            data:{searchTerm:searchTerm},
            type: 'POST',
            success:(function(res){
                $('#cod_articulo').val(res.cod_articulo);
                $('#descripcion').val(res.descripcion);
                $('#especificacion').val(res.especificacion);
                $('#select_categoria').val(res.id_categoria);
                $('#unidad').val(res.tipo_unidad);
            })
        });
        if(isNaN($('#select_article').val())){
            $('#descripcion').prop('disabled', true);
            $('#select_categoria').prop('disabled', true);
            $('#unidad').prop('disabled', true);
        }else{
            $('#descripcion').prop('disabled', false);
            $('#select_categoria').prop('disabled', false);
            $('#unidad').prop('disabled', false);
        }
    });
    $(":radio[name='grado_r']").on('ifChanged',function(event) {
        if ($("input[name='grado_r']:checked").val() === 'programado'){
            $('#single_cal3').prop('disabled', false);
        }else if ($("input[name='grado_r']:checked").val() === 'inmediato'){
            $('#single_cal3').blur(); 
            $('#single_cal3').prop('disabled', true);
        }
    });
    //Delete buttons
    var table = $('#tabla_pedidos').DataTable();
    $('#tabla_pedidos tbody').on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });
    $('#remover').click( function () {
        table.row('.selected').remove().draw( false );
    });
    
} );

function get_norm_form_solicitud(){
    var numformat = $('#sol_mat').data('numformat');
    $.ajax({
        url: 'json_from_sol_mat.php',
        data:{numformat:numformat},
        type: 'POST',
        success:(function(res){
            $('#autorizado').val(res.autorizado);
            $('#fecha_rev').val(res.fecha_rev);
            $('#funcion').val(res.funcion);
            $('#num_formato').text(res.num_formato);
            $('#num_revision').val(res.num_revision);
            $('#region').val(res.region);
            $('#revisado').val(res.revisado);
	})
    });
}
function reset_select2(){
    $("#select_article").empty().trigger('change');
}
function getValRadio(){
    reset_select2();
    $('#cod_articulo').val('');
    $('#descripcion').val('');
    $('#unidad').val('1');
    $('#especificacion').val('');
    $('#anexo').val('');
    $('#justificacion').val('');
    $('#area_aquipo').val('');
    $('#descripcion').parent().removeClass("bad");
    $('#unidad').parent().removeClass("bad");
    $('#area_aquipo').parent().removeClass("bad");
    $('#justificacion').parent().removeClass("bad");
    
    $('#mod_pedido').modal('hide');
    //console.log($("input[name='grado_r']:checked").val());
}
function agregar_pedido(){
    if(valida_pedido()){
        if(valida_campos(0)){
            var grado_requerimiento = $("input[name='grado_r']:checked").val() === 'inmediato' ? "<span class='label label-danger'>Inmediato</span>" : "<span class='label label-success' title='Para la fecha: "+$('#single_cal3').val()+"'>Programado</span>";
            var aprueba = "<button type='button' class='btn btn-info btn-xs' ><i class='fa fa-user'></i> "+$('#select_categoria option:selected').data('nombre')+" "+$('#select_categoria option:selected').data('apellidos')+" <i class='fa fa-check-circle-o'></i></button>"
            var t = $('#tabla_pedidos').DataTable();
            t.row.add( [
                grado_requerimiento,
                $('#cod_articulo').val(),
                $('#descripcion').val(),
                $('#unidad').val(),
                $('#cantidad').val(),
                $('#especificacion').val(),
                $('#anexo').val(),
                $('#justificacion').val(),
                $('#area_aquipo').val(),
                $('#select_categoria option:selected').data('resp'),
                aprueba,
                $("input[name='grado_r']:checked").val(),
                $('#single_cal3').val(),//select_categoria
                $('#select_categoria').val()
            ] ).draw( false );
            //set_list_resp($('#select_categoria option:selected').data('resp'),$('#select_categoria option:selected').data('nombre'),$('#select_categoria option:selected').data('apellidos'));
            reset_select2();
            $('#cod_articulo').val('');
            $('#descripcion').val('');
            $('#unidad').val('1');
            $('#especificacion').val('');
            $('#anexo').val('');
            $('#justificacion').val('');
            $('#area_aquipo').val('');
            $('#mod_pedido').modal('hide');
        }else{
            alert('Debe completar los campos requeridos');
        }
    }else{
        alert('No se agrego ningun pedido');
        $('#unidad').val('1');
        $('#especificacion').val('');
        $('#anexo').val('');
        $('#justificacion').val('');
        $('#area_aquipo').val('');
        $('#mod_pedido').modal('hide');
    }
}
function valida_pedido(){
    if ($('#descripcion').val().trim().length === 0){
        return false;
    }else{
        return true;
    }
}
function valida_campos(x){
    var total_error = x;
    
    if ($('#descripcion').val().trim().length === 0){
        total_error++;
        $('#descripcion').parent().addClass("bad");
    }else{
        $('#descripcion').parent().removeClass("bad");
    }
    //-----------------------------------------------------
    if ($('#unidad').val() <= 0){
        total_error++;
        $('#unidad').parent().addClass("bad");
    }else{
        $('#unidad').parent().removeClass("bad");
    }
    //-----------------------------------------------------
    if ($('#cantidad').val() == '0'){
        total_error++;
        $('#cantidad').parent().addClass("bad");
    }else{
        $('#cantidad').parent().removeClass("bad");
    }
    //-----------------------------------------------------
    if ($('#area_aquipo').val().trim().length === 0){
        total_error++;
        $('#area_aquipo').parent().addClass("bad");
    }else{
        $('#area_aquipo').parent().removeClass("bad");
    }
    //-----------------------------------------------------
    if ($('#justificacion').val().trim().length === 0){
        total_error++;
        $('#justificacion').parent().addClass("bad");
    }else{
        $('#justificacion').parent().removeClass("bad");
    }
    //-----------------------------------------------------
    console.log(total_error);
    if(total_error <= 0){
        return true;
    }else{
        return false;
    }
}
function mayus(e) {
    e.value = e.value.toUpperCase();
}
function  fecha_actual(){
    $.ajax({
        url: 'json_now.php',
        success:(function(res){
            $('#fecha_actual').val(res.fecha_actual);
        })
    });
}
function  get_categoria(){
    $.ajax({
    type: "GET",
    url: 'json_selectCategoria.php', 
    dataType: "json",
    success: function(data){
      $.each(data,function(key, registro) {
        $("#select_categoria").append("<option value='"+registro.id_categoria+"' data-resp='"+registro.id_empleado_resp+"' data-nombre='"+registro.nombre+"' data-apellidos='"+registro.apellidos+"'>"+registro.categoria+"</option>");
      });
    },
    error: function(data) {
      alert('error');
    }
  });
}
function set_list_resp(id_empleado,nombre,apellidos){
    var apellidos_ = apellidos.replace(/ /g, "");
    $('.'+apellidos_+id_empleado).remove();
    $('#flex ul').append(
        $('<li>').addClass(apellidos_+id_empleado).append("<button type='button' class='btn btn-success btn-sm' ><i class='fa fa-user'></i> "+nombre+" "+apellidos+" <i class='fa fa-check-circle-o'></i></button>")
    );
}
function get_folio(){
    var table = $('table').DataTable();
    var filas = table.rows().count();
    if (filas > 0){
    var fecha_solicitud = $('#fecha_actual').val();
    var status_solicitud = 1;
    var id_formato = $('#sol_mat').data('idformat');
    var clave_solicita = $('#user_id_employe').data('idempleado');    
    $.ajax({
        data:{fecha_solicitud:fecha_solicitud,status_solicitud:status_solicitud,id_formato:id_formato,clave_solicita:clave_solicita},
        type: 'post',
        url: 'json_selecFolio.php',
        dataType: 'json',
        success: function(data){
          $.each(data,function(key, registro){
            $("#folioxx").text('FOLIO: '+registro.folio);
            $("#folioxx").data('folioz',registro.folio);
            recorreDataTable(registro.folio);
          });
          $('#btn_agregapedido').attr('disabled', true);
          $('#btn_guardapedido').attr('disabled', true);
          $('#folioxx').slideDown();
        },
        error: function(data) {
          alert('error');
        }
    });
    }else{
        alert('No se realizado ningun pedido');
    }
}
function guardaPedido(autorizado, articulo, cantidad, unidad, detalle_articulo, justificacion, anexo_codicion, destino, status_pedido, comentario, grado_requerimiento, fecha_requerimiento, cod_articulo, id_categoria, folio){
    $.ajax({
        data:{autorizado:autorizado, articulo:articulo, cantidad:cantidad, unidad:unidad, detalle_articulo:detalle_articulo, justificacion:justificacion, anexo_codicion:anexo_codicion, destino:destino, status_pedido:status_pedido, comentario:comentario, grado_requerimiento:grado_requerimiento, fecha_requerimiento:fecha_requerimiento, cod_articulo:cod_articulo, id_categoria:id_categoria, folio:folio},
        type: 'post',
        url: 'json_insertPedido.php',
        dataType: 'json',
        success: function(data){
             $.each(data,function(key, registro){
                 console.log(registro.result);
             });
        },
        error: function(data) {
          alert('error');
        }
    });
}
function recorreDataTable(folio){
    var table = $('#tabla_pedidos').DataTable();
    var arr = [];
    
    table
        .column( 0 )
        .data()
        .each( function ( value, index ) {
            arr.push(table
            .rows( index )
            .data()
            .toArray());
            guardaPedido(arr[index][0][9],arr[index][0][2],arr[index][0][4],arr[index][0][3],arr[index][0][5],arr[index][0][7],arr[index][0][6],arr[index][0][8],1,'',arr[index][0][11],arr[index][0][12],arr[index][0][1],arr[index][0][13],folio);
        });
}