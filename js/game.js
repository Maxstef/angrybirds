var canvasElem = document.getElementById("game");
var world = boxbox.createWorld(canvasElem,{
	scale: 12
});
var progressId;
var force;
var angle = 60;
var points = 0;
var numOfPigs = 6;
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
	x: 0.7,
	y: 33
});
var support2 = world.createEntity(support, {
	x: 3.3,
	y: 33
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




world.createEntity({
	name: 'ground',
	shape: 'square',
	type: 'static',
	color: 'rgb(0, 255, 0)',
	width: 87,
	height: 5,
	borderWidth: 0,
	y: 38
});

world.createEntity(holmPoligon, {
	points: [{x: 6, y: 25}, {x: 12, y: 33}, {x:2,y: 31}]
});
world.createEntity(holmPoligon, {
	points: [{x: 23.3, y: 28.5}, {x: 24, y: 32}, {x:21,y: 31}]
});
world.createEntity(holmPoligon, {
	points: [{x: 33, y: 29}, {x: 36, y: 32}, {x:31,y: 31}]
});
world.createEntity(holmPoligon, {
	points: [{x: 37, y: 29}, {x: 45, y: 30}, {x:45,y: 31}, {x:37,y: 31}]
});
world.createEntity(holmPoligon, {
	points: [{x: 37, y: 29}, {x: 38, y: 29}, {x:38,y: 31}, {x:37,y: 31}]
});
world.createEntity(holmCircle, {
	radius: 2,
	x: 13,
	y: 36
});
world.createEntity(holmCircle, {
	radius: 7,
	x: 23,
	y: 41
});
world.createEntity(holmCircle, {
	radius: 2.2,
	x: 45,
	y: 35
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
	height: 85,
	x: 53.5,
	y: -7
});
world.createEntity(wall,   {
	width: 1,
	height: 85,
	x: -0.4,
	y: -7
});
world.createEntity(wall,   {
	width: 6,
	height: 0.3,
	x: 51,
	y: 25
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
// first from left
world.createEntity(block, {
	x: 28,
	y: 31
});
world.createEntity(block, {
	x: 31,
	y: 31
});
world.createEntity(block, {
	x: 29,
	y: 31
});
world.createEntity(block, {
	width: 5,
	height: 0.5,
	x: 29.5,
	y: 28
});
world.createEntity(block, {
	x: 28.3,
	y: 25,
	rotation: 30
});
world.createEntity(block, {
	x: 30.7,
	y: 25,
	rotation: -30
});


//middle
world.createEntity(block, {
	x: 38,
	y: 33
});
world.createEntity(block, {
	x: 35,
	y: 33
});
world.createEntity(block, {
	x: 41,
	y: 33
});
world.createEntity(block, {
	width: 8,
	height: 0.5,
	x: 38,
	y: 30
});








// first from right

world.createEntity(block, {
	x: 45,
	y: 30
});

world.createEntity(block, {
	x: 47.5,
	y: 31,
	height: 5.2
});
world.createEntity(block, {
	width: 4,
	height: 0.5,
	x: 46,
	y: 28
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
			if(force > 100){
				points = points + 250;
			} else if(points > 50){
				points = points + 225;
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

world.createEntity(pig, {
	image: 'assets/deadpig.png',
	y: 0,
	x: -2
});
world.createEntity(pig, {
	y: 27,
	x: 29.5
});
world.createEntity(pig, {
	y: 30,
	x: 53
});
world.createEntity(pig, {
	y: 32,
	x: 36.5
});
world.createEntity(pig, {
	y: 32,
	x: 39.5
});
world.createEntity(pig, {
	y: 30,
	x: 20
});
world.createEntity(pig, {
	y: 23,
	x: 51
});





// set angle
var setAngle = world.createEntity({
	name: 'setAngle',
	shape: 'circle',
	color: 'black',
	type: 'static',
	radius: 0.2,
	y: 33.7,
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
	name: 'player',
	shape: 'circle',
	image: 'assets/bird.png',
	imageStretchToFit: true,
	density: 6,
	radius: 1,
	x: 2,
	y: 34,
	onKeyDown: function(e){
		if(e.code == 'Enter' && this.onRun){
			this.position({x: 2, y: 34});
				support1.position({x: 0.7,y: 33});
				support2.position({x: 3.3,y: 33});
				setAngle.position({x: 5.7, y: 33.7});
				angle = 60;
				this.onRun =  false;
				this.keyDown = false;
				document.getElementById("forceBar").style.width = '0%';
				points = points - 50;
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


