<?php
$copyright_text = crf_get_theme_option_value( 'footer-bottom-bar-copyright-text' ); 
?>
<div class="bottom-bar">
	<div class="container">
		<span class='copyright-text'>
			<?php echo ( $copyright_text ); ?>
		</span>
		<a class='totop' href='#'><i class='ion-arrow-up-c'></i></a>
	</div>
</div>