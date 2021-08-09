import React, { useState }from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import '../../styles/categories-faq.css' 


export default function AddFaq({apiBaseUrl}) {
    const [question,setQuestion]=useState('')
    const [answer,setAnswer]=useState('')


     

    const handleSubmit=async(e)=>{
    e.preventDefault()
    await axios.post(`${apiBaseUrl}/faqs`,{
        question, answer})
          .then((res)=>{
            console.log(res.data)
          }) 
          .catch((err)=>console.log(err))
      
    }
    
    const cancelUpload = (e) => {
        e.preventDefault()
        setQuestion('')
        setAnswer('') 
  }

    return (
      <div className="add-item-container component-wrapper">
          <div className="add-item-title"><h1>Add FAQ</h1></div>
          <form className="add-item-form-container" onSubmit={handleSubmit}>
                <div className="add-item">
                            <input placeholder="Question" value={question} onChange={(e)=>setQuestion(e.target.value)} />
                </div>
                <div className="add-item">
                            <textarea  placeholder="Answer" value={answer} onChange={(e)=>setAnswer(e.target.value)} />
                </div>
             
                <div className="add-item-buttons">
                        <button className="add-item-buttons-each submit-button" type="submit">Submit</button>
                        <button className="add-item-buttons-each cancel-button" onClick={cancelUpload}>Cancel</button>
                      </div>
          </form>
      </div>
      
    )
    }


