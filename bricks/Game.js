// JavaScript Document
//////////////////////////定义对象//////////////////////////////////////

//小球对象
function Ball(x, y, r, dx, dy, image, auto) {      //球，这里把小球当做一个正方形，
    this.x = x;            //小球圆点坐标（x,y)
    this.y = y;
	
	this.r = r;      //小球边长一半
	
    this.dx = dx;  // 小球方向 （-π，π）
    
	this.dy = dy;   //小球速度
	
	this.image = image; //小球界面
	
	this.auto = auto;// 小球自动行动为1， 跟随棒子行动为0
	
	this.state = 0;//0为正常敲击状态，1-7为与砖块对应的状态
	this.clicked = false;
	this.draw=function(ctx){   //画出小球
		var that = this;
		
		ctx.drawImage(that.image, that.x-that.r, that.y-that.r, that.r*2, that.r*2);
		if(u_winOrLose == true)
			w_gameOver();
	};
	
	this.step=function(bang, height, width, control,bricks,animal){   //小球一步的运动
		var that = this;

		if(this.auto == false)   //小球贴住棒子
		{
			this.x = bang.x + u_ballToBang;
		}
		else
		{
			//棒子检测
			if(this.y + this.r + this.dy >= bang.y || this.y - this.r + this.dy <= u_myBangUp.y + u_myBangUp.h)
			//小球可反弹的条件为小球下边刚好过棒子
			{
				if(this.x+this.r+this.dx>= bang.x && this.x -this.r+this.dx<= bang.x + bang.w)
				{
					u_sounds[1].play();
					if(bang.stick == true && this.clicked == false)
					{
						u_ballToBang = this.x - bang.x;
						this.auto = false;
						this.clicked = true;
						return;
					}
					else
					{
						this.dx = 10 * ((that.x-(bang.x+bang.w/2))/bang.w);
            			this.dy = -this.dy;
						this.clicked = false;
						this.x = this.x + this.dx;
						this.y = this.y + this.dy;
						return;
					}
				}
			}
			
			//画布边界检测
			
			if(that.y + that.r + that.dy > height || that.y - that.r + that.dy < 0)//输球
			{
				u_winOrLose = false;
				w_gameOver();
				return;
			}
		
			if(that.x - that.r+that.dx <= 0 || that.x + that.r + that.dx >= width)
			{
				this.dx = -this.dx; //绕x轴翻转
				this.x = this.x + this.dx;
				this.y = this.y + this.dy;
				return;
			}
			//砖块检测
			if(this.state == 0)
			{
				var x1=this.x-this.r;
				var x2=this.x+this.r;
				var y1=this.y-this.r;
				var y2=this.y+this.r;
				
    			iRow = Math.floor(that.y /(bricks.brick.h + 2*bricks.brick.p));
    			iCol = Math.floor(that.x / (bricks.brick.w + 2*bricks.brick.p));
	
    	
				
				for(var i=Math.max(iRow-1,0);i< Math.min(bricks.r,iRow + 2);i++)
					for(var j=Math.max(iCol-1,0);j<Math.min(bricks.c,iCol+2);j++)
					{
						var temp = bricks.bricks[i][j];
			if(temp.state == 1|| temp.state == 2 || temp.state == 4||temp.state == 5)
						{
							aright = temp.right;
							aleft = temp.left;
							atop = temp.top;
							abottom = temp.bottom;
							a2=	(this.x+this.r >= aleft && this.x -this.r<= aright);
							a5=(this.y-this.r <= abottom &&  this.y+this.r >= atop);
							if(a2==true && y2 <= atop && atop <= (y2+this.dy))
								{	
									if(temp.state == 5)
										{
											u_winOrLose = false;
											w_gameOver();
										}
									if(temp.state == 1)
									{
										temp.state = 0;
										if(animal.r == i-1&&animal.c ==j)
											animal.step(bricks,2);//0上，1右，2下，3左
										else if(animal.r == i&&animal.c==j+1)
											animal.step(bricks,3);
										else if(animal.r == i+1&&animal.c==j)
											animal.step(bricks,0);
										else if(animal.r == i&&animal.c==j-1)
											animal.step(bricks,1);
										else
											;//空语句
									}
										this.dy=-this.dy;
										this.x = this.x + this.dx;
										this.y = this.y + this.dy;
										u_sounds[0].play();
										return;			
								}
							
							else if(a2== true&&y1 >= abottom && abottom >= (y1+this.dy))
								{
									if(temp.state == 5)
										{
											u_winOrLose = false;
											w_gameOver();
										}
									if(temp.state == 1)
									{
										temp.state = 0;
										if(animal.r == i-1&&animal.c ==j)
											animal.step(bricks,2);//0上，1右，2下，3左
										else if(animal.r == i&&animal.c==j+1)
											animal.step(bricks,3);
										else if(animal.r == i+1&&animal.c==j)
											animal.step(bricks,0);
										else if(animal.r == i&&animal.c==j-1)
											animal.step(bricks,1);
										else
											;//空语句
									}
										this.dy=-this.dy;
										this.x = this.x + this.dx;
										this.y = this.y + this.dy;
										u_sounds[0].play();
										return;	
								}
							else if(a5 == true && x1 >= aright && aright >=(x1+this.dx))
								{
									if(temp.state == 5)
										{
											u_winOrLose = false;
											w_gameOver();
										}
									if(temp.state == 1)
									{
										temp.state = 0;
										if(animal.r == i-1&&animal.c ==j)
											animal.step(bricks,2);//0上，1右，2下，3左
										else if(animal.r == i&&animal.c==j+1)
											animal.step(bricks,3);
										else if(animal.r == i+1&&animal.c==j)
											animal.step(bricks,0);
										else if(animal.r == i&&animal.c==j-1)
											animal.step(bricks,1);
										else
											;//空语句
									}
										this.dx =-this.dx;
										this.x = this.x + this.dx;
										this.y = this.y + this.dy;
										u_sounds[0].play();
										return;
								}
							else if(a5 == true && x2 <= aleft && aleft<= (x2+this.dx))
								{
									if(temp.state == 5)
										{
											u_winOrLose = false;
											w_gameOver();
										}
									if(temp.state == 1)
									{
										temp.state = 0;
										if(animal.r == i-1&&animal.c ==j)
											animal.step(bricks,2);//0上，1右，2下，3左
										else if(animal.r == i&&animal.c==j+1)
											animal.step(bricks,3);
										else if(animal.r == i+1&&animal.c==j)
											animal.step(bricks,0);
										else if(animal.r == i&&animal.c==j-1)
											animal.step(bricks,1);
										else
											;//空语句
									}
										this.dx =-this.dx;
										this.x = this.x + this.dx;
										this.y = this.y + this.dy;
										u_sounds[0].play();
										return;
								}
							else
							;//空语句
						}
					}
			}
			this.x = this.x + this.dx;
			this.y = this.y + this.dy;
		}
	}
}
//棒子对象
function Bang(x, y, w, h, dx, dy, image, stick){
	this.x = x;  //棒子左上角坐标
	this.y = y;
	
    this.w = w;  //棒子宽度和高度
    this.h = h;
	
	this.dx = dx;     // 棒子方向 （-π，π）
	this.dy = dy;
	
    this.image = image; //棒子界面
	
	this.stick = stick;
	
	this.draw=function(ctx){ //画出棒子
		var that = this;
		ctx.drawImage(that.image, that.x, that.y, that.w, that.h);
		
	};
	
	this.step=function(height,width,control,bricks){//棒子一步的运动
		var that = this;
		if(control.left == true && control.right == false)
		{
			this.x = Math.max(that.x-that.dx, 0);
		}
		else if(control.right == true && control.left == false)
			this.x = Math.min(that.x + that.dx, width-that.w);
	};
}
//控制对象
function Control(){
	this.left = false;
	this.right = false;
	this.jump = false;
	
	this.defineControl = function(){
		var that = this;
		$(window).keydown(function(event){ // keyboard-down alerts
        	switch (event.keyCode) {
            	case 37: // 'Left' key
                	that.left = true;
                	break;
            	case 39: // 'Right' key
                	that.right = true;
                	break;
				case 17:
					u_myBang.stick = true;
        	}
    	});
    	$(window).keyup(function(event){ // keyboard-up alerts
        	switch (event.keyCode) {
            	case 37: // 'Left' key
                	that.left = false;
                	break;
            	case 39: // 'Right' key
                	that.right = false;
                	break;
				case 17:
					u_myBang.stick = false;
        	}	
    	});
		x = 0;
		$(window).keyup(function(event){
			if(event.keyCode == 32)
			{
				
				if(u_myBall.auto == false)
				u_myBall.auto = true;	
			}
			if(event.keyCode == 83)
			{
				u_pause = (u_pause == true)? false:true;
				x++;
				w_pauseOrStart();
			}
		});
		
		$("canvas").click(function(event){
				var iCanvX = event.pageX-$(u_canvas).offset().left;
    			var iCanvY =  event.pageY-$(u_canvas).offset().top;
				var i = Math.floor(iCanvY/(u_myBricks.brick.h+2*u_myBricks.brick.p));
				var j = Math.floor(iCanvX/(u_myBricks.brick.w+2*u_myBricks.brick.p));
				if(i >=0 && i < u_myBricks.r && j >= 0 && j <u_myBricks.w)
				{
				var temp = u_myBricks.bricks[i][j];
				if(temp.state== 0)
				{
					if(event.ctrlKey == 1)
						temp.state = 3;
					else
						temp.state = 1;
				}
				}
		});
		
		
    	var iCanvX1 = $(u_canvas).offset().left;
    	var iCanvX2 = iCanvX1 + u_width;
    	$('canvas').mousemove(function(e) { // binding mousemove event
        if (e.pageX > iCanvX1 && e.pageX < iCanvX2) {
            u_myBang.x = Math.max(e.pageX - iCanvX1 - (u_myBang.w/2), 0);
            u_myBang.x = Math.min(u_ctx.canvas.width - u_myBang.w, u_myBang.x);
			u_myBangUp.x = u_myBang.x;
        }
    });
  	};
}
//一个砖块
function Brick(){
	this.w;
	this.h;
	this.p;
	this.image;
	this.left;
	this.right;
	this.top;
	this.buttom;
	this.state; //0表示没有， 1表示砖块，2表示铁，3表示泥,4表示小怪兽，5表示终点,6表示胜利，7表示界外
}
//所有砖块
function Bricks(w, h, r, c, p, image,map){
	this.w = w;
    this.h = h;
    this.r = r; // rows
    this.c = c; // cols
    this.brick = new Brick();
    this.bricks = [];
    this.image = image;
	this.background = 0;
	this.colors = ['#efefef','#9d9d9d', '#f80207', '#feff01', '#0072ff', '#fc01fc', '#03fe03']; // colors for rows
	
	this.map = map;
	
	this.initialBricks = function(animal){
		var that = this;
		this.brick.w = w/c - 2*p;
		this.brick.h = h/r - 2*p;
		this.brick.p = p;
		for(var i=0; i < r;i++)
		{
			this.bricks[i] = new Array(c);
			for(var j=0; j < c;j++)
			{
				this.bricks[i][j] = new Brick;
				this.bricks[i][j].left = j*(this.brick.w+2*p)+p;
				this.bricks[i][j].right = (j+1)*(this.brick.w+2*p)-p;
				this.bricks[i][j].top= i*(this.brick.h+2*p)+p;
				this.bricks[i][j].bottom = (i+1)*(this.brick.h + 2*p)-p;
				this.bricks[i][j].state = this.map[i][j];
				
				if(this.bricks[i][j].state == 4)
				{
					animal.r=i;
					animal.c=j;
				}
			}
		}
	}
	
	this.draw = function(ctx){
		var that = this;
		var b = this.brick;
		var flag = true;
		for(var i = 0; i < this.r;i++)
		for(var j= 0; j<this.c;j++)
        	if (this.bricks[i][j].state != 0 && this.bricks[i][j].state != 7) {
				/*
					ctx.fillStyle = this.colors[this.bricks[i][j].state];
					
               	 	ctx.beginPath();
                	ctx.rect((j * (b.w + 2*b.p)) + b.p, (i * (b.h + 2*b.p)) + b.p, b.w, b.h);
                	ctx.closePath();
                	ctx.fill();*/
					if(this.bricks[i][j].state == 6)
					u_winOrLose = true;
					if(this.bricks[i][j].state == 1)
					flag = false;
					ctx.drawImage(that.image[that.bricks[i][j].state-1],(j * (b.w + 2*b.p)) + b.p, (i * (b.h + 2*b.p)) + b.p, b.w, b.h);
    			}
		if(flag == true && u_mode == 0)
		u_winOrLose = true;
				
	}
	
	
}
//小怪兽
function Animal(){
	this.r = 0;
	this.c = 0;
	
	this.step=function(bricks,dirc){
		var that = this;
		if(dirc == 0)
		{
			do{
				bricks.bricks[that.r][that.c].state = 0;
				this.r--;
				if(bricks.bricks[that.r][that.c].state == 5)
				 	bricks.bricks[that.r][that.c].state=6;
				else
					bricks.bricks[that.r][that.c].state = 4;
				 }while(this.r > 0 && bricks.bricks[that.r-1][that.c].state ==0 || bricks.bricks[that.r-1][that.c].state == 5)
		}
		if(dirc == 1)
		{
			do{
				bricks.bricks[that.r][that.c].state = 0;
				this.c++;
				if(bricks.bricks[that.r][that.c].state == 5)
				 	bricks.bricks[that.r][that.c].state=6;
				else
				bricks.bricks[that.r][that.c].state = 4;
				}while(this.c < bricks.c&&bricks.bricks[that.r][that.c+1].state == 0 || bricks.bricks[that.r][that.c+1].state == 5)
		}
		if(dirc == 2)
		{
			do{
				bricks.bricks[that.r][that.c].state = 0;
				this.r++;
				if(bricks.bricks[that.r][that.c].state == 5)
				 	bricks.bricks[that.r][that.c].state=6;
				else
				bricks.bricks[that.r][that.c].state = 4;	
				}while(this.r < bricks.r&&bricks.bricks[that.r+1][that.c].state == 0 || bricks.bricks[that.r+1][that.c].state == 5)
		}
		if(dirc == 3)
		{
			do{
				bricks.bricks[that.r][that.c].state = 0;
				this.c--;
				if(bricks.bricks[that.r][that.c].state == 5)
				 	bricks.bricks[that.r][that.c].state=6;
				else
				bricks.bricks[that.r][that.c].state = 4;			
				}while(this.c > 0 && bricks.bricks[that.r][that.c-1].state == 0 || bricks.bricks[that.r1][that.c-1].state == 5)
		}
	}
		
}

