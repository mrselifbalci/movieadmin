import React,{useState,useEffect} from 'react'
import axios from 'axios'
import '../../styles/pages.css' 

export default function ContactInfo({apiBaseUrl}) {
    const [data,setData]=useState([])
    const [name,setName]=useState([])
    const [address,setAddress]=useState([])
    const [email,setEmail]=useState([])
    const [phone,setPhone]=useState([])
    const [copyright,setCopyright]=useState([])
    const [id,setId]=useState([])
    const [logo,setLogo]=useState([])
    const [socialMedia,setSocialMedia]=useState([])
   

    useEffect(() => {
        axios
			.get(`${apiBaseUrl}/companyprofile`)
			.then((res) => {
				setData(res.data.response[0]);
                setAddress(res.data.response[0].address)
                setEmail(res.data.response[0].email)
                setPhone(res.data.response[0].phone)
                setCopyright(res.data.response[0].copyright)
                setLogo(res.data.response[0].logo)
                setName(res.data.response[0].name)
                setId(res.data.response[0]._id)
			})
			.catch((err) => {
				console.log(err);
			});
    }, [])



    const handleSubmit=()=>{
       
        const formData = new FormData();
        formData.append("name", name);
        formData.append("phone", phone);
        formData.append("email", email);
        formData.append("address", address);
        formData.append("copyright", copyright);
        formData.append("logo", logo);
        formData.append("alt",name );
       
        axios.put(`${apiBaseUrl}/companyprofile/${id}`,formData)
        .then(res=>{
            window.location.reload()
       

        })
        .catch(err=>{console.log(err)})
    }

    return (
        <div className="component-wrapper contact-info-wrapper">
               <form className="contact-info-form" onSubmit={(e)=>{e.preventDefault();handleSubmit()}} >
                   <h2>Update the details...</h2>
                   <div className="contact-info-row">
                        <div className="contact-info-row-item">
                            <label>Name</label>&nbsp; 
                            <input value={name} onChange={(e)=>{setName(e.target.value)}}/>
                        </div>
                        <div className="contact-info-row-item">
                            <label>Address</label>&nbsp; 
                            <input value={address} onChange={(e)=>{setAddress(e.target.value)}}/>
                        </div>
                   </div>
                  <div className="contact-info-row">
                       <div className="contact-info-row-item">
                            <label>Phone Number</label>&nbsp; 
                            <input value={phone} onChange={(e)=>{setPhone(e.target.value)}}/>
                        </div>
                        <div className="contact-info-row-item">
                            <label>Email</label>&nbsp; 
                            <input value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                        </div>
                  </div>
                  <div className="contact-info-row">
                        <div className="contact-info-row-item">
                            <label>Copyright Text</label>&nbsp; 
                            <input value={copyright} onChange={(e)=>{setCopyright(e.target.value)}}/>
                        </div>
                        <div className="contact-info-row-item">
                            <label>Logo</label>&nbsp; 
                            <input type="file" onChange={(e)=>{setLogo(e.target.files[0])}}/>
                        </div>
                   </div>
                  <div className="contact-info-row-item-button">
                     <button type="submit" className="submit-button contact-info-submit-btn">Submit</button>
                  </div>
                   
               </form>
        </div>
        
    )
}
