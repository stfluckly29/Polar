<article id="post-<?php the_ID(); ?>" <?php echo post_class( 'polar-post polar-isotope-item post-small-thumb' ) ?>>
	<?php
	if( has_post_thumbnail() ) : ?>
		<div class='row'>
			<div class='col-xs-5 col-post-media'>
				<div class="featured-media">
					<?php
					the_post_thumbnail( 'polar_grid_thumbnail_fixed', array( 'class' => 'featured-image' ) );
					?>
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
