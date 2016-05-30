<?php

$hover_style = apply_filters( 'polar_portfolio_post_hover_style', crf_get_theme_option_value( 'portfolio-hover-style' ) );
?>
<article id='post-<?php the_ID(); ?>' <?php echo post_class( 'polar-portfolio masonry x_x polar-isotope-item' ) ?>>
	<div class='featured-media-wrapper'>
		<?php
		if( has_post_thumbnail() ) {
			the_post_thumbnail( 'full', array( 'class' => 'portfolio-image' ) );
		}
		
		get_template_part( 'templates/portfolio/hover/' . $hover_style );
		
		?>
	</div>
</article>