// JavaScript Document
var current = 0;
var last_current = 0;
function imgsize(){
	$("#all-images img").each(function(){
		var imgWidth=$(this).width();
		var imgHeight=$(this).height();
		
		if(imgWidth > 500){
			$(this).width(500);
		}else{
			$(this).width("auto");
			var mleft=(500-imgWidth)/2;
			$(this).css("margin-left",mleft+"px");
		}
		if(imgHeight>300){
			$(this).height(300);
			$(this).css("margin-top",0);
		}else
		{
			$(this).height("auto");
			var mtop=(300-imgHeight)/2;
			$(this).css("margin-top",mtop+"px");
		}
		});
}

function moveToCurrent(){
	var left=0-current*510;
	$("#all-images").animate({left:left+"px"},400);
	var name=$("#all-images img").eq(current).attr("alt");
	$("#images-comment").text=name;
	$(".dots").eq(last_current).attr("src","image/dot1.gif");
	$(".dots").eq(current).attr("src","image/dot2.gif");
}

function moveBack(){
	last_current=current;
	if(current > 0)
		current--;
	else
		current=$("#all-images img").length-1;
	moveToCurrent();
}

function moveNext(){
	last_current=current;
	if(current < $("#all-images img").length-1)
		current++;
	else
		current=0;
	moveToCurrent();
}

$(document).ready(function(){

var obj=[
		{"comment":"item1","location":"image/11.jpg"},
		{"comment":"item2","location":"image/12.jpg"},
		{"comment":"item3","location":"image/13.jpg"},
		{"comment":"item4","location":"image/14.jpg"},
		{"comment":"item5","location":"image/15.jpg"},
		{"comment":"item6","location":"image/16.jpg"},
		{"comment":"item7","location":"image/17.jpg"},
		{"comment":"item8","location":"image/18.jpg"}		
];
	/*$.getJSON("images_comments.json",function(data){
		obj=data;
	});*/

var main_body=$("#all-images");
main_body.css("width",obj.length*510+"px");
$("#mouse-on").css("width",obj.length*18+"px");

for(var i=0;i < obj.length; i++)
{
	var temp=$("<div><img></div>");
	var dot=$("<img>");
	dot.attr("class","dots");
	dot.attr("src","image/dot1.gif");
	temp.attr("class","image");
	temp.find("img").attr("src",obj[i].location);
	temp.find("img").attr("alt",obj[i].comment);
	main_body.append(temp);
	$("#mouse-on").append(dot);
}

moveToCurrent();	

$("#back").click(function(){
	moveBack();
	return false;
})

$("#next").click(function(){
	moveNext();
	return false;
})

$("#show-images").mouseover(function(){
	$("#images-comment").css({"opacity":"0.5"});
	$("#images-comment").text($("#all-images img").eq(current).attr("alt"));
});

$("#show-images").mouseout(function(){
	$("#images-comment").css("opacity","0");
});

$(".dots").mouseover(function(){
	$("#all-images").stop(false,true);
	var i=$(this).nextAll().length;
	var j=$(".dots").length;
	last_current=current;
	current=j-i-1;
	moveToCurrent();
});

$("#post-comment").click(function(){
	$("#comment").animate({height:"70px"});
});
	
});
