<?php
require '../vendor/autoload.php';

// Prepare app
$config = require '../config/main.php';
$app = new \Slim\Slim($config);

// Local (not in github) settings can go here
@$configLocal = include '../config/local.php';
if($configLocal) $app->config($configLocal);

// Create monolog logger and store logger in container as singleton
// (Singleton resources retrieve the same log resource definition each time)
$app->container->singleton('log', function () {
    $log = new \Monolog\Logger('mof');
    $log->pushHandler(new \Monolog\Handler\StreamHandler('../logs/app.log', \Monolog\Logger::DEBUG));
    return $log;
});

// Prepare view
$app->view(new \Slim\Views\Twig());
$app->view->parserOptions = array(
    'charset' => 'utf-8',
    'cache' => realpath('../templates/cache'),
    'auto_reload' => true,
    'strict_variables' => false,
    'autoescape' => true
);
$app->view->parserExtensions = array(new \Slim\Views\TwigExtension());

// Define routes
require('../library/routes/site.php');
require('../library/routes/api.php');

// Run app
$app->run();

