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
      reader.onload = event => resolve(event.target.result);
      reader.onerror = error => reject(error);
      reader.readAsText(file);
    })
  }

  // Drag and drop functionality
  function handleFileSelect(event) {
    // Prevent default behavior (Prevent file from being opened)
    evt.stopPropagation();
    evt.preventDefault();

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

  // Setup the dnd listeners.
  let dropArea = document.getElementById('text-display');
  dropArea.addEventListener('dragover', handleDragOver, false);
  dropArea.addEventListener('drop', handleFileSelect, false);
});
