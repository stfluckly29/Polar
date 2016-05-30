<?php

$header_class = array();
$header_class[] = 'header-v7';
$header_class[] = 'header-layout4';

$header_skin = 'dark';
$header_class[] = $header_skin;
?>
<header class='<?php echo esc_attr( implode( ' ', $header_class ) ); ?>'>
	<h1 class='hidden'><?php echo crf_page_title(); ?></h1>
	<?php 
	
	/* Mobile header */
	get_template_part( 'templates/header/mobile-header' );

	?>
	<div class='polar-main-menu-wrapper'>
		<div class='scroll-wrapper'>
			<div class='inner-wrapper'>
				<?php
				polar_output_both_logos( $header_skin ); 
				?>
				<div class='margin-block below-logo'>
				</div>
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
				<div class='margin-block below-menu'>
				</div>
				<div class='search-form-block'>
					<form role="search" class='search-form' method="get" action="<?php echo esc_url( home_url( '/' ) ); ?>">
						<div class='input-wrapper'>
							<input type='text' name='s' placeholder='<?php echo esc_html__( 'Search...', 'polar' ); ?>'  value="<?php echo esc_attr( get_query_var( 's' ) ); ?>">
						</div>
						<button class='submit-button' type="submit"><i class='ion-ios-search-strong'></i></button>
					</form>
				</div>
				<div class='margin-block below-search'>
				</div>
				<div class='cart-block'>
					<a class='polar-cart-link' href='#'>
						<i class='ion-bag'></i><span class='cart-info-wrapper'><span class='cart-info'>3 Items - $150.00</span></span>
					</a>
				</div>
				<div class='margin-block below-cart'>
				</div>
				<div class='social-icons-block'><?php 
					get_template_part( 'templates/header/topbar-social-icons' );
				?></div>
				<div class='margin-block below-social'>
				</div>
			</div>
		</div>
	</div>
</header>