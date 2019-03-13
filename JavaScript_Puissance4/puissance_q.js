$.fn.puissance_q = function(){

	$("body").append("<h1>Puissance 4</h1>");
	$("body").append("<div class=\"container turn\"></div>");
	$("body").append("<textarea class=\"input\" id=\"player1_name\" placeholder=\"Player 1 name\"></textarea>");
	$("body").append("	<textarea class=\"input\" id=\"player2_name\" placeholder=\"Player 2 name\"></textarea>");
	$("body").append("<br>");
	$("body").append("<select id=\"player1\" class=\"color_select btn\"></select>");
	$("body").append("	<select id=\"player2\" class=\"color_select btn\"></select>");
	$("#player1").append("<option value=\"default\">Player 1 token color</option>");
	$("#player2").append("	<option value=\"default\">Player 2 token color</option>");
	$(".color_select").append("<option value=\"red\">Red</option>");
	$(".color_select").append("<option value=\"yellow\">Yellow</option>");
	$(".color_select").append("<option value=\"blue\">Blue</option>");
	$(".color_select").append("<option value=\"orange\">Orange</option>");
	$(".color_select").append("<option value=\"green\">Green</option>");
	$(".color_select").append("<option value=\"grey\">Grey</option>");
	$(".color_select").append("<option value=\"black\">Black</option>");
	$("body").append("	<textarea class=\"input\" id=\"width\" placeholder=\"Grid width\"></textarea>");
	$("body").append("	<textarea class=\"input\" id=\"height\" placeholder=\"Grid height\"></textarea>");
	$("body").append("	<button id=\"sub\" class=\"btn\">Generate</button>");
	$("body").append("	<button id=\"clear\" class=\"btn\">Clear Grid</button>");
	$("head").append("<title>Puissance 4</title>");
	$("head").append("<link rel=\"stylesheet\" type=\"text/css\" href=\"grid.css\">");


	$("#sub").click(function getSize(){

		var width = document.getElementById("width").value;
		var height = document.getElementById("height").value;
		var colors = getColors();
		var names = getNames();
		if (colors==false)
			return;
		else
			makeGrid([width,height], colors, names);
	})

	$("#clear").click(function ClearGrid(){
		$(".grid").css("background-color", "white");

		var width = document.getElementById("width").value;
		var height = document.getElementById("height").value;
		var colors = getColors();
		var names = getNames();
		if (colors==false)
			return;
		else
			makeGrid([width,height], colors, names);
	})

	function getNames() {
		if (document.getElementById("player1_name").value == "")
			player1 = "Player 1";
		else
			var player1 = document.getElementById("player1_name").value;

		if (document.getElementById("player2_name").value == "")
			player2 = "Player 2";
		else
			var player2 = document.getElementById("player2_name").value;

		var names = [player1, player2];
		return names;
	}

	function getColors(){
		var player1 = document.getElementById("player1").value;
		var player2 = document.getElementById("player2").value;

		if(player1 =="default" || player2 == "default"){
			alert("Select color for both players");
			return false;
		}

		else if(player1 == player2){
			alert("Can't select same color for both players");
			return false;
		}
		else {
			if(player1 == "red")
				player1 = "#ff4c4c";
			else if(player1 == "yellow")
				player1 = "#ffea6c";
			else if(player1 == "blue")
				player1 = "#43a1f6";
			else if(player1 == "orange")
				player1 = "#f6a643";
			else if(player1 == "green")
				player1 = "#68c96a";
			else if(player1 == "grey")
				player1 = "#b0b0b0";
			else 
				player1 = "#494949";

			if(player2 == "red")
				player2 = "#ff4c4c";
			else if(player2 == "yellow")
				player2 = "#ffea6c";
			else if(player2 == "blue")
				player2 = "#43a1f6";
			else if(player2 == "orange")
				player2 = "#f6a643";
			else if(player2 == "green")
				player2 = "#68c96a";
			else if(player2 == "grey")
				player2 = "#b0b0b0";
			else 
				player2 = "#494949";

			var colors = [player1, player2];
			return colors;
		}
	}

	function makeGrid(coords, colors, names){
		var x = coords[0];
		var y = coords[1];

		if(x == "" || y == ""){
			alert("Enter width and height for grid");
			return;
		}

		var l = 0;
		var av_line = y-1;

		if($("#puissance").length){
			$("#puissance").remove();
		}

		$("<div id =\"puissance\" class=\"container-fluid\"></div>").insertAfter("#clear");
		for (var j = 0; j < y; j++) {
			for (var i = 0; i < x; i++) {
				$("#puissance").append("<canvas class=\"inactive grid\" id=\""+l+"_"+i+"\" width=\"50px\" height=\"50px\"></canvas>");
			}
			l++;
			$("#puissance").append("<br>");
		}

		$("#puissance").css("width", x*70+"px");
		$("#puissance").css("padding-top", 50/10+"px");
		$("#puissance").css("margin-top", "10px");


		function counter() {
			var count = 0;
			return function() {
				count++;
				return count;
			};
		};
		var count = counter();
		if($("#turnie").length){
				$("#turnie").remove();
			}
		$(".turn").append("<h1 id=\"turnie\">It's "+names[0]+"'s turn!</h1>");
		$("canvas").click(function() {

			var i = count();
			if(i%2==0){
				if($("canvas[id=\""+av_line+this["id"].substr(1,3)+"\"]").hasClass("inactive")==true){
					$("canvas[id=\""+av_line+this["id"].substr(1,3)+"\"]").removeClass("inactive");
					$("canvas[id=\""+av_line+this["id"].substr(1,3)+"\"]").addClass("active_0");
				}
				else{

					do{
						av_line--;
					}while($("canvas[id=\""+av_line+this["id"].substr(1,3)+"\"]").hasClass("inactive")==false && av_line>=0);
					$("canvas[id=\""+av_line+this["id"].substr(1,3)+"\"]").removeClass("inactive");
					$("canvas[id=\""+av_line+this["id"].substr(1,3)+"\"]").addClass("active_0");
				}

				name = names[0];
				color = colors[1];
			}

			else{
				if($("canvas[id=\""+av_line+this["id"].substr(1,3)+"\"]").hasClass("inactive")==true){
					$("canvas[id=\""+av_line+this["id"].substr(1,3)+"\"]").removeClass("inactive");
					$("canvas[id=\""+av_line+this["id"].substr(1,3)+"\"]").addClass("active_1")
				}
				else{
					do{
						av_line--;
					}while($("canvas[id=\""+av_line+this["id"].substr(1,3)+"\"]").hasClass("inactive")==false && av_line>=0);
					$("canvas[id=\""+av_line+this["id"].substr(1,3)+"\"]").removeClass("inactive");
					$("canvas[id=\""+av_line+this["id"].substr(1,3)+"\"]").addClass("active_1");
				}

				name = names[1];
				color = colors[0];
			}

			transition(av_line, this["id"].substr(2,4), color);


			draw();
			av_line = y;
			i++;
			if($("#turnie").length){
				$("#turnie").remove();
			}
			$(".turn").append("<h1 id=\"turnie\">It's "+name+"'s turn!</h1>");

			if(win() == 1){
				alert(names[0]+" wins!");
				$("canvas").off("click");

				$("#turnie").remove();
				$(".turn").append("<h1 id=\"turnie\">"+names[0]+" wins!</h1>");
			}

			if(win() == 2){
				alert(names[1]+" wins!");
				$("canvas").off("click");

				$("#turnie").remove();
				$(".turn").append("<h1 id=\"turnie\">"+names[1]+" wins!</h1>");
			}
		});
	}

	function win(){
		var player1_ids = [];
		var player2_ids = [];
		$("canvas").each(function(k, v){
			if($(v).hasClass("active_1")){
				(player1_ids).push(k);
			}
			if($(v).hasClass("active_0")){
				(player2_ids).push(k);
			}
		})

		if(checkHor(player1_ids, player2_ids) == 1)
			return 1;

		if(checkHor(player1_ids, player2_ids) == 2)
			return 2;
	}

	function checkHor(player1, player2){
		for (var i = 0; i < player1.length; i++) {
				if(player1[i]+1 == player1[i+1]){
					if(player1[i+1]+1 == player1[i+2]){
						if(player1[i+2]+1 == player1[i+3]){
							return 1;
						}
					}
				}
			}

		for (var i = 0; i < player2.length; i++) {
			if(player2[i]+1 == player2[i+1]){
				if(player2[i+1]+1 == player2[i+2]){
					if(player2[i+2]+1 == player2[i+3]){
						return 2;
					}
				}
			}
		}
	}

	function draw(){
		var count = 0;
		$("canvas").each(function(k,v){
			if($(v).hasClass("inactive")){
				count++ ;
			}
		})
		if(count == 0)
			alert("It's a draw! No one wins");
	}

	function transition(final, col, color){
		var i = 0;
		var inter = setInterval(function() {
			$("canvas[id=\""+i+"_"+col+"\"]").css("background-color", color);
			$("canvas[id=\""+i+"_"+col+"\"]").css("transition", "background-color 0.2s linear");
			if(i>0){
				$("canvas[id=\""+(i-1)+"_"+col+"\"]").css("background-color", "white");
			}
			if(i==final){
				clearInterval(inter);
			}
			i++;
		}
		,200);

	}
	return $(this);
}

$().puissance_q();