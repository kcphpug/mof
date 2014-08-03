<?php /** @var $app \Slim\Slim **/

function ApiRequest(){
    $app = \Slim\Slim::getInstance();
    $app->view(new \JsonApiView());
    $app->add(new \JsonApiMiddleware());
}

$app->get('/api','ApiRequest', function() use ($app) {
    $app->render(200,['msg'=>'welcome!']);
});