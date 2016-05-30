<?php

global $crf_runtime_options;

$header_class = array();
$header_class[] = 'header-v5';
$header_class[] = 'header-layout2';
//$header_class[] = 'stretched';

$header_skin = crf_get_option_value( 'header-skin', 'header_skin' );
if( !$header_skin || $header_skin == 'default' ) {
	$header_skin = 'dark';
}
$header_class[] = $header_skin;

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
			<nav class='main-menu-wrapper polar-menu-bar-wrapper'>
				<h2 class='hidden'><?php esc_html_e( 'Main Navigation Menu', 'polar' ) ?></h2>
				<?php
				if( has_nav_menu( 'main-menu' ) ) {
					$menu_class = array();
					$menu_class[] = 'polar-menu-bar';
					wp_nav_menu( 
						array( 
							'theme_location' => 'main-menu',
							'container_id'	=>	'main-menu',
							'container_class' => implode( ' ', $menu_class ), 
							'items_wrap' => '<ul id="%1$s" class="%2$s">%3$s</ul>',
							'walker' => new Crystal_Nav_Walker()
						)
					);
				}
				?>
			</nav>
			<div class='menu-icons-wrapper polar-menu-bar-wrapper'>
				<div class='<?php echo esc_attr( implode( ' ', $menu_class ) ); ?>'><ul class='menu'>
					<?php echo polar_add_icon_to_main_nav_menu( '', false ); ?>
				</ul></div>
			</div>
		</div>
	</div>
</header>