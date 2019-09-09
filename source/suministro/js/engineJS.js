$(document).ready( function () {
    $('#tabla_pedidos').DataTable( {
        paging: false,
        searching: false,
        ordering: false
    } );
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
    $('.dt-delete').each(function () {
        $(this).on('click', function(evt){
            $this = $(this);
            var dtRow = $this.parents('tr');
            if(confirm("Are you sure to delete this row?")){
                var table = $('#tabla_pedidos').DataTable();
                table.row(dtRow[0].rowIndex-1).remove().draw( false );
            }
        });
    });
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
    var t = $('#tabla_pedidos').DataTable();
    t.row.add( [
        "<button class='btn btn-danger btn-xs dt-delete'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span></button>",
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
}
