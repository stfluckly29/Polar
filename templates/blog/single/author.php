<section class='post-author'>
	<div class='avatar-wrapper'>
		<?php 
		echo get_avatar( 
			get_the_author_meta( 'ID' ), 
			170, 
			'', 
			__( 'Author Avatar', 'polar' ), 
			array( 'class' => 'full-width author-avatar' ),
			array(
					'height' => 220,
			)
		); ?>
	</div>
	<div class='margin'></div>
	<div class='info'>
		<div class='wrapper'>
			<h4 class='name polar-bold-heading'><?php the_author_posts_link(); ?></h4>
			<div class='desc'>
				<?php echo the_author_meta( 'description' ) ?>
			</div>
		</div>
	</div>
</section>