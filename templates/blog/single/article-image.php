<article id="post-<?php the_ID(); ?>" <?php post_class( 'polar-post single' ) ?>>
	<?php
	if( has_post_thumbnail() && crf_get_option_value( 'blog-show-featured-media', 'show_featured_media' ) != 'hide' ) {
		echo '<div class="featured-media">';
		the_post_thumbnail( 'full', array( 'class' => 'featured-image' ) );
		echo '</div>';
	}
	
	get_template_part( 'templates/blog/single/content' );
	?>
</article>