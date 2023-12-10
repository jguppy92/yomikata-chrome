import React from 'react';
import logo from './logo.svg';
import './App.css';
import { getKanji } from './lib/api';

function App() {
  const [kanji, setKanji] = React.useState('')

  const testKanji = '酒'

  React.useEffect(() => {
    const getData = async () => {
      try {
        const response = await getKanji(testKanji)
        setKanji(response.data)
      } catch(err) {
        console.log(err)
      }
    }
    getData()
  }, [])

  console.log(kanji.kun_readings)

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <div className="main-kanji">
        <p>{kanji.kanji}</p>
      </div>
      <div className="kanji-detail">
        <div className="column">
          <p>
            Kun'yomi: {kanji && kanji.kun_readings.join(', ')}
          </p>
          <p>
            On'yomi: {kanji && kanji.on_readings.join(', ')}
          </p>
        </div>
        <div className="column">
          <p>
            Nanori: {kanji && kanji.name_readings.join(', ')}
          </p>
          <p>
            Meanings: {kanji && kanji.meanings.join(', ')}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
