<article id="post-<?php the_ID(); ?>" <?php post_class( 'polar-post single' ) ?>>
	<?php
	if( crf_get_option_value( 'blog-show-featured-media', 'show_featured_media' ) != 'hide' ) {
		$embed = get_post_meta( get_the_ID(), 'crf_featured_media_embed', true );
		if( !empty( $embed ) ) {
			echo '<div class="featured-media fixed-ratio">';
			echo $embed;
			echo '</div>';
		}
	}
	
	get_template_part( 'templates/blog/single/content' );
	?>
</article>