$(document).ready( function () {
    $('#tabla_pedidos').DataTable({
        paging: false,
        searching: false,
        ordering: false,
        bDestroy: true,
        createdRow: function ( row, data, index ) {
            $(row).addClass('pointer');
            $('td', row).eq(2).addClass('resalta');
        },
        language: {
            zeroRecords: "Ningun elemento seleccionado"
        }
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
            })
        });
        if(isNaN($('#select_article').val())){
            $('#descripcion').prop('disabled', true);
        }else{
            $('#descripcion').prop('disabled', false);
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
    } );
    get_norm_form_solicitud();
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
    $('#mod_pedido').modal('hide');
    //console.log($("input[name='grado_r']:checked").val());
}
function agregar_pedido(){
    if(valida_pedido()){
        var t = $('#tabla_pedidos').DataTable();
        t.row.add( [
            $('#cod_articulo').val(),
            $('#descripcion').val(),
            $('#unidad').val(),
            $('#especificacion').val(),
            $('#anexo').val(),
            $('#justificacion').val(),
            $('#area_aquipo').val()
        ] ).draw( false );
        
        reset_select2();
        $('#cod_articulo').val('');
        $('#descripcion').val('');
        $('#unidad').val('1');
        $('#especificacion').val('');
        $('#anexo').val('');
        $('#justificacion').val('');
        $('#area_aquipo').val('');
    }else{
        alert('No se agrego ningun pedido');
    }
}
function valida_pedido(){
    if ($('#descripcion').val().trim().length === 0 || $('#unidad').val() <= 0 || $('#area_aquipo').val().trim().length === 0 || $('#justificacion').val().trim().length === 0){
        return false;
    }else{
        return true;
    }
}