//////////////////////定义函数 全局函数用w开头////////////////////////////////
function w_produceRandom(from, to){ 
	var temp = Math.random()*(to - from) + from;
	return temp;
}//产生随机数
function w_restart(){
			    setTimeout(function () {
	u_myBang = new Bang(u_width/2, u_height-u_bangH, u_bangW, u_bangH, u_bangSpeedX, 0, u_imageBang,false); 
							
	u_myBangUp = new Bang(u_width/2, 0, u_bangW, u_bangH, u_bangSpeedX, 0, u_imageBang,false); 
	
	if(u_ballUpOrDown == true)
	u_myBall= new Ball(u_width/2+ u_ballToBang, u_height-u_bangH-u_ballR-1, u_ballR, u_ballSpeedX, -u_ballSpeedY, u_imageBall, false);
	else
	u_myBall = new Ball(u_width/2 + u_ballToBang,u_bangH+u_ballR+1,u_ballR, u_ballSpeedX, u_ballSpeedY, u_imageBall, false);
			      
					u_gameStart=setInterval(w_gameStep,u_speedTime);
					u_gameTimer=setInterval(w_timeCount,1000);
			    }, 1000)
			}
function w_gameOver(){
	u_gameStart = clearInterval(u_gameStart);
	u_gameTimer = clearInterval(u_gameTimer);
	if(u_winOrLose == true)
	{
		u_winOrLose = false;
		u_sounds[2].play();
			if(u_mode == 0 && u_level == 9|| u_mode == 1 && u_level == 5)
			{
			$($("li")[1]).css("display","none");
  			$($("li")[5]).css("display","block");
			}
			else{
			$(function(){
			setTimeout(function(){
			  $($('li')[1]).css('display','none');
				$($("li")[2]).css("display","block");
			  },1000)
			});}
	}
	else
	{
		u_sounds[3].play();
			u_balls --;
			if (u_balls >= 0)
			{
				w_restart();
				$("#ballsleft")[0].innerText="Ball:"+(u_balls);
			}
			else 
			{
			 
			  $(function(){
			  setTimeout(function(){
				$($('li')[1]).css('display','none');
				  $($("li")[3]).css("display","block");
				},1000)
			  });
			  u_balls = 2;
			}
	}
}

