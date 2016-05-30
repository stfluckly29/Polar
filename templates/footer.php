<?php

$footer_classes = array();

?>
<footer class="<?php echo esc_attr( implode( ' ', $footer_classes ) ); ?>">
	<h2 class="hidden"><?php echo esc_html__( 'Footer', 'polar' ); ?></h2>
	<?php

	if( crf_get_option_value( 'footer-widget-area-show', 'footer_display_widget_area' ) != 'hide' ) {
		get_template_part( 'templates/footer/widget-area' );
	}
	
	if( crf_get_option_value( 'footer-bottom-bar-show', 'footer_display_bottom_bar' ) != 'hide' ) {
		get_template_part( 'templates/footer/bottom-bar' );
	}
	
	?>
</footer>