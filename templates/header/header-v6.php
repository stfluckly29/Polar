<?php

global $crf_runtime_options;

$header_class = array();
$header_class[] = 'header-v6';
$header_class[] = 'header-layout3';
//$header_class[] = 'stretched';

$header_skin = 'light';
$header_class[] = $header_skin;
$show_topbar = crf_get_theme_option_value( 'header-v6-topbar-show' );
$topbar_text = crf_get_theme_option_value( 'header-v6-topbar-text' );
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
					<div class='topbar-inner'>
						<div class='left'>
							<?php if( $topbar_text ) : ?>
								<span class='text'><?php echo ( $topbar_text ); ?></span>
							<?php endif;?>
						</div>
						<div class='right'>
							<?php if( false && is_user_logged_in() ) :	///
								get_template_part( 'templates/header/logged-welcome' );
							else : ?>
								<i class='ion-person'></i>
								<a class='login' href='<?php echo wp_login_url( get_permalink() ); ?>' title='<?php echo esc_html__( 'Login', 'polar' ); ?>'><?php echo esc_html__( 'Login', 'polar' ); ?></a><?php
								?><span class='lrsep'>/</span><?php
								?><a class='register' href='<?php echo wp_registration_url(); ?>' title='<?php echo esc_html__( 'Register', 'polar' ); ?>'><?php echo esc_html__( 'Register', 'polar' ); ?></a>
								<span class='sep'></span>
							<?php endif; ?>
							<span class='cart-icon'><i class='ion-android-cart'></i><span class='polar-cart-quantity'>2</span></span>
							<a class='polar-cart-link' href='#'>Cart<i class='drop-mark ion-ios-arrow-down'></i></a>
						</div>
					</div>
				</div>
			</div>
		<?php endif; ?>
		<div class='logo-area'>
			<div class='container'>
				<div class='logo-area-inner'>
					<div class='left'>
						<form role="search" class='search-form' method="get" action="<?php echo esc_url( home_url( '/' ) ); ?>">
							<div class='input-wrapper'>
								<input type='text' name='s' placeholder='<?php echo esc_html__( 'Search...', 'polar' ); ?>'  value="<?php echo esc_attr( get_query_var( 's' ) ); ?>">
							</div>
							<button class='submit-button' type="submit"><i class='ion-ios-search-strong'></i></button>
						</form>
					</div>
					<div class='center'><?php polar_output_both_logos( $header_skin ); ?></div>
					<div class='right social-icons'>
						<span class='text'><?php echo esc_html__( 'Follow Us On:', 'polar' ); ?></span> 
						<?php
						get_template_part( 'templates/header/topbar-social-icons' ); 
						?>
					</div>
				</div>
			</div>
		</div>
		<?php 
		$sticky_class = '';
		if( empty( $crf_runtime_options['disable_sticky'] ) && crf_get_theme_option_value( 'header-enable-sticky' ) == 'enable' ) {
			$sticky_class = ' polar-sticky-menu sticky-animated';
		}
		?>
		<div class='main-menu-area<?php echo esc_attr( $sticky_class ); ?>'>
			<div class='container'>
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
			</div>
		</div>
	</div>
</header>