$(document).ready(function() {

    $('#js-upload-submit').click(function(){
      console.log("hello");
    });

    $('#button1').click(function(){
      console.log("downloaded!");
      var text = document.getElementById("text-display").value;

      let doc = new jsPDF();

      var y = 7;
      var x = 3;
      var textA = text.split("");
      var str1 = document.getElementById('text-display');
      var str2 = str1.style.fontFamily;
      console.log(str1, str2);
      console.log(textA);
      for (var i = 0; i < textA.length; i++) {
        if (y > 250) {
          y = 5;
          doc.addPage();
        }
        if (x > 200) {
          x = 3;
          y += 7;
        }
        doc.text(x, y, textA[i]);
        x += 4;
      }
          doc.save('html.pdf');
    });

  document.getElementById('js-upload-files').addEventListener('change', getFile);

  function getFile(event) {
    const input = event.target
    if ('files' in input && input.files.length > 0) {
      placeFileContent(document.getElementById('text-display'), input.files[0]);
    }
  }

  function placeFileContent(target, file) {
    readFileContent(file).then(content => {
      target.value = content;
    }).catch(error => console.log(error));
  }

  function readFileContent(file) {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = event => resolve(event.target.result);
      reader.onerror = error => reject(error);
      reader.readAsText(file);
    })
  }

});
