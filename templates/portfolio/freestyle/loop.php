<?php

$columns = crf_get_theme_option_value( 'portfolio-columns' );
$item_padding = crf_get_theme_option_value( 'portfolio-archive-item-margin' );
if( $item_padding == 'enable' ) {
	$padding_class = ' with-padding';
} else {
	$padding_class = '';
}
?>
<div class='polar-portfolio-row<?php echo ( $padding_class ); ?>'>
	<div class="polar-portfolios masonry2 clearfix polar-isotope-container" data-selector=".polar-portfolio" data-columns="<?php echo esc_attr( $columns ) ?>" data-gutter="0" data-layout="masonry2" data-appear-animation="true">
		<?php
		while( have_posts() ): the_post();
			get_template_part( 'templates/portfolio/freestyle/post' );
		endwhile; 
		?>
	</div>
</div>