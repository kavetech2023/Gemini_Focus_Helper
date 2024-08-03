import { createContext } from 'react';
import run from '../config/gemini';
import { useState } from 'react';

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState('');
    const [recentPrompt, setRecentPrompt] = useState("");
    const [previousResults, setPreviousResults] = useState([]); 
    const [previousPrompts, setPreviousPrompts] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState("");
    

    
    const delayParameter = (index, nextWord) =>{
        setTimeout(() => {
            setResults(prev => prev + nextWord);
        }, 75*index);
    }

    const newChat = () => {
        setLoading(false);
        setShowResults(false);
    }

    const onSend = async (prompt) => {
       setResults("") 
       setLoading(true);
       setShowResults(true);

       const combinedPrompt = [...previousPrompts, prompt].join("\n");


       let response = await run(combinedPrompt);
  setRecentPrompt(combinedPrompt);
       if (prompt !== undefined){
            response = await run(prompt);
            setRecentPrompt(prompt);
       }else{
        setPreviousPrompts(prev => [...prev, input]);
        setRecentPrompt(input);
        response = await run(input);
       }
       
       
       //split the response from Ai-model into an array
       let responseArray = response.split("**");
       let newResponse ="";
       // loop over the already split array and add bold tags to every other element
       for(let i = 0; i < responseArray.length; i++){
           if(i === 0 || i % 2 !== 1){
            //if the element is not odd, add it to the newResponse string
               newResponse += responseArray[i];
           }else{
            //if the element is odd, add bold tags to it and add it to the newResponse string
                newResponse += "</br> "+"<b>" +  responseArray[i] + "</b>";
           }
       }
         //split the newResponse string into an array
       let newResponse2 = newResponse.split("*").join("</br>");
       let newResponseArray = newResponse2.split(" ");

       for(let i = 0; i < newResponseArray.length; i++)
        {
            const nextWord = newResponseArray[i];
            delayParameter(i, " "+nextWord+" ");
       }

       
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
        setInput,
        newChat
    }
    return(
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}


export default ContextProvider;