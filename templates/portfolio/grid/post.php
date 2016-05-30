<?php

$hover_style = apply_filters( 'polar_portfolio_post_hover_style', crf_get_theme_option_value( 'portfolio-hover-style' ) );
$portfolio_image = wp_get_attachment_url( get_post_thumbnail_id() );

?>
<article id='post-<?php the_ID(); ?>' <?php echo post_class( 'polar-portfolio grid x_x polar-isotope-item' ) ?>>
	<div class='featured-media-wrapper'>
		<div class='featured-media' style="background-image: url('<?php echo esc_url( $portfolio_image ) ?>')">
			<?php
			if( has_post_thumbnail() ) {
				the_post_thumbnail( 'full', array( 'class' => 'hidden' ) );
			}
			?>
		</div>
		<?php
		
		get_template_part( 'templates/portfolio/hover/' . $hover_style );
		
		?>
	</div>
</article>