<article id="post-<?php the_ID(); ?>" <?php echo post_class( 'polar-post polar-isotope-item post-listing-single' ) ?>>
	<?php
	$embed = get_post_meta( get_the_ID(), 'crf_featured_media_embed', true );
	if( !empty( $embed ) ) {
		echo '<div class="featured-media fixed-ratio">';
		echo $embed;
		echo '</div>';
	}

	get_template_part( 'templates/blog/listing/post', 'content' );
	?>
</article>
