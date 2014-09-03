function fetch_meetings(selectEvents,container,status)
{
    $('#spinner').removeClass('hidden');
    $.get('/api/events',{status:status})
        .done(function(data){
            $('#spinner').addClass('hidden');
            $.each(data,function(i,event) {
                if($.isNumeric(i))
                    $(selectEvents).append(
                        $("<option>")
                            .val(event.id)
                            .text(event.name)
                    )
            });
            $(container).removeClass('hidden');
            $(selectEvents).click( function() {

                var eventId = $(this).val();
                fetch_rsvps('#rsvp-items',eventId);
            });

        });
}
function get_image_url_from_rsvp(rsvp)
{
    var url = "/img/profile.jpg";
    if(typeof rsvp.member_photo != 'undefined'
        && typeof rsvp.member_photo.thumb_link != 'undefined'){
        url = rsvp.member_photo.thumb_link;
    }
    return url;
}
function get_first_name_from_rsvp(rsvp)
{
    var name = rsvp.member.name.split(' ');
    if(name.length > 0){
        return name[0];
    } else {
        return  rsvp.member.name;
    }
}
function fetch_rsvps(container,eventId)
{
    $(container).empty();
    $.get('/api/rsvps',{event_id:eventId})
        .done(function(data){
            $.each(data,function(i,rsvp) {
                if($.isNumeric(i) && typeof rsvp != 'undefined' ) {
                    var imageUrl = get_image_url_from_rsvp(rsvp);
                    var $image = $('<th>').append($('<img>').attr('src', imageUrl));
                    var $name = $('<td>').append($('<div>').text(get_first_name_from_rsvp(rsvp)));
                    var $tr = $('<tr>').addClass('hidden').attr('id', 'rsvp-' + i);
                    $tr.append($image);
                    $tr.append($name);
                    $(container).append($tr);
                }
            });
            setup_wheel(container);
        });
}

function setup_wheel(rsvpContainer)
{
    var svgdoc = document.getElementById("wheel");
    var segmentCount = $('tr',rsvpContainer).length;
    createWheel(svgdoc,segmentCount);
    var $wheel = $(svgdoc);
    var $segments = $('path',$wheel);
    $('#spin-button').off();
    $('#spin-button').click( function() {
        $( "#winner-label" ).hide();

        var $spinButton = $(this);
        var random = Math.floor((Math.random()* $segments.length ));
        var $randomPos = $('#item'+random,$wheel);
        var minTimesAround = 10;
        var power = ( Math.floor((Math.random() * 10)+1) );
        var midpoint = ( $randomPos.data('startangle') + $randomPos.data('endangle') ) / 2
        var finalAnglePos =  (power * 720) + (360 * minTimesAround) + midpoint;

        $spinButton.prop('disabled',true);
        $('#winnerlabel').text("Spinning....");
        $('#winner').text("");
        $('#push').text(midpoint);
        $('#power').text(power );

        $wheel.css('deg',0).stop().animateRotate(finalAnglePos, {
            duration: 4000 + (1000 * power),
            easing: 'easeOutQuart',
            extraStep: function(now)
            {
                var realAngle = 360-(now%360);
                var current = getCurrentPos(realAngle,$segments);
                $('#angle').text(now);
                $('#angle-remainder').text(realAngle);
                $wheel.data('current', current );
                $('#rsvp-items tr').addClass('hidden');
                $('#rsvp-'+current).removeClass('hidden');
            },
            complete: function()
            {
                $('#winnerlabel').text('Winner!');
                $('#winner').text($wheel.data('current')  );

                $( "#winner-label" ).show( "pulsate",3000 );
                $spinButton.prop('disabled',false);
            }
        });
    });
    $('#spin-button').prop('disabled',false);
}

$().ready(function(){
    $( "#winner-label" ).hide();
    $( "#wheel-pointer").hide();
    fetch_meetings('#event-id','#control-container','upcoming');
    //fetch_meetings('#event-id','#control-container','past');

});