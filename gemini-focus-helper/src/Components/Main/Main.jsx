import React,{useContext} from 'react'
import './Main.css'
import { FaUser } from "react-icons/fa";
import { FaRegCompass } from "react-icons/fa6";
import { FaRegLightbulb } from "react-icons/fa6";
import { AiOutlineMessage } from "react-icons/ai";
import { IoCodeSlashOutline } from "react-icons/io5";
import { MdAddAPhoto } from "react-icons/md";
import { CiMicrophoneOn } from "react-icons/ci";
import { IoMdSend } from "react-icons/io";
import { Context } from '../../Context/Context';
import { SiGooglegemini } from "react-icons/si";

const Main = () => {

    const {onSend, recentPrompt, showResults, loading, results, input, setInput} = useContext(Context);

  return (
    <div className='main'>
        <div className='nav'>
            <p>Gemimi</p>
            <span><FaUser /></span>
        </div>
        <div className="main-container">

            {!showResults
            ?
            <>
            <div className="greet">
                <p><span>Hello, Dev.</span></p>
                <p>How can i help you today?</p>
            </div>
            <div className="cards">
                <div className="card">
                    <p>suggest beautiful places to see on an upcoming road trip.</p>
                    <span><FaRegCompass /></span>
                </div>
                <div className="card">
                    <p>summarize the concept of urban planning.</p>
                    <span><FaRegLightbulb /></span>
                </div>
                <div className="card">
                    <p>Brainstorm team bonding activities for our work retreat.</p>
                    <span><AiOutlineMessage /></span>
                </div>
                <div className="card">
                    <p>Improve the readability of the following code.</p>
                    <span><IoCodeSlashOutline /></span>
                </div>
            </div>
            </>:
            //if showResults is true, render the following div
            <div className='results'>
                    <div className='result-title'>
                        <span><FaUser /></span>
                        <p>{recentPrompt}</p>
                    </div>
                    <div className='result-data'>
                        <span><SiGooglegemini color="#208efb" size={40}/></span>
                        {loading
                        ?<div className='loader'>
                            <hr />
                            <hr />
                            <hr />
                        </div>
                        :<p dangerouslySetInnerHTML={{__html:results}}></p>   
                        }
                        
                    </div>
            </div>    
            }
            
            <div className="main-bottom">
                <div className="search-box">
                    <input onChange={(e)=>setInput(e.target.value)}  value={input} type="text" placeholder='Enter a prompt here' />
                    
                    <div>
                        <span><MdAddAPhoto /></span>
                        <span><CiMicrophoneOn /></span>
                      {input?
                      <span onClick={()=>onSend()}><IoMdSend /></span>
                    :null} 
                    </div>
                </div>
                <p className="bottom-info">This app may display inaccurate info from time to time. Please do not be alarmed.</p>
            </div>
        </div>
    </div>
  )
}

export default Main