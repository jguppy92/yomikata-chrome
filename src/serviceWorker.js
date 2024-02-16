import axios from "axios"

const baseUrl = 'https://kanjiapi.dev/v1/kanji'
// const regexKanji = /^[一-龯]+$/

export function getKanji(selectedKanji) {
    return axios.get(`${baseUrl}/${selectedKanji}`)
  }