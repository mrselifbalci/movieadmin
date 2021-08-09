import React, {useState} from 'react';
import { GiHamburgerMenu, GiFiles } from "react-icons/gi";
import { RiContactsBookLine } from "react-icons/ri";
import { BsQuestionSquare,BsInfoSquare,BsFillPlusSquareFill } from "react-icons/bs";
import {BsFillEyeFill,BsFillHouseDoorFill,BsFillStarFill,BsChatFill,BsFillPeopleFill,BsCardList,BsFilm,BsChevronRight,BsEnvelope } from "react-icons/bs";
import {IoNotificationsOutline} from 'react-icons/io5';
import '../../styles/header.css'

export default function Header() {

const [sidebarClass,setSidebarClass]=useState(true)

const[categoryClassname,setCategoryClassname]=useState(false)
const[trailerClassname,setTrailerClassname]=useState(false)
const[pagesClassname,setPagesClassname]=useState(false)
const[faqClassname,setFaqClassname]=useState(false)

const[categoryArrowClass,setCategoryArrowClass]=useState(true)
const[trailerArrowClass,setTrailerArrowClass]=useState(true)
const[pagesArrowClass,setPagesArrowClass]=useState(true)
const[faqArrowClass,setFaqArrowClass]=useState(true)

const toggleSidebarClass=()=>{ 
  setSidebarClass(!sidebarClass)
}

const toggleDropdown=(section)=>{
  switch(section){
    case "trailer":
      setTrailerClassname(!trailerClassname)
      setTrailerArrowClass(!trailerArrowClass)
    break;
    case "category":
      setCategoryClassname(!categoryClassname)
      setCategoryArrowClass(!categoryArrowClass)
    break;
    case "faq":
      setFaqClassname(!faqClassname)
      setFaqArrowClass(!faqArrowClass)
    break;
    case "pages":
      setPagesClassname(!pagesClassname)
      setPagesArrowClass(!pagesArrowClass)
    break;
   default: return null
  }
}
    return (
       <div className="header-container"> 
          <div className="top-header-container">
            <div className="header-logo-container">
                <a href="/" className="logo-text">CINETRAIL</a>
                <div className="hamburger-icon" onClick={toggleSidebarClass}>
                  <GiHamburgerMenu/>
                </div>
            </div>
          
            <div className="header-profile-container">
                <IoNotificationsOutline className="notification-icon" />
                <BsEnvelope className="envelope-icon"/>
                <img className="header-profile-img" src="https://i.postimg.cc/C13Ccsp0/christiana-rivers-O-XIv-Dy0pcs-unsplash.jpg" alt="pic"/>
            </div>
          </div>
          <div className={sidebarClass===true?"sidebar-container":"sidebar-container-overlay"}>
              <div className="menu-item"><a href="/dashboard"><BsFillHouseDoorFill/> Dashboard</a></div>
              <div className="menu-item">
                      
                       <div> <BsFilm/> Trailer</div>
                       <div>
                         <BsChevronRight className={trailerArrowClass===true?"sidebar-right-arrow":"sidebar-down-arrow"} onClick={(e)=>{toggleDropdown("trailer")}}/>
                       </div>            
              </div>
              <div className={trailerClassname===false?"dropdown-closed":"dropdown-open"}>
                        <div className="dropdown-item"> <BsFillPlusSquareFill/> <a href="/addtrailer">Add Trailer</a></div>
                        <div className="dropdown-item"> <BsFillEyeFill/> <a href="/trailers">Trailer List</a></div>
              </div> 
              <div className="menu-item"><a href="/ratings"> <BsFillStarFill/> Rating</a></div>
              <div className="menu-item"><a href="/commentlist"> <BsChatFill/> Comments</a></div>
              <div className="menu-item"><a href="/userlist"> <BsFillPeopleFill/> User</a></div>
              <div className="menu-item"> <RiContactsBookLine/> <a href="/messages">&nbsp;Messages</a></div>
              <div className="menu-item">
                       <div><BsCardList/> Category</div> 
                       <div>
                         <BsChevronRight className={categoryArrowClass===true?"sidebar-right-arrow":"sidebar-down-arrow"}  onClick={(e)=>{toggleDropdown("category")}}/>
                       </div>
              </div>
              <div className={categoryClassname===false?"dropdown-closed":"dropdown-open"}>
                        <div className="dropdown-item"><BsFillPlusSquareFill/> <a href="/addcategory">Add Category</a></div>
                        <div className="dropdown-item"> <BsFillEyeFill/> <a href="/categories"> Category List</a></div>
              </div>
                    
              <div className="menu-item">
                        <div> <BsQuestionSquare/> Faq</div>
                        <div>
                         <BsChevronRight className={faqArrowClass===true?"sidebar-right-arrow":"sidebar-down-arrow"}  onClick={(e)=>{toggleDropdown("faq")}}/>
                        </div>            
              </div>
              <div className={faqClassname===false?"dropdown-closed":"dropdown-open"}>
                        <div className="dropdown-item"> <BsFillPlusSquareFill/> <a href="/addfaq">Add FAQ</a></div>
                        <div className="dropdown-item"> <BsFillEyeFill/> <a href="/faqs">FAQ List</a></div>
              </div>
              <div className="menu-item">
                       <div> <GiFiles/> Pages </div>
                       <div>
                         <BsChevronRight className={pagesArrowClass===true?"sidebar-right-arrow":"sidebar-down-arrow"}  onClick={(e)=>{toggleDropdown("pages")}}/>
                       </div>
              </div> 
              <div className={pagesClassname===false?"dropdown-closed":"dropdown-open"}>
                        <div className="dropdown-item"> <BsInfoSquare/> <a href="/about">About Us</a></div>
                        <div className="dropdown-item"> <BsInfoSquare/> <a href="/privacypolicy">Privacy Policy</a></div>
                        <div className="dropdown-item"> <BsInfoSquare/> <a href="/termsofuse">Terms of Use</a></div>
                        <div className="dropdown-item"> <BsInfoSquare/> <a href="/contactinfo">Contact Info</a></div>
              </div>             
          </div>
        </div>
    )
}
