<?php
/**
 * Akame functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Akame
 */

if ( ! function_exists( 'akame_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function akame_setup() {
		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on Akame, use a find and replace
		 * to change 'akame' to the name of your theme in all the template files.
		 */
		load_theme_textdomain( 'akame', get_template_directory() . '/languages' );

		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );

		// This theme uses wp_nav_menu() in one location.
		register_nav_menus( array(
			'menu-1' => esc_html__( 'Primary', 'akame' ),
			'menu-2' => ( 'CTA-buttons' )
		) );


		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support( 'html5', array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
		) );

		// Set up the WordPress core custom background feature.
		add_theme_support( 'custom-background', apply_filters( 'akame_custom_background_args', array(
			'default-color' => 'ffffff',
			'default-image' => '',
		) ) );

		// Add theme support for selective refresh for widgets.
		add_theme_support( 'customize-selective-refresh-widgets' );

		/**
		 * Add support for core custom logo.
		 *
		 * @link https://codex.wordpress.org/Theme_Logo
		 */
		add_theme_support( 'custom-logo', array(
			'height'      => 250,
			'width'       => 250,
			'flex-width'  => true,
			'flex-height' => true,
		) );
	}
endif;
add_action( 'after_setup_theme', 'akame_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function akame_content_width() {
	// This variable is intended to be overruled from themes.
	// Open WPCS issue: {@link https://github.com/WordPress-Coding-Standards/WordPress-Coding-Standards/issues/1043}.
	// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
	$GLOBALS['content_width'] = apply_filters( 'akame_content_width', 640 );
}
add_action( 'after_setup_theme', 'akame_content_width', 0 );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function akame_widgets_init() {
	register_sidebar( array(
		'name'          => esc_html__( 'Sidebar', 'akame' ),
		'id'            => 'sidebar-1',
		'description'   => esc_html__( 'Add widgets here.', 'akame' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );
}
add_action( 'widgets_init', 'akame_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function akame_scripts() {
	wp_enqueue_style( 'playfair-font', "https://fonts.googleapis.com/css?family=Playfair+Display:400,600,700" );
	wp_enqueue_style( 'open-sans', "https://fonts.googleapis.com/css?family=Open+Sans" );
	wp_enqueue_style( 'normalize', get_template_directory_uri() . '/dist/normalize.css' );
	wp_enqueue_style( 'akame-style', get_template_directory_uri() . '/dist/styles.css' );

	wp_enqueue_script( 'akame-scripts', get_template_directory_uri() . '/dist/scripts.js', array(), false, true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'akame_scripts');

/**
 * Include custom navigation walker.
 */
require get_template_directory() . '/inc/custom_nav.php'; // nav walker

/**
 * Include custom navigation walker for shoping/booking buttons.
 */
require get_template_directory() . '/inc/wp_buttons_navwalker.php';

// CTA buttons navigation
function cta_buttons_nav()
{
	wp_nav_menu( array(
            'theme_location'    => 'CTA-buttons',
            'depth'             => 0,
						'container'         => 'false', // to remove <nav> or <div> wrapper
						'items_wrap' => '%3$s' , // to remove <ul> wrapper
            'walker'            => new wp_buttons_navwalker())
		);
}
/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Load Jetpack compatibility file.
 */
if ( defined( 'JETPACK__VERSION' ) ) {
	require get_template_directory() . '/inc/jetpack.php';
}

// Creates Business Info fields in Admin -> Settings -> General
function business_info() {
	// Tell Wordpress that a new business_hours and phone_number option is available on the
	// general settings page.
	register_setting( 'general', 'business_hours' );
	register_setting( 'general', 'phone_number' );

		// Add the field for the new setting on the general settings page.
		add_settings_field(
			'business_hours',
			'Opening schedule',
			'business_hours_callback',
			'general',
		);

		add_settings_field(
			'phone_number',
			'Phone number',
			'phone_number_callback',
			'general',
		);
};
add_action('admin_init', 'business_info');

//  Callback function that creates custom field for admin settings
function business_hours_callback() {
	$options = get_option('business_hours');

	echo '<input type="text" name="business_hours" value="' . $options . '"></input>';
};

//  Callback function that creates custom field for admin settings
function phone_number_callback($options) {
	$options = get_option('phone_number');

	echo '<input type="text" name="phone_number" value="' . $options . '"></input>';
};


// Creates field for admin settings
function cta_buttons() {


	// Tell Wordpress that a new cta_shopping option is available on the
	// general settings page.
	register_setting( 'general','cta_shopping' );
	register_setting( 'general', 'cta_booking' );

	// Add the field for the new setting on the general settings page.
	add_settings_field(
		'cta_shopping',
		'CTA Shopping Url',
		'cta_shopping_url_callback',
		'general',
	);

	add_settings_field(
		'cta_booking',
		'CTA Booking Url',
		'cta_booking_url_callback',
		'general',
	);

};
add_action('admin_init', 'cta_buttons');

//  Callback function that creates custom field for admin settings
function cta_shopping_url_callback($args) {
	$options = get_option('cta_shopping');

	echo '<input type="text" name="cta_shopping" value="' . $options . '"></input>';
};

//  Callback function that creates custom field for admin settings
function cta_booking_url_callback($args) {
	$options = get_option('cta_booking');

	echo '<input type="text" name="cta_booking" value="' . $options . '"></input>';
};