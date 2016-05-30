<?php

$blog_layout = crf_get_theme_option_value( 'blog-layout' );

?>
<div class='polar-content'>
	<?php
	
	get_template_part( 'templates/container', 'start' );
	
	if( have_posts() ) {

		get_template_part( 'templates/blog/' . $blog_layout . '/loop' );
		
		$pagination_type = crf_get_theme_option_value( 'blog-pagination' );
		global $wp_query;
		if( $pagination_type == 'infinitescroll' ) {
			polar_ajax_pagination( $wp_query, "templates/blog/$blog_layout/post", true, true );
		} elseif( $pagination_type == 'loadmore' ) {
			polar_ajax_pagination( $wp_query, "templates/blog/$blog_layout/post", true, false );
		} else {
			crf_pagination_archive();
		}

	} else {
		
		get_template_part( 'templates/empty' );
		
	}
	
	get_template_part( 'templates/container', 'end' );
	
	?>
</div>