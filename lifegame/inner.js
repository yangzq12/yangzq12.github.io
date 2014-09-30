/*
作者：杨志强 董亮

功能：定义了“生命游戏”对象的构造函数
*/
function lifegame(){
	this.w_cells = null;  //长度上的细胞个数
	this.h_cells = null;  //宽度上的细胞个数
	this.cells = null;   //细胞状态数组
	this.speed = null;   //细胞生长速度
	this.sign = null;	//标志生命游戏开始或停止状态,1开始，0停止
	this.step_a = null; //作为细胞状态描述的辅助状态数组，方便细胞生长一次的计算
	this.step_b = null;	//同上
	this.t = null;     //细胞循坏生长的时间因子
	//初始化细胞生命对象
	this.Initial = function(heigth,width){
				if(width != null && heigth != null && width >= 1 && heigth >=1)//提供更改高、宽的接口，作为扩展
				{
					this.h_cells = parseInt(heigth);
					this.w_cells = parseInt(width);
				}
				else
				{
				this.w_cells = 40; //初始化时默认为40*40；
				this.h_cells = 40;
				}
				this.cells = new Array(this.h_cells);
				this.speed = 1000;
				this.sign = 0;
				this.step_a=null;
				this.step_b=null;
				
				for(var i = 0; i < this.h_cells; i++)
					{
						this.cells[i] = new Array(this.w_cells);
						for(var j = 0; j < this.w_cells; j++)
							this.cells[i][j] = 0;//初始化全为死亡
					}
				return true;
			     }
	//将细胞生命对象置放于一个随机的状态
	this.Random = function(){
				if(this.h_cells == null|| this.w_cells == null)
					return false;
				for(var i=0; i < this.h_cells;i++)
					for(var j=0; j < this.w_cells;j++)
					{
						this.cells[i][j] = Math.random()<0.5?0:1;		
							//0表示细胞死亡,1表示细胞生存
					}
				return true;
				}
	//反转某个细胞的生命状态			
	this.Reverse = function(row, line){
				if(row < 0 || row > this.w_cells-1 || line < 0 || line > this.h_cells-1)
					return false;
				if(this.cells[row][line] == null)
					return false;
				if(this.cells[row][line] == 0)
					this.cells[row][line] = 1;
				else
					this.cells[row][line] = 0;
				return true;
				}
	//将所有细胞致死
	this.AllDead = function(){
				for(var i = 0; i < this.w_cells; i++)
					for( var j = 0; j < this.h_cells; j++)
						this.cells[i][j] = 0;
				return true;
				}
	//将所有细胞复活
	this.AllLive = function(){
				for(var i = 0; i < this.w_cells; i++)
					for( var j = 0; j < this.h_cells; j++)
						this.cells[i][j] = 1;
				return true;
				}
	
	//模仿细胞进化的过程，包括FirstStep和后续的Steps
	//细胞表格cells和细胞周围状态表格this.temp_a和this.temp_b
	//第一遍遍历cells刷新this.temp_a和_this.temp_b
	//之后通过this.temp_a的改变刷新cells，并通过cells的改变再次刷新this.temp_b，复制到this.temp_a，重复过程。
	this.FirstStep = function(){
				
				this.sign = 1;
				
				//this.temp_a和this.temp_b用来交替保存单个细胞周围活细胞数
				this.temp_a = new Array(this.h_cells);
				for(var i = 0; i < this.h_cells; i++){
					this.temp_a[i]  = new Array(this.w_cells);
					for(var j = 0; j < this.w_cells; j++)
						this.temp_a[i][j] = 0;
				}
				
				this.temp_b = new Array(this.h_cells);
				for(var i = 0; i < this.h_cells; i++){
					this.temp_b[i]  = new Array(this.w_cells);
					for(var j = 0; j < this.w_cells; j++)
						this.temp_b[i][j] = 0;
				}
				
				//第一次遍历cells
				for(var i = 0; i < this.h_cells; i++ )
					for(var j = 0; j < this.w_cells; j++){
						if(this.cells[i][j]){
							this.temp_a[(i+this.h_cells-1)%this.h_cells][(j+this.w_cells-1)%this.w_cells]++;
							this.temp_a[(i+this.h_cells-1)%this.h_cells][(j+this.w_cells)%this.w_cells]++;
							this.temp_a[(i+this.h_cells-1)%this.h_cells][(j+this.w_cells+1)%this.w_cells]++;
							this.temp_a[(i+this.h_cells)%this.h_cells][(j+this.w_cells-1)%this.w_cells]++;
							this.temp_a[(i+this.h_cells)%this.h_cells][(j+this.w_cells+1)%this.w_cells]++;
							this.temp_a[(i+this.h_cells+1)%this.h_cells][(j+this.w_cells-1)%this.w_cells]++;
							this.temp_a[(i+this.h_cells+1)%this.h_cells][(j+this.w_cells)%this.w_cells]++;
							this.temp_a[(i+this.h_cells+1)%this.h_cells][(j+this.w_cells+1)%this.w_cells]++;
							
						}
					}
				
				//复制到this.temp_b	
				for(var i = 0; i < this.h_cells; i++ )
					for(var j = 0; j < this.w_cells; j++)
						this.temp_b[i][j] = this.temp_a[i][j];
						
							
				//每隔speed ms循环执行刷新
				
				this.Steps()
					
				return true;				
			}
		
	this.Steps = function(){
			//遍历this.temp_a刷新cells
					if(this.sign == 0)
					{
						clearInterval(this.t);	
						return;
						}
						
					for(var i = 0; i < this.h_cells; i++ )
						for(var j = 0; j < this.w_cells; j++){
							if(this.cells[i][j]){
								if(!(this.temp_a[i][j] == 2 || this.temp_a[i][j] == 3)){
									this.cells[i][j] = 0;
									this.temp_b[(i+this.h_cells-1)%this.h_cells][(j+this.w_cells-1)%this.w_cells]--;
									this.temp_b[(i+this.h_cells-1)%this.h_cells][(j+this.w_cells)%this.w_cells]--;
									this.temp_b[(i+this.h_cells-1)%this.h_cells][(j+this.w_cells+1)%this.w_cells]--;
									this.temp_b[(i+this.h_cells)%this.h_cells][(j+this.w_cells-1)%this.w_cells]--;
									this.temp_b[(i+this.h_cells)%this.h_cells][(j+this.w_cells+1)%this.w_cells]--;
									this.temp_b[(i+this.h_cells+1)%this.h_cells][(j+this.w_cells-1)%this.w_cells]--;
									this.temp_b[(i+this.h_cells+1)%this.h_cells][(j+this.w_cells)%this.w_cells]--;
									this.temp_b[(i+this.h_cells+1)%this.h_cells][(j+this.w_cells+1)%this.w_cells]--;
								}
							}
							else{
								if(this.temp_a[i][j] == 3){
									this.cells[i][j] = 1;
									this.temp_b[(i+this.h_cells-1)%this.h_cells][(j+this.w_cells-1)%this.w_cells]++;
									this.temp_b[(i+this.h_cells-1)%this.h_cells][(j+this.w_cells)%this.w_cells]++;
									this.temp_b[(i+this.h_cells-1)%this.h_cells][(j+this.w_cells+1)%this.w_cells]++;
									this.temp_b[(i+this.h_cells)%this.h_cells][(j+this.w_cells-1)%this.w_cells]++;
									this.temp_b[(i+this.h_cells)%this.h_cells][(j+this.w_cells+1)%this.w_cells]++;
									this.temp_b[(i+this.h_cells+1)%this.h_cells][(j+this.w_cells-1)%this.w_cells]++;
									this.temp_b[(i+this.h_cells+1)%this.h_cells][(j+this.w_cells)%this.w_cells]++;
									this.temp_b[(i+this.h_cells+1)%this.h_cells][(j+this.w_cells+1)%this.w_cells]++;
								}
							}
						}
				
					
					
					var flag = false;
					for(var i = 0; i < this.h_cells; i++ )
					{
						for(var j = 0; j < this.w_cells; j++){
								if(this.temp_a[i][j] != this.temp_b[i][j])
								{
									flag = true;
									break;
								}
						}
						if(flag == true)
							break;
					}
					if(flag == false)
						this.sign = 0;
					
						
					//复制this.temp_b到this.temp_a	
					for(var i = 0; i < this.h_cells; i++ )
						for(var j = 0; j < this.w_cells; j++){
								this.temp_a[i][j] = this.temp_b[i][j];
						}
					
					
		}
		
	
	//停止细胞演化过程
	this.End = function(){
			this.sign = 0;
			return true;
		}
		
	
}

