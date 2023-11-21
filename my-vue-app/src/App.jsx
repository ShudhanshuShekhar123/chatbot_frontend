import axios from "axios";
import React, { useState } from 'react';
import './App.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [prompt, setPrompt] = useState([])
  const [text, setText] = useState("")
  const [loading, setloading] = useState(false)
  const [loaded, setloaded] = useState(true)
  const [description, showdescription] = useState(true)
  const [loader, setloader] = useState(false)
  const [buttontext, setbuttontext] = useState(true)


  const notify = () => toast.error('Please, ask some question first', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    })


  


  console.log(prompt, "here")


  const handlesetusertext = (e) => {

    setText(e.target.value)
  }


  const handleclick = () => {

    if(text.trim() === ""){
    return  notify()
    }

  setloader(true)
    setText("")
    // setloading(true)


    const obj = {
      role: 'user',
      content: text,
    };


    setPrompt(prevPrompt => [...prevPrompt, obj]);


    axios.post('https://chat-8hwk.onrender.com/chat', obj)
      .then(response => {
        console.log(response.data);
        // let assistantdata = response.data
        // setloading(false)
        setloader(false)
        setPrompt(prevPrompt => [...prevPrompt, response.data]);

      })
      .catch(error => {
        console.error('Error:', error);
      });






  }

  const startconvo = () => {
    setloaded(false)
    showdescription(false)
    setbuttontext(false)

    const obj = {
      role: 'user',
      content: 'hi, tell about yoyrself?',
    };

    // Make a POST request using Axios
    axios.post('https://chat-8hwk.onrender.com/start', obj)
      .then(response => {
        console.log(response.data);
        setloading(true)
        setloaded(true)
        // let assistantdata = response.data
        setPrompt(prevPrompt => [...prevPrompt, response.data]);
      })
      .catch(error => {
        console.error('Error:', error);
      });

  }




  return (
    <div>
      <h1>Mindful Mentor</h1>
      <div className='container' style={{ height: description ? "60vh" : "null" }}>



        {

          !loaded ? <div  className="loadediv"></div>

            :
            description ? <div>
              <img width={"200px"} height={"200px"} src="https://openclipart.org/image/800px/307415" alt="" />

              <h3>A Compassionate chatbot designed to support users facing mental health challenges like depression, anxiety, and sadness. This virtual companion engages in empathetic conversations, providing a safe space for users to explore emotions and develop personalized coping strategies. With 24/7 availability, It combines advanced natural language processing with evidence-based information to empower individuals on their journey to emotional well-being.</h3>

            </div>

              :
              prompt.map((item) => {
                if (item.role == "assistant") {
                  return <div>

                    <p className="left" key={Math.random()}> <span style={{color:"rgb(249, 249, 4)", fontSize:"28px", fontWeight:"600"}}>Mentor: </span> {item.content}  </p>
                  </div>
               

                } else if (item.role == "user") {
                  return <div>
                    <p className="right" key={Math.random()}> <span style={{color:"rgb(249, 249, 4)",  fontSize:"28px", fontWeight:"600"}}>Me: </span>{item.content}</p>

                  </div>


                }


              })
        }




      </div>



      {
        !loading ? <button disabled ={buttontext ? false : true }  onClick={startconvo} className="button-29" role="button">{     buttontext ? "Start Conversation" : "Processing..."  }  </button>

          :

          <div style={{ backgroundColor: "white", borderRadius: "15px", paddingRight: "5px", paddingLeft: "7px" }} className="send">

            <input onChange={handlesetusertext} value={text} className="textfield" type="text" placeholder="Ask your question here...." />
            {

            loader ? <span className="loader"></span> :
            
            <img style={{ cursor: "pointer" }} onClick={handleclick} width="60px" height="60px" src="https://cdn4.iconfinder.com/data/icons/message-4-flat/512/26_Send-512.png" alt="" />
            }
          </div>

      }






<ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
/>
    </div>
  )
}

export default App
