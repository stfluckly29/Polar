<?php
$embed = get_post_meta( get_the_ID(), 'crf_featured_media_embed', true );
if( !empty( $embed ) ) {
	echo '<div class="featured-media fixed-ratio">';
	echo $embed;
	echo '</div>';
}