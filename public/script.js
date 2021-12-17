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



const socket = io();
var input = $('#chatInput');
var formSubmitButton = $("#chatbut");
$("#chatbut").click(function(e) {
    e.preventDefault();
    if (input.val() != "") {
        socket.emit('chat message', input.val());
        $('#chatInput').value = '';
    }
});

socket.on('chat message', function(msg) {
    let item = document.createElement('div');
    item.textContent = msg;
    $("#messages").append(item);
    window.scrollTo(0, document.body.scrollHeight);
});