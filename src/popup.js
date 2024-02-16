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
  <dl className="kanji-detail">
    <dt>
      Kun'yomi: <dd id="kunyomi"></dd>
    </dt>
    <dt>
      On'yomi: <dd id="onyomi"></dd>
    </dt>
    <dt>
      Nanori: <dd id="name-readings"></dd>
    </dt>
    <dt>
      Meanings: <dd id="meanings"></dd>
    </dt>
  </dl>
`