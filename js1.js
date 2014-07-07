// JavaScript Document
$(document).ready(function(){
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
		c.animate({width:'300px',opacity:'0.4'},"slow");
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
		c=$(".center_module");
		c.animate({width:w+"px",opacity:"1"},"slow");
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
d2.css({"background": "rgb(240, 178, 178)","height": "270px","overflow": "auto","padding":"5px","margin-top":"5px"});

c2.before(d2);

d2.html("<p>未交作业提醒</p><ul></ul><p>新文件提醒</p><ul></ul><p>未读公告提醒</p><ul></ul>");
var e2=$("ul",d2);
var f2=$("p",d2);

f2.css({"color":"yellow","font-size":"15px","margin-bottom":"5px","margin-top":"5px","text-align":"left"});

e2.css({"list-style": "square inside url('images/eg_arrow.gif')","text-align":"left"});

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

