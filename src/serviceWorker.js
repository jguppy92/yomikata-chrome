import axios from "axios"

const baseUrl = 'https://kanjiapi.dev/v1/kanji'
const regexKanji = /^[一-龯]+$/

export function getKanji(selectedKanji) {
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
  
  // Call the function when the page is loaded
  window.onload = function () {
    const contentElement = document.getElementsByTagName('body')[0]
    wrapKanjiCharacters(contentElement);
  }