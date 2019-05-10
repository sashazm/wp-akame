<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Akame
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<div id="page" class="site">
	<a class="skip-link screen-reader-text u-visually-hidden" href="#content"><?php esc_html_e( 'Skip to content', 'akame' ); ?></a>

	<header id="masthead" class="site-header">
		<!-- Top Header Area Start -->
		<section class="header-top">
			<div class="l-container header-top__container">
				<p class="header-top__greeting">Welcome to hair salon!</p>
				<div class="header-top__info">

					<!-- Loading business schedule -->
					<?php
					$options = get_option('business_hours');
					?>
					<p class="header-top__time"><i class="far fa-clock" data-fa-transform="flip-h"></i> <?php echo $options; ?></p>

					<!-- Loading phone number -->
					<?php
						$options = get_option('phone_number');
					?>
					<p class="header-top__phone-number"><span class="header-top__pipe">|</span><i class="fas fa-phone fa-rotate-90"></i> Call us: <?php echo $options; ?></p>
				</div>
			</div>
		</section>
		<!-- Top Header Area End -->

	<!-- Include the page content template. -->
		<section class="header-main">
			<div class="l-container header-main__container site-branding">
				<?php
				the_custom_logo();
				?>

					<!-- Nav Main Toggle -->
				<div class="nav-toggle js-main-nav-toggle">
					<span class="nav-toggle__icon"></span>
				</div>

				<!-- Nav Start -->
				<nav id="site-navigation" class="header-main__nav">

					<!-- Mobile Menu Toggle -->
					<div class="nav-toggle nav-toggle--mobile nav-toggle--active js-menu-toggle">
						<span class="nav-toggle__icon"></span>
					</div>

					<?php
					// set up in custom_nav.php this is used to add costume classes to menu links
					$myWalker = new nav_walker;
					wp_nav_menu( array(
						'theme_location' => 'menu-1',
						'menu_id'        => 'primary-menu',
						'container_class' => 'header-main__nav',
						'walker' => $myWalker
					) );

					// Loading shopping link to navigation
					$options = get_option('cta_shopping');
					?>

					<!-- Cart Icon -->
					<a href="<?php echo $options; ?>" class="header-main__cart"><i class="fas fa-shopping-cart"></i></a>

					<!-- Loading "Book Now" button to navigation -->
					<?php
					$options = get_option('cta_booking');
					?>

					<!-- Book Link -->
					<div class="header-main__booking">
						<a href="<?php echo $options; ?>" class="button">Book Now</a>
					</div>

				</nav><!-- #site-navigation -->

			</div><!-- .site-branding -->
		</section>
	</header><!-- #masthead -->

	<div id="content" class="site-content">
