<?php

function akame_test_dyn_callback($attributes, $content) {


  $recent_posts = wp_get_recent_posts([
    'numberposts' => $attributes['postsToShow'],
    'post_status' => 'publish',
  ]);



  foreach ($recent_posts as $post) {
    $thumbnail = get_the_post_thumbnail($post['ID']);
    $post_url = get_permalink($post['ID']);
    // post_date is a string that needs to be converted into unix timestamp
    $time = strtotime($post['post_date']);
    // date function requires unix timestamp
    $date = date('F j, Y', $time);
    $articles .= <<<HTML
      <article class="blogpost">
        <a href="{$post_url}">{$thumbnail}</a>
        <div>
          <a href="{$post_url}" class="blogpost__link"><h3>{$post['post_title']}</h3></a>
          <div>
            <a href="{$post_url}" class="blogpost__byline"><i class="far fa-clock" data-fa-transform="flip-h"></i> {$date}</a>
            <a href="{$post_url}#comments" class="blogpost__byline" title="Read the Comments"><span class="blogpost__pipe">|</span> <i class="far fa-comments"></i> 10</a>
          </div>
          <p class="blogpost__text">{$post['post_excerpt']}</p>
        </div>
      </article>
HTML;

  }

  $output = <<<HTML
    <section>
      <div class="l-container l-vertical-space">
        <!-- Section Heading -->
        <header class="l-vertical-space">
          <div class="u-centered">
            <h1>{$attributes['sectionTitle']}</h1>
            <p>{$attributes['sectionIntro']}</p>
          </div>
        </header>

        <div class="l-3col-max">
          <!-- ARTICLES START -->
          {$articles}
        </div>
      </div>
    </section>
HTML;
  return $output;
}

register_block_type('akame-blocks/test-dyn', [
  // Register the attributes in PHP so that our callback function
  // is aware of them.
  'attributes' => [
    'sectionTitle' => [
      'type' => 'string',
      'default' => 'Latest News',
    ],

    'sectionIntro' => [
      'type' => 'string',
    ],

    'postsToShow' => [
      'type'=> 'number',
      'default' => 3,
    ],
  ],
  'render_callback' => 'akame_test_dyn_callback'
]);

// function wpshout_excerpt( $text ) {
//   if( is_admin() ) {
//     return $text;
//   }
//   // Fetch the content with filters applied to get <p> tags
//   $content = apply_filters( 'the_content', get_the_content() );

//   // Stop after the first </p> tag
//   $text = substr( $content, 0, strpos( $content, '</p>' ) + 4 );
//   return $text;
// }
// // Leave priority at default of 10 to allow further filtering
// add_filter( 'wp_trim_excerpt', 'wpshout_excerpt', 10, 1 );