<?php
ob_start();
the_author_posts_link();
$author_link = ob_get_clean();

ob_start();
the_category( ', ' );
$categories = ob_get_clean();
?>
<article id="post-<?php the_ID(); ?>" <?php echo post_class( 'polar-post post-small-thumb' ) ?>>
	<?php
	get_template_part( 'templates/search/post-type-mark' ); 
	?>
	<h5 class='post-title'><a href='<?php echo esc_url( get_permalink() ) ?>'><?php the_title() ?></a></h5>
	<ul class='post-meta'><?php
		?><li><?php the_time( 'M j, Y'); ?></li><?php
		?><li><?php printf( esc_html__( 'by %s', 'polar' ), $author_link ); ?></li><?php
		?><li><?php printf( esc_html__( 'in %s', 'polar' ), $categories ); ?></li><?php
		if( !post_password_required() ) {
			echo '<li>';
			comments_popup_link( esc_html__( '0 Comments', 'polar' ), esc_html__( '1 Comments', 'polar' ), esc_html__( '% Comments', 'polar' ), 'polar-comments-link' );
			echo '</li>';
		}
	?></ul>
	<div class='post-excerpt'>
		<?php the_excerpt() ?>
	</div>
</article>