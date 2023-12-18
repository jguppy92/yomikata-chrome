import axios from "axios"

const baseUrl = 'https://kanjiapi.dev/v1/kanji'

export function getKanji(selectedKanji) {
    return axios.get(`${baseUrl}/${selectedKanji}`)
  }