$(document).ready(function(){
	
	categoryProductFilterPaginationButton(false);

	$(document).on('click', '#categoryproductfilter-list li a', function(e){
		
		// show loading
        categoryProductFilterShowLoading();

		$this    = $(this);

		// calculate active class
		$('#categoryproductfilter-list li a ').removeClass('active');
		$this.addClass('active');

		categoryProductFilterResetAnotherFiltersModulesButtons();
		
		params = {
			'category': $this.data('category'),
			'name'    : $this.data('name'),
			'p'		  : 1,
		};

		categoryProductFilterMadeRequest(params);
        e.preventDefault();
	});
});


function categoryProductFilterMadeRequest(params){
	// ajax call 
	$.ajax({
		type: 'GET',
		url: $('#categoryproductfilter_url_ajax').find('input').val(), // + '?rand=' + new Date().getTime(),
		data: params,
		dataType: 'json',
		cache: false, // @todo see a way to use cache and to add a timestamps parameter to refresh cache each 10 minutes for example
		success: function(result)
		{
			if (result.productList) {
				$('.product_list').replaceWith(utf8_decode(result.productList));
			} else {
				$('.product_list').html('');
			}

			if ($.browser.msie) { // Fix bug with IE8 and aliasing
				$('.product_list').css('filter', '');
			}

			if (result.pagination.search(/[^\s]/) >= 0) {
				var pagination = $('<div/>').html(result.pagination)
				var pagination_bottom = $('<div/>').html(result.pagination_bottom);

				if ($('<div/>').html(pagination).find('#pagination').length) {
					$('#pagination').show();
					$('#pagination').replaceWith(pagination.find('#pagination'));
				} else {
					$('#pagination').hide();
				}

				if ($('<div/>').html(pagination_bottom).find('#pagination_bottom').length) {
					$('#pagination_bottom').show();
					$('#pagination_bottom').replaceWith(pagination_bottom.find('#pagination_bottom'));
				} else {
					$('#pagination_bottom').hide();
				}

			} else {
				$('#pagination').hide();
				$('#pagination_bottom').hide();
			}

			categoryProductFilterPaginationButton(result.nbRenderedProducts, result.nbAskedProducts);

            // reside
            categoryProductFilterResizeProductContainers();

            // hide loading
            categoryProductFilterHideLoading();


			// url 
			current_friendly_url = result.current_friendly_url;
			// Currente page url
			if (typeof(current_friendly_url) === 'undefined') {
				current_friendly_url = '#';
			}
			if (current_friendly_url == '#') {
				current_friendly_url = '#/';
			}
			window.location.href = current_friendly_url;
			if (current_friendly_url != '#/show-all') {
				$('div.clearfix.selector1').show();
			}

            // Scroll to top
            $('html, body').animate({
                scrollTop: $("#page").offset().top
            }, 1000);
           
		}
	});

}

function categoryProductFilterShowLoading() {
    $('.product_list').prepend($('#categoryproductfilter_ajax_loader').html());
    $('.product_list').css('opacity', '0.7');
}

function categoryProductFilterHideLoading() {
    $('.product_list').css('opacity', '1');
}

function categoryProductFilterResizeProductContainers() {
    setTimeout(function () {
        var heights = $(".product_list .ajax_block_product").map(function () {
            return $(this).height();
        }).get();
		var maxHeight = Math.max.apply(null, heights);
		$(".product_list .product-container").height(maxHeight);
    }, 300);
}

function categoryProductFilterPaginationButton(nbProductsIn) {
	if (typeof(current_friendly_url) === 'undefined')
		current_friendly_url = '#';

	$('div.pagination a').not(':hidden').each(function () {
		var page = 1;
        var href = $(this).attr('href');
        if (href.search('&p=') != -1) {
			page = href.replace(/^.*&p=(\d+).*$/, '$1');
		} else if (href.search('\\?p=') != -1) {
			page = href.replace(/^.*\\?p=(\d+).*$/, '$1');
		}

		var location = window.location.href.replace(/#.*$/, '');
		$(this).attr('href', location+current_friendly_url.replace(/\/page-(\d+)/, '')+'/page-'+page);
	});

	$('div.pagination li').not('.current, .disabled, .truncate').each(function () {
		var nbPage = 0;
		if ($(this).hasClass('pagination_next'))
			nbPage = parseInt($('div.pagination li.current').children().children().html())+ 1;
		else if ($(this).hasClass('pagination_previous'))
			nbPage = parseInt($('div.pagination li.current').children().children().html())- 1;

		$(this).children().children().on('click', function(e)
		{
			e.preventDefault();
			if (nbPage == 0) {
				p = parseInt($(this).html()) + parseInt(nbPage);
			} else {
				p = nbPage;
			}
			
			params = {
				'p': p,
				//'category': $('#filter-sizes').data('category'),
				//'size'    : $('#volumen').val()
			};
			
			// show loading
			categoryProductFilterShowLoading();
			categoryProductFilterMadeRequest(params);
			nbPage = 0;
		});
	});

	//product count refresh
	if(nbProductsIn!=false){
		if(isNaN(nbProductsIn) == 0) {
			// add variables
			var productCountRow = $('.product-count').html();
			var nbPage = parseInt($('div.pagination li.current').children().children().html());
			var nb_products = nbProductsIn;

			if ($('#nb_item option:selected').length == 0)
				var nbPerPage = nb_products;
			else
				var nbPerPage = parseInt($('#nb_item option:selected').val());

			isNaN(nbPage) ? nbPage = 1 : nbPage = nbPage;
			nbPerPage*nbPage < nb_products ? productShowing = nbPerPage*nbPage :productShowing = (nbPerPage*nbPage-nb_products-nbPerPage*nbPage)*-1;
			nbPage==1 ? productShowingStart=1 : productShowingStart=nbPerPage*nbPage-nbPerPage+1;


			//insert values into a .product-count
			productCountRow = $.trim(productCountRow);
			productCountRow = productCountRow.split(' ');
			productCountRow[1] = productShowingStart;
			productCountRow[3] = productShowing;
			productCountRow[5] = nb_products;
			productCountRow = productCountRow.join(' ');
			$('.product-count').html(productCountRow);
			$('.product-count').show();
		}
		else {
			$('.product-count').hide();
		}
	}
}

function categoryProductFilterResetAnotherFiltersModulesButtons() {
	// reset sizeproductfilter module button if exists
	if ($('#sizeproductfilter').length) {
		var button = $('.filter-button .radio span').closest('.filter-button');
		button.css('background-color', 'white');
		button.children('label').css('color', '#000000');
	}

	// reset blocklayered_mod genero buttons if exists
	if ($('ul#ul_layered_id_feature_13').length) {
		$('ul#ul_layered_id_feature_13 li div[id^=ck-button]').each(function(index, value) {
			var $this = $(value);
			var $checker = $this.find('.checker');
			var $span = $checker.children('span'); 
			if ($span.hasClass('checked')) {
				$span.removeClass('checked');
				$span.children('input').removeAttr('checked');
			}
			
			$this.children('label').find('a').css('background-color', 'white').css('color', '#000000');
		})
	}
}