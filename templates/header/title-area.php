<?php
global $polar_slider_exists;
global $crf_runtime_options;
if( !$polar_slider_exists ) :
	$header_title_area_bg_image = polar_get_titlearea_bg_image();
	$crf_runtime_options['titlebar_displayed'] = true;
	?>
	<div class='title-area'>
		<div class='title-area-bg' style='background-image: url("<?php echo esc_url( $header_title_area_bg_image ); ?>")'></div>
		<div class='container'>
			<div class='title-area-content-wrapper'>
				<div class='title-area-content'>
					<h1 class='page-title'><?php echo crf_page_title(); ?></h1>
					<?php crf_breadcrumb(); ?>
				</div>
			</div>
		</div>
	</div>
	<?php
endif; ?>