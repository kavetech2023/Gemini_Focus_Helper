import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { CiMenuBurger } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { FiMessageSquare } from "react-icons/fi";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { MdHistory } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { Context } from "../../Context/Context";

const Sidebar = () => {
  const [extendIt, setExtendIt] = useState(false);
  const {onSend,previousPrompts, setRecentPrompt, newChat} = useContext(Context);


  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt)
    await onSend(prompt);
  }
  return (
    <div className="sidebar">
      <div className="top">
        <span onClick={()=>setExtendIt(prev=>!prev)} className="menu">
          <CiMenuBurger />
        </span>
        <div onClick={()=>newChat()}className="new-chat">
          <span>
            <FaPlus />
          </span>
          {extendIt ? <p>New Chat</p> : null}
        </div>

        {extendIt ? 
            //if extendIt is true, render the following div
          <div className="recent">
            <p className="recent-title">Recent</p>
            {previousPrompts.map((item, index) => {
                return (
                    <div onClick={()=>loadPrompt(item)} className="recent-entry">
                    <span>
                      <FiMessageSquare />
                    </span>
                    <p>{item.slice(0,18)}...</p>
                  </div>

                )

            })}
                
            
            
            
            
          </div>
        
        // else render null
        : null}
      </div>

      <div className="bottom">
        <div className="bottom-item recent-entry">
          <span>
            <IoMdHelpCircleOutline />
          </span>
          {
            //if extendIt is true, render the following p tag
          extendIt?<p>Help</p>:null
          }
        </div>
        <div className="bottom-item recent-entry">
          <span>
            <MdHistory />
          </span>
          {
            //if extendIt is true, render the following p tag
            extendIt?<p>Activity</p>:null
          }
         
        </div>
        <div className="bottom-item recent-entry">
          <span>
            <IoMdSettings />
          </span>
          {
            //if extendIt is true, render the following p tag
            extendIt?<p>Settings</p>:null
          }
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
