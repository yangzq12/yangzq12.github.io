// JavaScript Document
var current = 0;
function handleJson()
{
	var obj;
	
	
	var total=document.getElementById("all-images");
	total.setAttribute("width",obj.length*320+"px");
	for(var i=0,i < all_images.length, i++)
	{
		var temp_a=document.createElement("div");
		temp_a.className="image";
		var temp_b=document.createElement("img");
		temp_b.src=obj.location;
		temp_a.appendChild(temp_b);
	}
	
	
}