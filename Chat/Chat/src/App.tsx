import { useState, useEffect, useRef } from 'react'
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr'
import './App.css'

interface Message {
  user: string
  message: string
  timestamp: Date
}

function App() {
  const [connection, setConnection] = useState<HubConnection | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [user, setUser] = useState('')
  const [message, setMessage] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl("https://localhost:32768/chatHub")
      .build()

    setConnection(newConnection)
  }, [])

  useEffect(() => {
    if (connection) {
      connection.start()
        .then(() => {
          console.log("SignalR Connected.")
          setIsConnected(true)
        })
        .catch((err) => console.log('SignalR Connection Error: ', err))

      connection.on("ReceiveMessage", (user: string, message: string) => {
        const newMessage: Message = {
          user,
          message,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, newMessage])
      })

      return () => {
        connection.stop()
      }
    }
  }, [connection])

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (message && user && connection) {
      try {
        await connection.invoke("SendMessage", user, message)
        setMessage('')
      } catch (err) {
        console.error(err)
      }
    }
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>💬 Chat em Tempo Real</h1>
        <div className="connection-status">
          Status: {isConnected ? '🟢 Conectado' : '🔴 Desconectado'}
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.user === user ? 'own-message' : 'other-message'}`}>
            <div className="message-header">
              <span className="user-name">{msg.user}</span>
              <span className="timestamp">
                {msg.timestamp.toLocaleTimeString()}
              </span>
            </div>
            <div className="message-content">
              {msg.message}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} className="chat-input">
        <div className="input-group">
          <input
            type="text"
            placeholder="Seu nome..."
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="user-input"
            disabled={!isConnected}
          />
          <input
            type="text"
            placeholder="Digite sua mensagem..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="message-input"
            disabled={!isConnected}
          />
          <button 
            type="submit" 
            disabled={!isConnected || !message.trim() || !user.trim()}
            className="send-button"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  )
}

export default App
