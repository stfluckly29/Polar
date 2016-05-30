"use strict";

function polar_numberWithCommas(x) {
	return Math.round(x).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}
function polar_pad_zero( val ) {
	val = '0' + val;
	return val.substr(val.length - 2, 2);
}

( function( $, window, undefined ) {
	
	// Initialization

	var mobile_max_width = 768;

	var $window = $( window );

	// FadeOutUp Effect.
	$.fn.fadeOutUp = function( duration ) {
		$( this )
		.slideUp( duration )
		.animate(
			{ opacity: 0 },
			{ queue: false, duration: duration, done: function() {
				$( this ).css( { 'opacity' : '' } );
			} }
		);
	}
	// Parallax Effect
	$.fn.polarParallax = function() {
		if( navigator.platform.match( /(iPhone|iPod|iPad|Android)/i ) ) {
			return;
		}
		
		return $( this ).each( function() {
			var $self = $( this );
			var x_pos = $self.css( 'background-position' ).split( ' ' )[0];
			var y_pos = 0;
			
			if ( $self.hasClass( 'polar-parallax-fade' ) ) {
				$self.children().attr( 'polar-parallax-fade', 'true' );
			}
			$self.find( '.polar-parallax-bg' ).remove();

			if ( !x_pos ) x_pos = '50%';

			var $parallaxElement = $( '<div />' ).addClass( 'polar-parallax-bg' ).prependTo( $self );

			// Calculate the background image height.
			var bg_img_height = 0;

			var img = new Image();
			var bg_url = $parallaxElement.css('background-image').replace( /url\(|\)$/ig, "" ).replace( /"/g, '' );
			if ( bg_url && 'none' != bg_url ) {
				img.src = bg_url;
				imagesLoaded( img, function() {
					bg_img_height = img.height;
					polarParallaxResize();
				} );
			}
			$window.on( 'load scroll', function() {
				polarAdjustParallax();
			} );

			var polarAdjustParallax = function() {
				var $bg = $self.find( '.polar-parallax-bg' );
				var curPos = $window.scrollTop();
				var offset = ( $self.offset().top - curPos ) / 3;
				
				y_pos = offset / 1.3;

				$bg.css( {
					'background-position' : x_pos + ' ' + y_pos + 'px',
				} );
				if ( $self.find( '.vc_video-bg' ).length > 0 ) {
					$self.find( '.vc_video-bg' ).css( {
						'top' : - y_pos + 'px'
					} );
				}
				if ( $self.hasClass( 'polar-parallax-fade' ) ) {
					var offsetTop = $self.offset().top;
					var halfRowHeight = ( ( $self.outerHeight( true ) ) / 2 ) // half the row height + margin
					var offsetHalf = halfRowHeight + offsetTop;
			 
					$self.attr( 'data-scroll-top' , offsetTop );
					$self.attr( 'data-scroll-half', offsetHalf );
				 
					var j = ( curPos - offsetHalf ) / halfRowHeight;
					var $elem = $self.find ( '[polar-parallax-fade]' );
					if ( curPos > $self.data( 'scroll-half' ) ) {
						$elem.css( 'opacity', 1 - (j) );
					} else {
						$elem.css( 'opacity', '1' );
					}
				}
			}
			var polarParallaxResize = function() {
				if ( !bg_img_height ) return;

				var $bg = $self.find( '.polar-parallax-bg' );
				if ( $self.outerHeight() > bg_img_height ) {
					var percentY = $self.outerHeight() * 100.0 / $window.height();
					$bg.css( {
						'background-size' : 'auto ' + percentY + '%',
					} );
				} else {
					$bg.css( {
						'background-size' : 'cover',
					} );
				}
				polarAdjustParallax();
			}
			$window.on( 'throttledresize', function() {
				polarParallaxResize();
			} );

		} );

	}

	// Custom vc_row functions.
	// Equal Column Height on Mobile
	$.fn.polarEqualColumnHeight = function( options ) {
		var $rows = $( '.vc_row.polar-eq-col-height' );
		$rows.each( function() {
			var $self = $( this );
			// No need to calculate on multi-scroll page. theme.js does it.
			if ( $( '.polar-content' ).hasClass( 'multi-scroll' ) ) return;

			var $cols = $self.find( '>.vc_vc_column, .polar-row > .vc_vc_column, >.vc_vc_column_inner, .polar-row > .vc_vc_column_inner, >.wpb_column, .polar-row > .wpb_column' );
			// reset column height
			$cols.css( { 'height': '' } );
			// Do not process on mobile if equal column on mobile is not set.
			if ( ! $self.hasClass( 'polar-eq-mobile' ) && window.innerWidth < mobile_max_width ) return;

			// incase the row is in tabs or accordions...
			/*
			var $panel = $self.closest( '.ui-widget-content' );
			var previousCss = '';
			if ( $panel.length > 0 ) {
				previousCss = $panel.attr( 'style' );

				$panel.css( {
					position:   'absolute',
					visibility: 'hidden',
					display:    'block'
				} );
			}
			*/

			// get max height
			var max_height = 0;
			var $max_col;
			for ( var i = 0; i < $cols.length; i ++ ) {
				var $col = $( $cols[i] );
				if ( max_height < $col.outerHeight( true ) ) {
					max_height = $col.outerHeight( true );
					$max_col = $col;
				}
			}

			// incase the row is in tabs or accordions, return the previous css.
			/*
			if ( $panel.length > 0 ) {
				$panel.attr( 'style', previousCss ? previousCss : '' );
			}
			*/
			// set max height
			$cols.css( { 'height': max_height } );
			if ( $cols.length > 0 ) $max_col.css( { 'height': '' } );
		} );
	}

	$.fn.polarInitStretchColumns = function() {
		var $cols = $( '.wpb_column[class*=polar-stretch-bg]' );
		for ( var i = 0; i < $cols.length; i ++ ) {
			var $col = $( $cols[i] );
			
			if ( $col.parent().hasClass( 'vc_vc_column' ) ) {
				$col = $col.parent();
			}
			var $stretched_bg;
			$col.removeClass( 'polar-col-bg-none' );
			if ( ( $stretched_bg = $col.find( '.polar-col-stretch-bg' ) ).length > 0 ) $stretched_bg.remove();
			$stretched_bg = $( '<div />' ).addClass( 'polar-col-stretch-bg' ).css( {
				'background-image': $col.css( 'background-image' ),
				'background-size': $col.css( 'background-size' ),
				'background-position': $col.css( 'background-position' ),
				'background-repeat': $col.css( 'background-repeat' )
			} ).prependTo( $col );
			$col.addClass( 'polar-col-bg-none' );
		}
	}

	$.fn.polarStretchColumns = function( options ) {
		var $cols = $( '.wpb_column[class*=polar-stretch], .vc_vc_column[class*=polar-stretch]' );
		var $wrapper = $window;
		if ( $( '.polar-wrapper' ).length > 0 ) {
			$wrapper = $( '.polar-wrapper' );
		}

		for ( var i = 0; i < $cols.length; i ++ ) {
			var $col = $( $cols[i] );
			var $row = $col.closest( '.vc_row' );
			var is_full_width_col = window.innerWidth - $col.outerWidth() <= 30;
			
			$col.css( { 'margin-left' : '', 'margin-right' : '', 'width' : '' } );
			
			var l_offset = $col.offset().left - $wrapper.offset().left;
			var width = $col[0].getBoundingClientRect().width//.outerWidth();

			if ( $col.hasClass( 'polar-stretch-left' ) ) {
				var st_width = l_offset + width;
				$col.css( { 'margin-left': - l_offset, 'width': st_width } );
			}
			if ( $col.hasClass( 'polar-stretch-right' ) ) {
				var new_col_width = $wrapper.width() - l_offset;
				var r_offset = new_col_width - $col.width();
				$col.css( { 'width': new_col_width, 'margin-right' : - r_offset } );
			}
		}
	}

	$.fn.polarFullHeightRows = function() {
		var $rows = $( '.vc_row.vc_row-o-full-height' );
		var height = window.innerHeight - get_wp_adminbar_height() - get_header_height();
		$rows.css( { 'height': '', 'min-height': '' } );
		if ( window.innerWidth >= mobile_max_width && $( '.polar-content' ).hasClass( 'onepage-scroll' ) ) {
			$rows.css( 'height', height );
		} else {
			$rows.css( 'min-height', height );
		}
	}

	$.fn.polarStretchColumnsBG = function( options ) {
		var $cols = $( '.wpb_column[class*=polar-stretch-bg], .vc_vc_column[class*=polar-stretch-bg]' );
		var $wrapper = $window;
		if ( $( '.polar-wrapper' ).length > 0 ) {
			$wrapper = $( '.polar-wrapper' );
		}

		for ( var i = 0; i < $cols.length; i ++ ) {
			var $col = $( $cols[i] );
			var $row = $col.closest( '.vc_row' );
			var is_full_width_col = window.innerWidth - $col.outerWidth() <= 30;
			
			var l_offset = $col.offset().left - $wrapper.offset().left;
			var width = $col[0].getBoundingClientRect().width//.outerWidth();

			var bg_left = 0;
			var bg_width = width;
			var bg_top = 0;
			var bg_bottom = 0;

			var $stretched_bg;
			if ( $stretched_bg = $col.find( '.polar-col-stretch-bg' ) ) {
				$stretched_bg.css( { 'left' : '', 'top' : '', 'bottom' : '', 'width' : '' } );

				if ( $col.hasClass( 'polar-stretch-bg-left' ) ) {
					bg_width = l_offset + width;
					bg_left = - l_offset;
				}
				if ( $col.hasClass( 'polar-stretch-bg-right' ) ) {
					bg_width = $wrapper.width() - l_offset;
				}

				if ( !is_full_width_col || $col.is( ':first-child' ) ) {
					if ( $col.hasClass( 'polar-stretch-bg-top' ) ) {
						bg_top = $row.offset().top - $col.offset().top;
					}
				}
				if ( !is_full_width_col || $col.is( ':last-child' ) ) {
					if ( $col.hasClass( 'polar-stretch-bg-bottom' ) ) {
						var bg_bottom = $col.offset().top + $col.outerHeight() - $row.offset().top - $row.outerHeight();
					}
				}
				$stretched_bg.css( { 'left': bg_left, 'width': bg_width, 'top': bg_top, 'bottom': bg_bottom } );
			}
		}
	}

	window.vc_rowBehaviour = function() {
		// Process row video background.
		function polarInitRowVideoBackgrounds() {

			if ( typeof( vcExtractYoutubeId ) != 'function' ) return;
			$( '.vc_row' ).each( function () {
				var $row = jQuery( this ),
					youtubeUrl,
					youtubeId;

				if ( $row.data( 'polarVideoBg' ) ) {
					youtubeUrl = $row.data( 'polarVideoBg' );
					youtubeId = vcExtractYoutubeId( youtubeUrl );

					var $parallax_wrapper = $row;

					if ( $row.hasClass( 'polar-row-parallax' ) )
						$parallax_wrapper = $row.find( '.polar-parallax-bg' );

					if ( youtubeId ) {
						$row.find( '.vc_video-bg' ).remove();
						insertYoutubeVideoAsBackground( $parallax_wrapper, youtubeId );
					}

					jQuery( window ).on( 'grid:items:added', function ( event, $grid ) {
						if ( ! $row.has( $grid ).length ) {
							return;
						}

						vcResizeVideoBackground( $row );
					} );
				} else {
					$row.find( '.vc_video-bg' ).remove();
				}
			} );
		}

		// Process Row Parallax.
		$( '.polar-row-parallax' ).polarParallax();
		polarInitRowVideoBackgrounds();
	}

	// Google Map
	$.fn.polarGoogleMap = function() {
		$( '.polar_google_map .gmap-wrap' ).each( function() {
			var $self = $( this );
			var map_attributes = $self.data( 'map-attributes' );
			$self.polar_gmaps( map_attributes );
		} );
	}

	// Progressive Circle
	window.polarProgressCircle = function() {
		if ( $( '.polar_progress_circle:not(.polar_ready)' ).length > 0 ) {
			$( '.polar_progress_circle:not(.polar_ready)' ).polarChart();
		}
	}
	
	/* Image Magnifier */
	$.fn.polarMagnifyImage = function() {
		if ( $( '.polar-magnify-wrapper' ).length > 0 ) {
			 $( '.magnify-image' ).each( function() {
			 	$( this ).mlens({
					imgSrc: $( this ).attr( 'data-big' ),
					lensShape: 'circle',
					lensSize: 180,
					borderSize: 4,
					borderColor: '#000000',
					borderRadius: 0
				} );
			 } );
		}
	}

	function polarResizeMagnifyImage() {
		$( '.polar-magnify-wrapper' ).each( function() {
			var magnifyWidth = $( this ).width();
			$( this ).find( '>div' ).css( { width: magnifyWidth } );
		} );
	}

	$.fn.polarCommonSlickCarousel = function() {
		$( this ).each( function() {
			var $self = $( this );
			var container = $self.data( 'container' );
			if ( !container ) container = '.slider-container';

			var $main_slick = $self.find( container );

			if ( $main_slick.hasClass( 'slick-initialized' ) ) {
				return; //$main_slick.slick('unslick');
			}
			
			var autoplay = $self.data( 'autoplay' );
			var item_spacing = $self.data( 'item-spacing' );
			var items = $self.data( 'items' );
			var show_nav_bullets = $self.data( 'show-nav-bullets' );
			var show_nav_arrows = $self.data( 'show-nav-arrows' );
			var items_tablet = $self.data( 'items-tablet' );
			var items_mobile = $self.data( 'items-mobile' );
			
			if ( !items_tablet ) items_tablet = 3;
			if ( !items_mobile ) items_mobile = 2;
			var sts = 1, sts_tablet = 1, sts_mobile = 1;

			if ( show_nav_bullets ) {
				sts = items;
				sts_tablet = items_tablet;
				sts_mobile = items_mobile;
			}
			
			var main_slick_options = {
				draggable: true,
				direction: 'horizontal',
				speed: 300,
				dots: show_nav_bullets,
				slidesToShow: items,
				slidesToScroll: sts,
				vertical: false,
				swipeToSlide: true,
				responsive: [
					{
						breakpoint: 1024,
						settings: {
							slidesToShow: items_tablet,
							slidesToScroll: sts_tablet,
						}
					},
					{
						breakpoint: 600,
						settings: {
							slidesToShow: items_mobile,
							slidesToScroll: sts_mobile,
						}
					},
					{
						breakpoint: 480,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
						}
					}
				]
			}
			if ( autoplay ) {
				main_slick_options['autoplay'] = true;
				main_slick_options['autoplaySpeed'] = autoplay;
			}
			if ( show_nav_arrows ) {
				main_slick_options['nextArrow'] = $self.find( '.arrow-control.next' );
				main_slick_options['prevArrow'] = $self.find( '.arrow-control.prev' );
			}

			$main_slick.slick( main_slick_options );
		} );
	}

	$.fn.polarImageCarousel = function() {
		$( '.polar_image_carousel:visible' ).polarCommonSlickCarousel();
	}

	$.fn.polarTeamCarousel = function() {
		$( '.polar_team_carousel:visible' ).polarCommonSlickCarousel();
	}

	$.fn.polarProductsCarousel = function() {
		$( '.polar_products_carousel:visible' ).polarCommonSlickCarousel();
	}

	$.fn.polarTestimonials = function() {
		$( '.polar_testimonials.polar-style1, .polar_testimonials.polar-style2' ).each( function() {
			var $self = $( this );
			
			var $top_slider = $self.find( '.testimonials-container' );
			var $bottom_slider = $self.find( '.testimonial-thumbs > .slider-container' );
			var slideshowSpeed = $self.data( 'autoplay' );
			var slideshow = ( slideshowSpeed != 0 );
			$bottom_slider.flexslider({
				namespace: 'ts-',
				animation: 'slide',
				animationLoop: false,
				controlNav: false,
				slideshow: slideshow,
				slideshowSpeed: slideshowSpeed,
				minItems: 1,
				maxItems: 3,
				asNavFor: $top_slider,
				prevText: '',
				nextText: '',
				itemWidth: 90,
			} );
			$top_slider.flexslider({
				animation: 'slide',
				controlNav: false,
				directionNav: false,
				animationLoop: false,
				slideshow: slideshow,
				slideshowSpeed: slideshowSpeed,
				touch: true,
				smoothHeight: true,
				sync: $bottom_slider,
			} );
			
		} );

		$( '.polar_testimonials.polar-style3, .polar_testimonials.polar-style4' ).each( function() {
			var $self = $( this );
			
			var $main_slick = $self.find( '.testimonials-container' );
			
			if ( $main_slick.hasClass( 'slick-initialized' ) ) {
				return; //$main_slick.slick('unslick');
			}

			var autoplay = $self.data( 'autoplay' );

			var main_slick_options = {
				slidesToShow: 1,
				slidesToScroll: 1,
				draggable: true,
				direction: 'horizontal',
				speed: 600,
				nextArrow: $self.find( '.nav-control.next' ),
				prevArrow: $self.find( '.nav-control.prev' ),
			}
			if ( autoplay ) {
				main_slick_options['autoplay'] = true;
				main_slick_options['autoplaySpeed'] = autoplay;
			}

			$main_slick.slick( main_slick_options );
		} );

		$( '.polar_testimonials.polar-style5' ).each( function() {
			var $self = $( this );
			
			var $main_slick = $self.find( '.testimonials-container' );

			if ( $main_slick.hasClass( 'slick-initialized' ) ) {
				return; //$main_slick.slick('unslick');
			}

			var autoplay = $self.data( 'autoplay' );

			var main_slick_options = {
				slidesToShow: 1,
				slidesToScroll: 1,
				draggable: true,
				direction: 'horizontal',
				speed: 500,
				adaptiveHeight: true,
				dots: true,
				arrows: false,
				customPaging: function(slider, i) {
					var avatar_url = $self.find( '.testimonials-container .slide-item:nth-child(' + ( i + 1 ).toString() + ')' ).data( 'avatar' );
					return '<div class="testimonial-avatar"><div style="background-image:url(' + avatar_url + ')"></div></div>';
                },
			}
			if ( autoplay ) {
				main_slick_options['autoplay'] = true;
				main_slick_options['autoplaySpeed'] = autoplay;
			}

			$main_slick.slick( main_slick_options );
		} );

		$( '.polar_testimonials.polar-style6' ).each( function() {
			var $self = $( this );
			
			var $main_slick = $self.find( '.testimonials-container' );
			var autoplay = $self.data( 'autoplay' );

			var main_slick_options = {
				slidesToShow: 1,
				slidesToScroll: 1,
				draggable: true,
				direction: 'horizontal',
				fade: true,
				speed: 1000,
				adaptiveHeight: true,
				nextArrow: $self.find( '.nav-control.next' ),
				prevArrow: $self.find( '.nav-control.prev' ),
			}
			if ( autoplay ) {
				main_slick_options['autoplay'] = true;
				main_slick_options['autoplaySpeed'] = autoplay;
			}

			if ( $main_slick.hasClass( 'slick-initialized' ) ) {
				$main_slick.slick('unslick');
			}

			$main_slick.slick( main_slick_options );
		} );
	}
	$.fn.polarTestimonial7Resize = function() {
		$( '.polar_testimonials.polar-style7' ).each( function() {
			var $self = $( this );
			var $ts_items = $self.find( '.text-wrap .slide-item' );
			var max_height = 0;
			for( var i = 0; i < $ts_items.length; i ++ ) {
				max_height = Math.max( max_height, $( $ts_items[i] ).outerHeight() );
			}
			var title_height = $self.find( '.polar_section_header' ).outerHeight( true );

			$self.find( '.avatar-wrap .testimonial-avatar' ).height( max_height + title_height + 220 );
		} )
	}
	$.fn.polarTestimonialsExt = function() {
		$.fn.polarTestimonial7Resize();
		$( '.polar_testimonials.polar-style6, .polar_testimonials.polar-style7' ).each( function() {
			var $self = $( this );
			
			var $main_slick = $self.find( '.text-wrap .slider-container' );
			var $avatar_slick = $self.find( '.avatar-wrap .slider-container' );
			var autoplay = $self.data( 'autoplay' );

			var main_slick_options = {
				slidesToShow: 1,
				slidesToScroll: 1,
				draggable: true,
				direction: 'horizontal',
				speed: 300,
				nextArrow: $self.find( '.nav-control.next' ),
				prevArrow: $self.find( '.nav-control.prev' ),
				asNavFor: $avatar_slick,
			}
			if ( autoplay ) {
				main_slick_options['autoplay'] = true;
				main_slick_options['autoplaySpeed'] = autoplay;
			}

			if ( $main_slick.hasClass( 'slick-initialized' ) ) {
				$main_slick.slick('unslick');
			}

			$main_slick.slick( main_slick_options );

			var avatar_slick_options = {
				slidesToShow: 1,
				slidesToScroll: 1,
				draggable: true,
				direction: 'horizontal',
				fade: true,
				speed: 300,
				asNavFor: $main_slick,
			}
			$avatar_slick.slick( avatar_slick_options );
		} );
	};

	$.fn.polarTimeline = function() {
		$( '.polar_timeline' ).each( function() {

			var $self = $( this );
			var items_per_load = $self.data( 'itemsPerLoad' );
			var is_mobile = window.innerWidth < mobile_max_width;

			$self.data( 'itemsLoaded', 0 );
			$self.data( 'curPage', 1 );
			
			$self.find( '.tl-item:nth-child(odd)' ).addClass( 'left-side' );
			$self.find( '.tl-item:nth-child(even)' ).addClass( 'right-side' );
			$self.find( '.tl-item.polar_ready' ).removeClass( 'polar_ready');

			var loadItems;
			if ( $self.hasClass( 'manual' ) ) {
				loadItems = function() {
					var items_loaded = $self.data( 'itemsLoaded' );
					var $items = $self.find( '.tl-item:not(.polar_ready)' );
					var suffix = 'animated';
					if ( !items_loaded ) {
						items_loaded = 0;
						suffix = 'wow';
					}
					for ( var i = 0; i < items_per_load && i < $items.length; i ++ ) {
						var $item = $( $items[i] );
						if ( is_mobile ) {
							$item.find( '.tl-item-inner' ).addClass( 'fadeInLeft ' + suffix );
						} else {
							if ( $item.hasClass( 'left-side') ) {
								$item.find( '.tl-item-inner' ).addClass( 'fadeInLeft ' + suffix );
							} else {
								$item.find( '.tl-item-inner' ).addClass( 'fadeInRight ' + suffix );
							}
						}
						$item.addClass( 'polar_ready' );
					}
					items_loaded += Math.min( items_per_load, $items.length );
					$self.data( 'itemsLoaded', items_loaded );
					if ( $items.length < items_per_load ) {
						$self.addClass( 'done' );
					}
				}
				loadItems();
			} else {
				if ( is_mobile ) {
					$self.find( '.tl-item .tl-item-inner' ).addClass( 'wow fadeInLeft' );
				} else {
					$self.find( '.tl-item.left-side .tl-item-inner' ).addClass( 'wow fadeInLeft' );
					$self.find( '.tl-item.right-side .tl-item-inner' ).addClass( 'wow fadeInRight' );
				}
				
				$self.find( '.tl-item:not(.polar_ready)' ).addClass( 'polar_ready' );

				loadItems = function() {
					var cur_page = $self.data( 'curPage' ) + 1;
					$.ajax( {
						url: $self.data( 'ajax' ),
						type: 'post',
						data: {
							action: 'polar_timeline_posts',
							paged: cur_page,
							posts_per_page: items_per_load,
							nonce: $self.data( 'nonce' )
						},
						success: function( html ) {
							$self.find( '.tl-item-wrap' ).append( html );
							$self.data( 'curPage', cur_page );

							$self.find( '.tl-item:nth-child(odd)' ).addClass( 'left-side' );
							$self.find( '.tl-item:nth-child(even)' ).addClass( 'right-side' );

							if ( is_mobile ) {
								$self.find( '.tl-item .tl-item-inner' ).addClass( 'animated fadeInLeft' );
							} else {
								$self.find( '.tl-item.left-side .tl-item-inner' ).addClass( 'animated fadeInLeft' );
								$self.find( '.tl-item.right-side .tl-item-inner' ).addClass( 'animated fadeInRight' );
							}
							var $items = $self.find( '.tl-item:not(.polar_ready)' );
							$items.addClass( 'polar_ready' );
							if ( '' == html) {
								$self.addClass( 'done' );
							}
						},
						error: function( val ) {

						}
					} );
				}
			}

			$self.find( '.tl-loadmore' ).on( 'click', function() {
				loadItems();
			} );
		} );
	}

	$.fn.polarCounterbox = function( ) {
		$( this ).each( function() {
			var $counterbox = $(this);
			var $hidden_value = $counterbox.find( '.numeric-value-hidden' );
			if ( $hidden_value.length > 0 ) {
				$hidden_value.text( polar_numberWithCommas( $hidden_value.text() ) );
			}
			$counterbox.waypoint4( {
				handler: function() {
					var value = $counterbox.data( 'value' );
					$counterbox.find( '.numeric-value' ).countTo( {
						from: 0,
						to: value,
						speed: 1000,
						refreshInterval: 30,
						formatter: polar_numberWithCommas
					} );
					$counterbox.addClass( 'polar_ready' );
					this.destroy();
				},
				triggerOnce: true,
				offset: 'bottom-in-view'
			} );
		} );
	};

	$.fn.polarCountdown = function() {
		$( this ).each( function() {
			var $self = $( this );
			$self.countdown( $self.data( 'datetime' ), function( event ) {
				var days = event.strftime( '%D' );
				var hours = polar_pad_zero( event.strftime( '%H' ) );
				var minutes = polar_pad_zero( event.strftime( '%M' ) );
				var seconds = polar_pad_zero( event.strftime(  '%S' ) );
				$self.find( '.days .digit' ).html( days );
				$self.find( '.hours .digit' ).html( hours );
				$self.find( '.minutes .digit' ).html( minutes );
				$self.find( '.seconds .digit' ).html( seconds );
				if ( 0 == parseInt( days ) ) {
					$self.find( '.days' ).hide();
				}
			} );
			$self.addClass( 'polar_ready' );
		} );
	};

	$.fn.polarPageSlider = function() {
		$( '.polar_page_slider:not(.polar_ready)' ).polarCommonSlickCarousel();
	}

	$( document ).on( 'mailsent.wpcf7 invalid.wpcf7 spam.wpcf7 mailfailed.wpcf7', function() {
		setTimeout( function() {
			$( '.wpcf7-response-output' ).fadeOutUp();
			$( '.wpcf7-not-valid' ).removeClass( 'wpcf7-not-valid' );
		}, 5000 );
	} );

	var polarColumnClassReplace = function () {
		var css_classes, css_regex, class_match;
		$( '.vc_vc_column, .vc_vc_column_inner' ).each( function() {
			var $this = $( this );
			css_classes = $this.find( '> .wpb_column' ).attr( 'class' );
			css_regex = /(polar-[\w-]+)/g;
			class_match = css_classes && css_classes.match ? css_classes.match( css_regex ) : false;
			if ( class_match ) {
				for ( var i = 0; i < class_match.length; i ++ ) {
					$this.addClass( class_match[ i ] );
					css_classes = css_classes.replace( class_match[ i ], '' );
				}
				$this.find( '> .wpb_column' ).attr( 'class', css_classes.trim() );
				//$.fn.polarStretchColumns();
			}

			if ( $( '.polar-content' ).hasClass( 'multi-scroll' ) ) {
				css_classes = $this.attr( 'class' );
				css_regex = /.*(vc_custom_\d+).*/;
				class_match = css_classes && css_classes.match ? css_classes.match( css_regex ) : false;
				if ( class_match && class_match[ 1 ] ) {
					$this.removeClass( class_match[ 1 ] );
					$this.find( '> .wpb_column' ).addClass( class_match[ 1 ] );
				}
			}

		} );
	}

	$.fn.polarAlignClassReplace = function( wrapper_selector ) {
		var css_classes, css_regex, class_match;
		$( this ).each( function() {
			var $this = $( this );
			var $shortcode_wrapper = $this.find( wrapper_selector );
			css_classes = $shortcode_wrapper.attr( 'class' );
			css_regex = /(polar-align-[\w-]+)/;
			class_match = css_classes && css_classes.match ? css_classes.match( css_regex ) : false;
			if ( class_match && class_match[ 1 ] ) {
				$this.addClass( class_match[ 1 ] );
				$shortcode_wrapper.attr( 'class', css_classes.replace( class_match[ 1 ], '' ).trim() );
			}
		} );
	}
	var polarButtonClassReplace = function() {
		$( '.vc_polar_button' ).polarAlignClassReplace( '> .polar_button_container' );
	}

	var polarSocialLinksClassReplace = function() {
		$( '.vc_polar_social_links' ).polarAlignClassReplace( '> .polar_social_links' );
	}

	var polarInitTabContent = function() {
		var old_wpb_prepare_tab_content = window.wpb_prepare_tab_content;
		window.wpb_prepare_tab_content = function( event, ui ) {
			old_wpb_prepare_tab_content( event, ui );

			var panel = ui.panel || ui.newPanel;

			panel.find( '.polar_image_carousel' ).polarCommonSlickCarousel();
			panel.find( '.polar_team_carousel' ).polarCommonSlickCarousel();
			panel.find( '.polar_products_carousel' ).polarCommonSlickCarousel();
			panel.find( '.polar_counterbox:not(.polar_ready)' ).polarCounterbox();
			panel.find( '.polar_countdown:not(.polar_ready)' ).polarCountdown();
		}
	}

	// Initialize main shortcodes.
	var polarInitShortcodes = function() {
		$.fn.polarInitStretchColumns();
		$.fn.polarMagnifyImage();
		$.fn.polarImageCarousel();
		$.fn.polarTeamCarousel();
		$.fn.polarProductsCarousel();
		$.fn.polarTestimonials();
		$.fn.polarTimeline();
		$( '.polar_counterbox:not(.polar_ready)' ).polarCounterbox();
		$( '.polar_countdown:not(.polar_ready)' ).polarCountdown();
		$.fn.polarPageSlider();
	}

	// Initialize shortcodes that uses external js files.
	var polarInitShortcodesExt = function() {
		window.polarProgressCircle();
		$.fn.polarTestimonialsExt();
		$.fn.polarGoogleMap();
	}
	
	$window.on( 'polar_init', function() {
		polarInitShortcodes();
		$.fn.polarFullHeightRows();
		$.fn.polarStretchColumns();
		$.fn.polarEqualColumnHeight();
		$.fn.polarStretchColumnsBG();
	} );
	
	$( document ).ready( function() {
		// External shortcodes are initialized here for related js files are loaded after shortcodes.js.
		polarInitShortcodesExt();
	} );

	$window.load( function() {
		// Recall these functions for the height adjustment after all external files such as google fonts are loaded.
		$.fn.polarEqualColumnHeight();
		$.fn.polarStretchColumnsBG();
	} );

	var polarResizeContent = function() {
		$.fn.polarFullHeightRows();
		polarResizeMagnifyImage();
		$.fn.polarStretchColumns();
		$.fn.polarEqualColumnHeight();
		$.fn.polarStretchColumnsBG();
		setTimeout( $.fn.polarTestimonial7Resize, 50 );
	}
	// Window Resize Event triggered after all the high-prioritized are processed.
	$window.on( 'polar_resize', function() {
		if ( $( '.polar-content' ).hasClass( 'onepage-scroll' ) ) {
			setTimeout( polarResizeContent, 50 );
		} else {
			polarResizeContent();
		}
		
	} );

	// Triggered right after vc_behaviour functions are called.
	$window.on( 'vc_js', function() {
		polarInitTabContent();
	} );

	// Triggered when elements are updated on frontend editor.
	$window.on( 'vc_reload', function() {
		polarInitShortcodes();
		polarInitShortcodesExt();
		polarColumnClassReplace();
		polarButtonClassReplace();
		polarSocialLinksClassReplace();
		$.fn.polarStretchColumns();
		$.fn.polarEqualColumnHeight();
		$.fn.polarStretchColumnsBG();
	} );
} )( jQuery, window );
