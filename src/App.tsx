import {useEffect, useState, useCallback} from 'react'

type PrevChat = {
  title: string | string[] | null,
  role: string | undefined | null,
  content: string | undefined | null,
}

type Message = {
  role?: string,
  content?: string,
  message?: string
}

function App() {
  const [value, setValue] = useState<string>('')
  const [message, setMessage] = useState<null | Message >(null)
  const [previousChats, setPreviousChats]  = useState<PrevChat[]>([])
  const [currentTitle, setCurrentTitle] = useState<string | string[] | null>(null)
  const [isValue, setIsValue] = useState<boolean>(false)

  const createNewChat = useCallback(() => {
    setMessage(null);
    setValue('');
    setCurrentTitle(null);
  }, []);

  const checkMessage = ()=> {
    if(message !== null ){
      console.log('test')
      return message.message || message.content
    }
      return null
  }

  const handleClick = useCallback((uniqueTitle : string | string[] | null) => {
    setCurrentTitle(uniqueTitle)
    setMessage(null);
    setValue('');
  }, [])

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

    if(value === null || value === ''){
      return setIsValue(true)
    }

    try {
        setIsValue(false)
        const response = await fetch('http://localhost:8000/completions', options)
        const data = await response.json()
        const respMessage = await data.choises === undefined ? data.error : data.choises[0].message
        setMessage(respMessage)
    } catch (error) {
      console.error(error)
    }

  }

  useEffect(()=> {
      if(!currentTitle && value && message){
        setCurrentTitle(value)
      }
      setPreviousChats(prevChats => ([
        ...prevChats,
        {
          title: currentTitle,
          role: 'user',
          content: value
        },
        {
          title: currentTitle,
          role: message !== null ? message.role : 'assistant',
          content:  checkMessage()
        }
      ]));
      console.log(message, currentTitle)
      setValue('');
  }, [message, currentTitle])

  const currentChat = previousChats.filter(previousChat => previousChat.title === currentTitle)
  const uniqueTitles = Array.from(new Set(previousChats.map(previousChat => previousChat.title)))
  console.log(currentChat)

  return (
    <div className="app">
      <section className="sidebar">
        <button onClick={createNewChat}>+ New Chat</button>
        <ul className="history">
        {uniqueTitles?.map((title, index) => <li key={index} onClick={() => handleClick(title)}>{title}</li>)}
        </ul>
        <nav>
          <p>Made by <a href="https://github.com/dedku" target="_blank" rel="noopener noreferrer">@Patryk</a></p>
        </nav>
      </section>
      <section className="main">
        {!currentTitle && <h1>PatrykGPT</h1>}
        <ul className="feed">
          {currentChat?.map((chatMassage, index) => chatMassage.content !== null ? <li key={index}><p>{chatMassage.content}</p></li> : null )}
        </ul>
        <div className="bottom-section">
          <div className="input-container">
            {isValue && <span className="errorMassage">Input is empty</span>}
            <input id="gptValue" value={value} onChange={(e) => setValue(e.target.value)} />
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
