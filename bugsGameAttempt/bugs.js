
var bug;
var bugs = [];
var covers = [];
var bug_canvas_size = 20;
var bug_radius = 10;
var bug_xoffset = 10;
var bug_yoffset = 10;
var BugCount = 5;
var LiveBug = "purple";
var DeadBug = "Blue";
var UnfrozenBug = "yellow";
var BugsAlive = BugCount;
var NumUnfrozen = 0;
var NumHits = 0;
var NumMisses = -1;

function Create_Background() {
	var txtstring;
	var dom;
	var context;
	//create background field 
	txtstring = " <canvas id=BackGround width=" + (window.innerWidth-10);
	txtstring += " height=" + (window.innerHeight -10)+ " ";
	txtstring += " onmousedown=UpdateMisses() ";
	txtstring += "style=\"position:absolute; top:0px; left:0px; z-index:0;"
	txtstring += "border:5px solid blue;\"></canvas>";
	document.write(txtstring);

	dom = document.getElementById("BackGround");

	context = dom.getContext('2d');


	context.beginPath();
	context.fillStyle = "black";
	context.fillRect(0, 0, dom.width, dom.height);


}


function createScoreBoxes() {
	var txt;
	var dom1;
	var context1;

	covers["first"] = -1;
	covers["second"] = -1;
	covers["third"] = -1;
	covers["fourth"] = -1;

	// first Box
	txt = "<canvas id=\"first\" width=80 height=40 "
	txt += "style=\"position:absolute; top:5px; left:5px;"
	txt += "border:5px solid yellow;\"></canvas>";
	document.write(txt);

	// second Box
	txt = "<canvas id=\"second\" width=80 height=40 "
	txt += "style=\"position:absolute; top:5px; left:100px;"
	txt += "border:5px solid yellow;\"></canvas>";
	document.write(txt);

	// third Box
	txt = "<canvas id=\"third\" width=80 height=40 "
	txt += "style=\"position:absolute; top:5px; left:200px;"
	txt += "border:5px solid yellow;\"></canvas>";
	document.write(txt);

	// fourth Box
	txt = "<canvas id=\"fourth\" width=80 height=40 "
	txt += "style=\"position:absolute; top:5px; left:300px;"
	txt += "border:5px solid yellow;\"></canvas>";
	document.write(txt);
}



function BugDraw(index, colorid) {
	var bug = bugs[index];
	var dom = document.getElementById(bug.id);
	if (dom.getContext) {
		var context = dom.getContext('2d');
		var xpos = bug.current_xpos;
		var ypos = bug.current_ypos;
		bug.center_x = xpos + bug.width / 2;
		bug.center_y = ypos + bug.height / 2;

		dom.style.left = xpos + "px";
		dom.style.top = ypos + "px";
		dom.style.position = "absolute";

		context.beginPath();
		context.arc(bug_xoffset, bug_yoffset, bug_radius, 0, 2 * Math.PI, false);
		context.fillStyle = colorid;
		context.fill();
	}
}

function BugMake(id, canvas_size, xpos, ypos) {
	this.id = id;
	this.alive = 1;
	this.width = canvas_size;
	this.height = canvas_size;
	this.current_xpos = xpos;
	this.current_ypos = ypos;
	this.center_x = xpos + this.width / 2;
	this.center_y = ypos + this.height / 2;
}




function BugSelection(bugid) {
	console.log("bug clicked" + bugid);
	if (bug[bugid].alive > 0) {
		if (bugs[bugid].alive < i);
		UpdateUnfrozen();
		bug[bugid].alive = 0;
		NumHits += 1;
		UpdateHits();
		BugDraw(bugid, DeadBug);
	} else {
		UpdateMisses();
		NumUnfrozen();
		bugs[bugid].alive = 0.5;
		BugDraw(bugid, UnfrozenBug);

	}
}

var buc;

function createCovers(buc) {

	//create background field 
	buc = "<canvas id=\"first\" width=200 height=100 onmousedown=dragMouseDown() "
	buc += "style=\"position:absolute; background:teal; fill:red; top:500px; left:200px;"
	buc += "fill:red;\"></canvas>";
	document.write(buc);
	
	dragElement(buc);


	

}

function dragElement(buc) {
	
	var pos1 = 0,
		pos2 = 0,
		pos3 = 0,
		pos4 = 0;

	buc.onmousedown = dragMouseDown;
	//document.onmousedown = dragMouseDown; 
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
Create_Background();


for (i = 0; i < BugCount; i++) {
	var bug = new BugMake("bug" + i, bug_canvas_size, Math.random() *
		window.innerWidth, Math.random()*window.innerHeight);
	bugs[i] = bug;
}

for (i = 0; i < BugCount; i++) {
	txtstring = "<canvas id = \"" + bugs[i].id + "\"";
	txtstring += "width = \"" + bugs[i].width + "\"";
	txtstring += "height = \"" + bugs[i].height + "\"";
	txtstring += "onmousedown = \"BugSelect(" + i + ")";
	txtstring += "\"></canvas>";
	document.write(txtstring);
	console.log(txtstring);
	BugDraw(i, LiveBug);
}



createCovers();
createScoreBoxes();