function w_gameStep(){
	u_ctx.clearRect(0, 0, u_width, u_height);

    // fill background
	u_ctx.drawImage(u_imageBackground[u_myBricks.background],0,0,u_width,u_height)
	
	u_myBricks.background = (u_myBricks.background+1)%u_imageBackground.length;
	
	u_myBricks.draw(u_ctx);
	u_myBang.draw(u_ctx);
	u_myBall.draw(u_ctx);
	u_myBangUp.draw(u_ctx);
	
	u_myBall.step(u_myBang,u_height,u_width,u_myControl,u_myBricks,u_myAnimal);
	u_myBang.step(u_height,u_width,u_myControl);
	u_myBangUp.step(u_height,u_width,u_myControl);
}

function w_timeCount(){
	u_timeCounter++;
	u_min = Math.floor(u_timeCounter / 60);
    u_sec = u_timeCounter % 60;
}//时间

function w_pauseOrStart(){
	if(u_pause == true)
	{
		u_gameStart = clearInterval(u_gameStart);
		u_gameTimer = clearInterval(u_gameTimer);
	}
	else{
		u_gameStart =setInterval(w_gameStep,u_speedTime);
		u_gameTimer =setInterval(w_timeCount,1000);
	}
}//控制暂停、开始

function w_start(){	
	w_chooseModeAndLevel()
	
	u_myBang = new Bang(u_width/2, u_height-u_bangH, u_bangW, u_bangH, u_bangSpeedX, 0, u_imageBang,false); 
							
	u_myBangUp = new Bang(u_width/2, 0, u_bangW, u_bangH, u_bangSpeedX, 0, u_imageBang,false); 
	
	if(u_ballUpOrDown == true)
	u_myBall= new Ball(u_width/2+ u_ballToBang, u_height-u_bangH-u_ballR-1, u_ballR, u_ballSpeedX, -u_ballSpeedY, u_imageBall, false);
	else
	u_myBall = new Ball(u_width/2 + u_ballToBang,u_bangH+u_ballR+1,u_ballR, u_ballSpeedX, u_ballSpeedY, u_imageBall, false);
	
	u_myBricks= new Bricks(u_width,u_height-100,u_bricksR,u_bricksC,u_bricksP, u_imageBricks,u_map);
	
	u_myAnimal = new Animal();
	
	u_myBricks.initialBricks(u_myAnimal);
	
	u_myControl= new Control();
		
	u_myControl.defineControl();
		         
	u_gameStart = setInterval(w_gameStep,u_speedTime);

	u_gameTimer = setInterval(w_timeCount,1000);
}//开始游戏，重新开始游戏

