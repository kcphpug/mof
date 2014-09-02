/**
 * Modified by dholmes on 8/16/14.
 * Original Author Janus Troelsen 3/23/13
 * http://stackoverflow.com/a/15582018
 */
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
        var arc = makeSVG("path", {d: d, fill: "hsl(" + c + ", 66%, 50%)"});
        paper.appendChild(arc);
    }
}

function createWheel(svgdoc,segments){
    var size=100/segments;
    var arcArray=[];
    for(var i=0; i<segments; i++){
        arcArray[i] = size;
    }
    console.dir(arcArray);
    drawArcs(svgdoc, arcArray); // here is the pie chart data

}
/*
var svgdoc = document.getElementById("s");
createWheel(svgdoc,33);
*/