<article id="post-<?php the_ID(); ?>" <?php echo post_class( 'polar-post polar-isotope-item post-listing-single' ) ?>>
	<?php
	if( has_post_thumbnail() ) {
		echo '<div class="featured-media">';
		the_post_thumbnail( 'full', array( 'class' => 'featured-image' ) );
		echo '</div>';
	}
	 
	get_template_part( 'templates/blog/listing/post', 'content' );
	?>
</article>
