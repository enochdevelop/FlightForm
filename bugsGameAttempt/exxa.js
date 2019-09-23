// open console via ctrl-shift-J
var bug;
var bugs = [];
var covers = [];

var bug_canvas_size = 20;
var bug_radius = 10;
var bug_xoffset = 10;
var bug_yoffset = 10;
var BugCount = 20;
var BugsAlive = BugCount;
var BugsMoveTimer = 50;
var LiveBug = "black";
var DeadBug = "purple";
var UnfrozenBug = "yellow";
var NumUnfrozen = 0;

var cover_radius = 20;
var cover_xoffset = 25;
var cover_yoffset = 25;
var CoverCount = 4;

var MaxGoX = 5;
var MaxGoY = 5;

//********************************************************

var NumHits = 0;
var NumMisses = -1;

//********************************************************
//********************************************************
//********************************************************
//********************************************************
//********************************************************

function BugDraw(index,colorid) {
	var bug = bugs[index];
	var dom = document.getElementById(bug.id);
	if (dom.getContext) {
		var context = dom.getContext('2d');
		var xpos = bug.current_xpos;
		var ypos = bug.current_ypos;
		bug.center_x = xpos+bug.width/2;
		bug.center_y = ypos+bug.height/2;
		
		dom.style.left = xpos + "px";
		dom.style.top = ypos + "px";
		dom.style.position = "absolute";

		// Draw the outer stroke circle
		context.beginPath();
		context.arc(bug_xoffset, bug_yoffset, bug_radius, 0, 2 * Math.PI, false);
		context.fillStyle = colorid;
		context.fill();
	}
}

function BugMove(bugindex) {
	var bug = bugs[bugindex];
	var nearest_cover;
	var dx, dx2, dy, dy2, dhyp, dhyp2;
	var gox, goy;
	var newx, newy;
	var cover;
	
	var dom = document.getElementById(bugs[bugindex].id);
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

function BugMake(id, canvas_size, xpos, ypos) {
	this.id = id;
	this.alive = 1;
	this.width = canvas_size;
	this.height = canvas_size;
	this.current_xpos = xpos;
	this.current_ypos = ypos;
	this.center_x = xpos + this.width/2;
	this.center_y = ypos + this.height/2;
}

function BugSelect(bugid) {
//	console.log("bug clicked "+bugid);
	if (bugs[bugid].alive > 0) {
		if (bugs[bugid].alive < 1) {
			NumUnfrozen -= 1;
			UpdateUnfrozen();
		}
		bugs[bugid].alive = 0;
		NumHits+=1;
		UpdateHits();
		BugDraw(bugid, DeadBug);
	} else {
		UpdateMisses();
		NumUnfrozen += 1;
		UpdateUnfrozen();
		bugs[bugid].alive = 0.5;
		BugDraw(bugid, UnfrozenBug);
	}
}

//********************************************************

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

//********************************************************
function UpdateUnfrozen() {
	var dom;
	var context;
	
	//console.log("update Unfrozen");
	dom = document.getElementById("Unfrozen");
	context = dom.getContext('2d');
	context.beginPath();
	context.fillStyle = "yellow";
	context.fillRect(0,0,dom.width,dom.height);
	context.font = "20px Georgia";
	context.fillStyle = "red";
	context.fillText("Unfrozen: "+NumUnfrozen, 10, 25);
	//console.log("Unfrozen = "+NumUnfrozen);
}
function UpdateMisses() {
	var dom;
	var context;
	
	NumMisses += 1;
	//console.log("updatemisses");
	dom = document.getElementById("Misses");
	context = dom.getContext('2d');
	context.beginPath();
	context.fillStyle = "red";
	context.fillRect(0,0,dom.width,dom.height);
	context.font = "20px Georgia";
	context.fillStyle = "white";
	context.fillText("Misses: "+NumMisses, 10, 25);
	//console.log("misses = "+NumMisses);
}


function UpdateHits() {
	var dom;
	var context;
	dom = document.getElementById("Hits");
	context = dom.getContext('2d');
	context.beginPath();
	context.fillStyle = "green";
	context.fillRect(0,0,dom.width,dom.height);
	context.font = "20px Georgia";
	context.fillStyle = "white";
	context.fillText("Hits: "+NumHits, 10, 25);
	//console.log("hitcount = "+NumHits);
}

function Create_Background() {
	var txtstring;
	var dom;
	var context;
	
	//create background field
	txtstring = "<canvas id=BackGround width="+window.innerWidth;
	txtstring += " height="+window.innerHeight+" ";
	txtstring += " onmousedown=UpdateMisses() ";
	txtstring += "style=\"position:absolute; top:0px; left:0px;"
	txtstring += "border:5px solid blue;\"></canvas>";
	document.write(txtstring);
	
	dom = document.getElementById("BackGround");

	context = dom.getContext('2d');
	
	// Draw the outer stroke circle
	context.beginPath();
	context.fillStyle = "pink";
	context.fillRect(0,0,dom.width,dom.height);
}

function Create_Score_Boxes() {
	var txtstring;
	var dom;
	var context;
		
	// Create Hits box
	txtstring = "<canvas id=Hits width=80 height=40 "
	txtstring += "style=\"position:absolute; top:5px; left:5px;"
	txtstring += "border:5px solid black;\"></canvas>";
	document.write(txtstring);

	dom = document.getElementById("Hits");

	context = dom.getContext('2d');
	
	// Draw the outer stroke circle
	context.beginPath();
	context.fillStyle = "green";
	context.fillRect(0,0,dom.width,dom.height);
	
	
	
	// Create Miss Box
	txtstring = "<canvas id=Misses width=120 height=40 "

	txtstring += "style=\"position:absolute; top:5px; left:100px;"
	txtstring += "border:5px solid black;\"></canvas>";
	document.write(txtstring);

	dom = document.getElementById("Misses");

	context = dom.getContext('2d');
	
	// Draw the outer stroke circle
	context.beginPath();
	context.fillStyle = "red";
	context.fillRect(0,0,dom.width,dom.height)
	
	// Create Unfrozen Box
	txtstring = "<canvas id=Unfrozen width=140 height=40 "

	txtstring += "style=\"position:absolute; top:5px; left:235px;"
	txtstring += "border:5px solid black;\"></canvas>";
	document.write(txtstring);

	dom = document.getElementById("Unfrozen");

	context = dom.getContext('2d');
	
	// Draw the outer stroke circle
	context.beginPath();
	context.fillStyle = "yellow";
	context.fillRect(0,0,dom.width,dom.height);


}
//********************************************************
Create_Background();

// create BugCount bugs

for (i=0; i < BugCount; i++) {
	var bug = new BugMake("bug"+i, bug_canvas_size, Math.random()*window.innerWidth, Math.random()*window.innerHeight);
	bugs[i] = bug;
}

for (i = 0; i < BugCount; i++) {
	txtstring = "<canvas id = \"" + bugs[i].id + "\" ";
	txtstring += "width = \"" + bugs[i].width + "\" ";
	txtstring += "height = \"" + bugs[i].height + "\" ";
	txtstring += "onmousedown = \"BugSelect("+i+")";
	txtstring += "\"></canvas>";
//	console.log(txtstring);

//	console.log("here2 " + i);

	document.write(txtstring);
	BugDraw(i, LiveBug);
}

//********************************************************
//********************************************************


//********************************************************

// create Cover
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

//********************************************************
//********************************************************
Create_Score_Boxes();

//********************************************************
//********************************************************
//********************************************************

UpdateHits();
UpdateMisses();
UpdateUnfrozen();
BugsMove();

//setInterval(move_bugs, (1000 / 60));