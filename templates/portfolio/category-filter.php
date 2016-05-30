<div class='polar-isotope-filter'><?php
	?><a class='filter active' href='#' data-filter='*'><?php echo esc_html__( 'All', 'polar' ) ?></a><?php
	?><?php
	$categories = get_terms( 'portfolio_category', array(
			'hide_empty' => true,
	) );
	foreach( $categories as $cat ) {
		printf( "<a class='filter' href='#' data-filter='.portfolio_category-%s'>%s</a>", esc_attr( $cat->slug ), esc_html( $cat->name ) );
	}
?></div>