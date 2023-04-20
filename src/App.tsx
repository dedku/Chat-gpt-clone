function App() {

  return (
    <div className="app">
      <section className="sidebar">
        <button>+ New Chat</button>
        <ul className="history"></ul>
        <nav>
          <p>Made by Patryk</p>
        </nav>
      </section>
      <section className="main">
        <h1>PatrykGPT</h1>
        <ul className="feed">

        </ul>
        <div className="bottom-section">
          <div className="input-container">
            <input type="text" />
            <div id="submit"></div>
          </div>
          <p className="info">
          ChatGPT Mar 23 Version. Free Research Preview. ChatGPT may produce inaccurate information about people, places, or facts.
          </p>
        </div>
      </section>
    </div>
  )
}

export default App
