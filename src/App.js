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

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {kanji.kanji}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
