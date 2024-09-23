import axios from "axios"
import { uiElements, navbar, uiOnLoadMessage } from "./popup"

let selectedKanji = '煙'
let kanjiData = {}
let highlightedText = []

const regexKanji = /^[一-龯]+$/
const baseUrl = 'https://kanjiapi.dev/v1/kanji'

function getKanji(selectedKanji) {
    return axios.get(`${baseUrl}/${selectedKanji}`)
  }

function wrapKanjiCharacters(node) {
  if (node.nodeType === Node.TEXT_NODE) {
      const contentText = node.textContent
      let wrappedContent = ''
      for (let i = 0; i < contentText.length; i++) {
          const char = contentText[i]

          // Check if the character is a kanji character
          if (regexKanji.test(char)) {
              wrappedContent += `<span class="kanji">${char}</span>`
          } else {
              wrappedContent += char
          }
      }
      // Replace the original text node with the wrapped content
      const spanContainer = document.createElement('span')
      spanContainer.innerHTML = wrappedContent
      node.parentNode.replaceChild(spanContainer, node)
  } else if (node.nodeType === Node.ELEMENT_NODE) {
      // Recursively process child nodes
      for (let i = 0; i < node.childNodes.length; i++) {
          wrapKanjiCharacters(node.childNodes[i])
      }
  }
}

// Disables links to allow kanji in links to become clickable.
function removeLinkHrefValues() {
  const allLinks = document.getElementsByTagName('a')
  for (let i = 0; i < allLinks.length; i++) {
    allLinks[i].href = ''
    allLinks[i].classList.add('isDisabled')
    allLinks[i].addEventListener('click', function (e) {
      if (allLinks[i].classList.contains('isDisabled')) {
        e.preventDefault()
      }
    })
  }
}

// Call the function when the page is loaded
window.onload = function () {
  const contentElement = document.getElementsByTagName('body')[0]
  wrapKanjiCharacters(contentElement)
  removeLinkHrefValues()
}

// Create the popup div that will display the data.
const popupDiv = document.createElement('div')
const popupNav = document.createElement('div')
const popupBody = document.createElement('div')
popupDiv.id = 'popup'
popupNav.classList.add('popup-nav')
popupBody.classList.add('popup-body')
document.body.append(popupDiv)
popupNav.innerHTML = navbar
popupDiv.append(popupNav)
popupBody.innerHTML = uiElements
popupDiv.append(popupBody)

// Makes a request to the API endpoint to grab the kanji data
const getData = async () => {
  try {
    const response = await getKanji(selectedKanji)
    kanjiData = response.data
    console.log(kanjiData)
    // document.getElementById('popup').innerHTML = uiElements
    document.getElementById('main-kanji').textContent = kanjiData.kanji
    document.getElementById('kunyomi').textContent = kanjiData.kun_readings.join(', ')
    document.getElementById('onyomi').textContent = kanjiData.on_readings.join(', ')
    document.getElementById('name-readings').textContent = kanjiData.name_readings.join(', ')
    document.getElementById('meanings').textContent = kanjiData.meanings.join(', ')
  } catch(err) {
    console.log(err)
  }
}

function updateSelectedKanji(e) {
  if (e.target.id === 'popup') return
  if (!regexKanji.test(e.target.textContent)) {
    console.log('Not a valid kanji character.')
    return
  }
  selectedKanji = e.target.textContent
  console.log(selectedKanji)
  getData()
}

function addHighlight(e) {
  if (e.target.classList.contains('kanji')) {
    e.target.classList.add('highlighted')
  }
}

function removeHighlight(e) {
  if (e.target.classList.contains('highlighted')) {
    e.target.classList.remove('highlighted')
  }
}

// Make the DIV element draggable:
dragElement(document.getElementById('popup'));

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

document.body.addEventListener('click', updateSelectedKanji)
document.body.addEventListener('mouseover', addHighlight)
document.body.addEventListener('mouseout', removeHighlight)