function w_chooseModeAndLevel(){
	if(u_mode == 1)
	{
		u_imageBang = s_imageBang_1;
		u_imageBall = s_imageBall_1;
		u_imageBricks = s_imageBricks_1;
		u_imageBackground = s_imageBackground_1;
		u_sounds = s_sounds_1;
		u_map = s_map_1[u_level-1];
	}
	else
	{
		u_imageBang = s_imageBang_0;
		u_imageBall = s_imageBall_0;
		u_imageBricks = s_imageBricks_0;
		u_imageBackground = s_imageBackground_0;
		u_sounds = s_sounds_1;
		u_map = s_map_0[u_level-1];
		if(u_level == 2 || u_level == 4)
		u_ballUpOrDown = false;
		else
		u_ballUpOrDown = true;
		u_speedTime = 10-Math.floor(u_level/2);
	}
}





////////////////////////////////////程序运行起点//////////////////////////////////////////

var u_canvas, u_ctx;  //全局变量以u开头
var u_width, u_height;

var u_myBang;
var u_myBall;
var u_myControl;
var u_myBangUp;
var u_myAnimal;
var u_speedTime = 10;
var u_imageBricks = new Array();
var u_imageBang = new Image();  
var u_imageBall = new Image();  
var u_imageBricks = new Array();


var u_gameStart = 0;  //游戏时间种子
var u_gameTimer;//计时时间种子
var u_timeCounter = 0;
var u_min = u_sec = 0; 

var u_pause = false;// 

var u_ballR = 10;
var u_bangW = 150;
var u_bangH = 20;
var u_ballToBang = w_produceRandom(0,u_bangW);
var u_bricksR = 10;
var u_bricksC = 11;
var u_bricksP = 1;
var u_bangSpeedX = 5;
var u_ballSpeedX = 0.5;
var u_ballSpeedY = -5;
var u_winOrLose = false;
var u_map;
var u_sounds;
var u_soundOn = true;
var u_ballUpOrDown = true;//true表示球在下面，false表示球在上面

var s_imageBang_1 = new Image();
var s_imageBall_1 = new Image();
var s_imageBang_0 = new Image();
var s_imageBall_0 = new Image();

s_imageBang_1.src = 'image/padd.png';
s_imageBall_1.src = "image/ball.jpg";
s_imageBang_0.src = 'image/padd.png';
s_imageBall_0.src = "image/ball.jpg";

var s_imageBricks_1 = new Array;
s_imageBricks_1[0] = new Image();
s_imageBricks_1[0].src = "image/wall.gif";
s_imageBricks_1[1] = new Image();
s_imageBricks_1[1].src = "image/steel.gif";
s_imageBricks_1[2] = new Image();
s_imageBricks_1[2].src = "image/sea.gif";
s_imageBricks_1[3] = new Image();
s_imageBricks_1[3].src = "image/itank.gif";
s_imageBricks_1[4] = new Image();
s_imageBricks_1[4].src = "image/podium.gif";
s_imageBricks_1[5] = new Image();
s_imageBricks_1[5].src = "image/win.jpg";

var s_imageBackground_1 = new Array();
for(var i = 0; i < 30; i++)
{
var j = i+1;
s_imageBackground_1[i] = new Image();
s_imageBackground_1[i].src = "image/background/background_"+j+".JPG";
}

var s_imageBackground_0 = new Array();
for(var i = 0; i < 30; i++)
{
var j = i+1;
s_imageBackground_0[i] = new Image();
s_imageBackground_0[i].src = "image/background/background_"+j+".JPG";
}

var s_imageBricks_0 = new Array;
s_imageBricks_0[0] = new Image();
s_imageBricks_0[0].src = "image/wall.gif";
s_imageBricks_0[1] = new Image();
s_imageBricks_0[1].src = "image/steel.gif";
s_imageBricks_0[2] = new Image();
s_imageBricks_0[2].src = "image/sea.gif";
s_imageBricks_0[3] = new Image();
s_imageBricks_0[3].src = "image/itank.gif";
s_imageBricks_0[4] = new Image();
s_imageBricks_0[4].src = "image/podium.gif";
s_imageBricks_0[5] = new Image();
s_imageBricks_0[5].src = "image/win.jpg";


