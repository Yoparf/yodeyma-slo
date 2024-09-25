/*
* Submit form via ajax.
*/
function resetForm(idForm)
{
	$(':input','#' + idForm).not(':button, :submit, :reset, :hidden').val('');
}

$(document).ready(function(){
	$(document).on('submit','form.ajaxForm', function(){
		$form = $(this);
		$ul   = $form.find('ul.form-errors');
				
		$.ajax({
            url     : $form.attr('action'),
            type    : $form.attr('method'),
            dataType: 'json',
            data    : $form.serialize(),
            success : function( data ) {
            	if(data.success == 'ok'){
            		// hidden errors
            		$ul.html("");
            		$ul.hide();
            		// reset form
            		resetForm(data.form);
            		// alert msg
            		alert(data.msg);
            	}else{
            		//reset errors
                    $ul.html("");
                    // show errors
            		errors = $.each(data.errors,function(index, value){
            			$ul.append( $('<li>').text(value) );
            		});
            		// alert msg
            		alert(data.msg);
            	}
            },
            error   : function( xhr, err ) {
                alert(formAjaxError);
            }
        });    
        return false;
	});
});