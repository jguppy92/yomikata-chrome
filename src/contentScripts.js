import { getKanji } from "./serviceWorker"

let selectedKanji = '煙'
let kanjiData = {}
let highlightedText = []

const uiElements = `
  <div className="main-kanji-div">
    <p id="main-kanji"></p>
  </div>
  <div className="kanji-detail">
    <div className="column">
      <p>
        Kun'yomi: <span id="kunyomi"></span>
      </p>
      <p>
        On'yomi: <span id="onyomi"></span>
      </p>
    </div>
    <div className="column">
      <p>
        Nanori: <span id="name-readings"></span>
      </p>
      <p>
        Meanings: <span id="meanings"></span>
      </p>
    </div>
    `


/**
 * recursively get all text nodes as an array for a given element
 */
function getTextNodes(node) {
  var childTextNodes = [];

  if (!node.hasChildNodes()) {
      return;
  }

  var childNodes = node.childNodes;
  for (var i = 0; i < childNodes.length; i++) {
      if (childNodes[i].nodeType == Node.TEXT_NODE) {
          childTextNodes.push(childNodes[i]);
      }
      else if (childNodes[i].nodeType == Node.ELEMENT_NODE) {
          Array.prototype.push.apply(childTextNodes, getTextNodes(childNodes[i]));
      }
  }

  return childTextNodes;
}

/**
* given a text node, wrap each character in the
* given tag.
*/
function wrapEachCharacter(textNode, tag) {
  var text = textNode.nodeValue;
  var parent = textNode.parentNode;

  var characters = text.split('');
  characters.forEach(function(character) {
      var element = document.createElement(tag);
      var characterNode = document.createTextNode(character);
      element.appendChild(characterNode);

      parent.insertBefore(element, textNode);
  });

  parent.removeChild(textNode);
}

// Create the popup div that will display the data.
const popupDiv = document.createElement('div')
popupDiv.id = 'popup'
document.body.append(popupDiv)

// Makes a request to the API endpoint to grab the kanji data
const getData = async () => {
  try {
    const response = await getKanji(selectedKanji)
    kanjiData = response.data
    console.log(kanjiData)
    document.getElementById('popup').innerHTML = uiElements
    document.getElementById('main-kanji').textContent = kanjiData.kanji
    document.getElementById('kunyomi').textContent = kanjiData.kun_readings.join(', ')
    document.getElementById('onyomi').textContent = kanjiData.on_readings.join(', ')
    document.getElementById('name-readings').textContent = kanjiData.name_readings.join(', ')
    document.getElementById('meanings').textContent = kanjiData.meanings.join(', ')
  } catch(err) {
    console.log(err)
  }
}

function splitPageText(e) {
  if (e.target.id === 'popup') return
  // get all text nodes recursively.
var allTextNodes = getTextNodes(e.target);

// wrap each character in each text node thus gathered.
allTextNodes.forEach(function(textNode) {
    wrapEachCharacter(textNode, 'span');
});
}

// function joinPageText(e) {
//   e.target.textContent = highlightedText.join('')
//   highlightedText = []
// }

function updateSelectedKanji(e) {
  selectedKanji = e.target.textContent
  console.log(selectedKanji)
  getData()
}

// Make the DIV element draggable:
dragElement(document.getElementById("popup"));

function dragElement(elmnt) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id)) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id).onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

document.body.addEventListener('mouseenter', splitPageText)
// document.body.addEventListener('mouseleave', joinPageText)
document.body.addEventListener('click', updateSelectedKanji)