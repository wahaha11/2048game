var score;
var best;
var Array2048 = new Array();
	for(var i=0; i<4; i++)
	{
		Array2048[i] = new Array();
		for(var j=0; j<4; j++)
			Array2048[i][j] = 0;
	}
function getRandom(n){
        return parseInt(n*Math.random());
        }
function getOther(x1,x2){
	if(x1==x2){
		if(x1==3){
			x2=x1-1;
		}else{
			x2=x1+1;
		}
	}
	return x2;
}
function changeBackground(a,b){
	var cellid="cellno"+a+b; 
	var obj = document.getElementById(cellid);
	var val = obj.innerHTML;
	var cls = "rowcell bak" + val;
	obj.className = cls;
}

$(document).ready(function(){
	var x1 = getRandom(4);//0-4但不包含4
	var y1 = getRandom(4);
	var x2 = getRandom(4);
	var y2 = getRandom(4);//随机生成了坐标点
	var x2 = getOther(x1,x2);
	var y2 = getOther(y1,y2);
	Array2048[x1][y1] = (getRandom(2)+1)*2;//随机生成2或者4
	Array2048[x2][y2] = 2;//随机生成2或者4
	//alert(Array2048[x1][y1]);
	//alert(typeof(Array2048[x1][y1]));
	//将坐标点对应的方块设置数字和颜色
	//x1 = x1+1;
	//alert(typeof(x1));
	//y1 = y1+1;
	var cellid = "#cellno"+(x1+1)+(y1+1);//如果把x1+1单独写，在下面33行那里就是x1其实就是x1+1=4,但数组没有4;function idxToId(x){return x+1;}或者换个变量名 在上面可以a=x+1；
	$(cellid).html(Array2048[x1][y1]);
	changeBackground(x1+1, y1+1);

	//alert(typeof"$(cellid).html(Array2048[x1][y1])");这样加了”“肯定都是String类型啊
	cellid = "#cellno"+(x2+1)+(y2+1);
	$(cellid).html(Array2048[x2][y2]);
	changeBackground(x2+1,y2+1);
	
});
function getTwo(){//先是发现忘记坐标加1，后发现getRandom方法出错
	var x=getRandom(4);
	var y=getRandom(4);
	var cellno = "#cellno"+(x+1)+(y+1);
	if(Array2048[x][y] == 0){
		Array2048[x][y] = 2;//	这里只是给界面显示赋值了，忘记给数组赋值，这样遍历的时候就会出问题。
		$(cellno).html(2);	
		changeBackground(x+1,y+1);
	}else{
		for(var i=0; i<4; i++)
		{
			for(var j=0; j<4; j++){
				if(Array2048[i][j] == 0){
					Array2048[i][j] = 2;
					var cellno1="#cellno"+(i+1)+(j+1);
					$(cellno1).html(2);	
					changeBackground(i+1,j+1);
					return;//双重循环这里用break只能退出一层循环。这里一层循环产生4个数，但是我只需要一个数，所以需要中断。
				}
			}
		}	
	}	
}
function getArrayZero(){
	var zero=0;
	for(var i=0; i<4; i++)
	{
		for(var j=0; j<4; j++){
			if(Array2048[i][j] == 0){
				zero++;
			};
			}
	}
	return zero;
}
function rand_block(){
	var x,y;
	var zero=getArrayZero();
	if(zero==0){
		alert("满了");
		return 0;
	}
}
 function changeCell(x,y){
 	var cellno ="#cellno"+(x+1)+(y+1);
 	$(cellno).html(Array2048[x][y]);
 	changeBackground(x+1,y+1);
 }
function hideCell(x,y){
	var cellno ="#cellno"+(x+1)+(y+1);
	//changeBackground(x+1,y+1);
	var n = $(cellno).html();	
	var cls = "bak"+n;
	$(cellno).removeClass(cls);
	$(cellno).html("");
	//$(cellno).css("background", "rgba(238,228,218,0.35)");
}

