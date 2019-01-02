$(document).ready(function () {

  $('#js-upload-submit').click(function () {
    console.log("hello");
  });

  $('#button1').click(function () {
    console.log("downloaded!");
    var text = document.getElementById("text-display").value;
    this.href = "data:text/plain;charset=UTF-8," + encodeURIComponent(text);
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
                resolve(str);
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
    let reader = new FileReader();  
    reader.onload = function(event) {            
         document.getElementById('text-display').value = event.target.result;
    }        
    reader.readAsText(files[0],"UTF-8");
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