var s_sounds_1= new Array();
s_sounds_1[0] = new Audio('audio/clush.mp3');
s_sounds_1[0].volume = 0.6;
s_sounds_1[1] = new Audio('audio/colla.mp3');
s_sounds_1[1].volume = 0.6;
s_sounds_1[2] = new Audio('audio/win.mp3');
s_sounds_1[2].volume = 0.6;
s_sounds_1[3] = new Audio('audio/lose.mp3');
s_sounds_1[3].volume = 0.6;


var s_sounds_0= new Array();

s_sounds_0[0] = new Audio('audio/clush.mp3');
s_sounds_0[0].volume = 0.6;
s_sounds_0[1] = new Audio('audio/colla.mp3');
s_sounds_0[1].volume = 0.6;
s_sounds_0[2] = new Audio('audio/win.mp3');
s_sounds_0[2].volume = 0.6;
s_sounds_0[3] = new Audio('audio/lose.mp3');
s_sounds_0[3].volume = 0.6;

window.resourcesLoad = function(){
	var aWidth = $(window).width() + "px";
	var aHeight = $(window).height() + "px";
	
	l = 0;
	sum = 0;
	$("#mask").css({"width":aWidth, "height":aHeight,"position":"absolute","top":"0px", "left":"0px","z-index":"1000","filter":"alpha(opacity = 1","background":"#fff","opacity":1,"display":"block"});
	//资源加载
s_imageBang_1.onload=callBack;
s_imageBall_1.onload = callBack;
s_imageBang_0.onload = callBack;
s_imageBall_0.onload = callBack;
for(var i = 0; i < 6; i++)
s_imageBricks_1[i].onload = callBack;

for(var i = 0; i < 30; i++)
s_imageBackground_1[i].onload = callBack;

for(var i = 0; i < 30; i++)
s_imageBackground_0[i].onload = callBack;

for(var i = 0; i < 6; i++)
s_imageBricks_0[i].onload = callBack;
sum = l = 76;
	//图片加载回调函数
	function callBack(){
		l--;
		$("#loadBar").css("width",aWidth*(sum-l)/sum + "px");
		if(l == 0)
		{
          $('#mask').css({'position':'absolute', 'z-index':'3000', 'width':aWidth, 'height':aHeight, 'filter':'alpha(opacity=1)', 'opacity':1, 'top':0, 'left':0, 'background':'#CCC', 'display':'none'});  
          $('#loadContainer').remove();  
		}
	}
	
};

$(document).ready(resourcesLoad);
var s_map_0 = new Array();

/*s_map_1[10] =   [[1,1,1,1,1,1,1,1,1,5],
				[1,1,1,2,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1,1,1],
				[1,1,1,2,1,1,1,1,1,1],
				[1,1,1,1,1,1,2,1,1,1],
				[1,1,1,2,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1,1,1],
				[1,1,1,1,7,7,1,1,1,1],
				[4,1,1,7,7,7,7,1,1,1],
				[1,1,7,7,7,7,7,7,1,1]];*/
				
s_map_0[0]   =  [[7,7,7,7,7,7,7,7,7,7,7],
				[7,7,7,7,7,7,7,7,7,7,7],
				[7,7,7,7,1,7,7,7,7,7,7],
				[7,7,7,7,5,7,7,7,7,7,7],
				[7,7,7,7,7,7,7,7,7,7,7],
				[7,7,2,7,3,7,4,7,7,7,7],
				[1,7,1,7,1,7,1,7,1,7,7],
				[7,7,7,7,7,7,7,7,7,7,7],
				[7,7,7,7,7,7,7,7,7,7,7],
				[7,7,7,7,7,7,7,7,7,7,7]];
				
s_map_0[2] =	[[7,7,7,7,7,7,7,7,7,7,7],
				[7,7,7,7,7,7,7,7,7,7,7],
				[7,7,7,7,7,7,7,7,7,7,7],
				[7,7,1,1,1,1,1,1,7,7,7],
				[7,7,7,1,1,1,1,7,7,7,7],
				[2,2,2,2,2,2,2,2,2,2,7],
				[7,7,7,1,1,1,1,7,7,7,7],
				[7,7,1,1,1,1,1,1,7,7,7],
				[7,7,7,7,7,7,7,7,7,7,7],
				[7,7,7,7,7,7,7,7,7,7,7]];
				
s_map_0[3]  =	[[7,7,7,7,7,7,7,7,7,7,7],
				[7,7,7,7,7,7,7,7,7,7,7],
				[7,7,7,7,7,7,7,7,7,7,7],
				[7,7,7,7,7,7,7,7,7,7,7],
				[7,7,2,7,7,1,7,7,2,7,7],
				[2,1,1,1,2,1,2,1,1,1,2],
				[7,7,2,7,7,1,7,7,2,7,7],
				[7,7,7,7,7,7,7,7,7,7,7],
				[7,7,7,7,7,7,7,7,7,7,7],
				[7,7,7,7,7,7,7,7,7,7,7]];
				
s_map_0[1]  =	[[7,7,7,7,7,7,7,7,7,7,7],
				[7,7,7,7,7,7,7,7,7,7,7],
				[7,7,7,7,7,7,7,7,7,7,7],
				[7,7,7,7,7,7,7,7,7,7,7],
				[7,7,7,7,7,7,7,7,7,7,7],
				[7,7,2,1,1,1,1,1,2,7,7],
				[7,7,1,1,1,1,1,1,1,7,7],
				[7,7,2,1,1,1,1,1,2,7,7],
				[2,2,2,2,2,2,2,2,2,2,2],
				[7,7,7,7,7,7,7,7,7,7,7]];
				


s_map_0[4]  =	[[7,7,7,7,7,7,7,7,7,7,7],
				 [7,7,7,7,7,7,7,7,7,7,7],
				[7,1,7,7,7,7,7,7,1,7,7],
				[2,2,2,7,2,2,2,7,2,2,2],
				[7,7,7,1,1,1,1,1,7,7,7],
				[7,7,7,2,1,1,1,2,7,7,7],
				[7,7,7,7,7,1,7,7,7,7,7],
				[7,7,7,7,1,1,1,7,7,7,7],
				[7,7,7,1,1,1,1,1,7,7,7],
				[7,7,1,1,1,1,1,1,1,7,7]];
				
