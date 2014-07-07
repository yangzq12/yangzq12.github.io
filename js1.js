// JavaScript Document
$(document).ready(function(){
var my_div=$("<div></div>");
var my_a=$("div.center_module");
my_a.before(my_div);
my_a.parent().css("position","relative");

my_h=my_a.height();
my_div.css({"margin":"10px","position":"absolute","width":"1213px","height":my_h+"px","top":"0px","left":"0px","border":"1px solid #cecece","z-index":"0"});
var show_image1=$("<img>");
var show_image2=$("<img>");
var show_image3=$("<img>");
show_image1.attr("src","http://yangzq12.github.io/image/1.jpg");
show_image2.attr("src","http://yangzq12.github.io/image/2.jpg");
show_image3.attr("src","http://yangzq12.github.io/image/3.jpg");
show_image1.attr("id","show_image1");
show_image2.attr("id","show_image2");
show_image3.attr("id","show_image3");
my_div.append(show_image1);
my_div.append(show_image2);
my_div.append(show_image3);

show_image1.hide();
show_image2.hide();
show_image3.hide();
my_div.attr("id","my_div");

n_cycle=0;
function cycle()
{
if(n_cycle%3==0)
{
show_image1.show();
show_image2.hide();
show_image3.hide();
}
else if(n_cycle%3==1)
{
show_image1.hide();
show_image2.show();
show_image3.hide();
}
else
{
show_image1.hide();
show_image2.hide();
show_image3.show();
}
n_cycle++;
setTimeout("cycle()",5000);
}

var a=$("<div>收起/放下</div>");
a.css({"color":"rgb(44,250,5)","text-align":"center","font-size":"15px","padding":"6px"});
a.addClass("down-up");
var b=$("#listCourseBox");
b.after(a);
	a.click(function(){
		b.slideToggle();
		});

var w;
var c=$(".center_module");
w=c.width()
d=$("<input>");
d.attr("type","button");
d.attr("value","折起右边");
d.css("font-size","16px");
d.css("margin-top","10px");
e=$(".left");
e=e[1];
$(e).append(d);
	d.click(function(){
		c=$(".center_module");
		c.animate({width:'0px'},"slow");
		var c_c=$("#my_div");
		c_c.animate({width:w+"px"},"slow");
		cycle();

		});

f=$("<input>");
f.attr("type","button");
f.attr("value","弹起右边");
f.css("font-size","16px");
f.css("margin-top","10px");
var g=$(".left");
g=g[1];
$(g).append(f);
	f.click(function(){
		var c_c=$("#my_div");
		c_c.animate({width:"0px"},"slow");
		c=$(".center_module");
		c.animate({width:w+"px"},"slow");	
		});

var a2=$("#wrap");
var b2=$("<div>提示信息</div>");
b2.css({"right": "0px","top": "0px","width": "100px","background-color": "transparent","opacity": "0.85","height": "300px","position": "absolute","padding":"0px","margin-top": "200px","z-index": "20","text-align": "center","font-weight":"bolder"});
a2.before(b2);
b2.attr("id","informatin-beside");
var n=0;//top值
var obj=document.getElementById("informatin-beside"); //position:fixed对象
window.onscroll=function(){obj.style.top=(document.body.scrollTop||document.documentElement.scrollTop)+n+'px';}
window.onresize=function(){obj.style.top=(document.body.scrollTop||document.documentElement.scrollTop)+n+'px';}

var c2=$("<input>");
c2.css({"background-color": "transparent","border": "0px","margin-top": "4px","font-weight":"lighter"});
c2.attr("type","button");
c2.attr("value","收起/弹起");
b2.append(c2);

var d2=$("<div></div>");
d2.attr("id","information-name");
d2.css({"height": "270px","overflow": "auto","padding":"5px","margin-top":"5px"});

c2.before(d2);

d2.html("<p>未交作业提醒</p><ul></ul><p>新文件提醒</p><ul></ul><p>未读公告提醒</p><ul></ul>");
var e2=$("ul",d2);
var f2=$("p",d2);
d2.css("backgroundImage","url(http://yangzq12.github.io/image/th.jpg)");

f2.css({"color":"yellow","font-size":"15px","margin-bottom":"5px","margin-top":"5px","text-align":"left"});

e2.css({"list-style": "square inside url('http://yangzq12.github.io/image/eg_arrow.gif')","text-align":"left"});

c2.click(function(){var s=$("#information-name");s.slideToggle()});

var courses=$("#listCourseBox tbody tr");
var cout1=false,cout2=false,cout3=false;
for(var i=0;i<courses.length;i++)
{
	var t1=courses[i].getElementsByClassName("student")[2].getElementsByTagName("a")[0];
	var t2=courses[i].getElementsByClassName("student")[1].getElementsByTagName("a")[0];
	var t3=courses[i].getElementsByClassName("student")[0].getElementsByTagName("a")[0];
	var num1=t1.innerText;
	var num2=t2.innerText;
	var num3=t3.innerText;
	var cla=courses[i].children[0];
	var cl=cla.getElementsByTagName("a")[0].innerText;
	if(num1 !="0")
		{var str1=cl+"未交作业数："+num1;
		$(e2[0]).append("<li>"+str1+"</li>");
		cout1=true;
		}
	if(num2 !="0")
	{
		var str2=cl+"新文件数： "+num2;
		$(e2[1]).append("<li>"+str2+"</li>");
		cout2=true;
	}
	if(num3 !="0")
	{
	var str3=cl+"未读公告数:"+num3;
	$(e2[2]).append("<li>"+str3+"</li>");
	cout3=true;
	}
}
if(cout1==false)
	$(e2[0]).append("<li>无</li>");
if(cout2==false)
	$(e2[1]).append("<li>无</li>");
if(cout3==false)
	$(e2[2]).append("<li>无</li>");

});

n_cycle=0;
		cycle=function ()
		{
		if(n_cycle%3==0)
		{
		$("#show_image1").show();
		$("#show_image2").hide();
		$("#show_image3").hide();
		}
		else if(n_cycle%3==1)
		{	
		$("#show_image1").hide();
		$("#show_image2").show();
		$("#show_image3").hide();
		}
		else
		{
		$("#show_image1").hide();
		$("#show_image2").hide();
		$("#show_image3").show();
		}
		n_cycle++;
		setTimeout("cycle()",5000);
		}
