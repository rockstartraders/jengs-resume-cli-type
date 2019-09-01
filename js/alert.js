/* function to remove inspect elements  */
/* I used this as reference https://codepen.io/Nielssg/pen/pbroPW  */

alert("Hello There ! If the website content does not appear automatically please do refresh the page instead. My website is optimize and tested for Google Chrome but for other browser it is something that I cannot guarantee.\n\nBut I'm doing my best to improve it.\n\nThank You.\n James.. ");

document.addEventListener('keydown', function() {
if (event.keyCode == 123) {
 alert("Ooops. I'm so sorry, But I decided to disable this function.");
  window.event.returnValue = false;
} else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) {
alert("Ooops. I'm so sorry, But I decided to disable this function.");

window.event.returnValue = false;
} else if (event.ctrlKey && event.keyCode == 85) {
 alert("Ooops. I'm so sorry, But I decided to disable this function.");
 window.event.returnValue = false;
}
}, false);

if (document.addEventListener) {
document.addEventListener('contextmenu', function(e) {
alert("Ooops. I'm so sorry, But I decided to disable this function.");
  e.preventDefault();
}, false);
} else {
document.attachEvent('oncontextmenu', function() {
alert("Ooops. I'm so sorry, But I decided to disable this function.");
  window.event.returnValue = false;
});
}
