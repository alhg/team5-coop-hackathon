$(document).ready(function () {
  // Upload file functionality
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
      // Place file contents into the text area
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
  // Start of text to speech, check if the browser is compatible
  if ('speechSynthesis' in window) {
    var synth = speechSynthesis;
    var flag = false;

    /* references to the buttons */
    var playB = document.querySelector('#play');
    var pauseB = document.querySelector('#pause');
    var stopB = document.querySelector('#stop');

    /* event handlers for the buttons */
    playB.addEventListener('click', onClickPlay);
    pauseB.addEventListener('click', onClickPause);
    stopB.addEventListener('click', onClickStop);

    /* function for clicking the play button */
    function onClickPlay() {
      if(!flag){
        flag = true;
        utterance = new SpeechSynthesisUtterance(
              document.getElementById('text-display').value);
        utterance.voice = synth.getVoices()[0];
        utterance.onend = function(){
            flag = false;
        };
        synth.speak(utterance);
      }
      if(synth.paused) { /* unpause/resume narration */
        synth.resume();
      }
    }
    /* function for clicking the pause button */
    function onClickPause() {
      if(synth.speaking && !synth.paused){ /* pause narration */
        synth.pause();
      }
    }
    /* function for clicking the stop button */
    function onClickStop() {
      if(synth.speaking){ /* stop narration */
        /* for safari */
        flag = false;
        synth.cancel();
      }
    }
  } else {
    alert("Current browser is not compatible with text to speech");
  }
});
