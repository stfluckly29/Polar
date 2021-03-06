<?php
$portfolio_image = wp_get_attachment_url( get_post_thumbnail_id() );
?>
<div class='portfolio-hover hover1'>
	<div class='hover-content'>
		<h5 class='title'>
			<a href='<?php echo esc_url( get_permalink() ); ?>' title='<?php echo esc_attr( get_the_title() ) ?>'>
				<?php echo esc_attr( get_the_title() ); ?>
			</a>
		</h5>
		<div class='categories'>
			<?php echo get_the_term_list( get_the_ID(), 'portfolio_category', '', ', ', '' ) ?>
		</div>
	</div>
	<a class='image-zoom-link' href="<?php echo esc_url( $portfolio_image ); ?>" title="<?php echo esc_attr( get_the_title() ); ?>" data-rel="prettyPhoto[portfolio]"></a>
</div>