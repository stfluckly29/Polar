<article id="post-<?php the_ID(); ?>" <?php post_class( 'polar-post single' ) ?>>
	<?php
	if( crf_get_option_value( 'blog-show-featured-media', 'show_featured_media' ) != 'hide' ) {
		$image_ids = crf_get_post_gallery_ids( get_the_ID() );
		$gallery_images = array();
		foreach( $image_ids as $imgid ) {
			$imgurl = wp_get_attachment_image_src( $imgid, 'full' );
			if( !empty( $imgurl[0] ) ) {
				$gallery_images[] = $imgurl[0];
			}
		} 
		if( count( $gallery_images ) > 0 ) { ?>
		<div class="featured-media">
			<div class="polar-flexslider flexslider">
				<ul class="slides">
				<?php
				foreach( $gallery_images as $image ) {
					echo "<li><img src='" . esc_url( $image ) . "' alt='" . sprintf( esc_html_x( '%s Image', '%s = Name of the portfolio that has this image.', 'polar' ), get_the_title() ) . "'></li>";
				}
				?>
				</ul>
			</div>
		</div>
		<?php
		}
	}
	
	get_template_part( 'templates/blog/single/content' );
	?>
</article>