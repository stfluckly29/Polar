<div class="polar-posts grid polar-isotope-container" data-selector=".polar-post" data-columns="1" data-gutter="0" data-layout="fitRows" data-margin-bottom="45" data-appear-animation="true">
	<?php
	while( have_posts() ): the_post();
		get_template_part( 'templates/blog/small-thumb/post', get_post_format() );
	endwhile; 
	?>
</div>