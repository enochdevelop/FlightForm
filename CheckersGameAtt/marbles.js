
var bug;
var bugs = [];
var covers = [];
var cover_radius = 20;
var cover_xoffset = 25;
var cover_yoffset = 25;
var CoverCount = 4;

var MaxGoX = 5;
var MaxGoY = 5;

/*
dragElement();

function dragElement() {
	
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    var a = document.getElementsByClassName("play");

    /*
    if (document.getElementsByClassName(buc)) {
      document.getElementsByClassName(buc ).onmousedown = dragMouseDown;
    } else {
        alert("its worling"); 

      a.onmousedown = dragMouseDown();
    }

function dragMouseDown(e) {
	e = e || window.event;
	e.preventDefault();
	// get the mouse cursor position at startup:
	pos3 = e.clientX;
	pos4 = e.clientY;
	document.onmouseup = closeDragElement;
	// call a function whenever the cursor moves:
	document.onmousemove = elementDrag;
}

function elementDrag(e) {
    alert("its worling");
	e = e || window.event;
	e.preventDefault();
	// calculate the new cursor position:
	pos1 = pos3 - e.clientX;
	pos2 = pos4 - e.clientY;
	pos3 = e.clientX;
	pos4 = e.clientY;
	// set the element's new position:
	buc.style.top = (buc.offsetTop - pos2) + "px";
	buc.style.left = (buc.offsetLeft - pos1) + "px";
}

function closeDragElement() {
	// stop moving when mouse button is released:
	document.onmouseup = null;
	document.onmousemove = null;
}
 

BugMove(document.getElementById("new"));

function BugMove(bugindex) {
	var bug = bugs[bugindex];
	var nearest_cover;
	var dx, dx2, dy, dy2, dhyp, dhyp2;
	var gox, goy;
	var newx, newy;
	var cover;
	
	var dom = document.getElementsByClassName(bugs[bugindex].id);
	if (dom.getContext) {
		var context = dom.getContext('2d');

		var posX = parseInt(dom.style.left);
		var posY = parseInt(dom.style.top);

				
		nearest_cover = 0;
		cover = covers[0];
		dx = cover.center_x - bug.center_x;
		dy = cover.center_y - bug.center_y;
		dhyp = Math.sqrt((dx*dx)+(dy*dy));
		
		for (i = 1; i < CoverCount; i++) {
			cover = covers[i];
			dx2 = cover.center_x - bug.center_x;
			dy2 = cover.center_y - bug.center_y;
			dhyp2 = Math.sqrt((dx2*dx2)+(dy2*dy2));
			//console.log("dhyp = "+dhyp+"  dhyp2 = "+dhyp2);
			if (dhyp2 < dhyp) {
				nearest_cover = i;
				dx = dx2;
				dy = dy2;
				dhyp = dhyp2;
			}
		}
		//console.log("nearest cover = "+nearest_cover+"; dx,dy = "+dx+","+dy);
		// have the nearest; now let's move towards it
		gox = Math.abs(dx);
		if (gox > MaxGoX) {
			gox = MaxGoX;
		}
		if (dx < 0) {
			gox = -gox;
		}
		
		if (Math.abs(dx) > 0) {
			goy = Math.abs(gox*dy/dx);
		} else {
			goy = Math.abs(dy);
		}
		if (goy > MaxGoY) {
			goy = MaxGoY;
		}
		if (dy < 0) {
			goy = -goy;
		}
		

		newx = Math.round(posX+gox);
		newy = Math.round(posY+goy);
		
		//avoid other bugs
		var changed=1;
		var me = bug.id;
		var tx, ty;
		while (changed == 1) {
			changed = 0;
			for (i=0; i<BugCount; i++) {
				if ((me != bugs[i].id) && (bugs[i].alive > 0)) {
					tx = bugs[i].current_xpos;
					ty = bugs[i].current_ypos;
					if ((Math.abs(newx-tx)<15) && (Math.abs(newy-ty)<15)) {
						changed = 1;
						newx += Math.round(Math.random()*4-2);
						newy += Math.round(Math.random()*4-2);
					}
				}
			}
		}			
		
		
		bug.current_xpos = newx;
		bug.current_ypos = newy;
		bug.center_x = newx+bug.width/2;
		bug.center_y = newy+bug.width/2;
		dom.style.left = newx + "px";
		dom.style.top = newy + "px";
	}
}

function BugsMove() {
	var i;
	var xmov, ymov;

	for (i = 0; i < BugCount; i++) {
		if (bugs[i].alive > 0) {
			BugMove(i);
		}
	}
	if (BugsAlive > 0) {
		setTimeout(BugsMove, BugsMoveTimer);
	}
}
*/
var diffX, diffY, CoverElement, CoverIndex;

