var canvasElem = document.getElementById("game");
var world = boxbox.createWorld(canvasElem,{
	scale: 11
});
var progressId;
var force;
var angle = 60;
var points = 0;
var numOfPigs = 7;
updateScore();
function updateScore(){
	document.getElementById('score').innerHTML = points;
}
function startForceProgress(){
	progressId = setInterval(frame, 20);
}
function stopForceProgress(){
	clearInterval(progressId);
}

function frame() {
	var elem = document.getElementById("forceBar");
	var style = window.getComputedStyle(elem);
    var width = style.getPropertyValue('width');
    var w = parseInt(width) * 100 / 640;
    if(w >= 99){
    	stopForceProgress();
    	elem.style.width = '100%';
    	force = 5 * w;
    } else {
    	w++;
    	elem.style.width = w + '%';
    	force = 5 * w;
    }
    
}

var support = {
	name: 'support',
	shape: 'square',
	type: 'static',
	color: 'transparent',
	borderWidth: 0,
	width: 0.5,
	height: 20,
	onKeyDown: function(e){
		if(e.code == 'Space' && !this.onRun){
			this.position({x: -3, y: 25});
		}
		
	},
}
var support1 = world.createEntity(support, {
	x: 0.5,
	y: 33
});
var support2 = world.createEntity(support, {
	x: 3.5,
	y: 33
});





//wals
var wall = {
	name: 'wall',
	shape: 'square',
	type: 'static',
	color: 'rgb(125, 125, 125)',
	borderWidth: 0
}

world.createEntity(wall, {
	width: 1,
	height: 95,
	x: 58.5,
	y: -7
});
world.createEntity(wall,   {
	width: 1,
	height: 95,
	x: -0.4,
	y: -7
});
world.createEntity(wall,   {
	width: 3,
	height: 0.3,
	x: 34,
	y: 32
});



// groung and holms 

var holmPoligon = {
	name: 'holmPoligon',
	shape: 'polygon',
	type: 'static',
	color: 'rgb(0, 255, 0)',
	borderWidth: 0,
	borderRadius: '4px'
}
var holmCircle = {
	name: 'holmCircle',
	shape: 'circle',
	type: 'static',
	color: 'rgb(0, 255, 0)',
	borderWidth: 0
}
var ground = {
	name: 'ground',
	shape: 'square',
	type: 'static',
	color: 'rgb(0, 255, 0)',
	borderWidth: 0
}



//base ground
world.createEntity(ground, {	
	width: 97,
	height: 5,
	y: 43
});
world.createEntity(ground, {
	width: 20,
	height: 10,
	x: 50,
	y: 36

});
world.createEntity(ground, {
	width: 3,
	height: 9,
	x: 57,
	y: 27

});
world.createEntity(ground, {
	width: 11,
	height: 2,
	x: 53,
	y: 22
});

//left holm

world.createEntity(holmCircle, {
	radius: 20,
	x: 17,
	y:58
});
world.createEntity(holmCircle, {
	radius: 10,
	x: 17,
	y:46
});
world.createEntity(holmCircle, {
	radius: 6,
	x: 17,
	y:40
});
world.createEntity(holmPoligon, {
	points: [{x:7, y: 25},{x:17,y:40},{x:-3, y:40}]
});

//down cave
world.createEntity(ground, {
	width: 5,
	height: 4,
	x: 39,
	y: 33,
});
world.createEntity(ground, {
	width: 8,
	height: 1,
	x: 37,
	y: 40.5,
});
world.createEntity(holmCircle, {
	radius: 2,
	x: 37,
	y:33
});
world.createEntity(holmCircle, {
	radius: 1,
	x: 35,
	y:34
});
world.createEntity(holmCircle, {
	radius: .8,
	x: 33,
	y:40.4
});

