<?php /** @var $app \Slim\Slim **/

function ApiRequest(){
    $app = \Slim\Slim::getInstance();
    $app->view(new \JsonApiView());
    $app->add(new \JsonApiMiddleware());
    $app->container->singleton('meetup', function () use ($app) {
        $client = DMS\Service\Meetup\MeetupKeyAuthClient::factory(array(
                'key' => $app->config('meetup.api.key')
            )
        );
        return $client;
    });
}
/** @returns array */
function getGroupInfo(){
    $app = \Slim\Slim::getInstance();
    $response = $app->meetup->getGroups([
        'group_urlname'=>$app->config('meetup.group.urlname')
    ]);
    if($response) {
        return reset($response);
    } else {
        return array();
    }
}

$app->get('/api','ApiRequest', function() use ($app) {
    /** @var DMS\Service\Meetup\MeetupKeyAuthClient $client */
    $groupInfo = getGroupInfo();
    $app->render(200,$groupInfo);
});
