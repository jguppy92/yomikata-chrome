export const navbar = `
  <ul className="popup-nav-list">
    <li className="popup-nav-item"><h1 className="logo">読</h1></li>
    <li className="popup-nav-item"><h1 className="yomikata-title">Yomikata</h1></li>
    <li className="popup-nav-item help" style="float:right"><h1>?</h1></li>
  </ul>
`

export const uiElements = `
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