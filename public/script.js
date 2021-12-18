// $("#lightswitch").click(function(num) {
// 	$.get("/change");

// 		});

// setInterval(function(){$.get("/check", function(num) {
// 	if (num == 1) {
// 		$("div").css("background","purple");
// 	} else {
// 		$("div").css("background","blue");
// 	}
// })},20000);


//socket setup
const socket = io();

//input.val() is the message
var input = $('#chatInput');

//for detecting clicked button
var formSubmitButton = $("#chatbut");

//clicked button
$("#chatbut").click(function(e) {
    e.preventDefault();
    //makes sure empty slots do not get sent through
    if (input.val() != "") {
        socket.emit('chat message', input.val());
        //i tried making the input disappear after you press enter but to no avail
        $('#chatInput').value = '';
    }
});

socket.on('chat message', function(msg) {
    //new section of html, will get its own "line"
    let item = document.createElement('div');
    //the message will be displayed in item
    item.textContent = msg;
    //messages in html, above the form
    $("#messages").append(item);
    //idk why i did this, I don't think it does anything but I don't wanna remove it lol I'm lazy
    window.scrollTo(0, document.body.scrollHeight);
});