<?php /** @var $app \Slim\Slim **/

$app->get('/', function () use ($app) {
    // Sample log message
    $app->log->info("Slim-Skeleton '/' route");
    // Render index view
    $app->render('index.html');
});
$app->get('/wheel', function () use ($app) {
    // Sample log message
    $app->log->info("Slim-Skeleton '/' route");
    // Render index view
    $app->render('wheel.html');
});
