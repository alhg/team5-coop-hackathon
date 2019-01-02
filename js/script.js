$(document).ready(function () {

  $('#js-upload-submit').click(function () {
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
      reader.onerror = error => reject(error);

      switch (file.name.split('.').pop().toLowerCase()) {
        case "txt":
          reader.onload = event => resolve(event.target.result);
          reader.readAsText(file);
          break;
        case "pdf":
          reader.onload = event => pdfjsLib.getDocument(new Uint8Array(event.target.result)).then(pdf => {
            let result = "";
            for (let i = 1; i <= pdf.numPages; i++) {
              pdf.getPage(i).then(page => page.getTextContent().then(textContent => {
                textContent = textContent.items;
                let str = "";
                for (let j = 0, lastY = textContent[0].transform[5]; j < textContent.length; j++) {
                  if (lastY != textContent[j].transform[5]) {
                    str += "\n";
                    lastY = textContent[j].transform[5];
                  }
                  str += textContent[j].str;
                }

                if (page.pageNumber == pdf.numPages) {
                  resolve(result + str);
                } else {
                  result += str + "\n";
                }
              }));
            }
          });
          reader.readAsArrayBuffer(file);
          break;
        default:
          alert("Unsupported extension!");
      }
    })
  }

  // Drag and drop functionality
  function handleFileSelect(event) {
    // Prevent default behavior (Prevent file from being opened)
    event.stopPropagation();
    event.preventDefault();

    let files = event.dataTransfer.files; // create fileList object.
    placeFileContent(document.getElementById('text-display'), files[0]);
  }

  function handleDragOver(event) {
    // Prevent default behavior (Prevent file from being opened)
    event.preventDefault();

    // Explicitly show this is a copy.
    event.dataTransfer.dropEffect = 'copy';
  }

  // Setup listeners.
  let dropArea = document.getElementById('text-display');
  dropArea.addEventListener('dragover', handleDragOver, false);
  dropArea.addEventListener('drop', handleFileSelect, false);
});
