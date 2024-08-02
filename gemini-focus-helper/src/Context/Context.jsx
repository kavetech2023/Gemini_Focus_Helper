import { createContext } from 'react';
import run from '../config/gemini';
import { useState } from 'react';

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState('');
    const [recentPrompt, setRecentPrompt] = useState("");
    const [previousPrompts, setPreviousPrompts] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState("");

    const delayParameter = (index, nextWord) =>{
        setTimeout(() => {
            setResults(prev => prev + nextWord);
        }, 75*index);
    }

    const onSend = async (prompt) => {
       setResults("") 
       setLoading(true);
       setShowResults(true);
       setRecentPrompt(input);
       setPreviousPrompts(prev => [...prev, input]);
       //get the response from the model
       const response = await run(input);
       //split the response into an array
       let responseArray = response.split("**");
       let newResponse ="";
       for(let i = 0; i < responseArray.length; i++){
           if(i === 0 || i % 2 !== 1){
               newResponse += responseArray[i];
           }else{
                newResponse += "<b>" + responseArray[i] + "</b>";
           }
       }
       let newResponse2 = newResponse.split("*").join("</br>");
       let newResponseArray = newResponse2.split(" ");

       for(let i = 0; i < newResponseArray.length; i++)
        {
            const nextWord = newResponseArray[i];
            delayParameter(i, nextWord+" ");
       }

       //setResults(newResponse2);
       setLoading(false);
       setInput("");
    }
    

    const contextValue = {
        previousPrompts,
        setPreviousPrompts,
        onSend,
        setRecentPrompt,
        recentPrompt,
        showResults,
        loading,
        results,
        input,
        setInput
    }
    return(
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}


export default ContextProvider;