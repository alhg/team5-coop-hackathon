$(document).ready(function() {
    $('#js-upload-submit').click(function(){
      console.log("hello");
    });

    $('#js-button-download').click(function(){
      console.log("downloaded!");
      var now = document.getElementById("textAreaID").value;
    this.href = "data:text/plain;charset=UTF-8,"  + encodeURIComponent(now);
    });
});
