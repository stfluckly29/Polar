<p><?php echo esc_html__( 'No posts found.', 'polar' ) ?></p>
<p><?php echo esc_html__( 'You might want to consider some of our suggestions to get better results:', 'polar' ) ?></p>
<ul>
	<li><?php echo esc_html__( 'Check your spelling.', 'polar' ) ?></li>
	<li><?php echo esc_html__( 'Try a similar keyword', 'polar' ) ?></li>
	<li><?php echo esc_html__( 'Try using more than one keyword', 'polar' ) ?></li>
</ul>
<p></p>
<p><?php echo esc_html__( 'Do you want to try another search?', 'polar' ) ?></p>
<div class='search-box'>
	<form role="search" class="search-form" method="get" action="<?php echo esc_url( home_url( '/' ) ) ?>">
		<div class='input-wrapper'>
			<input type="text" class="search-field" name="s" placeholder="<?php esc_html_e( 'Search again...', 'polar' ) ?>" value="<?php echo esc_attr( get_query_var( "s" ) ); ?>">
		</div>
		<div class='button-wrapper'>
			<button class="search-close" type="submit"><i class="elegant-icon icon_search"></i></button>
		</div>
	</form>
</div>