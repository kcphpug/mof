/**
 * Created by dholmes on 9/1/14.
 * See how it "evolved" on http://jsfiddle.net/19ue1o0v/30/
 */
function getCurrentPos(angle,paths){
    var foundSegmentPos = -1;
    $(paths).each(function(id,obj) {
        if(angle >= $(obj).data('startangle') && angle < $(obj).data('endangle')){
            $('#currentpos').text($(obj).data('itemindex'));
            foundSegmentPos = ($(obj).data('itemindex'));
        }
    });
    return foundSegmentPos;
}

function makeSVG(tag, attrs, inner) {
    var el= document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (var k in attrs)
        if (attrs.hasOwnProperty(k)) el.setAttribute(k, attrs[k]);
    if(inner){
        txtnode = document.createTextNode(inner);
        el.appendChild(txtnode);
    }
    return el;
}

function drawArcs(paper, pieData){
    var total = pieData.reduce(function (accu, that) { return that + accu; }, 0);
    var sectorAngleArr = pieData.map(function (v) { return 360 * v / total; });

    var startAngle = 0;
    var endAngle = 0;
    for (var i=0; i<sectorAngleArr.length; i++){
        startAngle = endAngle;
        endAngle = startAngle + sectorAngleArr[i];

        var x1,x2,y1,y2 ;

        x1 = parseInt(Math.round(200 + 195*Math.cos(Math.PI*startAngle/180)));
        y1 = parseInt(Math.round(200 + 195*Math.sin(Math.PI*startAngle/180)));

        x2 = parseInt(Math.round(200 + 195*Math.cos(Math.PI*endAngle/180)));
        y2 = parseInt(Math.round(200 + 195*Math.sin(Math.PI*endAngle/180)));

        var d = "M200,200  L" + x1 + "," + y1 + "  A195,195 0 " +
            ((endAngle-startAngle > 180) ? 1 : 0) + ",1 " + x2 + "," + y2 + " z";
        //alert(d); // enable to see coords as they are displayed
        var c = parseInt(i / sectorAngleArr.length * 360);
        var arc = makeSVG("path", {
            "data-startangle":startAngle,
            "data-endangle":endAngle,
            "data-itemindex":i,
            id:'item'+i,
            d: d, fill: "hsl(" + c + ", 66%, 50%)"
        });
        paper.appendChild(arc);
    }
}

function createWheel(svgdoc,segments){
    var size=100/segments;
    var arcArray=[];
    for(var i=0; i<segments; i++){
        arcArray[i] = size;
    }
    drawArcs(svgdoc, arcArray); // here is the pie chart data

}

$.fn.animateRotate = function(endAngle, options, startAngle)
{
    return this.each(function()
    {
        var elem = $(this), rad, costheta, sintheta, matrixValues, noTransform = !('transform' in this.style || 'webkitTransform' in this.style || 'msTransform' in this.style || 'mozTransform' in this.style || 'oTransform' in this.style);
        if(typeof options !== 'object')
        {
            options = {};
        }
        options.step = function(now)
        {
            if(typeof options.extraStep != undefined){
                options.extraStep(now);
            }

            if(noTransform)
            {
                rad = now * (Math.PI * 2 / 360);
                costheta = Math.cos(rad);
                sintheta = Math.sin(rad);
                matrixValues = 'M11=' + costheta + ', M12=-'+ sintheta +', M21='+ sintheta +', M22='+ costheta;
                elem.css({
                    'filter': 'progid:DXImageTransform.Microsoheightft.Matrix(sizingMethod=\'auto expand\','+matrixValues+')',
                    '-ms-filter': 'progid:DXImageTransform.Microsoft.Matrix(sizingMethod=\'auto expand\','+matrixValues+')'
                });
            }
            else
            {
                elem.css({
                    webkitTransform: 'rotate('+now+'deg)',
                    mozTransform: 'rotate('+now+'deg)',
                    msTransform: 'rotate('+now+'deg)',
                    oTransform: 'rotate('+now+'deg)',
                    transform: 'rotate('+now+'deg)'
                });
            }
        };
        if(startAngle)
        {
            $({deg: startAngle}).animate({deg: endAngle}, options);
        }
        else
        {
            elem.animate({deg: endAngle}, options);
        }

    });
};