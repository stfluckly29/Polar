<?php

/* Load slider first so that we can determine titlebar should be displayed when slider isn't present */
global $polar_slider_exists;
global $crf_runtime_options;

$polar_slider_exists = false;
if( empty( $crf_runtime_options['disable_titlearea'] ) ) :
	ob_start();
	?>
	<div class='polar-slider-area'>
		<?php $polar_slider_exists = crf_insert_slider(); ?>
	</div>
	<?php
	$slider_content = ob_get_clean();
else :
	$slider_content = '';
endif;

/* Load header */
$header_toggle = crf_get_option_value( '', 'display_header' );
if( $header_toggle != 'hide' ) {
	$header_style = crf_get_option_value( 'header-style', 'header_style' );
	get_template_part( 'templates/header/header', $header_style );
}

/* Output slider */
echo ( $slider_content );