s_map_0[5]  =	[[7,7,7,7,7,7,7,7,7,7,7],
				[7,7,7,7,7,7,7,7,7,7,7],
				[7,7,7,7,7,7,7,7,7,7,7],
				[7,7,2,7,7,7,7,2,7,7,7],
				[7,7,2,1,1,1,1,2,7,7,7],
				[7,7,2,1,1,1,1,2,7,7,7],
				[7,7,2,2,2,2,2,2,7,7,7],
				[7,7,2,1,1,1,1,2,7,7,7],
				[7,7,2,1,1,1,1,2,7,7,7],
				[7,7,2,7,7,7,7,2,7,7,7]];

s_map_0[6]  =	[[7,7,7,7,7,7,7,7,7,7,7],
				[7,7,7,7,7,7,7,7,7,7,7],
				[7,7,7,7,7,7,7,7,7,7,7],
				[7,7,7,7,7,7,7,7,7,7,7],
				[7,7,7,1,1,1,1,1,7,7,7],
				[7,7,1,1,1,1,1,1,1,7,7],
				[7,2,1,1,1,1,1,1,1,2,7],
				[7,7,2,1,1,1,1,1,2,7,7],
				[7,7,7,2,1,1,1,2,7,7,7],
				[7,7,7,7,2,1,2,7,7,7,7]];

s_map_0[7]  =	[
				[7,7,7,7,7,7,7,7,7,7,7],
				[7,2,1,1,1,7,1,1,1,2,7],
				[7,2,7,7,7,1,7,7,7,2,7],
				[7,2,7,7,7,1,7,7,7,2,7],
				[7,2,7,7,1,7,1,7,7,2,7],
				[7,2,2,2,7,7,7,2,2,2,7],
				[7,2,7,7,1,7,1,7,7,2,7],
				[7,2,7,7,7,1,7,7,7,2,7],
				[7,2,7,7,7,1,7,7,7,2,7],
				[7,2,1,1,1,7,1,1,1,2,7]];


s_map_0[8]  =	[[7,7,7,7,7,7,7,7,7,7,7],
				[7,7,7,7,7,7,7,7,7,7,7],
				[7,7,7,7,7,7,7,7,7,7,7],
				[7,2,2,2,2,2,7,7,7,1,7],
				[7,7,7,7,7,2,7,7,7,1,7],
				[7,7,7,7,7,2,7,7,7,1,7],
				[7,1,1,1,1,2,1,1,1,1,7],
				[7,1,7,7,7,2,7,7,7,7,7],
				[7,1,7,7,7,2,7,7,7,7,7],
				[7,1,7,7,7,2,2,2,2,2,7]];
				
var s_map_1= new Array();

s_map_1[2] =   [[7,7,7,7,7,7,7,7,7,7,7],
				[7,7,7,7,7,7,7,7,7,7,7],
				[7,7,7,7,7,7,7,1,7,7,7],
				[7,7,2,1,1,2,1,5,7,0,0],
				[7,7,1,1,2,1,1,1,7,7,0],
				[7,7,1,2,1,3,3,1,7,0,0],
				[7,0,4,1,1,1,1,2,0,7,0],
				[7,0,7,7,7,7,7,1,7,0,0],
				[1,7,1,7,7,1,7,7,7,0,0],
				[1,0,0,0,0,0,0,0,0,0,1]];

s_map_1[4] =    [[7,7,7,7,7,7,7,7,7,7,7],
				[7,7,7,7,7,7,7,7,7,7,7],
				[7,7,7,7,7,7,7,7,7,7,7],
				[7,1,1,1,1,1,1,1,1,1,7],
				[7,1,1,2,1,1,2,1,1,1,7],
				[7,1,3,1,1,1,5,2,1,1,7],
				[0,3,1,1,1,1,2,1,1,1,7],
				[0,4,1,2,1,1,1,1,1,1,7],
				[7,7,7,7,7,7,7,7,7,7,7],
				[7,7,7,7,7,7,7,7,7,7,7]];
				
s_map_1[1] =   [[7,7,7,7,7,7,7,7,7,7,7],
				[7,7,7,7,7,7,7,7,7,7,7],
				[7,7,7,7,7,7,7,7,7,7,7],
				[7,7,7,7,7,7,7,7,7,7,7],
				[7,7,1,1,1,1,2,1,7,7,7],
				[2,2,2,2,1,1,5,2,7,7,7],
				[7,7,4,1,1,1,2,1,7,7,7],
				[7,7,7,7,7,7,7,7,7,7,7],
				[7,7,7,7,7,7,7,7,7,7,7],
				[7,7,7,7,7,7,7,7,7,7,7]];
				
s_map_1[3] =   [[7,7,7,7,7,7,7,7,7,7,7],
				[7,7,7,7,7,7,7,7,7,7,7],
				[7,0,0,0,7,7,7,7,0,7,7],
				[7,0,2,1,1,1,1,2,7,7,7],
				[7,0,1,1,1,1,1,3,7,7,7],
				[7,0,2,1,1,3,5,1,0,7,7],
				[7,0,4,2,1,1,1,3,0,7,7],
				[7,0,7,0,7,0,7,7,0,7,7],
				[7,7,7,7,7,7,7,7,7,7,7],
				[7,7,7,7,7,7,7,7,7,7,7]];

s_map_1[0] = 	[[7,7,7,7,7,7,7,7,7,7,7],
				[7,7,7,7,7,7,7,7,7,7,7],
				[7,7,1,1,1,1,1,1,7,7,7],
				[7,7,1,1,1,0,1,2,7,7,7],
				[7,7,1,1,0,1,0,5,7,7,7],
				[7,7,4,1,1,0,1,2,7,7,7],
				[7,7,1,1,1,1,1,1,7,7,7],
				[7,7,7,7,7,7,7,7,7,7,7],
				[7,7,7,7,7,7,7,7,7,7,7],
				[7,7,7,7,7,7,7,7,7,7,7]];

	

