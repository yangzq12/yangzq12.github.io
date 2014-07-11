﻿// JavaScript Document

function picture(){
this.data_obj = null;
this.current = 0;
this.last_current = 0;
this.imgsize = function(){
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

this.moveToCurrent = function(){
	var left=0-this.current*510;
	$("#all-images").animate({left:left+"px"},400);
	var name=$("#all-images img").eq(this.current).attr("alt");
	$("#images-comment").text=name;
	$(".dots").eq(this.last_current).attr("src","image/dot1.gif");
	$(".dots").eq(this.current).attr("src","image/dot2.gif");
}

this.moveBack = function(){
	this.last_current=this.current;
	if(this.current > 0)
		this.current--;
	else
		this.current=$("#all-images img").length-1;
	this.moveToCurrent();
}

this.moveNext = function(){
	this.last_current=this.current;
	if(this.current < $("#all-images img").length-1)
		this.current++;
	else
		this.current=0;
	this.moveToCurrent();
}

this.prepare = function(){
	var obj= this.data_obj
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
		main_body[0].appendChild(temp[0]);
		$("#mouse-on").append(dot);
	}
	
	$("#back").click(function(){
	my_picture.moveBack();
	return false;
	});

	$("#next").click(function(){
	my_picture.moveNext();
	return false;
	});

	$("#show-images").mouseover(function(){
	$("#images-comment").css({"opacity":"0.5"});
	$("#images-comment").text($("#all-images img").eq(my_picture.current).attr("alt"));
	});

	$("#show-images").mouseout(function(){
	$("#images-comment").css("opacity","0");
	});

	$(".dots").mouseover(function(){
	$("#all-images").stop(false,true);
	var i=$(this).nextAll().length;
	var j=$(".dots").length;
	my_picture.last_current=my_picture.current;
	my_picture.current=j-i-1;
	my_picture.moveToCurrent();
	});
	this.moveToCurrent();
}
}

function comment(){
	this.data_obj=null;
	this.pages=0;
	this.current_page=0;
	this.a_page=10;
	
	this.showCurrentPage=function(){
		var obj=this.data_obj;
		var start=this.current_page*this.a_page;
		var end=(start+this.a_page > this.data_obj.num)?this.data_obj.num-1:start+9;
		$(".one-comment").empty();	
		for(var i=start, j=0; i <=end; i++,j++)
		{
			var temp=$("<div></div>");
			temp.attr("class","user-name");
			temp.text(obj.comments[i].name);
			$(".one-comment").eq(j).append(temp);
			temp=$("<div></div>");
			temp.attr("class","user-comment");
			temp.text(obj.comments[i].comment);
			$(".one-comment").eq(j).append(temp);
		}
		var j=this.current_page;
		$("#page-up-down a").css("background-color","transparent");
			$(".pages").eq(j).css("background-color","gray");
		if(this.current_page==0)
			$(".page-up").css("background-color","gray");
		if(this.current_page==this.pages-1)
			$(".page-down").css("background-color","gray");
			
		$("span.num").text((start+1)+"-"+(end+1)+"/"+obj.num)
	};
	
	this.prepare=function(){
		var obj=this.data_obj;
		if(obj.num%this.a_page == 0)
		{
			this.pages=obj.num/this.a_page;
		}
		else
		{
			this.pages=parseInt(obj.num/this.a_page) + 1;
		}
		
	this.showCurrentPage();
	
	var aim = $("#page-up-down");
	var temp = $("<a></a>");
	temp.attr("class","page-up");
	temp.text("上一页");
	aim.append(temp);
	for(var i=0; i < this.pages;i++)
	{
		temp=$("<a></a>");
		temp.attr("class","pages");
		temp.text(i+1);
		aim.append(temp);
	}
	temp=$("<a></a>");
	temp.attr("class","page-down");
	temp.text("下一页");
	aim.append(temp);
	
	$("#page-up-down").css("width",100+$(".pages").length*34+"px");
	$("#post-comment").click(function(){
	$("#comment").animate({height:"70px"});
	});	
	
	$(".pages").click(function(){
		var i=$(this).nextAll().length;
		var j=$(".pages").length;
		my_comment.current_page=j-i;
		my_comment.showCurrentPage();
		return false;
	});
	
	$(".page-down").click(function(){
		if(my_comment.current_page==my_comment.pages-1)
			return false
		else{
			my_comment.current_page++;
			my_comment.showCurrentPage();
			return false;
		}
	});
	
	$(".page-up").click(function(){
		if(my_comment.current_page==0)
			return false;
		else{
			my_comment.current_page--;
			my_comment.showCurrentPage();
			return false
		}
	});
	};
}

var my_picture=new picture();
var my_comment=new comment();

$(document).ready(function(){
	$.getJSON("images_comments.json",function(data){
		my_picture.obj=data;
		my_picture.prepare();
	});$.getJSON("images_comments_1.json",function(data){
		my_comment.data_obj=data;
		my_comment.prepare();
	});
});


