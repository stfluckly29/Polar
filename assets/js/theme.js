"use strict";

( function( $, window, undefined ) {

	var $body = $( 'body' );
	var $window = $( window );
	var searchbox_opened = false;
	var init_triggered = false;
	
	/* prettyPhoto init functions */
	$.fn.polar_init_prettyphoto = function() {
		$(this).prettyPhoto( {
			hook: 'data-rel',
			social_tools: false,
			theme: 'pp_default',
			horizontal_padding: 0,
			opacity: 0.85,
			default_width: 800,
			default_height: 600,
			deeplinking: false,
			slideshow: false,
			autoplay_slideshow: false,
			show_title: true,
			allow_resize: true,
			counter_separator_label: '/',
			autoplay: true,
			modal: false,
			overlay_gallery: false,
			keyboard_shortcuts: true,
			markup: '<div class="pp_pic_holder"> \
					<div class="ppt"></div> \
					<div class="pp_top"></div> \
					<div class="pp_details"> \
						<div class="pp_nav"> \
						    <a href="#" class="pp_arrow_previous"><i class="ion-ios-arrow-left"></i> </a> \
							<a href="#" class="pp_arrow_next"><i class="ion-ios-arrow-right"></i> </a> \
							<p class="currentTextHolder">0 / 0</p> \
						</div> \
						<a class="pp_close" href="#"><i class="ion-ios-close-empty"></i></a> \
					</div> \
					<div class="pp_content_container"> \
						<div class="pp_left"> \
						<div class="pp_right"> \
							<div class="pp_content"> \
								<div class="pp_fade"> \
									<div class="pp_hoverContainer"> \
									</div> \
									<div id="pp_full_res"></div> \
									<p class="pp_description"></p> \
								</div> \
							</div> \
						</div> \
						</div> \
					</div> \
					<div class="pp_bottom"></div> \
				</div> \
				<div class="pp_overlay"></div>'
		} );
	}

	/* Manually fire the resize event */
	function polar_fire_resize_event() {
		var resize_event = document.createEvent( 'UIEvents' );
		resize_event.initUIEvent( 'resize', true, false, window, 0 );
		window.dispatchEvent( resize_event );
	}
	
	/* ThrottledScroll function */
	function ThrottledScroll( handler, timeout ) {
		this.timeout = timeout || 10;
		this.handler = handler;
		this.scrolled = false;
		this.interval = 0;
		var _this = this;
		function scroll( timed ) {
			if( _this.interval == 0 || timed ) {
				try {
					handler( $window.scrollTop() );
				} catch( err ) {
					console.log( err );
				}
				if( _this.scrolled ) {
					_this.scrolled = false;
					_this.interval = setTimeout( function() {
						scroll( true );
					}, _this.timeout );
				} else if( timed ) {
					_this.interval = 0;
				}
			}
		}
		function init() {
			$( window ).on( 'scroll', function() {
				_this.scrolled = true;
				scroll();
			} );
		}
		init();
	}

	/* Mobile/Tablet check */
	function is_mobile_or_tablet() {
		if( /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
		    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4)) ) {
			return true;
		}
		return false;
	}
	
	/* Background click event */
	function init_bg_click_test() {
		$( 'html, body' ).on( 'click', function( event ) {
			if( searchbox_opened && !$( event.target ).closest( '.polar-search-form' ).length ) {
				searchbox_opened = false;
				$( '.polar-search-form' ).removeClass( 'opened' );
				return false;
			}
		} );
	}

	/* Visual Composer waypoint 3 override */
	function vc_waypoint4_override() {
		setTimeout( function () {
			if ( typeof $.fn.waypoint4 !== 'undefined' ) {
				$( '.wpb_animate_when_almost_visible:not(.wpb_start_animation)' ).waypoint4( function () {
					$( this.element ).addClass( 'wpb_start_animation' );
				}, { offset: '85%' } );
			}
		}, 1600 );
		setTimeout( function () {
			if ( typeof $.fn.waypoint4 !== 'undefined' ) {
				$( '.vc_progress_bar' ).waypoint4( function () {
					$( this.element ).find( '.vc_single_bar' ).each( function ( index ) {
						var $this = $( this ),
							bar = $this.find( '.vc_bar' ),
							val = bar.data( 'percentage-value' );

						setTimeout( function () {
							bar.css( { "width": val + '%' } );
						}, index * 200 );
					} );
				}, { offset: '85%' } );
			}
		}, 100 );
	}

	/* Initialize WOW animation js */
	function init_wow() {
		if( !is_mobile_or_tablet() || polar_theme_vars.use_css3_animations_on_mobile == 'enable' ) {
			new WOW().init();
		} else if( polar_theme_vars.use_css3_animations_on_mobile != 'enable' ) {
			$( 'body' ).addClass( 'polar-css3-animations-disabled' );
		}
	}

	/* Header main menu - preventing dropdown overflowing container */
	function header_main_menu_prevent_overflow() {
		// - Top level dropdown
		var $dropdowns = $( '.polar-menu-bar .menu > .menu-item > .sub-menu' );
		if( $dropdowns.length > 0 ) {
			var $container = $($dropdowns[0]).closest( '.container' );
			if( $container.length > 0 ) {
				var container_right_max = $container.offset().left + $container.width();
				$dropdowns.each( function() {
					var $dropdown = $(this);
					if( $dropdown.offset().left + $dropdown.width() > container_right_max - 15 ) {
						$dropdown.css( 'left', 'auto' );
						$dropdown.css( 'right', '0' );
					}
				} );
			}
		}
		// - Sub level dropdown
		var $sub_dropdowns = $( '.polar-menu-bar .menu .sub-menu > .menu-item > .sub-menu' );
		if( $sub_dropdowns.length > 0 ) {
			var $container = $($sub_dropdowns[0]).closest( '.container' );
			if( $container.length > 0 ) {
				var container_right_max = $container.offset().left + $container.width();
				$sub_dropdowns.each( function() {
					var $sub_dropdown = $(this);
					if( $sub_dropdown.offset().left + $sub_dropdown.width() > container_right_max - 15 ) {
						$sub_dropdown.css( 'left', 'auto' );
						$sub_dropdown.css( 'right', '100%' );
					}
				} );
			}
		}
	}

	/* Header topbar dropdown */
	function init_header_topbar_dropdown() {
		$( '.polar-topbar-dropdown' ).each( function() {
			var $this = $(this);
			var $dropdown = $this.children( '.dropdown' );
			$this.children( '.dropdown-link' ).on( 'click', function() {
				if( $dropdown.hasClass( 'opened' ) ) {
					$dropdown.removeClass( 'opened' );
				} else {
					$this.siblings( '.polar-topbar-dropdown' ).children( '.dropdown' ).removeClass( 'opened' );
					$dropdown.addClass( 'opened' );
				}
				return false;
			} );
			$dropdown.children( '.item' ).on( 'click', function() {
				$dropdown.removeClass( 'opened' );
				$this.find( '.dropdown-content' ).html( $(this).html() );
			} );
		} );
	}
	
	/* WP adminbar height */
	window.get_wp_adminbar_height = function() {
		if( $body.hasClass( 'admin-bar' ) ) {
			if( $window.outerWidth() <= 600 ) {
				return 0;
			} else if( $window.outerWidth() <= 782 ) {
				return 46;
			} else {
				return 32;
			}
		} else {
			return 0;
		}
	}
	
	/* Get header height, height of transparent height is 0 */
	window.get_header_height = function() {
		var $header = $( 'header' );
		if( $header.hasClass( 'header-layout4' ) ) {
			return 0;
		} else if( $header.hasClass( 'transparent' ) ) {
			if( $header.find( '.polar-mobile-header' ).is( ':visible' ) ) {
				return $header.height();
			} else {
				return 0;
			}
		} else {
			return $header.height();
		}
	}
	
	/* Menu item smooth scroll */
	function init_menu_smooth_scroll() {
		var offset = window.get_wp_adminbar_height();
		var $sticky = $( '.polar-sticky-menu' );
		if( $sticky.length && $sticky.is( ':visible' ) ) {
			offset += $sticky.height();
		}
		$('li.menu-item a').smoothScroll( {
			offset: -offset,
			speed: 400
		} );
	}
	
	/* Header sticky menu */
	function init_sticky_menu() {
		var $sticky_menus = $( '.polar-sticky-menu' );
		function init_sticky_menu_data() {
			$sticky_menus.each( function() {
				var $this = $(this);
				$this.data( 'sticky-pos', $this.offset().top + $this.height() - get_wp_adminbar_height() );
				if( !$this.hasClass( 'sticky-init' ) && !$this.hasClass( 'no-space' ) ) {
					var $sticky_space = $( document.createElement( 'div' ) );
					$sticky_space.css( 'height', $this.height() );
					$sticky_space.addClass( 'polar-sticky-space hidden' );
					$sticky_space.insertAfter( $this );
				}
				$this.addClass( 'sticky-init' );
			} );
		}
		function init_event_resize() {
			$window.on( "polar_resize_prior", function() {
				init_sticky_menu_data();
			} );
		}
		function sticky_menu_check() {
			var scroll_pos = $(window).scrollTop();
			$sticky_menus.each( function() {
				var $menu = $(this);
				var sticky_pos = $menu.data( 'sticky-pos' );
				var $sticky_space = $menu.siblings( '.polar-sticky-space' );
				if( scroll_pos > sticky_pos + 10 ) {
					$menu.addClass( 'sticky animated short slideInDown' );
					$sticky_space.removeClass( 'hidden' );
				} else if( scroll_pos <= sticky_pos + 10 && $menu.hasClass( 'sticky' ) ){
					$menu.removeClass( 'sticky animated short slideInDown' );
					$sticky_space.addClass( 'hidden' );
				}
			} );
		}
		function init_event_scroll() {
			new ThrottledScroll( function() {
				sticky_menu_check();
			} );
		}
		init_sticky_menu_data();
		init_event_resize();
		init_event_scroll();
		sticky_menu_check();
	}
	
	/* Mobile header */
	function init_mobile_header() {
		var $mobile_header = $( '.polar-mobile-header' );
		var $search_wrapper = $mobile_header.find( '.search-box-wrapper' );
		var $menu = $mobile_header.find( '.mobile-menu' );
		var $menubg = $menu.siblings( '.mobile-menu-bg' );

		// Search
		$mobile_header.find( '.search-toggle' ).on( 'click', function() {
			$search_wrapper.addClass( 'opened' );
			return false;
		} );
		$mobile_header.find( '.search-box-close-link' ).on( 'click', function() {
			$search_wrapper.removeClass( 'opened' );
			return false;
		} );
		// Menu toggle
		$mobile_header.find( '.menu-toggle' ).on( 'click', function() {
			$menu.addClass( 'opened' );
			$menubg.addClass( 'opened' );
			return false;
		} );
		$menu.find( '.mobile-menu-close' ).on( 'click', function() {
			$menu.removeClass( 'opened' );
			$menubg.removeClass( 'opened' );
			return false;
		} );
		$menubg.on( 'click', function() {
			$menu.removeClass( 'opened' );
			$menubg.removeClass( 'opened' );
			return false;
		} );
		// Submenu toggle
		$menu.find( '.chevron' ).on( 'click', function() {
			var $li = $(this).closest( 'li' );
			if( $li.hasClass( 'active' ) ) {
				$li.removeClass( 'active' );
				$li.find( '.sub-menu' ).slideUp( 300 ).closest( 'li' ).removeClass( 'active' );
			} else {
				$li.addClass( 'active' );
				$li.children( '.sub-menu' ).slideDown( 300 );
				$li.siblings().find( '.sub-menu' ).slideUp( 300 ).closest( 'li' ).removeClass( 'active' );
			}
		} );
	}
	
	/* Header search box */
	function init_header_search_box() {
		// Open
		$( '.menu-search .search-icon' ).on( 'click', function() {
			var $searchbox = $(this).closest( '.menu-search' ).find( '.polar-search-form' );
			$searchbox.addClass( 'opened' );
			searchbox_opened = true;
			return false;
		} );
		// Close
		$( '.polar-search-form .search-close' ).on( 'click', function() {
			var $searchbox = $(this).closest( '.polar-search-form' );
			$searchbox.removeClass( 'opened' );
			searchbox_opened = false;
			return false;
		} );
		$( '.polar-search-form' ).on( 'click', function() {
			return false;
		} );
	}
	
	/* Megamenu position */
	function init_megamenu_position() {
		function adjust_megamenu_positions() {
			$( '.crf-megamenu-wrapper' ).each( function() {
				var $megamenu = $(this);
				var $container = $megamenu.closest( '.container' );
				var max_mg_width = 1110;
				var container_width = $container.width() + parseInt( $container.css( 'padding-left' ).replace( 'px', '' ) ) + parseInt( $container.css( 'padding-right' ).replace( 'px', '' ) ) - 60;
				if( container_width > max_mg_width ) {
					$megamenu.width( max_mg_width );
				} else if( container_width > 700 ) {
					$megamenu.width( container_width );
				}
				$megamenu.css( 'margin-left', -$megamenu.width() / 2 );
				var mg_right = $megamenu.offset().left + $megamenu.width();
				var cntr_right = $container.offset().left + container_width + 60;
				if( mg_right > cntr_right - 30 ) {
					$megamenu.css( 'margin-left', cntr_right - 30 - mg_right - $megamenu.width() / 2 );
				} 
			} );
		}
		$window.on( 'polar_resize', function() {
			adjust_megamenu_positions();
		} );
		adjust_megamenu_positions();
	}

	/* Header v8 menu toggle */
	function init_header_v8_menu_toggle() {
		$( '.header-v8 .vertical-menu-toggle' ).on( 'click', function() {
			var $menu = $(this).closest( 'header' ).find( '.polar-fullscreen-nav' );
			$menu.addClass( 'opened' );
			return false;
		} );
		$( '.header-v8 .vertical-menu-close' ).on( 'click', function() {
			var $menu = $(this).closest( 'header' ).find( '.polar-fullscreen-nav' );
			$menu.removeClass( 'opened' );
			return false;
		} );
	}

	/* Footer totop link */
	function init_footer_totop_link() {
		$( '.totop' ).on( 'click', function() {
			$.smoothScroll( {
				scrollElement: 0,
				speed: 1000
			} );
			return false;
		} );
	}
	
	/* Sharer link */
	function init_sharer_link() {
		$body.on( 'click', '.polar-social-sharer-link', function() {
			var url = $(this).attr( 'href' );
			if( url ) {
				window.open( url, 'Share', 'width=600,height=500' );
			}
			return false;
		} );
	}
	
	/* prettyPhoto init */
	function init_prettyphoto() {
		$( "a[data-rel^='prettyPhoto']" ).polar_init_prettyphoto();
	}

	/* Flexslider */
	function _init_flexslider( $slider_element ) {
		$slider_element.flexslider( {
			animation: 'slide',
			animationSpeed: 400,
			directionNav: $slider_element.data( 'directionnav' ),
			controlNav: $slider_element.data( 'controlnav' ),
			prevText: '<i class="fa fa-angle-left"></i>',
			nextText: '<i class="fa fa-angle-right"></i>',
			smoothHeight: $slider_element.data( 'smooth-height' )
		} );
	}
	function init_flexsliders() {
		$('.polar-flexslider:not(.manual-init)').each( function() {
			var $this = $(this);
			if( $this.closest( '.polar-isotope-container' ).length <= 0 ) {
				_init_flexslider( $this );
			}
		} );
	}
	
	/* Portfolio Gallery Post slider */
	function init_portfolio_gallery_slider() {
		if( $('.polar-portfolio-gallery-slider').length > 0 ) {
			$('.polar-portfolio-gallery-thumbs-carousel').flexslider( {
				animation: "slide",
				animationSpeed: 400,
				controlNav: false,
				directionNav: false,
				animationLoop: false,
				slideshow: false,
				itemWidth: 180,
				itemMargin: 30,
				prevText: '<i class="fa fa-angle-left"></i>',
				nextText: '<i class="fa fa-angle-right"></i>',
				asNavFor: '.polar-portfolio-gallery-slider'
			} );
		
			$('.polar-portfolio-gallery-slider').flexslider( {
				animation: "slide",
				animationSpeed: 400,
				controlNav: false,
				animationLoop: false,
				slideshow: false,
				smoothHeight: true,
				prevText: '<i class="fa fa-angle-left"></i>',
				nextText: '<i class="fa fa-angle-right"></i>',
				sync: ".polar-portfolio-gallery-thumbs-carousel"
			} );
		}
	}

	/* Portfolio Carousel */
	$.fn.polar_portfolio_carousel_arrows_check = function() {
		var $this = $(this);
		var $arrow_wrapper = $this.siblings( '.direction-nav-arrow-wrapper' );
		var $prev = $arrow_wrapper.find( '.direction-nav-arrow.prev' );
		if( $prev.length > 0 ) {
			var prev_left = $prev.offset().left;
			if( prev_left <= 0 ) {
				$arrow_wrapper.addClass( 'moved-inner' );
			} else if( $arrow_wrapper.hasClass( 'moved-inner' ) && prev_left >= 90 ) {
				$arrow_wrapper.removeClass( 'moved-inner' );
			}
		}
	}
	function init_portfolio_carousel() {
		$( '.polar-portfolio-carousel' ).each( function() {
			var $this = $(this);
			if( $this.hasClass( 'slick-initialized' ) ) {
				return;
			}
			// slick init
			var max_cols = $(this).data( 'max-columns' );
			$this.slick( {
				infinite: false,
				slidesToShow: max_cols,
				slidesToScroll: 1,
				swipeToSlide: true,
				appendArrows: $this.siblings( '.direction-nav-arrow-wrapper' ),
				prevArrow: '<a class="direction-nav-arrow prev"><i class="elegant-icon arrow_carrot-left"></a>',
				nextArrow: '<a class="direction-nav-arrow next"><i class="elegant-icon arrow_carrot-right"></a>',
				dots: false,
				responsive: [
					{
						breakpoint: 1024,
						settings: {
							slidesToShow: ( max_cols >= 3 ) ? 3 : max_cols,
							slidesToScroll: 1,
						}
					},
					{
						breakpoint: 800,
						settings: {
							slidesToShow: ( max_cols >= 2 ) ? 2 : max_cols,
							slidesToScroll: 1
						}
					},
					{
						breakpoint: 600,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
					}
				]
			} );
			
			// Show carousel after initialized
			$this.closest( '.polar-portfolio-carousel-wrapper' ).removeClass( 'not-loaded' );
			
			// prev, next position check
			$this.polar_portfolio_carousel_arrows_check();
			
			// category filter init
			var $filters = $this.closest( '.polar_portfolio_carousel' ).find( '.polar-isotope-filter .filter' );
			$filters.on( 'click', function() {
				var $self = $(this);
				var $items = $this.find( '.portfolio-item-wrapper' );
				var filter = $self.data( 'filter' );
				$items.removeClass( 'item-disabled' ).children( '.polar-portfolio' ).removeClass( 'hover-disabled' );
				if( filter != '*' ) {
					$items.not( filter ).addClass( 'item-disabled' ).children( '.polar-portfolio' ).addClass( 'hover-disabled' );
				}
				$this.slick( 'setPosition' );
				$filters.removeClass( 'active' );
				$self.addClass( 'active' );
				return false;
			} );
		} );
		// Portfolio Carousel arrows check
		$window.on( "polar_resize", function() {
			$( '.polar-portfolio-carousel' ).each( function() {
				$(this).polar_portfolio_carousel_arrows_check();
			} );
		} );
	}
	
	/* Post like */
	function init_post_like() {
		$body.on( 'click', '.polar-like-post', function() {
			var $this = $(this);
			$.ajax( {
				url: polar_theme_vars.ajaxurl,
				type: 'post',
				data: {
					action: 'crf_request_like_post',
					postid: $this.data( 'post-id' ),
					nonce: $this.data( 'nonce' )
				},
				success: function( response ) {
					response = JSON.parse( response );
					if( response['success'] ) {
						var $elem = $this.find( $this.data( 'status-element' ) );
						if( $elem.length ) {
							if( response['liked_now'] == 1 ) {
								$elem.addClass( $this.data( 'liked-class' ) ).removeClass( $this.data( 'not-liked-class' ) );
							} else if( response['liked_now'] == 0 ) {
								$elem.removeClass( $this.data( 'liked-class' ) ).addClass( $this.data( 'not-liked-class' ) );
							} else {
								console.log( 'Unexpected error: ajax call returned with error' );
							}
						}
					}
				},
				error: function( val ) {
					console.log( 'Unexpected error: request_like_post ajax call failed.' );
				}
			} );
			return false;
		} );
	}

	/* Isotope functions */
	var $isotope_containers = $('.polar-isotope-container' );
	function isotope_columns( wrapper ) {
		var columns = wrapper.data( 'columns' );
		var margin = wrapper.data( 'margin' );
		var layout = wrapper.data( 'layout' );
		if( !margin ) {
			margin = 0;
		}
		if( window.innerWidth <= 500 ) {
			columns = 1;
		} else if( window.innerWidth <= 768 ) {
			if( columns > 2 ) {
				columns = 2;
			}
		}
		if( columns > 2 ) {
			var column_width = Math.floor( ( wrapper[0].getBoundingClientRect().width + margin ) / columns - margin );
			if( column_width < 240 ) {
				if( layout == 'masonry2' ) {
					if( columns == 6 ) {
						columns = 4;
					}
				} else {
					columns = Math.floor( ( wrapper[0].getBoundingClientRect().width + margin ) / ( 300 + margin ) );
				}
			}
		}
		return columns;
	}
	function isotope_appear_items( $items, $animated ) {
		if( $animated == true && ( !is_mobile_or_tablet() || polar_theme_vars.use_css3_animations_on_mobile == 'enable' ) ) {
			$items.each( function( i ) {
				var $selector = $(this);
				setTimeout( function() {
					if( !$selector.hasClass( 'animation-done' ) ) {
						$selector.addClass( 'animated' ).addClass( 'animation-done' );
					}
				}, i * 100 );
			} );
		} else {
			$items.addClass( 'animation-done' );
		}
	}
	function isotope_set_items_width( $container ) {
		var gutter = $container.data( 'gutter' );		// Masonry 2 layout ignores gutter parameter
		var margin_bottom = $container.data( 'margin-bottom' );
		var selector = $container.data( 'selector' );
		var layout = $container.data( 'layout' );
		var cols = isotope_columns( $container );
		
		if( layout == 'masonry2' ) {
			var item_width = Math.floor( Math.floor( $container[0].getBoundingClientRect().width ) / cols );
			if( cols >= 2 ) {
				$container.find( selector + '.x_x' ).width( item_width );
				$container.find( selector + '.x_x' ).height( item_width );
				$container.find( selector + '.x_dx' ).width( item_width );
				$container.find( selector + '.x_dx' ).height( item_width * 2);
				if( cols > 2 ) {
					$container.find( selector + '.dx_x' ).width( item_width * 2 );
					$container.find( selector + '.dx_x' ).height( item_width );
					$container.find( selector + '.dx_dx' ).width( item_width * 2 );
					$container.find( selector + '.dx_dx' ).height( item_width * 2 );
				} else {
					$container.find( selector + '.dx_x' ).width( item_width * 2 );
					$container.find( selector + '.dx_x' ).height( item_width );
					$container.find( selector + '.dx_dx' ).width( item_width * 2 );
					$container.find( selector + '.dx_dx' ).height( item_width * 2 );
				}
			} else {
				$container.find( selector ).width( item_width );
				$container.find( selector + '.x_x' ).height( item_width );
				$container.find( selector + '.x_dx' ).height( item_width * 2);
				$container.find( selector + '.dx_x' ).height( item_width / 2 );
				$container.find( selector + '.dx_dx' ).height( item_width );
			}
			return item_width;
		} else {
			var item_width = Math.floor( ( $container[0].getBoundingClientRect().width + gutter ) / cols ) - gutter;
			var items = $container.find( selector );
			items.css( 'width', item_width );
			if( margin_bottom ) {
				items.css( 'margin-bottom', margin_bottom );
			} else {
				items.css( 'margin-bottom', gutter );
			}
			return item_width;
		}
	}
	$.fn.polar_isotope_init = function() {
		var $this = $(this);
		var gutter = $this.data( 'gutter' );		// Masonry 2 layout ignores gutter parameter
		var selector = $this.data( 'selector' );
		var layout = $this.data( 'layout' );
		var moveup_1col = $this.data( 'moveup' );
		var cols = isotope_columns( $this );

		var column_width = isotope_set_items_width( $this );

		if( layout == 'fitRows' ) {
			$this.isotope( {
				layoutMode: 'fitRows',
				selector: selector,
				fitRows: {
					gutter: gutter,
					columnWidth: column_width,
				},
				transitionDuration: '0s',
				hiddenStyle: {
					opacity: 0,
					transform: 'translateY(100px)'
				},
				visibleStyle: {
					opacity: 1,
					transform: 'translateY(0)'
				}
			} );
			var col_height = $this.find( selector ).eq(0).height();
			if( moveup_1col == 'yes' && col_height ) {
				$this.css( 'margin-top', -col_height );
			}
		} else if( layout == 'masonry' || layout == 'masonry2' ) {
			$this.isotope( {
				layoutMode: 'masonry',
				selector: selector,
				masonry: {
					columnWidth: column_width,
					gutter: gutter
				},
				transitionDuration: '0s',
				hiddenStyle: {
					opacity: 0,
					transform: 'translateY(100px)'
				},
				visibleStyle: {
					opacity: 1,
					transform: 'translateY(0)'
				}
			} );
			if( layout == 'masonry2' ) {
				if( moveup_1col == 'yes' ) {
					var col_height = column_width;
					var item1_height = $this.find( selector ).eq(0).height();
					if( item1_height && item1_height < col_height ) {
						col_height = item1_height;
					}
					$this.css( 'margin-top', -col_height );
				}
			}
		}
		
		// Initialize flexslider 
		_init_flexslider( $this.find( '.polar-flexslider' ) );
		
		// Initialize prettyPhoto
		$this.find( "a[data-rel^='prettyPhoto']" ).polar_init_prettyphoto();

		$this.waypoint4( {
			handler: function() {
				var waypoint = this;
				waypoint.disable();
				$this.addClass( 'loaded' );
				isotope_appear_items( $this.find( selector ), $this.data( 'appear-animation' ) );
			},
			offset: '99%'
		} );

		/* Category filter */
		var $filters = $this.siblings( '.polar-isotope-filter' );
		if( $filters.length == 0 ) {
			$filters = $this.parent().siblings( '.polar-isotope-filter' );
		}
		if( $filters.length == 0 ) {
			$filters = $this.parent().parent().siblings( '.polar-isotope-filter' );
		}
		if( $filters.length == 0 ) {
			$filters = $this.parent().parent().find( '.polar-isotope-filter' );
		}
		$filters.find( '.filter' ).on( 'click', function() {
			var filter = $(this).data( 'filter' );
			$this.find( selector ).addClass( 'animation-done' ).removeClass( 'animating' );
			$(this).siblings( '.filter' ).removeClass( 'active' );
			$(this).addClass( 'active' );
			$this.isotope( 'option', {
				transitionDuration: '0.5s'
			} );
			$this.isotope( { filter: filter } );
			$this.isotope( 'option', {
				transitionDuration: '0s'
			} );
			return false;
		} );
	}
	function isotope_append_items( $container, $posts_to_append_html, $loadmore_link ) {
		var $new_posts = $('<div/>');
		var selector = $container.data( 'selector' );
		
		$new_posts.html( $posts_to_append_html );
		$new_posts = $new_posts.find( selector );
		$new_posts.css( 'opacity', 0 );
		$container.append( $new_posts );
		
		imagesLoaded( $new_posts, function() {
			isotope_set_items_width( $container );
			
			$container.find("a[data-rel^='prettyPhoto']").polar_init_prettyphoto();

			if ( $container.hasClass( "polar-isotope-container") ) {
				$container.isotope( 'appended', $new_posts );
				isotope_appear_items( $new_posts, true );
			}
			else {
				$new_posts.animate( { 'opacity': 1 }, 400 );
			}
		} );
		var offset = $loadmore_link.data( 'offset' ) + $new_posts.length;
		$loadmore_link.data( 'offset', offset );

		// Initialize mediaelement
		if ( $container.hasClass( "polar-isotope-container") ) {
			if ( typeof $.fn.mediaelementplayer !== 'undefined' ) {
				$new_posts.find( "video" ).mediaelementplayer();
				$new_posts.find( "audio" ).mediaelementplayer();
			}
		}
	}
	// Isotope init
	function isotope_do_layout() {
		$isotope_containers.each( function() {
			$(this).polar_isotope_init();
		} );
	}
	// Pagination loadmore link state changes
	function pagination_ajax_loadmore_started( $loadmore_link ) {
		var $loadmore_wrapper = $loadmore_link.parent( '.loadmore-wrapper' );
		$loadmore_wrapper.addClass( 'loading' );
	}
	function pagination_ajax_loadmore_finished( $loadmore_link ) {
		var $loadmore_wrapper = $loadmore_link.parent( '.loadmore-wrapper' );
		$loadmore_wrapper.removeClass( 'loading' );
	}
	function pagination_ajax_loadmore_all_loaded( $loadmore_link ) {
		var $loadmore_wrapper = $loadmore_link.parent( '.loadmore-wrapper' );
		$loadmore_link.hide();
		$loadmore_wrapper.find( '.loading-gif' ).hide();
		$loadmore_wrapper.find( '.all-loaded' ).show();
		setTimeout( function() {
			$loadmore_wrapper.fadeOut( 700 );
		}, 3000 );
	}
	function pagination_ajax_infscr_load_finished( $ifs_anchor, waypoint ) {
		$ifs_anchor.removeClass( 'loading' );
		if( typeof waypoint != 'undefined' ) {
			setTimeout( function() {
				Waypoint4.refreshAll();
				waypoint.enable();
			}, 500 );
		}
	}
	function get_container_from_loadmore_link( $loadmore_link ) {
		var $loadmore_container = $loadmore_link.closest( '.polar-pagination-ajax-area' );
		var $container = $loadmore_container.siblings( '.polar-isotope-container' );
		if( $container.length > 0 ) {
			return $container;
		}
		$container = $loadmore_container.siblings().find( '.polar-isotope-container' );
		return $container;
	}
	function init_isotope_pagination() {
		/* Pagination - load more */
		$body.on( 'click', '.polar-loadmore', function() {
			var $loadmore_link = $(this);
			if( ! $loadmore_link.hasClass( 'infinite-scroll' ) ) {
				var params_data = $loadmore_link.data();
				pagination_ajax_loadmore_started( $loadmore_link );
				if( $loadmore_link.length > 0 ) {
					$.ajax( {
						url: polar_theme_vars.ajaxurl,
						type: 'post',
						data: {
							action: 'polar_loadmore_posts',
							params: params_data,
							nonce: $loadmore_link.data( 'nonce' )
						},
						success: function( html ) {
							if( html == 'allloaded' ) {
								pagination_ajax_loadmore_finished( $loadmore_link );
								pagination_ajax_loadmore_all_loaded( $loadmore_link );
							} else {
								var $container = get_container_from_loadmore_link( $loadmore_link );
								isotope_append_items( $container, html, $loadmore_link );
								pagination_ajax_loadmore_finished( $loadmore_link );
							}
						},
						error: function( val ) {
							pagination_ajax_loadmore_finished( $loadmore_link );
						}
					} );
				}
			}
			return false;
		} );
		
		/* Pagination - infinite scroll */
		$.fn.polar_isotope_ifs_element_init = function() {
			var $this = $(this);
			var $loadmore_link = $this.find( '.polar-loadmore' );
			$this.waypoint4( {
				handler: function() {
					var waypoint = this;
					waypoint.disable();
					var params_data = $loadmore_link.data();
					$this.addClass( 'loading' );
					$.ajax( {
						url: polar_theme_vars.ajaxurl,
						type: 'post',
						data: {
							action: 'polar_loadmore_posts',
							params: params_data,
							nonce: $loadmore_link.data( 'nonce' )
						},
						success: function( html ) {
							if( html == 'allloaded' ) {
								pagination_ajax_infscr_load_finished( $this );
							} else {
								var $container = get_container_from_loadmore_link( $loadmore_link );									
								isotope_append_items( $container, html, $loadmore_link );
								pagination_ajax_infscr_load_finished( $this, waypoint );
							}
						},
						error: function( val ) {
							pagination_ajax_infscr_load_finished( $this, waypoint );
						}
					} );
				},
				offset: '99%'
			} );
		}
		setTimeout( function() {
			$('.polar-infinite-scroll').each( function() {
				$(this).polar_isotope_ifs_element_init();
			} );
		}, 600 );
	}
	function init_isotope_resize_event() {
		$window.on( "polar_resize", function() {
			isotope_do_layout();
			Waypoint4.refreshAll();
		} );
	}
	/* Isotope and its related functions init */
	function init_isotope() {
		$(document).ready( function() {
			imagesLoaded( $isotope_containers, function() {
				/* Init isotope, also init category filter. Category filter container must be prev sibling of isotope container or its parent. */
				isotope_do_layout();
		
				/* Init loadmore / infinite-scrolling pagination */ 
				init_isotope_pagination();
		
				/* On window resize */
				init_isotope_resize_event();
			} );
		} );
	}
	
	/* One-page scrolling template */
	function init_onepage_scroll() {
		var $onepage_scroll_container = $( '.polar-content.onepage-scroll' );
		if( !$onepage_scroll_container.length || !$onepage_scroll_container.children( '.vc_row' ).length || $body.hasClass( 'compose-mode' ) ) {
			return;
		}
		var $rows = $onepage_scroll_container.children( '.vc_row' );
		var scroll_event = (/Firefox/i.test(navigator.userAgent)) ? 'DOMMouseScroll' : 'mousewheel';
		var header_skin_changable = true;
		
		function onepage_scroll_set_size() {
			var $slide_rows = $onepage_scroll_container.children( '.vc_row' );
			if( !$slide_rows.length ) {
				$slide_rows = $onepage_scroll_container.find( '.vc_row.slick-slide.onepage-row' );
			} else {
				$slide_rows.addClass( 'onepage-row' );
			}
			var height = window.innerHeight - get_wp_adminbar_height() - get_header_height();
			$onepage_scroll_container.css( {
				'width': '100%',
				'height': height
			} );
			$rows.css( {
				'width': '100%',
				'height': height
			} );
		}
		function onepage_scroll_remove_size() {
			var $slide_rows = $onepage_scroll_container.find( '.vc_row.onepage-row' );
			$onepage_scroll_container.css( {
				'width' : '',
				'height' : ''
			} );
			$slide_rows.css( {
				'width' : '',
				'height' : ''
			} );
		}
		function onepage_scroll_check_skin( event, slick, current_slide, next_slide ) {
			if ( slick && slick.$slider.get(0) != $onepage_scroll_container.get(0) ) { // if event is from other slick slider, return.
				return;
			}
			var $next_slide = $onepage_scroll_container.find( '> .slick-list > .slick-track > .slick-slide' ).eq( next_slide );
			if( !$next_slide.length ) {
				return;
			}
			var $dots = $( '.polar-onepage-dots' );
			var skin = $next_slide.data( 'skin' );
			if( skin == 'dark' ) {
				if( header_skin_changable ) {
					$( 'header' ).removeClass( 'light' ).addClass( 'dark' );
				}
				$dots.removeClass( 'light' ).addClass( 'dark' );
			} else {
				if( header_skin_changable ) {
					$( 'header' ).removeClass( 'dark' ).addClass( 'light' );
				}
				$dots.removeClass( 'dark' ).addClass( 'light' );
			}
		}
		function init_onepage_scroll_slick() {
			window.last_onepage_scroll = Date.now();
			if( window.innerWidth >= 768 ) {
				onepage_scroll_set_size();
				if( !$onepage_scroll_container.hasClass( 'slick-initialized' ) ) {
					$onepage_scroll_container.slick( {
						infinite: false,
						slidesToShow: 1,
						slidesToScroll: 1,
						speed: 700,
						arrows: false,
						dots: true,
						dotsClass: 'polar-onepage-dots',
						draggable: false,
						vertical: true,
						verticalSwiping: true,
						useCSS: false,
						easing: 'easeInQuart'
					} );
					$onepage_scroll_container.on( scroll_event, function( e ) {
						var ev = window.event || e;
						ev = ev.originalEvent ? ev.originalEvent : ev;
						var cur_ts = Date.now();
						if ( cur_ts - window.last_onepage_scroll < 1500 ) { // Prevent scroll event while animating
							ev.preventDefault();
							return;
						}
						window.last_onepage_scroll = cur_ts;
						var delta = ev.detail ? ev.detail * (-40) : ev.wheelDelta;
						if( delta > 0 ) {
							if( $onepage_scroll_container.find( '.vc_row.slick-slide.slick-active' ).prev( '.slick-slide' ).length > 0 ) {
								ev.preventDefault();
								$onepage_scroll_container.slick( 'slickPrev' );
							}
						} else {
							if( $onepage_scroll_container.find( '.vc_row.slick-slide.slick-active' ).next( '.slick-slide' ).length > 0 ) {
								ev.preventDefault();
								$onepage_scroll_container.slick( 'slickNext' );
							}
						}
					} );
					if( !$( 'header' ).hasClass( 'transparent' ) || $( 'header' ).hasClass( 'header-v4' ) ) {
						header_skin_changable = false;
					}
					$onepage_scroll_container.on( 'beforeChange', onepage_scroll_check_skin );
					onepage_scroll_check_skin( null, null, 0, 0 );
				}
				$onepage_scroll_container.slick( 'setPosition' );
			} else {
				if( $onepage_scroll_container.hasClass( 'slick-initialized' ) ) {
					$onepage_scroll_container.slick( 'unslick' );
					$onepage_scroll_container.off( scroll_event );
				}
				onepage_scroll_remove_size();
			}
		}

		init_onepage_scroll_slick();
		polar_bind_init_event();

		$window.on( 'polar_resize_prior', function() {
			init_onepage_scroll_slick();
		} );
	}
	function init_onepage_scroll_compose_mode() {
		var $onepage_scroll_container = $( '.polar-content.onepage-scroll' );
		function set_row_size() {
			var height = window.innerHeight - get_wp_adminbar_height() - get_header_height();
			$onepage_scroll_container.children( '.vc_element' ).children( '.vc_row' ).css( 'width', window.innerWidth ).css( 'min-height', height );
		}
		if( $onepage_scroll_container.length > 0 ) {
			if( !$onepage_scroll_container.hasClass( 'onepage-scroll-init' ) ) {
				set_row_size();
				$onepage_scroll_container.addClass( 'onepage-scroll-init' );
			}
			$window.on( 'polar_resize_prior', set_row_size );
		}
	}
	
	/* Multiscroll */
	function init_multiscroll() {
		var $ms = $( '.polar-content.multi-scroll' );
		if( !$ms.length || !$ms.children( '.vc_row' ).length || $body.hasClass( 'compose-mode' ) ) {
			return;
		}
		var $ms_left = $ms.children( '.ms-left' );
		var $ms_right = $ms.children( '.ms-right' );
		var $ms_mobile = $ms.children( '.ms-mobile' );

		function convert_to_ms_section( $vc_col ) {
			var $section = $vc_col.children( '.wpb_wrapper' );
			$section.removeClass( 'wpb_wrapper' ).addClass( 'ms-section' );
			$section.attr( 'id', $vc_col.attr( 'id' ) );
			var vc_custom_classes = $vc_col.attr( 'class' ).match( /vc_custom_[0-9]*/ );
			if( vc_custom_classes && vc_custom_classes.length > 0 ) {
				for( var i = 0; i < vc_custom_classes.length; i++ ) {
					$section.addClass( vc_custom_classes[i] );
				}
			}
			return $section;
		}
		
		function move_sections_to_mobile() {
			if( !$ms.hasClass( 'mobile-layout' ) ) {
				$ms.addClass( 'mobile-layout' );
				var $left_sections = $ms_left.children();
				var $right_sections = $ms_right.children();
				var section_count = $ms_left.children().length;
				for( var i = 0; i < section_count; i++ ) {
					$left_sections.eq( i ).appendTo( $ms_mobile );
					$right_sections.eq( section_count - i - 1 ).appendTo( $ms_mobile );
				}
				var $new_section = $( document.createElement( 'div' ) );
				$new_section.html( '<div class="ms-tableCell"></div>' );
				$new_section.addClass( 'ms-section ms-table' );
				$new_section.clone().appendTo( $ms_left );
				$new_section.appendTo( $ms_right );
			}
		}
		function recover_sections_from_mobile() {
			if( $ms.hasClass( 'mobile-layout' ) ) {
				$ms.removeClass( 'mobile-layout' );
				$ms_left.children().remove();
				$ms_right.children().remove();
				var i = 0;
				while( $ms_mobile.children().length > 0 ) {
					$ms_mobile.children().eq( 0 ).appendTo( $ms_left );
					$ms_mobile.children().eq( 0 ).prependTo( $ms_right );
				}
			}
		}
		
		function check_responsive_layout() {
			if( window.innerWidth <= 992 ) {
				move_sections_to_mobile();
				$.fn.multiscroll.destroy();
			} else {
				recover_sections_from_mobile();
				$.fn.multiscroll.build();
			}
		}
		
		$window.on( 'polar_resize_prior', check_responsive_layout );
		
		$( function() {
			$ms.children( '.vc_row' ).each( function() {
				var $row = $(this).find( '.polar-row' );
				if( $row.children().length > 1 ) {
					var $left = $( $row.children()[0] );
					var $right = $( $row.children()[1] );
					convert_to_ms_section( $left ).appendTo( $ms_left );
					convert_to_ms_section( $right ).appendTo( $ms_right );
				}
			} ).remove();
			$ms.multiscroll( {
				navigation: true,
				navigationColor: '#000'
			} );
			$('html').addClass( 'polar-multi-scroll' );
			check_responsive_layout();
			$ms.addClass( 'initialized' );
			polar_bind_init_event();
		} );
	}
	function init_multiscroll_compose_mode() {
		function set_ms_columns_height() {
			var $ms = $( '.polar-content.multi-scroll' );
			var height = window.innerHeight - get_wp_adminbar_height() - 30;
			$ms.find( '.vc_element > .vc_row .polar-row > .vc_element > .wpb_column' ).height( height );
		}
		$window.on( 'polar_resize_prior', set_ms_columns_height );
		set_ms_columns_height();
	}
	
	/* WooCommerce control bars */
	function init_wc_control_bars() {
		var $form = $( '.woocommerce-ordering' );
		$( '.polar-wc-product-count select' ).on( 'change', function() {
			$form.find( '.productcount' ).val( $(this).val() );
			$form.submit();
		} );
		$( '.polar-wc-view-mode-link.grid' ).on( 'click', function() {
			$form.find( '.wcviewmode' ).val( 'grid' );
			$form.submit();
			return false;
		} );
		$( '.polar-wc-view-mode-link.details' ).on( 'click', function() {
			$form.find( '.wcviewmode' ).val( 'details' );
			$form.submit();
			return false;
		} );
	}
	
	/* WooCommerce add to cart button */
	function init_wc_add_to_cart_button() {
		$body.on( 'click', '.product .add_to_cart_button', function() {
			var $product = $(this).closest( '.product' );
			var $spinner = $product.find( '.cart-adding' );
			$spinner.find( '.loading-spinner' ).show();
			$spinner.find( '.loading-done' ).hide();
			$spinner.addClass( 'spinner-adding-to-cart' );
		} );
		$body.bind( 'added_to_cart', function() {
			var $spinner = $( '.spinner-adding-to-cart' );
			$spinner.find( '.loading-spinner' ).fadeOut( 300 );
			$spinner.find( '.loading-done' ).fadeIn( 300 );
			setTimeout( function() {
				$spinner.removeClass( 'spinner-adding-to-cart' );
			}, 2000 );
		} );
	}
	
	/* WooCommerce quantity input */
	function init_wc_qty_input() {
		$( '.polar-quantity-input .quantity-dec' ).on( 'click', function() {
			var $qty_input = $(this).siblings( 'input.qty' );
			
			var qty = $qty_input.val();
			qty = parseInt( ( qty )? qty : 0 );
			
			var step = $qty_input.data( 'step' );
			if( step ) {
				qty -= parseInt( step );
			} else {
				qty -= 1;
			}
			
			var min = $qty_input.attr( 'min' );
			if( min ) {
				min = parseInt( min );
				qty = ( qty >= min )? qty : min;
			}
			
			$qty_input.val( qty );
			return false;
			
		} );
		$( '.polar-quantity-input .quantity-inc' ).on( 'click', function() {
			var $qty_input = $(this).siblings( 'input.qty' );
			
			var qty = $qty_input.val();
			qty = parseInt( ( qty )? qty : 0 );
			
			var step = $qty_input.data( 'step' );
			if( step ) {
				qty += parseInt( step );
			} else {
				qty += 1;
			}
			
			var max = $qty_input.attr( 'max' );
			if( max ) {
				max = parseInt( max );
				qty = ( qty <= max )? qty : max;
			}
			
			$qty_input.val( qty );
			return false;
		} );
	}
	
	/* WooCommerce prettyPhoto */
	function init_wc_prettyphoto() {
		$( "a[data-wc-rel^='prettyPhoto']" ).prettyPhoto( {
			hook: 'data-wc-rel',
			social_tools: false,
			theme: 'pp_default',
			horizontal_padding: 0,
			opacity: 0.85,
			default_width: 800,
			default_height: 600,
			deeplinking: false,
			slideshow: false,
			autoplay_slideshow: false,
			show_title: true,
			allow_resize: true,
			counter_separator_label: '/',
			autoplay: true,
			modal: false,
			overlay_gallery: true,
			keyboard_shortcuts: true,
			markup: '<div class="pp_pic_holder"> \
					<div class="ppt"></div> \
					<div class="pp_top"></div> \
					<div class="pp_details"> \
						<div class="pp_nav"> \
						    <a href="#" class="pp_arrow_previous"><i class="ion-ios-arrow-left"></i> </a> \
							<a href="#" class="pp_arrow_next"><i class="ion-ios-arrow-right"></i> </a> \
							<p class="currentTextHolder">0 / 0</p> \
						</div> \
						<a class="pp_close" href="#"><i class="ion-ios-close-empty"></i></a> \
					</div> \
					<div class="pp_content_container"> \
						<div class="pp_left"> \
						<div class="pp_right"> \
							<div class="pp_content"> \
								<div class="pp_fade"> \
									<div class="pp_hoverContainer"> \
									</div> \
									<div id="pp_full_res"></div> \
									<p class="pp_description"></p> \
								</div> \
							</div> \
						</div> \
						</div> \
					</div> \
					<div class="pp_bottom"></div> \
				</div> \
				<div class="pp_overlay"></div>'
		} );
	}

	/* vc_reload event in VC frontend editor */
	function init_event_vc_reload() {
		$window.on( 'vc_reload', function() {
			// prettyPhoto
			init_prettyphoto();
			
			// Isotope containers refresh
			$isotope_containers = $( '.polar-isotope-container' );
			imagesLoaded( $isotope_containers, function() {
				isotope_do_layout();
			} );
			
			// Portfolio Carousel
			init_portfolio_carousel();
			
			// Onepage scrolling template
			init_onepage_scroll_compose_mode();
			
			// Multi-scrolling template
			init_multiscroll_compose_mode();
		} );
	}
	
	/* Window resize event, this function calculates important resizings first, and then trigger polar_resize that most of elements are using */
	function init_event_window_resize() {
		$window.on( "throttledresize", function() {
			$window.trigger( 'polar_resize_prior' );
			$window.trigger( 'polar_resize' );
		} );
	}

	
	/* Overall init */
	function polar_init_elements() {
		init_bg_click_test();
		vc_waypoint4_override();
		init_wow();
		header_main_menu_prevent_overflow();
		init_header_topbar_dropdown();
		init_menu_smooth_scroll();
		init_sticky_menu();
		init_mobile_header();
		init_header_search_box();
		init_megamenu_position();
		init_header_v8_menu_toggle();
		init_footer_totop_link();
		init_sharer_link();
		init_prettyphoto();
		init_flexsliders();
		init_portfolio_gallery_slider();
		init_portfolio_carousel();
		init_post_like();
		init_isotope();
		init_wc_control_bars();
		init_wc_add_to_cart_button();
		init_wc_qty_input();
		init_wc_prettyphoto();
	}
	function polar_bind_init_event() {
		$window.on( 'polar_init', polar_init_elements );
		if( !init_triggered ) {
			init_triggered = true;
			$window.trigger( 'polar_init' );
		}
	}
	function polar_init() {
		init_onepage_scroll();
		init_multiscroll();

		init_event_vc_reload();
		init_event_window_resize();
		
		polar_bind_init_event();
	}

	/* Start JS init */
	polar_init();

} )( jQuery, window );