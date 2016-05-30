<?php

$archive_container_class = array();
$archive_container_class[] = 'polar-content';
$archive_container_class[] = 'portfolio-archive';

$portfolio_fullwidth = crf_get_theme_option_value( 'portfolio-archive-fullwidth' );
if( $portfolio_fullwidth == 'enable' ) {
	$archive_container_class[] = 'portfolio-fullwidth';
}
$item_padding = crf_get_theme_option_value( 'portfolio-archive-item-margin' );
if( $item_padding != 'enable' ) {
	$archive_container_class[] = 'no-item-padding';
}

$portfolio_layout = crf_get_theme_option_value( 'portfolio-layout' );

?>
<div class='<?php echo implode( ' ', $archive_container_class ); ?>'>
	<?php
	
	get_template_part( 'templates/container', 'start' );
	
	if( have_posts() ) {
		
		get_template_part( 'templates/portfolio/category-filter' );

		get_template_part( 'templates/portfolio/' . $portfolio_layout . '/loop' );
		
		$pagination_type = crf_get_theme_option_value( 'portfolio-pagination' );
		global $wp_query;
		if( $pagination_type == 'infinitescroll' ) {
			polar_ajax_pagination( $wp_query, "templates/portfolio/$portfolio_layout/post", false, true );
		} elseif( $pagination_type == 'loadmore' ) {
			polar_ajax_pagination( $wp_query, "templates/portfolio/$portfolio_layout/post", false, false );
		} else {
			crf_pagination_archive();
		}

	} else {
		
		get_template_part( 'templates/empty' );
		
	}
	
	get_template_part( 'templates/container', 'end' );
	
	?>
</div>