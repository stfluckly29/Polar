<article id="post-<?php the_ID(); ?>" <?php echo post_class( 'polar-post post-small-thumb' ) ?>>
	<?php
	get_template_part( 'templates/search/post-type-mark' ); 
	?>
	<h5 class='post-title'><a href='<?php echo esc_url( get_permalink() ) ?>'><?php the_title() ?></a></h5>
	<ul class='post-meta'><?php
		?><li><?php the_time( 'M j, Y'); ?></li><?php
	?></ul>
</article>