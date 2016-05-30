			<section class='portfolio-media'>
				<?php
				get_template_part( 'templates/portfolio/single/media', get_post_format() ); 
				?>
				<?php
				ob_start();
				previous_post_link( '%link', '<span><i class="elegant-icon arrow_left"></i>' . esc_html__( 'Prev', 'polar' ) . '</span>' );
				next_post_link( '%link', '<span>' . esc_html__( 'Next', 'polar' ) . '<i class="elegant-icon arrow_right"></i></span>' );
				$link = ob_get_clean();
				if( $link ) :
				?>
				<div class='polar-portfolio-post-nav-links clearfix'>
					<?php echo ( $link ); ?>
				</div>
				<?php 
				endif;
				?>
			</section>
			<section class='portfolio-content'>
				<div class='content'>
					<?php
					the_content(); 
					?>
				</div>
				<?php
				ob_start();
				$client = crf_get_option_value( '', 'portfolio_client' );
				if( $client ) {
					echo '<div class="meta-row">';
					echo '<div class="meta-label">' . esc_html__( 'Client:', 'polar' ) . '</div>';
					echo '<div class="meta-value">' . $client . '</div>';
					echo '</div>';
				}
				$date = crf_get_option_value( '', 'portfolio_date' );
				if( $date ) {
					echo '<div class="meta-row">';
					echo '<div class="meta-label">' . esc_html__( 'Date:', 'polar' ) . '</div>';
					echo '<div class="meta-value">' . $date . '</div>';
					echo '</div>';
				}
				$location = crf_get_option_value( '', 'portfolio_location' );
				if( $location ) {
					echo '<div class="meta-row">';
					echo '<div class="meta-label">' . esc_html__( 'Location:', 'polar' ) . '</div>';
					echo '<div class="meta-value">' . $location . '</div>';
					echo '</div>';
				}
				$author = crf_get_option_value( '', 'portfolio_author' );
				if( $author ) {
					echo '<div class="meta-row">';
					echo '<div class="meta-label">' . esc_html__( 'Author:', 'polar' ) . '</div>';
					echo '<div class="meta-value">' . $author . '</div>';
					echo '</div>';
				}
				$meta = ob_get_clean();
				if( $meta ) {
					?>
					<div class='meta'><?php echo ( $meta ); ?></div>
					<?php
				} else {
					?>
					<div class='meta empty'></div>
					<?php
				}
				$link = crf_get_option_value( '', 'portfolio_link' );
				if( $link ) :
				?>
					<a class='portfolio-link polar_button' href='<?php echo esc_url( $link ); ?>' title='<?php echo esc_attr( get_the_title() ); ?>'>
						<?php esc_html_e( 'View Project', 'polar' ); ?>
					</a>
				<?php 
				endif;
				?>
			</section>