// *******************************************************

function NewCoverSelect(index) {
//	console.log("in CoverSelect");
	CoverIndex = index;
	CoverElement = document.getElementById(covers[index].id);
	/*
		var propValue;
		for(var propName in CoverElement) {
			propValue = CoverElement[propName]

			console.log(propName,propValue);
		}
*/
	var currentXpos = parseInt(CoverElement.style.left);
	var currentYpos = parseInt(CoverElement.style.top);

	diffX = event.clientX - currentXpos;
	diffY = event.clientY - currentYpos;

	document.addEventListener("mousemove", CoverMove, true);
	document.addEventListener("mouseup", CoverDeSelect, true);

	event.stopPropagation();
	event.preventDefault();
}

// *******************************************************

function CoverMove() {
	var index;
	var cover;
	var xpos = event.clientX - diffX;
	var ypos = event.clientY - diffY;
	CoverElement.style.left = xpos + "px";
	CoverElement.style.top = ypos + "px";
	
	//console.log(CoverElement.id);
	
	cover = covers[CoverIndex];
	


	//console.log("cover["+cover.index+"] moved to "+xpos+", "+ypos);

	cover.current_xpos = xpos;
	cover.current_ypos = ypos;
	cover.center_x =xpos + cover.width/2;
	cover.center_y = ypos + cover.height/2;
//	console.log("addr = " + xpos + ", "+ypos+ " center = "+cover.center_x+", "+cover.center_y);

	event.stopPropagation();
}

// *********************************************************

function CoverDeSelect() {

  document.removeEventListener("mouseup", CoverDeSelect, true);
  document.removeEventListener("mousemove", CoverMove, true);

  event.stopPropagation();
}


function CoverMake(id, xsize, ysize, xpos, ypos, color) {
	this.id = "cover"+id;
	this.index = id;
	this.width = xsize;
	this.height = ysize;
	this.mycolor = color;
	this.current_xpos = xpos;
	this.current_ypos = ypos;
	this.center_x = xpos+xsize/2;
	this.center_y = ypos+ysize/2;
}

function CoverDraw(coverid) {
	var dom = document.getElementById(covers[coverid].id);
	if (dom.getContext) {
		var context = dom.getContext('2d');
		
		dom.style.left = covers[coverid].current_xpos + "px";
		dom.style.top = covers[coverid].current_ypos + "px";
		dom.style.position = "absolute";

		// Draw the outer stroke circle
		context.beginPath();
		context.fillStyle = covers[coverid].mycolor;
		context.fillRect(0,0,dom.width,dom.height);
	}
}
var cover = new CoverMake(0, 200, 100, 100, 0, "red");
covers[0] = cover;
var cover = new CoverMake(1, 200, 100, 300, 0, "blue");
covers[1] = cover;
var cover = new CoverMake(2, 200, 100, 0, 300, "green");
covers[2] = cover;
var cover = new CoverMake(3, 200, 100, 300, 300, "yellow");
covers[3] = cover;

for (i=0; i<CoverCount; i++) {
	txtstring = "<canvas id = \"" + covers[i].id + "\" ";
	txtstring += "width = \"" + covers[i].width + "\" ";
	txtstring += "height = \"" + covers[i].height + "\" ";
	txtstring += "onmousedown = \"NewCoverSelect(" + i + ");";
	txtstring += "\"></canvas>";
//	console.log(txtstring);

	document.write(txtstring);
	CoverDraw(i);
}
