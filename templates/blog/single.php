<div class='polar-content post-single'>
	<?php
	
	get_template_part( 'templates/container', 'start' );
	  
	?>
	<div class='polar-post-single'>
		<?php
		
		$show_related_posts = crf_get_option_value( 'blog-show-related-posts', 'show_related_posts' );
		$show_comments = crf_get_option_value( 'blog-show-comments', 'show_comments' );
	
		while( have_posts() ): the_post();
	
			get_template_part( 'templates/blog/single/article', get_post_format() );

			get_template_part( 'templates/blog/single/meta' );
			
			get_template_part( 'templates/blog/single/author' );
			
			if( $show_related_posts != 'hide' ) {
				get_template_part( 'templates/blog/single/related' );
			}
			
			if( $show_comments != 'hide' ) {
				comments_template();
			}
			
			get_template_part( 'templates/blog/single/prevnext' );
			
		endwhile;
		
		?>
	</div>
	<?php
	
	get_template_part( 'templates/container', 'end' );
	  
	?>
</div>