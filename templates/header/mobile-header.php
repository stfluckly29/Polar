<div class='polar-mobile-header'>
	<div class='control-bar-bg'></div>
	<div class='control-bar-wrapper padding-wrapper'>
		<div class='control-bar'>
			<div class='control-icons'>
				<div class='left'><?php
					?><a class='menu-toggle' href='#'><i class='ion-navicon'></i></a><?php
				?></div>
				<div class='center'><?php
					if( class_exists( 'Woocommerce' ) && crf_get_theme_option_value( 'header-show-shop-icon' ) != 'hide' ) {
						global $woocommerce;
						$cart_url = $woocommerce->cart->get_cart_url();
						?>
						<a class='cart-link-icon' href="<?php echo esc_url( $cart_url ); ?>">
							<span class="cart-size polar-cart-quantity"><?php echo intval( $woocommerce->cart->cart_contents_count ); ?></span>
							<i class="ion-bag"></i>
						</a>
						<?php
					} 
				?></div>
				<div class='right'><?php
					if( crf_get_theme_option_value( 'header-show-search-icon' ) != 'hide' ) {
						?><a class='search-toggle' href='#'><i class='ion-ios-search'></i></a><?php
					}
				?></div>
			</div>
			<div class='search-box-wrapper'>
				<form role="search" class='search-form' method="get" action="<?php echo esc_url( home_url( '/' ) ); ?>">
					<input type='text' name='s' placeholder='<?php echo esc_html__( 'Search...', 'polar' ); ?>' value='<?php echo esc_attr( '' ); ?>'>
				</form>
				<div class='search-close-wrapper'>
					<a class='search-box-close-link' href='#'><i class='elegant-icon icon_close'></i></a>
				</div>
			</div>
		</div>
	</div>
	<div class='padding-wrapper'>
		<div class='logo-area'>
			<?php polar_output_logo( 'light' ); ?>
		</div>
	</div>
	<div class='mobile-menu-bg'></div>
	<div class='mobile-menu'>
		<div class='topbar'>
			<a href='#' class='mobile-menu-close'><i class='elegant-icon icon_close'></i></a>
		</div>
		<?php
		if( has_nav_menu( 'main-menu' ) ) {
			wp_nav_menu( 
				array( 
					'theme_location' => 'main-menu',
					'container_id'	=>	'mobile-menu',
					'container_class' => '', 
					'items_wrap' => '<ul id="%1$s" class="%2$s">%3$s</ul>',
					'walker' => new Crystal_Mobile_Nav_Walker()
				)
			);
		}
		?>
	</div>
</div>