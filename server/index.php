<?php 
require_once "vendor/autoload.php";

$config["displayErrorDetails"] = true;

$app = new \Slim\App(["settings" => $config]);

$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
    ->withHeader('Access-Control-Allow-Origin', '*')
    ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
    ->withHeader('Access-Control-Allow-Credentials', 'true')
    ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});

require_once "App/Routes/routes.php";

$app->run();
