/*
 *	Code LiveSearch 1.0
 *	Demo's and documentation:
 *	contact to support@top1extensions.com
 *
 *	Copyright (c) 2014 top1extensions
 *	www.top1extensions.com
 *
 *	Dual licensed under the MIT and GPL licenses.
 *	http://en.wikipedia.org/wiki/MIT_License
 *	http://en.wikipedia.org/wiki/GNU_General_Public_License
 */
 
function doLiveSearch(params) {

		$.post(
		    $('#top1e_url_ajax_search input.url_ajax').val(), 
			params,
			function(data) 
			{ 
				$('#top1e_eccept_data').html(data);
		});
	
}