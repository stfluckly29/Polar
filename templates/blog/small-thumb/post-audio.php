<?php
$fmtype = get_post_meta( get_the_ID(), 'crf_featured_media_type', true );
$media_output = '';
$embed = get_post_meta( get_the_ID(), 'crf_featured_media_embed', true );
if( !empty( $embed ) ) {
	$media_output = $embed;
}
 
?>
<article id="post-<?php the_ID(); ?>" <?php echo post_class( 'polar-post polar-isotope-item post-small-thumb' ) ?>>
	<?php 
	if( $media_output ) : ?>
		<div class='row'>
			<div class='col-xs-5 col-post-media'>
				<div class="featured-media fixed-ratio">
					<?php echo ( $media_output ); ?>
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
