var flexmin = 1;
var flexmax = 5;
$(document).ready(function(){
	if($('#center_column').width()<=280){flexmin = 1;  flexmax = 1;}
	else if($('#center_column').width()<=440){flexmin = grid_size_ms;  flexmax = grid_size_ms;}
	else if($('#center_column').width()<963){ flexmin = grid_size_sm;  flexmax = grid_size_sm;}
	else if($('#center_column').width()>=1240){ flexmin = grid_size_lg;  flexmax = grid_size_lg; }
	else if($('#center_column').width()>=963){ flexmin = grid_size_md;  flexmax = grid_size_md; }

});
var manFlexMin = 2;
var manFlexmMax = 9;
$(document).ready(function(){
	
	if($('#center_column').width()<=280){manFlexMin = 2;  manFlexmMax  = 2;}
	else if($('#center_column').width()<=440){manFlexMin = 3;  manFlexmMax  = 3;}
	else if($('#center_column').width()<980){ manFlexMin = 5;  manFlexmMax  = 5;}
	else if($('#center_column').width()>=1240){ manFlexMin = 9;  manFlexmMax  = 9;  }
	else if($('#center_column').width()>=980){ manFlexMin = 7;  manFlexmMax  = 7; }
});
$(document).ready(function() {

	$(function() {
		$(window).scroll(function() {
			if($(this).scrollTop() > 600) {
				$('#toTop').fadeIn();	
			} else {
				$('#toTop').stop().fadeOut();
			}
		});

		$('#toTop').click(function() {
			$('body,html').animate({scrollTop:0},800);
		});	
	});

});

