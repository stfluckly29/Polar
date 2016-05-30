<div class='polar-content portfolio-single'>
	<?php
	
	get_template_part( 'templates/container', 'start' );
	
	while( have_posts() ) :
		the_post();
		?>
		<article id="post-<?php the_ID(); ?>" <?php post_class( 'polar-portfolio-single-wrapper' ) ?>>
			<?php
			get_template_part( 'templates/portfolio/single/content' );
			?>
		</article>
		<?php
	endwhile;
	
	get_template_part( 'templates/container', 'end' );
	
	?>
</div>