world.createEntity(holmPoligon, {
	points: [{x:24.6, y: 29.8},{x:32,y:27},{x:32, y:32}]
});
world.createEntity(holmPoligon, {
	points: [{x:26.6, y: 29.8},{x:32,y:27},{x:32, y:34}]
});
world.createEntity(holmPoligon, {
	points: [{x:28.1, y: 29.8},{x:31.5,y:27},{x:31.5, y:36}]
});
world.createEntity(holmPoligon, {
	points: [{x:26.4, y: 26},{x:26,y:28.5},{x:24, y:28.5}]
});
world.createEntity(holmPoligon, {
	points: [{x:31, y: 31},{x:31,y:36},{x:29, y:36}]
});


// top cave
world.createEntity(holmCircle, {
	radius: 2.5,
	x: 39,
	y:31
});
world.createEntity(holmCircle, {
	radius: 1,
	x:47.5,
	y:22
});
world.createEntity(holmPoligon, {
	points: [{x:38, y: 23.7},{x:39,y:27},{x:30, y:27}]
});
world.createEntity(holmPoligon, {
	points: [{x:46, y: 20.7},{x:46,y:27},{x:44, y:27}]
});
world.createEntity(holmPoligon, {
	points: [{x:43, y: 17},{x:46,y:17},{x:46, y:23}]
});
world.createEntity(holmPoligon, {
	points: [{x:40, y: 17},{x:46,y:17},{x:46, y:21}]
});
world.createEntity(holmPoligon, {
	points: [{x:28, y: 23.7},{x:28,y:27},{x:25.4, y:27}]
});
world.createEntity(holmPoligon, {
	points: [{x:29, y: 23.7},{x:36,y:27},{x:30, y:27}]
});









//blocks

var block = {
	name: 'block',
	shape: 'square',
	color: 'brown',
	width: 0.5,
	height: 4,
	done: false,
	onImpact: function(entity, force){
		if(entity.name() == 'player' && !this.done){
			this.done = true;
			this.color('black');
			b = this;
			setTimeout(function(){
				b.destroy();
			}, 4000);

		}
	}
}

//down cave
world.createEntity(block, {
	x: 30,
	y: 38
});
world.createEntity(block, {
	x: 27,
	y: 38
});
world.createEntity(block, {
	width: 4,
	height: 0.5,
	x: 28.5,
	y: 35
});
world.createEntity(block, {
	x: 27.5,
	y: 33,
	height: 3,
	rotation: 20
});
world.createEntity(block, {
	height: 3,
	x: 29.5,
	y: 33,
	rotation: -20
});
world.createEntity(block, {
	height: 3,
	x: 33,
	y: 30,
});
world.createEntity(block, {
	height: 3,
	x: 33,
	y: 38
});
world.createEntity(block, {
	height:3,
	x: 38,
	y: 38
});
world.createEntity(block, {
	height:0.5,
	width: 5.5,
	x: 35.5,
	y: 36
});

//top cave
world.createEntity(block, {
	x: 50,
	y: 28.5
});
world.createEntity(block, {
	x: 54,
	y: 28.5
});
world.createEntity(block, {
	width: 5,
	height: 0.5,
	x: 52,
	y: 26
});
world.createEntity(block, {
	x: 50.5,
	y: 25,
	height: 3,
	rotation: 20
});
world.createEntity(block, {
	height: 3,
	x: 52,
	y: 25,
	rotation: -20
});

//top

world.createEntity(block, {
	x: 49,
	y: 18
});
world.createEntity(block, {
	x: 52,
	y: 18
});
world.createEntity(block, {
	x: 55,
	y: 18
});
world.createEntity(block, {
	x: 58,
	y: 18
});
world.createEntity(block, {
	width: 9.5,
	height: 0.5,
	x: 53.5,
	y: 15
});
world.createEntity(block, {
	x: 49,
	y: 13
});
world.createEntity(block, {
	x: 52,
	y: 13
});
world.createEntity(block, {
	x: 55,
	y: 13
});
world.createEntity(block, {
	x: 58,
	y: 13
});
world.createEntity(block, {
	width: 9.5,
	height: 0.5,
	x: 53.5,
	y: 10
});
world.createEntity(block, {
	x: 35,
	y: 28,
	width: 6,
	height: 0.5
});



// pigs



