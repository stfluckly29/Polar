<article id="post-<?php the_ID(); ?>" <?php echo post_class( 'polar-post polar-isotope-item' ) ?>>
	<div class='quote-post-outer'>
		<div class='quote-post-inner'>
			<div class='post-excerpt'>
				<a href="<?php echo esc_url( get_the_permalink() ); ?>">
				<?php
				the_content();
				?>
				</a>
			</div>
			<h5 class='quote-author'>
				<a href="<?php echo esc_url( get_the_permalink() ); ?>"><?php the_title() ?></a>
			</h5>
		</div>
	</div>
</article>
