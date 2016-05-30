<?php
ob_start();
the_author_posts_link();
$author_link = ob_get_clean();
?>
<div class='post-listing-single-content'>
	<div class='post-category'>
		<?php the_category( ', ' ); ?>
	</div>
	<h3 class='post-title'><a href='<?php echo esc_url( get_permalink() ) ?>'><?php the_title() ?></a></h3>
	<div class='row'>
		<div class='col-sm-1'></div>
		<div class='col-sm-10'>
			<div class='post-excerpt'>
				<?php the_excerpt() ?>
			</div>
		</div>
		<div class='col-sm-1'></div>
	</div>
	<div class='post-bottom-meta'>
		<div class='row'>
			<div class='col-sm-1'></div>
			<div class='col-sm-10'>
				<div class='post-bottom-meta-body'>
					<div class='post-link-wrapper clearfix'>
						<a class='post-link' href='<?php echo esc_url( get_permalink() ) ?>'><?php esc_html_e( 'Continue', 'polar' ) ?><i class='elegant-icon arrow_right readmore-arrow'></i></a>
					</div>
					<ul class='post-meta'><?php
						?><li><?php the_time( 'F j, Y') ?></li><?php
						?><li><?php printf( esc_html__( 'by %s', 'polar' ), $author_link ); ?></li><?php
					?></ul>
				</div>
			</div>
			<div class='col-sm-1'></div>
		</div>
	</div>
</div>