var pig = {
	name: 'pig',
	shape: 'circle',
	image: 'assets/pig.png',
	radius: 1,
	done: false,
	imageStretchToFit: true,
	onImpact: function(entity,force){
		if(entity.name() == 'player' && !this.done){
			if(force > 150){
				points = points + 300;
			} else if(points > 100){
				points = points + 250;
			} else {
				points = points + 200;
			} 
			updateScore();
			this.done = true;
			
			this.image('assets/deadpig.png');
			p = this;
			setTimeout(function(){
					p.destroy();
				}, 2000);
			
			numOfPigs--
			if(numOfPigs == 0){
				setTimeout(function(){
					alert('Game over. You killed all pigs. Your score: ' + points);
					location.reload();
				}, 2000);
				
			}
		}
	}
};
//preload dead pig img
world.createEntity(pig, {
	image: 'assets/deadpig.png',
	y: 0,
	x: -2
});
world.createEntity(pig, {
	y: 30,
	x: 34.5
});
world.createEntity(pig, {
	y: 39,
	x: 28.5
});
world.createEntity(pig, {
	y: 38,
	x: 37
});
world.createEntity(pig, {
	y: 28,
	x: 52
});
world.createEntity(pig, {
	y: 19,
	x: 50.5
});
world.createEntity(pig, {
	y: 19,
	x: 56.5
});
world.createEntity(pig, {
	y: 14,
	x: 53.5
});





// set angle
var setAngle = world.createEntity({
	name: 'setAngle',
	shape: 'circle',
	color: 'black',
	type: 'static',
	radius: 0.2,
	y: 38.2,
	x: 5.7,
	onKeyDown: function(e){
		var curPos = this.position();
		if(e.code == 'ArrowUp'){
			if(angle <= 0){
				angle = 0;
				return;
			} else {
				angle = angle - 1;
				this.position({x: curPos.x - 0.05, y: curPos.y - 0.05});
				
			}
			
		}
		if(e.code == 'ArrowDown'){
			if(angle >= 90){
				angle = 90;
				return;
			} else {
				angle = angle + 1;
				this.position({x: curPos.x + 0.05, y: curPos.y + 0.05});
				
			}
			
		}
	}
});



// player
world.createEntity({
	onRun: false,
	keyDown: false,
	done: false,
	name: 'player',
	shape: 'circle',
	image: 'assets/bird.png',
	imageStretchToFit: true,
	density: 6,
	radius: 1,
	x: 2,
	y: 39,
	onKeyDown: function(e){
		if(e.code == 'Enter' && this.onRun){
			this.position({x: 2, y: 39});
				support1.position({x: 0.7,y: 33});
				support2.position({x: 3.3,y: 33});
				setAngle.position({x: 5.7, y: 38.2});
				angle = 60;
				this.onRun =  false;
				this.keyDown = false;
				this.done = false;
				document.getElementById("forceBar").style.width = '0%';
				points = points - 100;
				if(points < 0){
					points = 0;
				}
				document.getElementById('score').innerHTML = points;
				return;
		}
		if(e.code == 'Space' && !this.onRun){

			if(!this.keyDown){
				setAngle.position({x: -3, y: 33});
				startForceProgress();
				this.keyDown = true;
			}
			
		}
		if(e.code == 'Space' && this.onRun && !this.done){
			this.applyImpulse(200, 45);
			this.done = true;
		}
		
	},
	onKeyUp: function(e){
		if(e.code == 'Space' && !this.onRun){
			stopForceProgress();
			this.applyImpulse(1.3 * force, angle);
			this.onRun = true;
		}
		
	},
	onImpact: function(entity, force){
		if(this.onRun == true && entity.name() == 'block'){
			points = points + 1;
			updateScore();
			setTimeout(function(){
				entity.destroy();
			}, 3000);
		}
		/*if(this.onRun == true && entity.name() == 'wall'){
			p = this;
			setTimeout(function(){
				p.position({x: 2, y: 24});
				support1.position({x: 0.7,y: 25});
				support2.position({x: 3.3,y: 25});
				setAngle.position({x: 5.7, y: 25.7});
				angle = 60;
				p.onRun =  false;
				p.keyDown = false;
				document.getElementById("forceBar").style.width = '0%';
			}, 2000);
		}*/
		
	}
});


