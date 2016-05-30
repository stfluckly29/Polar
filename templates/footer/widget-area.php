<div class="widget-area">
	<div class="container">
		<div class="row">
			<?php
		$columns = crf_get_theme_option_value( 'footer-widget-area-columns' );
		$col_class = apply_filters( 'polar_footer_column_class', polar_get_column_class( $columns ), $columns );
		$col_class .= ' widget-area-column';
		for( $i = 1; $i <= $columns; $i++ ) : ?>
			<div class="<?php echo esc_attr( $col_class ) ?>">
				<?php
				$footer_column = 'crf-footer-widget-' . $i;
				if( is_active_sidebar( $footer_column ) ) { 
					dynamic_sidebar( $footer_column );
				}
				?>
			</div>
			<?php if( $i == 2 && $columns == 4 ): ?>
			<div class='polar-footer-4col-layout-fix'></div>
			<?php endif;?>
		<?php
		endfor;
		?>
		</div>
	</div>
</div>