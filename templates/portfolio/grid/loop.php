<?php

$columns = crf_get_theme_option_value( 'portfolio-columns' );
$item_padding = crf_get_theme_option_value( 'portfolio-archive-item-margin' );
if( $item_padding == 'enable' ) {
	$padding = 30;
} else {
	$padding = 0;
}
?>
<div class="polar-portfolios grid clearfix polar-isotope-container" data-selector=".polar-portfolio" data-columns="<?php echo esc_attr( $columns ) ?>" data-gutter="<?php echo ( $padding ); ?>" data-layout="fitRows" data-appear-animation="true">
	<?php
	while( have_posts() ): the_post();
		get_template_part( 'templates/portfolio/grid/post' );
	endwhile; 
	?>
</div>