//////////////////界面交互函数////////////////////////////
var u_mode=0;
var u_level=1;
var u_balls=2;
$("#classicmode").click(function () {
  u_mode = 0;
  $($("li")[0]).css("display","none");
  $($("li")[6]).css("display","block");
});
$("#crazymode").click(function () {
  u_mode = 1;
  $($("li")[0]).css("display","none");
  $($("li")[7]).css("display","block");
});
	$($(".level0")[0]).click(function() {
	  u_level=1;
	  $($("li")[6]).css("display","none");
	  $($("li")[1]).css("display","block");
	  $("#levelname")[0].innerText="Level"+(u_level);
	  $("#ballsleft")[0].innerText="Ball:"+(u_balls);
	  u_canvas=document.getElementById('ctx');
	  u_ctx=u_canvas.getContext('2d');
	  u_width = u_canvas.width;
	  u_height = u_canvas.height;
	   u_gameStart = window.clearInterval(u_gameStart);
  u_gameTimer = window.clearInterval(u_gameTimer);
	  w_start();  
	});
	$($(".level0")[1]).click(function() {
	  u_level=2;
	  $($("li")[6]).css("display","none");
	  $($("li")[1]).css("display","block");
	  $("#levelname")[0].innerText="Level"+(u_level);
	  $("#ballsleft")[0].innerText="Ball:"+(u_balls);
	  u_canvas=document.getElementById('ctx');
	  u_ctx=u_canvas.getContext('2d');
	  u_width = u_canvas.width;
	  u_height = u_canvas.height;
	   u_gameStart = window.clearInterval(u_gameStart);
  u_gameTimer = window.clearInterval(u_gameTimer);
	  w_start();
	  
	});
	$($(".level0")[2]).click(function() {
	  u_level=3;
	  $($("li")[6]).css("display","none");
	  $($("li")[1]).css("display","block");
	  $("#levelname")[0].innerText="Level"+(u_level);
	  $("#ballsleft")[0].innerText="Ball:"+(u_balls);
	  u_canvas=document.getElementById('ctx');
	  u_ctx=u_canvas.getContext('2d');
	  u_width = u_canvas.width;
	  u_height = u_canvas.height;
	   u_gameStart = window.clearInterval(u_gameStart);
  u_gameTimer = window.clearInterval(u_gameTimer);
	  w_start();
	  
	});
	$($(".level0")[3]).click(function() {
	  u_level=4;
	  $($("li")[6]).css("display","none");
	  $($("li")[1]).css("display","block");
	  $("#levelname")[0].innerText="Level"+(u_level);
	  $("#ballsleft")[0].innerText="Ball:"+(u_balls);
	  u_canvas=document.getElementById('ctx');
	  u_ctx=u_canvas.getContext('2d');
	  u_width = u_canvas.width;
	  u_height = u_canvas.height;
	   u_gameStart = window.clearInterval(u_gameStart);
  u_gameTimer = window.clearInterval(u_gameTimer);
	  w_start();
	  
	});
	$($(".level0")[4]).click(function() {
	  u_level=5;
	  $($("li")[6]).css("display","none");
	  $($("li")[1]).css("display","block");
	  $("#levelname")[0].innerText="Level"+(u_level);
	  $("#ballsleft")[0].innerText="Ball:"+(u_balls);
	  u_canvas=document.getElementById('ctx');
	  u_ctx=u_canvas.getContext('2d');
	  u_width = u_canvas.width;
	  u_height = u_canvas.height;
	   u_gameStart = window.clearInterval(u_gameStart);
  u_gameTimer = window.clearInterval(u_gameTimer);
	  w_start();
	  
	});
	$($(".level0")[5]).click(function() {
	  u_level=6;
	  $($("li")[6]).css("display","none");
	  $($("li")[1]).css("display","block");
	  $("#levelname")[0].innerText="Level"+(u_level);
	  $("#ballsleft")[0].innerText="Ball:"+(u_balls);
	  u_canvas=document.getElementById('ctx');
	  u_ctx=u_canvas.getContext('2d');
	  u_width = u_canvas.width;
	  u_height = u_canvas.height;
	   u_gameStart = window.clearInterval(u_gameStart);
  u_gameTimer = window.clearInterval(u_gameTimer);
	  w_start();
	  
	});
	$($(".level0")[6]).click(function() {
	  u_level=7;
	  $($("li")[6]).css("display","none");
	  $($("li")[1]).css("display","block");
	  $("#levelname")[0].innerText="Level"+(u_level);
	  $("#ballsleft")[0].innerText="Ball:"+(u_balls);
	  u_canvas=document.getElementById('ctx');
	  u_ctx=u_canvas.getContext('2d');
	  u_width = u_canvas.width;
	  u_height = u_canvas.height;
	   u_gameStart = window.clearInterval(u_gameStart);
  u_gameTimer = window.clearInterval(u_gameTimer);
	  w_start();
	  
	});
	$($(".level0")[7]).click(function() {
	  u_level=8;
	  $($("li")[6]).css("display","none");
	  $($("li")[1]).css("display","block");
	  $("#levelname")[0].innerText="Level"+(u_level);
	  $("#ballsleft")[0].innerText="Ball:"+(u_balls);
	  u_canvas=document.getElementById('ctx');
	  u_ctx=u_canvas.getContext('2d');
	  u_width = u_canvas.width;
	  u_height = u_canvas.height;
	   u_gameStart = window.clearInterval(u_gameStart);
  u_gameTimer = window.clearInterval(u_gameTimer);
	  w_start();
	  
	});
	$($(".level0")[8]).click(function() {
	  u_level=9;
	  $($("li")[6]).css("display","none");
	  $($("li")[1]).css("display","block");
	  $("#levelname")[0].innerText="Level"+(u_level);
	  $("#ballsleft")[0].innerText="Ball:"+(u_balls);
	  u_canvas=document.getElementById('ctx');
	  u_ctx=u_canvas.getContext('2d');
	  u_width = u_canvas.width;
	  u_height = u_canvas.height;
	   u_gameStart = window.clearInterval(u_gameStart);
  u_gameTimer = window.clearInterval(u_gameTimer);
	  w_start();
	  
	});
	$($(".level0")[9]).click(function() {
	  u_level=10;
	  $($("li")[6]).css("display","none");
	  $($("li")[1]).css("display","block");
	  $("#levelname")[0].innerText="Level"+(u_level);
	  $("#ballsleft")[0].innerText="Ball:"+(u_balls);
	  u_canvas=document.getElementById('ctx');
	  u_ctx=u_canvas.getContext('2d');
	  u_width = u_canvas.width;
	  u_height = u_canvas.height;
	   u_gameStart = window.clearInterval(u_gameStart);
  u_gameTimer = window.clearInterval(u_gameTimer);
	  w_start();
	  
	});
	$($(".level1")[0]).click(function () {
	  u_level=1;
	  $($("li")[7]).css("display","none");
	  $($("li")[1]).css("display","block");
	  $("#levelname")[0].innerText="Level"+(u_level);
	  $("#ballsleft")[0].innerText="Ball:"+(u_balls);
	  u_canvas=document.getElementById('ctx');
	  u_ctx=u_canvas.getContext('2d');
	  u_width = u_canvas.width;
	  u_height = u_canvas.height;
	   u_gameStart = window.clearInterval(u_gameStart);
  u_gameTimer = window.clearInterval(u_gameTimer);
	  w_start();
	});
	$($(".level1")[1]).click(function () {
	  u_level=2;
	  $($("li")[7]).css("display","none");
	  $($("li")[1]).css("display","block");
	  $("#levelname")[0].innerText="Level"+(u_level);
	  $("#ballsleft")[0].innerText="Ball:"+(u_balls);
	  u_canvas=document.getElementById('ctx');
	  u_ctx=u_canvas.getContext('2d');
	  u_width = u_canvas.width;
	  u_height = u_canvas.height;
	   u_gameStart = window.clearInterval(u_gameStart);
  u_gameTimer = window.clearInterval(u_gameTimer);
	  w_start();
	});
	$($(".level1")[2]).click(function () {
	  u_level=3;
	  $($("li")[7]).css("display","none");
	  $($("li")[1]).css("display","block");
	  $("#levelname")[0].innerText="Level"+(u_level);
	  $("#ballsleft")[0].innerText="Ball:"+(u_balls);
	  u_canvas=document.getElementById('ctx');
	  u_ctx=u_canvas.getContext('2d');
	  u_width = u_canvas.width;
	  u_height = u_canvas.height;
	   u_gameStart = window.clearInterval(u_gameStart);
  u_gameTimer = window.clearInterval(u_gameTimer);
	  w_start();
	});
	$($(".level1")[3]).click(function () {
	  u_level=4;
	  $($("li")[7]).css("display","none");
	  $($("li")[1]).css("display","block");
	  $("#levelname")[0].innerText="Level"+(u_level);
	  $("#ballsleft")[0].innerText="Ball:"+(u_balls);
	  u_canvas=document.getElementById('ctx');
	  u_ctx=u_canvas.getContext('2d');
	  u_width = u_canvas.width;
	  u_height = u_canvas.height;
	   u_gameStart = window.clearInterval(u_gameStart);
  u_gameTimer = window.clearInterval(u_gameTimer);
	  w_start();
	});
	$($(".level1")[4]).click(function () {
	  u_level=5;
	  $($("li")[7]).css("display","none");
	  $($("li")[1]).css("display","block");
	  $("#levelname")[0].innerText="Level"+(u_level);
	  $("#ballsleft")[0].innerText="Ball:"+(u_balls);
	  u_canvas=document.getElementById('ctx');
	  u_ctx=u_canvas.getContext('2d');
	  u_width = u_canvas.width;
	  u_height = u_canvas.height;
	   u_gameStart = window.clearInterval(u_gameStart);
  u_gameTimer = window.clearInterval(u_gameTimer);
	  w_start();
	});
