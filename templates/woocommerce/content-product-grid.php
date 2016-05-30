<?php 

global $product, $woocommerce_loop;

// Store loop count we're currently on
if ( empty( $woocommerce_loop['loop'] ) ) {
	$woocommerce_loop['loop'] = 0;
}

// Store column count for displaying the grid
if ( empty( $woocommerce_loop['columns'] ) ) {
	$woocommerce_loop['columns'] = apply_filters( 'loop_shop_columns', 4 );
}

// Ensure visibility
if ( ! $product || ! $product->is_visible() ) {
	return;
}

// Increase loop count
$woocommerce_loop['loop']++;

// Extra post classes
$classes = array();
if ( 0 === ( $woocommerce_loop['loop'] - 1 ) % $woocommerce_loop['columns'] || 1 === $woocommerce_loop['columns'] ) {
	$classes[] = 'first';
}
if ( 0 === $woocommerce_loop['loop'] % $woocommerce_loop['columns'] ) {
	$classes[] = 'last';
}

$classes[] = 'polar-product';
$classes[] = 'polar-isotope-item';
$classes[] = 'in-loop';

?>
<div <?php post_class( $classes ); ?>>

	<?php do_action( 'woocommerce_before_shop_loop_item' ); ?>

	<div class='product-thumbnail'>
	
		<?php
			/**
			 * woocommerce_before_shop_loop_item_title hook
			 *
			 * @hooked woocommerce_show_product_loop_sale_flash - 10
			 * @hooked woocommerce_template_loop_product_thumbnail - 10
			 */
			do_action( 'woocommerce_before_shop_loop_item_title' );
			
			echo sprintf( '<a href="%s">', esc_url( get_the_permalink() ) );
			
			// Second gallery image as hover
			$attachment_ids = $product->get_gallery_attachment_ids();
			if( is_array( $attachment_ids ) && !empty( $attachment_ids[1] ) ) {
				$img_url = wp_get_attachment_image_src( $attachment_ids[1], 'shop_catalog_image_size' );
				if( !empty( $img_url[0] ) ) {
					echo sprintf( '<img class="hover-image" src="%s">', esc_url( $img_url[0] ) );
				}
			}
			
			// Adding to cart spinner
			get_template_part( 'templates/woocommerce/cart-adding' );
			
			echo '</a>';
		?>
		
		<div class='product-hover'>
			<?php
				/**
				 * woocommerce_after_shop_loop_item hook
				 *
				 * @hooked woocommerce_template_loop_add_to_cart - 10
				 */
				do_action( 'woocommerce_after_shop_loop_item' );
			?>
			<?php
			$featured_image = wp_get_attachment_url( get_post_thumbnail_id() ); 
			?>
			<a class='button like polar-like-post' href='#' 
				<?php crf_lp_like_button_attr( get_the_ID(), 'ion-ios-heart liked', 'ion-ios-heart-outline', '.lp-icon' ); ?>
				><span><i class='lp-icon <?php crf_lp_post_liked( 'ion-ios-heart liked', 'ion-ios-heart-outline' ); ?>'></i></span></a>
			<a class='button view' href='<?php echo esc_url( $featured_image ); ?>' data-rel="prettyPhoto[products]" title="<?php echo get_the_title(); ?>"><span><i class='ion-ios-eye-outline'></i></span></a>
		</div>

	</div>

	<div class='product-content'>

		<h3 class='product-title'>
			<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
		</h3>
	
		<?php
			/**
			 * woocommerce_after_shop_loop_item_title hook.
			 *
			 * @hooked woocommerce_template_loop_rating - 5
			 * @hooked woocommerce_template_loop_price - 10
			 */
			do_action( 'woocommerce_after_shop_loop_item_title' );
		?>

	</div>

</div>
