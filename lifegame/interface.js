var life_game = new lifegame();

window.onload=function(){
		life_game.Initial(40,40);
		var cells = document.getElementById("grids");
		for(var i=0; i<(life_game.h_cells*life_game.w_cells); i++){
			var para=document.createElement("div");			
			para.id=i.toString();
			para.className="cell dead";
			para.onclick = Reverse;
			cells.appendChild(para);
			}
	}
	
function Random(){
		life_game.End();
		life_game.Random();
		Refresh();
	
	}
	
function Refresh(){
		var cells_div=document.getElementsByClassName("cell");
		for(var i=0; i<life_game.h_cells; i++)
			for(var j=0; j<life_game.w_cells; j++)
				cells_div[i*life_game.w_cells+j].className=life_game.cells[i][j]==1?"cell live":"cell dead";
	}

function Reverse(){
		if(this.className.match("live") != null)
			this.className="cell dead";
		else
			this.className="cell live";
		var i=parseInt(parseInt(this.id)/life_game.w_cells);
		var j=parseInt(parseInt(this.id)%life_game.w_cells);
		life_game.cells[i][j] = life_game.cells[i][j]==0?1:0;
	}
	
function AllDead(){
		life_game.End();
		life_game.AllDead();
		Refresh();
	}
	
function AllLive(){
		life_game.End();
		life_game.AllLive();
		Refresh();
	}
	
function Begin(){
		if(life_game.sign == 0)
		{
			life_game.FirstStep();
			Refresh();		
			life_game.t = setInterval("life_game.Steps();Refresh();if(life_game.sign == 0) clearInterval(life_game.t);",life_game.speed);
		}
		else
		{
			life_game.End();
		}
	}

function ChangeSpeed(event){
		life_game.speed = parseInt(event.value);
		if(life_game.sign == 1)
		{
			clearInterval(life_game.t);
			life_game.t = setInterval("life_game.Steps();Refresh();if(life_game.sign == 0) clearInterval(life_game.t);",life_game.speed);
		}
		
	}