$("#helpbutton").click(function(){
  $($("li")[0]).css("display","none");
  $($("li")[4]).css("display","block");
});
$(".mainmenu").click(function(){
  $($("li")[2]).css("display","none");
  $($("li")[3]).css("display","none");
  $($("li")[0]).css("display","block");
  u_level=1;
  u_balls=2;
});
$("#back").click(function(){
  $($("li")[4]).css("display","none");
  //$($("li")[3]).css("display","none");
  $($("li")[0]).css("display","block");
  u_level=1;
  u_balls=2;
});
$($(".littlebutton")[0]).click(function(){
  u_gameStart = window.clearInterval(u_gameStart);
  u_gameTimer = window.clearInterval(u_gameTimer);
  $($("li")[1]).css("display","none");
  $($("li")[0]).css("display","block");
  u_level=1;
  u_balls=2;
  
});
$("#nextlevel").click(function(){
    $($("li")[2]).css("display","none");
    $($("li")[1]).css("display", "block");
	u_level++;
    $("#levelname")[0].innerText = "Level" + (u_level);
    $("#ballsleft")[0].innerText = "Ball:" + (u_balls);
	
	u_balls=2;
    w_start();
});
$("#retry").click(function(){
	u_level=1;
	u_balls=2;
    $($("li")[3]).css("display","none");
    $($("li")[1]).css("display", "block");
    $("#levelname")[0].innerText = "Level" +(u_level);
    $("#ballsleft")[0].innerText = "Ball:" + (u_balls);
    w_start();
  });
$(".littleicon").click(function(){
  if (u_soundOn == true)
  {
    $("audio")[0].pause();
    u_soundOn=false;
    $($(".littleicon")[0].children[0]).attr("src","image/7.png");
    $($(".littleicon")[1].children[0]).attr("src","image/7.png");
  }
  else
  {
    u_soundOn=true;
    $("audio")[0].play();
    $($(".littleicon")[0].children[0]).attr("src","image/6.png");
    $($(".littleicon")[1].children[0]).attr("src","image/6.png");
  }
})