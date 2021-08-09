import React, { useState }from 'react'
import axios from 'axios'
import '../../styles/categories-faq.css'  

export default function AddCategory({apiBaseUrl}) {
    const [name,setName]=useState('')
    const [status,setStatus]=useState('')
    const [description,setDescription]=useState('')
    const [warningText,setWarningText]=useState('no-warning-text')
 

    
    const handleSubmit=async(e)=>{
    e.preventDefault()
    await axios.post(`${apiBaseUrl}/categories`,{
        name, description, status})
          .then((res)=>{
            console.log(res.data)
          })
          .catch((err)=>console.log(err))
          setWarningText('warning-text')
    }
    
    const cancelUpload = (e) => {
        e.preventDefault()
        setName('')
        setDescription('')
        setWarningText('no-warning')
     
  }

    return (
      <div className="add-item-container component-wrapper">
          <div className="add-item-title"><h1>Add Category</h1></div>
          <form className="add-item-form-container" onSubmit={handleSubmit}>  
                <div className="add-item">
                            <input className="add-item-name-input" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} />
                </div>
                <div className={warningText}>A category with that name already exists.</div>
                <div className="add-item">
                            <textarea className="add-item-description-input"  placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)} />
                </div>
                <div className="add-item-buttons">
                        <button className="add-item-buttons-each submit-button" type="submit">Submit</button>
                        <button className="add-item-buttons-each cancel-button" onClick={cancelUpload}>Cancel</button>
               </div>
          </form>
      </div>
      
    )
    }


