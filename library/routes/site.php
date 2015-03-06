<?php /** @var $app \Slim\Slim **/

$app->get('/', function () use ($app) {
    $app->redirect('/wheel');
});
$app->get('/wheel', function () use ($app) {
    $app->log->info("Slim-Skeleton '/' route");
    $app->render('wheel.html');
});
