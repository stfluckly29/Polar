<article id="post-<?php the_ID(); ?>" <?php echo post_class( 'polar-post polar-isotope-item' ) ?>>
	<?php
	if( has_post_thumbnail() ) {
		echo '<div class="featured-media">';
		the_post_thumbnail( 'polar_grid_thumbnail_fixed', array( 'class' => 'featured-image' ) );
		echo '</div>';
	} 

	get_template_part( 'templates/blog/grid/post', 'content' );
	?>
</article>
