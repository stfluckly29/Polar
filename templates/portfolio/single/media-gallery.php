<?php
$gallery_type = crf_get_option_value( '', 'featured_gallery_type' );

$image_ids = crf_get_post_gallery_ids( get_the_ID() );
$gallery_images = array();
$gallery_control_thumbs = array();
foreach( $image_ids as $imgid ) {
	$imgurl = wp_get_attachment_image_src( $imgid, 'full' );
	if( !empty( $imgurl[0] ) ) {
		$gallery_images[] = $imgurl[0];
		$thumburl = wp_get_attachment_image_src( $imgid, 'thumbnail' );
		if( !empty( $thumburl[0] ) ) {
			$gallery_control_thumbs[] = $thumburl[0];
		}
	}
}
if( count( $gallery_images ) > 0 ) {
	if( $gallery_type == 'list' ) {		// Display gallery images in order
		foreach( $gallery_images as $image ) {
			echo "<img class='featured-image' src='" . esc_url( $image ) . "' alt='" . sprintf( esc_html_x( '%s Image', '%s = Name of the portfolio that has this image.', 'polar' ), get_the_title() ) . "'>";
		}
	} else {		// Display gallery images as slider
		?>
		<div class="polar-portfolio-gallery-slider polar-flexslider manual-init flexslider" data-smooth-height="true">
			<ul class="slides">
			<?php
			$i = 0;
			foreach( $gallery_images as $image ) {
				echo "<li data-thumb='" . $gallery_control_thumbs[$i++] . "'><img src='" . esc_url( $image ) . "' alt='" . esc_html__( 'Portfolio Gallery Image', 'polar' ) . "'></li>";
			}
			?>
			</ul>
		</div>
		<div class="polar-portfolio-gallery-thumbs-carousel polar-flexslider manual-init flexslider">
			<ul class="slides">
			<?php
			$i = 0;
			foreach( $gallery_control_thumbs as $thumb ) {
				echo "<li><img src='" . esc_url( $thumb ) . "' alt='" . esc_html__( 'Portfolio Gallery Image Thumbnail', 'polar' ) . "'></li>";
			}
			?>
			</ul>
		</div>
		<?php
	}
}