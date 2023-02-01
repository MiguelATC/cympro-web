/**
 * WEBSITE: https://themefisher.com
 * TWITTER: https://twitter.com/themefisher
 * FACEBOOK: https://www.facebook.com/themefisher
 * GITHUB: https://github.com/themefisher/
 */

(function ($) {
	'use strict';

	/* ========================================================================= */
	/*	Page Preloader
	/* ========================================================================= */

	$(window).on('load', function () {
		$('#preloader').fadeOut('slow', function () {
			$(this).remove();
		});
	});

	/* ========================================================================= */
	/*	Portfolio Filtering Hook
	/* =========================================================================  */
	$('.play-icon i').click(function () {
		var video = '<iframe allowfullscreen src="' + $(this).attr('data-video') + '"></iframe>';
		$(this).replaceWith(video);
	});

	/* ========================================================================= */
	/*	Portfolio Filtering Hook
	/* =========================================================================  */

	$(document).ready(function () {
		var containerEl = document.querySelector('.filtr-container');
		var filterizd;
		if (containerEl) {
				filterizd = $('.filtr-container').filterizr({});
		}
		//Active changer
		$('.portfolio-filter button').on('click', function () {
				$('.portfolio-filter button').removeClass('active');
				$(this).addClass('active');
		});
});

	/* ========================================================================= */
	/*	Testimonial Carousel
	/* =========================================================================  */

	//Init the slider



	/* ========================================================================= */
	/*	Clients Slider Carousel
	/* =========================================================================  */

	// clients logo slider
	
	/* ========================================================================= */
	/*   Contact Form Validating
	/* ========================================================================= */




	function initialize() {
		var map;

		var nottingham = new google.maps.LatLng(51.507351, -0.127758);

		var style = [{
			'stylers': [{
				'hue': '#ff61a6'
			}, {
				'visibility': 'on'
			}, {
				'invert_lightness': true
			}, {
				'saturation': 40
			}, {
				'lightness': 10
			}]
		}];

		var mapOptions = {
			// SET THE CENTER
			center: nottingham,

			// SET THE MAP STYLE & ZOOM LEVEL
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			zoom: 17,

			// SET THE BACKGROUND COLOUR
			backgroundColor: '#000',

			// REMOVE ALL THE CONTROLS EXCEPT ZOOM
			panControl: false,
			zoomControl: true,
			mapTypeControl: false,
			scaleControl: false,
			streetViewControl: false,
			overviewMapControl: false,
			zoomControlOptions: {
				style: google.maps.ZoomControlStyle.LARGE
			}

		};
		map = new google.maps.Map(document.getElementById('map'), mapOptions);

		// SET THE MAP TYPE
		var mapType = new google.maps.StyledMapType(style, {
			name: 'Grayscale'
		});
		map.mapTypes.set('grey', mapType);
		map.setMapTypeId('grey');

		//CREATE A CUSTOM PIN ICON
		var marker_image = 'images/marker.png';
		var pinIcon = new google.maps.MarkerImage(marker_image, null, null, null, new google.maps.Size(25, 33));

		var marker = new google.maps.Marker({
			position: nottingham,
			map: map,
			icon: pinIcon,
			title: 'navigator'
		});
	}



})(jQuery);