<?php
$social_icons = array(
		'social-facebook' => 'social_facebook',
		'social-twitter' => 'social_twitter',
		'social-googleplus' => 'social_googleplus',
		'social-pinterest' => 'social_pinterest',
		'social-dribbble' => 'social_dribbble',
		'social-instagram' => 'social_instagram',
		'social-skype' => 'social_skype',
		'social-youtube' => 'social_youtube',
		'social-rss' => 'social_rss',
		'social-tumblr' => 'social_tumblr',
		'social-deviantart' => 'social_deviantart',
		'social-vimeo' => 'social_vimeo',
		'social-flickr' => 'social_flickr',
		'social-linkedin' => 'social_linkedin',
		'social-rss' => 'social_rss',
);

foreach( $social_icons as $icon_option => $icon ) {
	$link = crf_get_theme_option_value( $icon_option );
	$more_attr = ' rel="nofollow"';
	$more_attr .= ' target="_blank"';
	if( $link ) {
		printf( '<a class="social-icon" href="%s"%s><i class="elegant-icon %s"></i></a>', $link, $more_attr, $icon );
	}
}