$(document).keydown(function(event){ 
if(event.keyCode==38)
{
	for(var j=0;j<4;j++){
		while(1){
			for(var i=1;i<4;i++){
				if(Array2048[i][j]!=0){
					if(Array2048[i-1][j]==0){
						Array2048[i-1][j]=Array2048[i][j];
						changeCell(i-1,j);
						Array2048[i][j]=0;
						hideCell(i,j);
					}else
					{
						if(Array2048[i-1][j]==Array2048[i][j])
						{
							Array2048[i-1][j]=Array2048[i][j]*2;
							Array2048[i][j]=0;
							changeCell(i-1,j);
							hideCell(i,j);
						}
					}
				}
			}
			if(Array2048[0][j]==0&&(Array2048[1][j]!=0 ||Array2048[2][j]!=0 || Array2048[3][j]!=0))
			{

			}else{
				if(Array2048[0][j]!=0 &&(Array2048[0][j]==Array2048[1][j]))
				{

				}else
					break;
			}
		}
		rand_block();
	}
	console.log("up");
	getTwo();
}else if(event.keyCode==39)
{
	
	toRight();
	//console.log("right");
	getTwo();
}else if(event.keyCode==40)
{
	toDown();
	console.log("down");
	getTwo();
}else if(event.keyCode==37)
{
	toLeft();
	console.log("left");
	getTwo();
}
});
function toDown()
{
	for(var j=0;j<4;j++)
	{
		for(var i=3;i>=0;i--)//移动
		{
			if(Array2048[i][j]==0)
			{
				for(var k=i-1;k>=0;k--)
				{
					if(Array2048[k][j]!=0)
					{
						Array2048[i][j]=Array2048[k][j];
						Array2048[k][j]=0;
						changeCell(i,j);
						hideCell(k,j);
						break;
					}
				}
			}
		}
		for(var i=3;i>0;i--)//add
		{
			if(Array2048[i][j]!=0)
			{
				if(Array2048[i][j]==Array2048[i-1][j])
				{
					Array2048[i-1][j]=Array2048[i][j]*2;
					Array2048[i][j]=0;
					changeCell((i-1),j);
					hideCell(i,j);
					break;
				}
			}
		}
		for(var i=3;i>=0;i--)//移动
		{
			if(Array2048[i][j]==0)
			{
				for(var k=i-1;k>=0;k--)
				{
					if(Array2048[k][j]!=0)
					{
						Array2048[i][j]=Array2048[k][j];
						Array2048[k][j]=0;
						changeCell(i,j);
						hideCell(k,j);
						break;
					}
				}
			}
		}
	}
	rand_block();
}
function toRight()
{
	for(var i=0;i<4;i++)
	{
		for(var j=3;j>=0;j--)//移动
		{
			if(Array2048[i][j]==0)
			{
				for(var k=j-1;k>=0;k--)
				{
					if(Array2048[i][k]!=0)
					{
						Array2048[i][j]=Array2048[i][k];
						changeCell(i,j);
						Array2048[i][k]=0;
						hideCell(i,k);
						break;
					}
			    }
			}
		}
		for(var j=3;j>0;j--)//相加,开始相加的时候如果出现三个相同的数，222，会是头两个2相加，但是
							//游戏规则是后两个，这样就是让for循环从后面开始，倒过来查询。笨
		{
			if(Array2048[i][j]!=0)
			{
				if(Array2048[i][j]==Array2048[i][j-1])
				{
					Array2048[i][j-1]=Array2048[i][j]*2;
					changeCell(i,(j-1));
					Array2048[i][j]=0;
					hideCell(i,j);
					break;
				}
			}
		}
		for(var j=3;j>=0;j--)//移动
		{
			if(Array2048[i][j]==0)
			{
				for(var k=j-1;k>=0;k--)
				{
					if(Array2048[i][k]!=0)
					{
						Array2048[i][j]=Array2048[i][k];
						changeCell(i,j);
						Array2048[i][k]=0;
						hideCell(i,k);
						break;
					}
			    }
			}
		}
	
	}
}
function toLeft()
{
	for(var i=0;i<4;i++)
	{
		for(var j=0;j<4;j++)//移动
		{
			if(Array2048[i][j]==0)
			{
				for(var k=j+1;k<4;k++)
				{
					if(Array2048[i][k]!=0)
					{
						Array2048[i][j]=Array2048[i][k];
						changeCell(i,j);
						Array2048[i][k]=0;
						hideCell(i,k);
						break;
					}
				}
			}
		}
		for(var j=3;j>0;j--)//add
		{
			if(Array2048[i][j]!=0)
			{
				if(Array2048[i][j]==Array2048[i][j-1])
				{
					Array2048[i][j-1]=Array2048[i][j]*2;
					Array2048[i][j]=0;
					changeCell(i,j-1);
					hideCell(i,j);
					break;
				}
			}
		}
		for(var j=0;j<4;j++)
		{
			if(Array2048[i][j]==0)
			{
				for(var k=j+1;k<4;k++)
				{
					if(Array2048[i][k]!=0)
					{
						Array2048[i][j]=Array2048[i][k];
						Array2048[i][k]=0;
						changeCell(i,j);
						hideCell(i,k);
						break;
					}
				}
			}
		}
	}
	rand_block();
}
