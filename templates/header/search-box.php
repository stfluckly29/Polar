<div class="polar-search-form">
	<form role="search" class="search-form" method="get" action="<?php echo esc_url( home_url( '/' ) ) ?>">
		<input type="text" class="search-field" name="s" placeholder="<?php esc_html_e( 'Type & Hit Enter', 'polar' ) ?>" value="<?php echo esc_attr( get_query_var( 's' ) ); ?>">
	</form>
	<a class="search-close" href='#'><i class="elegant-icon icon_close"></i></a>
</div>