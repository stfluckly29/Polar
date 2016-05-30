<?php

if( has_post_thumbnail() ) {
	the_post_thumbnail( 'full', array( 'class' => 'featured-image' ) );
}