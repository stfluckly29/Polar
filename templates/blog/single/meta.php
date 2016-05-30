<section class='post-meta2'>
	<div class='post-meta-field post-tags'>
		<div class='meta2-label'><?php echo esc_html__( 'Tags:', 'polar' ); ?></div>
		<?php the_tags( '<div class="meta2-value tags">', ', ', '</div>' ); ?>
	</div>
	<div class='post-meta-field sharer-urls'>
		<div class='meta2-label share'><?php echo esc_html__( 'Share:', 'polar' ); ?></div>
		<div class='meta2-value sharer-icons'>
			<a class='polar-sharer-link polar-social-sharer-link' href='<?php echo esc_url( polar_social_sharer_url( 'facebook', get_permalink(), get_the_title() ) ) ?>'><i class='elegant-icon social_facebook'></i></a>
			<a class='polar-sharer-link polar-social-sharer-link' href='<?php echo esc_url( polar_social_sharer_url( 'twitter', get_permalink(), get_the_title() ) ) ?>'><i class='elegant-icon social_twitter'></i></a>
			<a class='polar-sharer-link polar-social-sharer-link' href='<?php echo esc_url( polar_social_sharer_url( 'google-plus', get_permalink(), get_the_title() ) ) ?>'><i class='elegant-icon social_googleplus'></i></a>
			<a class='polar-sharer-link polar-social-sharer-link' href='<?php echo esc_url( polar_social_sharer_url( 'pinterest', get_permalink(), get_the_title(), get_the_excerpt() ) ) ?>'><i class='elegant-icon social_pinterest'></i></a>
			<a class='polar-sharer-link polar-social-sharer-link' href='<?php echo esc_url( polar_social_sharer_url( 'reddit', get_permalink(), get_the_title() ) ) ?>'><i class='elegant-icon social_dribbble'></i></a>
		</div>
	</div>
</section>