<div class='polar-content search'>
	<?php
	
	get_template_part( 'templates/container', 'start' );
	
	?>
	<div class='search-title' style="">
		<h3 class='title'><?php printf( esc_html( _x( 'Search results for: "%s"', '%s - search keyword', 'polar' ) ), "<span>" . esc_html( get_query_var( "s" ) ) . "</span>" ); ?></h3>
	</div>
	<?php
	if( have_posts() ) {
		?>
		<div class='search-contents'>
			<?php
			while( have_posts() ): the_post();
				if( get_post_type() == 'post' ) {
					get_template_part( 'templates/search/post' );
				} else if( get_post_type() == 'page' ) {
					get_template_part( 'templates/search/page' );
				} else if( get_post_type() == 'portfolio' ) {
					get_template_part( 'templates/search/portfolio' );
				} else {
					get_template_part( 'templates/search/custom' );
				}
			endwhile;
			?>
		</div>
		<?php
		 
		crf_pagination_archive();

	} else {
		
		get_template_part( 'templates/search/empty' );
		
	}
	
	get_template_part( 'templates/container', 'end' );
	
	?>
</div>