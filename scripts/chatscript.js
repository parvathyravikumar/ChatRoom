/*--- Login Function-----*/
function login(){
	localStorage.clear();
	var name = document.getElementById("name").value;
	if("" != name){
		window.location = "main.html?username="+name+"&id=6";
	}
	document.getElementById("name").value = "";
}
/*--- Function to show all users----*/
function showlist(){
	localStorage.clear();
	var parameters = location.search.substr(1).split("&");
	var temp = parameters[0].split("=");
	var name = unescape(temp[1]);
	temp = parameters[1].split("=");
	var id = unescape(temp[1]);
	document.getElementById("welcomeNote").innerHTML = "Welcome " +name;
    document.getElementById("loginId").innerHTML = id;
    var url = "http://assignment.bunq.com/users";
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        crossDomain: true,
        success: function (data) {
        	var details = "";
        	$.each(data, function(index, element) {
		        	details = details + "<div><img src = 'images/profilepic.png' class ='img-circle chatblock' alt = 'noprofilepic'/>"
		        		+ "<label class='chatblock'>"+ element.name +"</label><input type ='hidden' id = 'memberid' value = '"+element.id+"'/>"
		        		+ "<a href='chatwindow.html?username="+ element.name+"&id="+element.id
		        		+ "&currentUser="+name+"&currentUserId="+id+"&conversationId="+element.id+"' class='chatblock'>Chat >></a></div>";
        	});
        	document.getElementById("listBox").innerHTML = details;
        },
        error: function () {
            alert("Error");
        }
    });
   
}
/*---Function to start chat with a single user---*/
function chatdetails(){
	var parameters = location.search.substr(1).split("&");
	var temp = parameters[0].split("=");
	var selectedname = unescape(temp[1]);
	temp = parameters[1].split("=");
	var selectedid = unescape(temp[1]);
	temp = parameters[2].split("=");
	var currentUser = unescape(temp[1]);
	temp = parameters[3].split("=");
	var currentUserId = unescape(temp[1]);
	var details= "<a href='main.html?username="+currentUser+"&id="+currentUserId+"&conversationId="+currentUserId
	        + "' tooltip = 'Back to list'>"
            + "<span class='glyphicon glyphicon-menu-left'></span> </a></div>"
            + "<img src = 'images/profilepic.png' class ='img-circle chatblock' alt = 'noprofilepic'/>"
        	+ "<label class='chatblock' id ='selectedname'>"+ selectedname +"</label>"
        	+ "<input type ='hidden' id = 'memberid' value = '"+selectedid+"'/>"
        	+ "<input type ='hidden' id = 'currentuser' value = '"+currentUser+"'/><input type ='hidden' " 
        	+ "id = 'currentUserId' value = '"+currentUserId+"'/><input type = 'hidden'"
        	+ "name = 'conversationId' id = 'conversationId' value = '"+selectedid+"'/>";
	document.getElementById("userDetails").innerHTML = details; 
}
/*--Function to send message and receive message ---*/
function sendmessage(){
	var currentuser = document.getElementById("currentuser").value;
	var selecteduser = document.getElementById("selectedname").innerHTML;
	var conversationId = document.getElementById("conversationId").value;
	var url = "http://assignment.bunq.com/conversation/:"+conversationId+"/message/send";
	var message = document.getElementById("message").value;
	var data = '{"message": "'+message+'","senderId":"6"}';
	
	$.ajax({
        url: url,
        type: 'POST',
        data : data,
        dataType: 'json',
        crossDomain: true,
        success: function (data) {
        	
        	var chatbox = "<label style:'float:left;'><b>"+currentuser+"</b></label> : "+message +"<br>";
        	var chat = document.getElementById("currentchat");
        	chat.innerHTML = chat.innerHTML + chatbox;
        	var newMessage = "<label style:'float:right;'><b>"+selecteduser+"</b></label> : "+ data.id +"<br>";
        	chat.innerHTML = chat.innerHTML + newMessage ;
     
        },
        error: function () {
            alert("Error");
        }
    });
	document.getElementById("message").value="";
	
}