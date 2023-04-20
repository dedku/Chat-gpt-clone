import {useEffect, useState} from 'react'

type PrevChat = {
  title: string | string[],
  role: string,
  content: string,
  message?: string
}

type Message = {
  user: string,
  content: string
}

function App() {
  const [value, setValue] = useState<string>('')
  const [message, setMessage] = useState<null | Message>(null)
  const [previousChats, setPreviousChats]  = useState<PrevChat[]>([])
  const [ currentTitle, setCurrentTitle] = useState<string | string[] | null>([])

  const createNewChat = () => {
    setMessage(null)
    setValue('')
    setCurrentTitle(null)
  }

  const getMesseges = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: value
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }

    try {
        const response = await fetch('http://localhost:8000/completions', options)
        const data = await response.json()
        const respMessage = await data.choises == undefined ? data.message : data.choises[0].message
        setMessage(respMessage)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(()=> {
      if(!currentTitle && value && message){
        setCurrentTitle(value)
      }
      if(currentTitle && value && message) {
        setPreviousChats(previousChats => (
            [...previousChats, {
              title: currentTitle,
              role: "user",
              content: value
            },
            {
              title: currentTitle,
              role: message.user,
              content: message.content
            }
          ]
          ))
      }

  }, [message, currentTitle, value])

  const currentChat = previousChats.filter(previousChats => previousChats.title === currentTitle)
  console.log(currentChat)

  return (
    <div className="app">
      <section className="sidebar">
        <button onClick={createNewChat}>+ New Chat</button>
        <ul className="history"></ul>
        <nav>
          <p>Made by <a href="https://github.com/dedku" target="_blank" rel="noopener noreferrer">@Patryk</a></p>
        </nav>
      </section>
      <section className="main">
        {!currentTitle && <h1>PatrykGPT</h1>}
        <ul className="feed">
          {currentChat.map((chatMassage, index) => <li key={index}><p className="role">{chatMassage.role}</p><p>{chatMassage.message}</p></li> )}
        </ul>
        <div className="bottom-section">
          <div className="input-container">
            <input value={value} onChange={(e) => setValue(e.target.value)} />
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
