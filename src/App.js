import React,{useState, useEffect} from 'react';
import './App.css';
import { FormControl, Input, IconButton} from '@material-ui/core';
import Message from './Message';
import db from './firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';


function App() {
  
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [username, setUsername] = useState('');

  useEffect(() => {
    db.collection('messages')
    .orderBy('timestamp', 'desc')
    .onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => ({id: doc.id, message: doc.data()})))
    })
  }, [])

  useEffect(() => {
    setUsername(prompt('Please enter Your name'))
  }, [])

  const sendMessage = (event) => {
    event.preventDefault();
    db.collection('messages').add({
      username: username, 
      message: input, 
      timestamp: firebase.firestore.FieldValue.serverTimestamp()})
    setInput('');
  }

  return (
    <div className='App'>
        <img src="https://facebookbrand.com/wp-content/uploads/2019/10/Messenger_Logo_Color_RGB.png?w=100&h=100" alt="Facebook Messenger"/>
        <h1>Facebook Messenger</h1>
        <h3>WelCome {username}</h3>
        <form className="app__form">
        <FormControl className="app__formControl">
          <Input className="app__input" placeholder="Enter a message" value={input} onChange={event => setInput(event.target.value)} />
          <IconButton className="app__iconButton" disabled={!input} variant="contained" color="primary" type='submit' onClick={sendMessage}><SendIcon/></IconButton>
          
        </FormControl>
        </form>

        <FlipMove>
        { 
          messages.map(({id,message}) => {
            return <Message key={id} username={username} message={message}/>
          })
        }
        </FlipMove>
    </div>
  );
  
}

export default App;
