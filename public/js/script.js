$(document).ready(function () {
  // Upload file functionality
  $('#js-upload-submit').click(function () {
    console.log("hello");
  });


  $('#button1').click(function () {
    console.log("downloaded!");
    var text = document.getElementById("text-display").value;
    var textAreaDisplay = document.getElementById('text-display');
    var yi = textAreaDisplay.style.fontSize;
    var hi = yi.substring(0, 2);
    var si = parseInt(hi, 10);
    console.log(yi);
    console.log(si);
    var doc = new jsPDF('p', 'in', 'letter'),
      font = fontStr, size = si, lines,
      margin = 0.5,
      verticalOffset = margin;
    
    switch (font) {
      case 'OpenDyslexic':
        changeToOpenDyslexic(doc);
        break;
      case 'ComicSans':
        changeToComicSans(doc);
        break;
      case 'OpenDyslexicMono':
        changeToOpenDyslexicMono(doc);
        break;
      case 'Ari':
        changeToAri(doc);
        break;
      case 'Hel':
        changeToHel(doc);
        break;
      case 'Ver':
        changeToVer(doc);
        break;
      default:
        alert("Unsupported font");
        return;
    }

    lines = doc.setFont(font)
      .setFontType('normal')
      .setFontSize(si)
      .splitTextToSize(text, 7.5);
    doc.text(0.5, verticalOffset + si / 72, lines);

    verticalOffset += (lines.length + 0.5) * si / 72;
    console.log(text);
    doc.save('YourConvertedFile.pdf');
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
        case "png":
        case "jpg":
          Tesseract.recognize(file).then(result => resolve(result.text));
          break;
        default:
          alert("Unsupported extension!");
      }
    })
  }

  // Drag and drop functionality
  function handleFileSelect(event) {
    event.stopPropagation(); // Prevent default behavior (Prevent file from being opened)
    event.preventDefault();

    let files = event.dataTransfer.files; // create fileList object.
    let dropArea = document.getElementById('text-display')
    placeFileContent(dropArea, files[0]);
  }

  function handleDragOver(event) {
    event.preventDefault(); // Prevent default behavior (Prevent file from being opened)
    event.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }

  // Setup listeners
  let dropArea = document.getElementById('text-display');
  dropArea.addEventListener('dragover', handleDragOver, false);
  dropArea.addEventListener('drop', handleFileSelect, false);


  // Start of text to speech, check if the browser is compatible
  if ('speechSynthesis' in window) {
    var synth = speechSynthesis;
    var flag = false;

    /* references to the buttons */
    var playB = document.querySelector('#play');
    var stopB = document.querySelector('#stop');

    /* event handlers for the buttons */
    playB.addEventListener('click', onClickPlay);
    stopB.addEventListener('click', onClickStop);

    /* function for clicking the play button */
    function onClickPlay() {
      if (!flag) {
        flag = true;
        utterance = new SpeechSynthesisUtterance(
          document.getElementById('text-display').value);
        utterance.voice = synth.getVoices()[0];
        utterance.onend = function () {
          flag = false;
        };
        synth.speak(utterance);
      }
      else if (synth.paused) { /* unpause/resume narration */
        synth.resume();
      }
      else if (synth.speaking && !synth.paused) { /* pause narration */
        synth.pause();
      }
    }
    /* function for clicking the stop button */
    function onClickStop() {
      if (synth.speaking) { /* stop narration */
        /* for safari */
        flag = false;
        synth.cancel();
      }
    }
  } else {
    alert("Current browser is not compatible with text to speech");
  }
});
