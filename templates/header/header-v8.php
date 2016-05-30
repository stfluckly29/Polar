<?php

global $crf_runtime_options;

$header_class = array();
$header_class[] = 'header-v8';
$header_class[] = 'header-layout1';

// Stretched enable/disable
if( crf_get_theme_option_value( 'header-stretched' ) == 'enable' ) {
	$header_class[] = 'stretched';
}

// Light/dark
$header_skin = crf_get_option_value( 'header-skin', 'header_skin' );
if( !$header_skin || $header_skin == 'default' ) {
	$header_skin = 'dark';
}
$header_class[] = $header_skin;

// Transparent enable/disable (titlearea show/hide)
if( !empty( $crf_runtime_options['transparent_header'] ) || crf_get_option_value( '', 'transparent_header' ) == 'yes' ) {
	$header_class[] = 'transparent';
}
?>
<header class='<?php echo esc_attr( implode( ' ', $header_class ) ); ?>'>
	<?php 
	
	/* Mobile header */
	get_template_part( 'templates/header/mobile-header' );

	/* Title area */
	get_template_part( 'templates/header/title-area' );

	$sticky_class = '';
	if( empty( $crf_runtime_options['disable_sticky'] ) && crf_get_theme_option_value( 'header-enable-sticky' ) == 'enable' ) {
		$sticky_class = ' polar-sticky-menu sticky-animated fixed-position no-space';
	}
	?>
	<div class='polar-main-menu-wrapper main-menu-area-wrapper<?php echo esc_attr( $sticky_class ); ?>'>
		<div class='container clearfix'>
			<?php
			polar_output_both_logos( $header_skin );
			?>
			<nav class='main-menu-wrapper'>
				<a class='vertical-menu-toggle' href='#'><i class='elegant-icon icon_menu'></i></a>
			</nav>
		</div>
	</div>
	<div class="polar-fullscreen-nav">
		<div class="blocks-container">
			<div class="block logo">
				<?php
				polar_output_both_logos( $header_skin );
				?>
			</div>
			<div class="block menu">
				<nav class='polar-vertical-menu-wrapper'>
					<h2 class='hidden'><?php esc_html_e( 'Main Navigation Menu', 'polar' ) ?></h2>
					<?php
					if( has_nav_menu( 'main-menu' ) ) {
						$menu_class = array();
						$menu_class[] = 'polar-vertical-menu';
						wp_nav_menu( 
							array( 
								'theme_location' => 'main-menu',
								'container_id'	=>	'main-menu',
								'container_class' => implode( ' ', $menu_class ), 
								'items_wrap' => '<ul id="%1$s" class="%2$s">%3$s</ul>',
								'walker' => new Crystal_Vertical_Nav_Walker()
							)
						);
					}
					?>
				</nav>
			</div>
			<div class="block social">
				<div class='social-icons-block'><?php 
					get_template_part( 'templates/header/topbar-social-icons' );
				?></div>
			</div>
		</div>
		<a class='vertical-menu-close' href='#'><i class='elegant-icon icon_close'></i></a>
	</div>
	
</header>