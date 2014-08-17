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
        return $response->current();
    } else {
        return array();
    }
}

$app->get('/api','ApiRequest', function() use ($app) {
    $groupInfo = getGroupInfo();
    $app->render(200,$groupInfo);
});

$app->get('/api/events','ApiRequest', function() use ($app) {
    $status = null;
    if(@$_GET['status']) {
        $status = $_GET['status'];
    }

    $events = $app->meetup->getEvents([
        'status' => $status,
        'group_urlname' => $app->config('meetup.group.urlname')
    ]);

    $app->render(200,$events->toArray());
});

$app->get('/api/rsvps','ApiRequest', function() use ($app) {
    $eventId = null;
    if(@$_GET['event_id']) {
        $eventId = $_GET['event_id'];
    }

    $rsvpsRaw = $app->meetup->GetRSVPs([
        'event_id' => $eventId,
        'rsvp' => 'yes',
        'group_urlname' => $app->config('meetup.group.urlname')
    ]);

    foreach($rsvpsRaw as $rsvp){
        $rsvps[] = ['member'=>$rsvp['member'],'member_photo'=>$rsvp['member_photo']];
    }

    $app->render(200,$rsvps);
});


