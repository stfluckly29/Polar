<?php
$columns = crf_get_theme_option_value( 'blog-related-columns' );

$query_vars = array(
		'showposts' => $columns,
		'ignore_sticky_posts' => 1,
		//'orderby' => 'rand',
		'post__not_in' => array( get_the_ID() ),
		'category__in' => wp_get_post_categories(),
);
$related_posts = new WP_Query( $query_vars );
?>
<section class='post-related'>
	<h4 class='title polar-bold-heading'><?php esc_html_e( 'Related posts', 'polar' ); ?></h4>
	<div class="polar-posts grid polar-isotope-container" data-selector=".polar-post" data-columns="<?php echo esc_attr( $columns ) ?>" data-gutter="30" data-layout="fitRows" data-margin-bottom="40" data-appear-animation="true">
		<?php
		while( $related_posts->have_posts() ) : 
			$related_posts->the_post();
			get_template_part( 'templates/blog/grid/post', get_post_format() );
		endwhile;
		wp_reset_postdata();
		?>
	</div>
</section>