<?php

global $crf_runtime_options;

ob_start();
the_author_posts_link();
$author_link = ob_get_clean();

ob_start();
the_category( ', ' );
$categories = ob_get_clean();

ob_start();
the_time( 'F j, Y');
$time = ob_get_clean();
?>
<?php if( empty( $crf_runtime_options['titlebar_displayed'] ) ) : ?>
<h1 class='post-title'><?php echo get_the_title(); ?></h1>
<?php endif; ?>
<ul class='post-meta'><?php
	?><li><?php printf( esc_html__( 'Posted at %s', 'polar' ), '<strong>' . $time . '</strong>' ); ?></li><?php
	?><li><?php printf( esc_html__( 'by %s', 'polar' ), $author_link ); ?></li><?php
	?><li><?php printf( esc_html__( 'in %s', 'polar' ), $categories ); ?></li><?php
?></ul>
<div class='post-content'>
	<?php
	the_content();
	wp_link_pages( array(
			'before'           => '<div class="crf-pagination">',
			'after'            => '</div>',
			'link_before'      => '<span class="current">',
			'link_after'       => '</span>',
			'separator'        => '',
			'nextpagelink'     => '<i class="fa fa-angle-left"></i>',
			'previouspagelink' => '<i class="fa fa-angle-right"></i>',
	) );
	?>
</div>