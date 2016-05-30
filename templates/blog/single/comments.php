<?php
$comments_count = get_comments_number();

function polar_post_comments( $comment, $args, $depth ) {
?>
	<li <?php comment_class(); ?> id="comment-<?php comment_ID() ?>">
		<div class="comment-wrapper clearfix">
			<div class="avatar">
				<?php echo get_avatar( $comment, 70 ); ?>
			</div>
			<div class="margin"></div>
			<div class="comment-body">
				<h5 class="author"><?php echo get_comment_author_link(); ?></h5>
				<div class="comment-links clearfix">
					<?php edit_comment_link( esc_html__( 'Edit', 'polar' ), '  ', '' ) ?>
					<?php comment_reply_link( array_merge( $args, array( 'reply_text' => esc_html__( 'Reply', 'polar' ), 'add_below' => 'comment', 'depth' => $depth, 'max_depth' => $args['max_depth'] ) ) ); ?>
				</div>
				<div class="comment-text">
					<?php
					if( $comment->comment_approved == '0' ) {
						echo "<p class='polar-label-awaiting-moderation'>";
						echo esc_html__( 'Your comment is awaiting moderation.', 'polar' );
						echo '</p>';
					}
					comment_text();
					?>
				</div>
				<div class="comment-meta">
					<span class='date meta-field'>
						<?php 
						printf( esc_html_x( '%1$s at %2$s ago', '%1$s = normal date, %2$s = human-readable time difference', 'polar' ), get_comment_date( 'M j, Y' ), human_time_diff( get_comment_time( 'U' ), current_time( 'timestamp' ) ) );
						?>
					</span>
					<span class='meta-field'>-</span>
					<?php if( current_user_can( 'edit_posts' ) ) : ?>
						<span class='meta-field'><?php edit_comment_link( esc_html__( 'Edit', 'polar' ) ); ?></span>
					<?php endif; ?>
					<span class='meta-field'><?php comment_reply_link( array_merge( $args, array( 'reply_text' => esc_html__( 'Reply', 'polar' ), 'add_below' => 'comment', 'depth' => $depth, 'max_depth' => $args['max_depth'] ) ) ); ?></span>
				</div>
			</div>
		</div>
	</li>
<?php
}

?>
<section id="comments" class='polar-post-comments'>
	<?php if( !post_password_required() ):
		if( have_comments() ) { ?>
			<h4 class='title polar-bold-heading'>
				<?php printf( _n( '%d Comment', '%d Comments', $comments_count, 'polar' ), absint( $comments_count ) ); ?>
			</h4>
			<ul class="comment-list">
			<?php 
				wp_list_comments( array(
					'style'			=> 'ul',
					'short_ping'	=> true,
					'avatar_size'	=> 70,
					'callback'		=> 'polar_post_comments'
				) ); 
			?>
			</ul>
			<?php 
			crf_paginate_comments_links();
		} else {
			if( !comments_open() ) : ?>
				<p class="no-comments"><?php echo esc_html__( 'Comments are closed.', 'polar' ); ?></p>
			<?php 
			endif;
		}
		if( comments_open() ) :
			function polar_modify_comment_form_fields( $fields ){
				$commenter = wp_get_current_commenter();
				$req = get_option( 'require_name_email' );
				$fields['author'] = '<div class="comment-fields row"><div class="col-sm-6"><input type="text" name="author" id="author" value="'. esc_attr( $commenter['comment_author'] ) .'" placeholder="'. esc_html__( "Name", 'polar' ).'" tabindex="1"'. ( $req ? 'aria-required="true"' : '' ).' class="polar-comment-form-field" /></div>';
				$fields['email'] = '<div class="col-sm-6"><input type="text" name="email" id="email" value="'. esc_attr( $commenter['comment_author_email'] ) .'" placeholder="'. esc_html__( "Email", 'polar' ).'" tabindex="2"'. ( $req ? 'aria-required="true"' : '' ).' class="polar-comment-form-field"  /></div>';
				$fields['url'] = '<div class="col-sm-12"><input type="text" name="url" id="url" value="'. esc_attr( $commenter['comment_author_url'] ) .'" placeholder="'. esc_html__( "Your Website", 'polar').'" tabindex="3" class="polar-comment-form-field" /></div></div>';
				return $fields;
			}
			add_filter( 'comment_form_default_fields', 'polar_modify_comment_form_fields' );

			echo '<div id="comment-input" class="comment-form">';
			echo '<h5 id="reply-title" class="comment-reply-title">' . esc_html__( "Leave A Comment", 'polar' ) . '</h5>';
			if( !is_user_logged_in() && comments_open() ) {
				echo "<span class='desc'>" . esc_html__( 'Your email address will not be published. Required fields are marked *', 'polar' ) . '</span>';
			}
			
			global $user_identity;
			$comments_args = array(
					'must_log_in' => '<p class="desc must-log-in">' . sprintf( esc_html__( "You must be %slogged in%s to post a comment.", 'polar' ), '<a href="'.wp_login_url( apply_filters( 'the_permalink', get_permalink( ) ) ).'">', '</a>' ) . '</p>',
					'logged_in_as' => '<p class="desc logged-in-as">' . sprintf( esc_html__( "Logged in as %s.", 'polar' ), ' <a href="' .admin_url( "profile.php" ).'">'.$user_identity.'</a>' ) . ' <a href="' .wp_logout_url(get_permalink()).'" title="' . esc_html__("Log out of this account", 'polar').'">'. esc_html__( 'Log out &raquo;', 'polar' ).'</a></p>',
					'comment_notes_before' => '',
					'comment_notes_after' => '',
					'comment_field' => '<div id="comment-textarea"><textarea name="comment" id="comment" rows="4" tabindex="4" class="polar_modify_comment_form_fields" placeholder="'. esc_html__( "Comment", 'polar' ).'"></textarea></div>',
					'id_submit' => 'comment-submit',
					'label_submit' => esc_html__( "Post Comment", 'polar' ),
			);
			$comments_args['title_reply'] = '';
			$comments_args['title_reply_to'] = '';
			comment_form( $comments_args );
			echo "</div>";
		endif;
		?>
	<?php else:
		echo '<div class="post-comment-protected-message">';
		echo esc_html__( 'This post is password protected. Please enter password to view comments.' , 'polar' );
		echo '</div>';
	endif; /* endif - post_password_protected() */
	?>
</section>