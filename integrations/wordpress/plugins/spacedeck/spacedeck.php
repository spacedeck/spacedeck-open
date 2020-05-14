<?php
/*
  Plugin Name: Spacedeck
  Plugin URI: https://spacedeck.com
  description: Embed Spacedeck Whiteboards in Wordpress Posts
  Version: 1.0
  Author: MNT Research GmbH
  Author URI: https://mntre.com
  License: GPLv3+
*/

add_option("spacedeck_settings");

function spacedeck_apicall($method, $path, $data) {
	$spacedeck_api_base_uri = get_option("spacedeck_settings")[spacedeck_api_base_uri];
	$spacedeck_api_key = get_option("spacedeck_settings")[spacedeck_api_key];
	
	$data_string = json_encode($data);
	$url = $spacedeck_api_base_uri . $path;

	$headers = array(
		'Content-Type' => 'application/json',
		'X-Spacedeck-API-Token' => $spacedeck_api_key
	);
	
	$payload = array(
		'method' => $method,
		'timeout' => 10,
		'blocking' => true,
		'headers' => $headers,
		'body' => $data_string
	);

	// echo("<p>payload:</p><pre>");
	// print_r($payload);
	// echo("</pre>");
	
	$result = wp_remote_post($url, $payload);

	if (is_wp_error($result)) {
		return $result;
	}

	$result = json_decode($result[body], true);

	// echo("<p>decoded:</p><pre>");
	// print_r($result);
	// echo("</pre>");
	
	return $result;
}

function spacedeck_embed_space($slug, $width = '90%', $height = '800', $parent_space_id = null) {
	$spacedeck_frontend_base_uri = get_option("spacedeck_settings")[spacedeck_frontend_base_uri];

	// try to find the space identified by slug
	$space = spacedeck_apicall("GET", "/spaces/" . $slug, array());

	if (is_wp_error($space)) {
		$error = $response->get_error_message();
		return("<p><b>Spacedeck: WP Error looking up Space: $error</b></p>");
	} else if ($space[error] && $space[error]!="space_not_found") {
		return("<p><b>Spacedeck: Error looking up Space: $space[error]</b></p>");
	}

	// if it doesn't exist, create it:
	if ($space[error]=="space_not_found") {
		$data = array(
			"name" => $slug,
			"edit_slug" => $slug
		);

		if ($parent_space_id) {
			$data[parent_space_id] = $parent_space_id;
		}
		
		$space = spacedeck_apicall("POST", "/spaces", $data);

		if (is_wp_error($space)) {
			$error = $response->get_error_message();
			return("<p><b>Spacedeck: WP Error creating Space: $error</b></p>");
		} else if ($space[error]) {
			return("<p><b>Spacedeck: Error creating Space: $space[error]</b></p>");
		}
	}

	if (is_wp_error($space)) {
		$error = $response->get_error_message();
		return("<p><b>Spacedeck: WP Error embedding Space: $error</b></p>");
	} else if (!$space || $space[error]) {
		return("<p><b>Spacedeck: Error embedding Space. Is your API key set up correctly?</b></p>");
	}

	$space_auth = $space[edit_hash];
	
	// return a piece of html (iframe) embedding the space
	$uri = $spacedeck_frontend_base_uri . '/spaces/' . $slug . '?embedded=1&spaceAuth=' . $space_auth;
		
	$html = "<iframe src='$uri' class='spacedeck' width='$width' height='$height' style='max-width:100%' frameborder='0' allowFullScreen='true'></iframe>";

	return $html;
}

function spacedeck_shortcode($attrs) {
	extract(shortcode_atts(array(
		'id' => 'none',
		'parent_space_id' => null,
		'width' => '100%',
		'height' => '800'
	), $attrs));

	$w = $attrs[width];
	$h = $attrs[height];
	if (!$w) $w = '100%';
	if (!$h) $h = 800;

	return spacedeck_embed_space($attrs[id],$w,$h,$attrs[parent_space_id]);
}

add_shortcode('spacedeck_space', 'spacedeck_shortcode');

add_action('admin_menu', 'spacedeck_add_admin_menu');
add_action('admin_init', 'spacedeck_settings_init');

function spacedeck_add_admin_menu() { 
	add_options_page('spacedeck', 'Spacedeck', 'manage_options', 'spacedeck', 'spacedeck_options_page');
}

function spacedeck_settings_init() { 
	register_setting('pluginPage', 'spacedeck_settings');

	add_settings_section(
		'spacedeck_pluginPage_section', 
		'Spacedeck Settings', 
		'spacedeck_settings_section_callback', 
		'pluginPage'
	);

	add_settings_field(
		'spacedeck_text_field_0', 
		'API key',
		'spacedeck_text_field_0_render', 
		'pluginPage', 
		'spacedeck_pluginPage_section' 
	);

	add_settings_field(
		'spacedeck_text_field_1', 
		'API base URL', 
		'spacedeck_text_field_1_render', 
		'pluginPage', 
		'spacedeck_pluginPage_section' 
	);

	add_settings_field(
		'spacedeck_text_field_2', 
		'Frontend base URL',
		'spacedeck_text_field_2_render', 
		'pluginPage',
		'spacedeck_pluginPage_section' 
	);
}

function spacedeck_text_field_0_render() {
	$opts = get_option('spacedeck_settings');
	?>
	<input type='text' name='spacedeck_settings[spacedeck_api_key]' value='<?php echo $opts[spacedeck_api_key]; ?>'>
<?php
}

function spacedeck_text_field_1_render() { 
	$opts = get_option('spacedeck_settings');
	?>
	<input type='text' name='spacedeck_settings[spacedeck_api_base_uri]' value='<?php echo $opts[spacedeck_api_base_uri]; ?>'>
<?php
}

function spacedeck_text_field_2_render() { 
	$opts = get_option('spacedeck_settings');
	?>
	<input type='text' name='spacedeck_settings[spacedeck_frontend_base_uri]' value='<?php echo $opts[spacedeck_frontend_base_uri]; ?>'>
<?php
}

function spacedeck_settings_section_callback() { 
	echo '';
}

function spacedeck_options_page() {
	?>
	<form action='options.php' method='post'>
<?php
	settings_fields('pluginPage');
	do_settings_sections('pluginPage');
	submit_button();
	?>
	</form>
<?php
}


?>
