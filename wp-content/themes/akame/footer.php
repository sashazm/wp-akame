<?php
/**
 * The template for displaying the Akame footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Akame
 */

?>

	</div><!-- #content -->

	<footer id="colophon" class="site-footer">
		<div class="site-info l-container l-vertical-space footer">

			<!-- Single Footer Widget -->
			<section class="footer__copyright">
				<!-- Footer Logo -->
				<div class="copyright__logo">
					<?php the_custom_logo(); ?>
				</div>
			  <p>We would love to serve you and let you enjoy your salon experience. Excepteur sint occaecat cupidatat non
				proident.</p>

				<!-- Copyright Text -->
				<p>Copyright &copy;<script>document.write(new Date().getFullYear())</script>
				All rights reserved</p>
			</section>

			<!-- Single Footer Widget -->
			<section class="footer__opening-times">
      	<!-- Widget Title -->
      	<h3 class="footer__title">Opening Times</h3>

				<!-- customizable business schedule -->
      	<div>
					<?php
						$options = get_option('business_hours');
					?>
					<p><?php echo $options; ?></p>
					<?php
						$options = get_option('weekend_hours');
					?>
					<p><?php echo $options; ?></p>
      	</div>

      	<!-- Social Info -->
				<div class="social-media">
					<a href="#" class="social-icon social-icon--facebook"><i class="fab fa-facebook-f"></i></a>
					<a href="#" class="social-icon social-icon--twitter"><i class="fab fa-twitter"></i></a>
					<a href="#" class="social-icon social-icon--google-plus"><i class="fab fa-google-plus-g"></i></a>
					<a href="#" class="social-icon social-icon--instagram"><i class="fab fa-instagram"></i></a>
				</div>
			</section>

			<!-- Single Footer Widget -->
    	<section class="footer__contact">
      	<!-- Widget Title -->
      	<h3 class="footer__title">Contact Us</h3>

				<!-- Contact Address -->
				<div>
					<!-- phone number -->
					<?php
						$options = get_option('phone_number');
					?>
					<p>Tel: <?php echo $options; ?></p>
					<!-- Email -->
					<?php
						$options = get_option('contact_email');
					?>
					<p>E-mail: <?php echo $options; ?></p>

					<!-- Name for contact info -->
					<?php
						$options = get_option('contact_name');
					?>
					<p>Address: <?php echo $options; ?>,</p>

					<!-- Business location -->
					<?php
						$options = get_option('business_location');
					?>
					<p><?php echo $options; ?></p>
				</div>
			</section>
		</div><!-- .site-info -->
	</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
