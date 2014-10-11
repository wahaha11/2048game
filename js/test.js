$(document).keydown(function(event){ 
//alert(event.keyCode); 
//alert(typeof(event.keyCode)); 
//alert(event.keyCode==38);
if(event.keyCode==38)
{
	alert("up");
}else if(event.keyCode==39)
{
	alert("right");
}else if(event.keyCode==40)
{
	alert("down");
}else if(event.keyCode==37)
{
	alert("left");
}
}); 
$(document).ready(function(){
	if($("#cellno6").html(2)){
		$("#cellno6").css("background","#eee4da");
	}; 

	$(document).keydown(function(event){
	var a=6
	var b="#cellno"+a;
	// alert(b);
	// alert($(b).html());
		var id = event.keyCode;
		//alert(id);
		switch(id){
		case 37: 
		//alert('left');
		//alert(a);
		if(a!=1 && a!=5 && a!=9 && a!=13)
			{
				//alert(b);
				var c=$(b).html();
				//alert(c);
				var a=a-1;
				var b="#cellno"+a;
				$(b).html(c);
				alert($(b).html(c));
				alert(typeof"$(b).html(c)")
			}
					 break;
			case 38: 
			if(a!=1 && a!=5 && a!=9 && a!=13)
			{
				//alert(b);
				var c=$(b).html();
				//alert(c);
				var a=a-1;
				var b="#cellno"+a;
				$(b).html(c);
				alert($(b).html(c));
				alert(typeof"$(b).html(c)")
			}
					 break;
			case 40: 
					 break;
			// case 37: $("#cellno5").animate({'right':"+=121px"},'slow');
			// 		 break;

		}

		});


});



