<?php

global $crf_runtime_options;

$header_class = array();
$header_class[] = 'header-v2';
$header_class[] = 'header-layout1';

// Stretched enable/disable
if( crf_get_theme_option_value( 'header-stretched' ) == 'enable' ) {
	$header_class[] = 'stretched';
}

// Light/dark
$header_skin = crf_get_option_value( 'header-skin', 'header_skin' );
if( !$header_skin || $header_skin == 'default' ) {
	$header_skin = 'light';
}
$header_class[] = $header_skin;

$show_topbar = crf_get_theme_option_value( 'header-v2-topbar-show' );
$topbar_left_text = crf_get_theme_option_value( 'header-v2-topbar-left-text' );
$show_social = crf_get_theme_option_value( 'header-v2-topbar-social-icons-show' );
$show_userinfo = crf_get_theme_option_value( 'header-v2-topbar-userinfo-show' );
?>
<header class='<?php echo esc_attr( implode( ' ', $header_class ) ); ?>'>
	<h1 class='hidden'><?php echo crf_page_title(); ?></h1>
	<?php 
	
	/* Mobile header */
	get_template_part( 'templates/header/mobile-header' );

	?>
	<div class='polar-main-menu-wrapper'>
		<?php if( $show_topbar != 'hide' ) : ?>
			<div class='topbar'>
				<div class='container clearfix'>
					<div class='left'>
						<?php echo ( $topbar_left_text ); ?>
					</div>
					<div class='right'>
						<?php
						if( $show_social != 'hide') {
							get_template_part( 'templates/header/topbar-social-icons' );
							if( $show_userinfo != 'hide' ) {
								?>
								<span class='sep'></span>
								<?php
							}
						}
						if( $show_userinfo != 'hide' ) { 
							if( false && is_user_logged_in() ) :	///
								get_template_part( 'templates/header/logged-welcome' );
							else : ?>
								<i class='elegant-icon icon_lock-open_alt'></i>
								<a class='login' href='<?php echo wp_login_url( get_permalink() ); ?>' title='<?php echo esc_html__( 'Login', 'polar' ); ?>'><?php echo esc_html__( 'Login', 'polar' ); ?></a> or <a class='register' href='<?php echo wp_registration_url(); ?>' title='<?php echo esc_html__( 'Register', 'polar' ); ?>'><?php echo esc_html__( 'Register', 'polar' ); ?></a>
							<?php
							endif;
						}
						?>
					</div>
				</div>
			</div>
		<?php endif; ?>
		<?php
		$sticky_class = '';
		if( empty( $crf_runtime_options['disable_sticky'] ) && crf_get_theme_option_value( 'header-enable-sticky' ) == 'enable' ) {
			$sticky_class = '  polar-sticky-menu sticky-animated';
		} 
		?>
		<div class='main-menu-area<?php echo esc_attr( $sticky_class ); ?>'>
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
						add_filter( 'wp_nav_menu_items', 'polar_add_icon_to_main_nav_menu', 10, 2 );
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
			</div>
		</div>
	</div>
</header>