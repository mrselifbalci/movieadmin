import React,{useState,useEffect} from 'react'
import axios from 'axios'
import '../../styles/footer.css'



export default function Footer({apiBaseUrl}) {
    const today = new Date().getFullYear();
    const [name,setName]=useState([])
    const [copyright,setCopyright]=useState([]) 
    useEffect(() => {
        axios
			.get(`${apiBaseUrl}/companyprofile`)
			.then((res) => {
                setName(res.data.response[0].name)
                setCopyright(res.data.response[0].copyright)
                
			})
			.catch((err) => {
				console.log(err);
			});
    }, [])

 
    return ( 
        <div className='footer-wrapper'>
            <div className='footer-page-links'>
                <a href='/privacypolicy' className="footer-item">Privacy Policy</a>
                <a href="/termsofuse" className="footer-item">Term of Use</a>
                <a href="/about" className="footer-item">About Us</a>
                <a href="/contactinfo" className="footer-item">Contact</a>
            </div> 
            <div className='footer-copyright-text'>
                <p>&copy;{today} <span>{name}</span> {copyright}</p>
            </div>
        </div>
    )
} 