<?php
ob_start();
the_terms( get_the_ID(), 'portfolio_category', '', ', ', '' );
$categories = ob_get_clean();
?>
<article id="post-<?php the_ID(); ?>" <?php echo post_class( 'polar-post post-small-thumb' ) ?>>
	<?php
	get_template_part( 'templates/search/post-type-mark' ); 
	?>
	<h5 class='post-title'><a href='<?php echo esc_url( get_permalink() ) ?>'><?php the_title() ?></a></h5>
	<ul class='post-meta'><?php
		?><li><?php the_time( 'M j, Y'); ?></li><?php
		?><li><?php printf( esc_html__( 'in %s', 'polar' ), $categories ); ?></li><?php
	?></ul>
</article>