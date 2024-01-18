export const uiElements = `
  <div className="popup-navbar">
    <h1>Yomikata</h1>
  </div>
  <div className="popup-body">
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
  </div>
`