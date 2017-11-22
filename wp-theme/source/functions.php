<?php

function str_random($length = 16) {
	$string = '';
	while (($len = strlen($string)) < $length) {
		$size = $length - $len;
		$bytes = random_bytes($size);
		$string .= substr(str_replace(['/', '+', '='], '', base64_encode($bytes)), 0, $size);
	}
	return $string;
}

/* Enqueue Stylesheets */
function theme_enqueue_style() {
	$cache_version = str_random(8);
	wp_enqueue_style('theme-style-style', get_bloginfo('stylesheet_directory').'/style.css', false, $cache_version);
	wp_enqueue_style('theme-style-core', get_bloginfo('stylesheet_directory').'/stylesheets/master.css', false, $cache_version);
}

/* Enqueue Scripts */
function theme_enqueue_script() {
	$cache_version = str_random(8);
	wp_enqueue_script('theme-script-plugins', get_bloginfo('stylesheet_directory').'/scripts/plugins.js', false, $cache_version);
	wp_enqueue_script('theme-script-functions', get_bloginfo('stylesheet_directory').'/scripts/functions.js', false, $cache_version);
}

/* Register Menu */
function theme_register_menus() {
	register_nav_menus( array(
		'menu-header' => __('Header')
	) );
}

/* Automatic Feed Links */
add_theme_support( 'automatic-feed-links' );

/* Enable Page Thumbnails */
add_theme_support( 'post-thumbnails' );

// Remove admin bar from website
add_filter('show_admin_bar', '__return_false');

/* Add Action Block */
add_action( 'wp_enqueue_scripts', 'theme_enqueue_style' );
add_action( 'wp_enqueue_scripts', 'theme_enqueue_script' );
add_action( 'init', 'theme_register_menus' );

?>
