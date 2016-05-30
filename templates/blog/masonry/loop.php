<?php 
$columns = crf_get_theme_option_value( 'blog-columns' );
if( $columns < 2 ) {
	$columns = 2;
}
?>
<div class="polar-posts grid polar-isotope-container" data-selector=".polar-post" data-columns="<?php echo esc_attr( $columns ) ?>" data-gutter="30" data-layout="masonry" data-margin-bottom="60" data-appear-animation="true">
	<?php
	while( have_posts() ): the_post();
		get_template_part( 'templates/blog/masonry/post', get_post_format() );
	endwhile; 
	?>
</div>