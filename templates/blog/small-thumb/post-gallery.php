<?php
$image_ids = crf_get_post_gallery_ids( get_the_ID() );
$gallery_images = array();
foreach( $image_ids as $imgid ) {
	$imgurl = wp_get_attachment_image_src( $imgid, 'polar_grid_thumbnail_fixed' );
	if( !empty( $imgurl[0] ) ) {
		$gallery_images[] = $imgurl[0];
	}
} 
?>
<article id="post-<?php the_ID(); ?>" <?php echo post_class( 'polar-post polar-isotope-item post-small-thumb' ) ?>>
	<?php
	if( count( $gallery_images ) > 0 ) : ?>
		<div class='row'>
			<div class='col-xs-5 col-post-media'>
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
			</div>
			<div class='col-xs-7 col-post-content'>
				<?php
				get_template_part( 'templates/blog/grid/post', 'content' );
				?>
			</div>
		</div>
	<?php
	else :
		get_template_part( 'templates/blog/grid/post', 'content' );
	endif; 
	?>
</article>
