function App() {
  const getMesseges = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: "hello how are you?"
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }

    try {
        const response = await fetch('http://localhost:8000/completions', options)
        const data = await response.json()
        console.log(data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="app">
      <section className="sidebar">
        <button>+ New Chat</button>
        <ul className="history"></ul>
        <nav>
          <p>Made by <a href="https://github.com/dedku" target="_blank" rel="noopener noreferrer">@Patryk</a></p>
        </nav>
      </section>
      <section className="main">
        <h1>PatrykGPT</h1>
        <ul className="feed">

        </ul>
        <div className="bottom-section">
          <div className="input-container">
            <input type="text" />
            <div id="submit" onClick={getMesseges}>➢</div>
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
