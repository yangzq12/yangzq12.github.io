/*
���ߣ���־ǿ ����

���ܣ������ˡ�������Ϸ������Ĺ��캯��
*/
function lifegame(){
	this.w_cells = null;  //�����ϵ�ϸ������
	this.h_cells = null;  //����ϵ�ϸ������
	this.cells = null;   //ϸ��״̬����
	this.speed = null;   //ϸ�������ٶ�
	this.sign = null;	//��־������Ϸ��ʼ��ֹͣ״̬,1��ʼ��0ֹͣ
	this.step_a = null; //��Ϊϸ��״̬�����ĸ���״̬���飬����ϸ������һ�εļ���
	this.step_b = null;	//ͬ��
	this.t = null;     //ϸ��ѭ��������ʱ������
	//��ʼ��ϸ����������
	this.Initial = function(heigth,width){
				if(width != null && heigth != null && width >= 1 && heigth >=1)//�ṩ���ĸߡ���Ľӿڣ���Ϊ��չ
				{
					this.h_cells = parseInt(heigth);
					this.w_cells = parseInt(width);
				}
				else
				{
				this.w_cells = 40; //��ʼ��ʱĬ��Ϊ40*40��
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
							this.cells[i][j] = 0;//��ʼ��ȫΪ����
					}
				return true;
			     }
	//��ϸ�����������÷���һ�������״̬
	this.Random = function(){
				if(this.h_cells == null|| this.w_cells == null)
					return false;
				for(var i=0; i < this.h_cells;i++)
					for(var j=0; j < this.w_cells;j++)
					{
						this.cells[i][j] = Math.random()<0.5?0:1;		
							//0��ʾϸ������,1��ʾϸ������
					}
				return true;
				}
	//��תĳ��ϸ��������״̬			
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
	//������ϸ������
	this.AllDead = function(){
				for(var i = 0; i < this.w_cells; i++)
					for( var j = 0; j < this.h_cells; j++)
						this.cells[i][j] = 0;
				return true;
				}
	//������ϸ������
	this.AllLive = function(){
				for(var i = 0; i < this.w_cells; i++)
					for( var j = 0; j < this.h_cells; j++)
						this.cells[i][j] = 1;
				return true;
				}
	
	//ģ��ϸ�������Ĺ��̣�����FirstStep�ͺ�����Steps
	//ϸ�����cells��ϸ����Χ״̬���this.temp_a��this.temp_b
	//��һ�����cellsˢ��this.temp_a��_this.temp_b
	//֮��ͨ��this.temp_a�ĸı�ˢ��cells����ͨ��cells�ĸı��ٴ�ˢ��this.temp_b�����Ƶ�this.temp_a���ظ����̡�
	this.FirstStep = function(){
				
				this.sign = 1;
				
				//this.temp_a��this.temp_b�������汣�浥��ϸ����Χ��ϸ����
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
				
				//��һ�α���cells
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
				
				//���Ƶ�this.temp_b	
				for(var i = 0; i < this.h_cells; i++ )
					for(var j = 0; j < this.w_cells; j++)
						this.temp_b[i][j] = this.temp_a[i][j];
						
							
				//ÿ��speed msѭ��ִ��ˢ��
				
				this.Steps()
					
				return true;				
			}
		
	this.Steps = function(){
			//����this.temp_aˢ��cells
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
					
						
					//����this.temp_b��this.temp_a	
					for(var i = 0; i < this.h_cells; i++ )
						for(var j = 0; j < this.w_cells; j++){
								this.temp_a[i][j] = this.temp_b[i][j];
						}
					
					
		}
		
	
	//ֹͣϸ���ݻ�����
	this.End = function(){
			this.sign = 0;
			return true;
		}
		
	
}

