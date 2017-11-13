<?php
        // create curl resource
        $ch = curl_init();

        // set url
        curl_setopt($ch, CURLOPT_URL, "https://api.wordpress.org/secret-key/1.1/salt/");

        //return the transfer as a string
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

        // $output contains the output string
        $output = curl_exec($ch);

		$output = str_replace("define('AUTH_KEY',         '", 'AUTH_KEY="', $output);
		$output = str_replace("define('SECURE_AUTH_KEY',  '", 'SECURE_AUTH_KEY="', $output);
		$output = str_replace("define('LOGGED_IN_KEY',    '", 'LOGGED_IN_KEY="', $output);
		$output = str_replace("define('NONCE_KEY',        '", 'NONCE_KEY="', $output);
		$output = str_replace("define('AUTH_SALT',        '", 'AUTH_SALT="', $output);
		$output = str_replace("define('SECURE_AUTH_SALT', '", 'SECURE_AUTH_SALT="', $output);
		$output = str_replace("define('LOGGED_IN_SALT',   '", 'LOGGED_IN_SALT="', $output);
		$output = str_replace("define('NONCE_SALT',       '", 'NONCE_SALT="', $output);
		$output = str_replace("');", '"', $output);

		exec('cp .env.example .env');
		$envfile = './.env';
		$handle = fopen($envfile, 'a');
		$envdata = "\n" . $output;
		fwrite($handle, $envdata);

        // close curl resource to free up system resources
        curl_close($ch);
?>
