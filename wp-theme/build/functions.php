<?php

/* Enqueue Stylesheets */
function theme_enqueue_style() {
	wp_enqueue_style('theme-style-style', get_bloginfo('stylesheet_directory').'/style.css', false);
	wp_enqueue_style('theme-style-core', get_bloginfo('stylesheet_directory').'/stylesheets/master.css', false);
}

/* Enqueue Scripts */
function theme_enqueue_script() {
	wp_enqueue_script('theme-script-plugins', get_bloginfo('stylesheet_directory').'/scripts/plugins.js', false );
	wp_enqueue_script('theme-script-functions', get_bloginfo('stylesheet_directory').'/scripts/functions.js', false );
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
