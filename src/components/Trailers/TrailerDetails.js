import React,{useState,useEffect} from 'react'
import axios from 'axios' 
import { Link} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import ReactPlayer from "react-player";
import '../../styles/trailers.css'

export default function TrailerDetails({apiBaseUrl}) {
    
    const { id } = useParams();
    const [trailer,setTrailer]=useState([])
 useEffect(() => {
     axios 
     .get(`${apiBaseUrl}/trailers/${id}`)
     .then((res)=>{
        setTrailer(res.data)
        
     })
     .catch((err) => {
        console.log(err);
    });
 }, [])
    return (
        <div className="component-wrapper"> 
            <div className="player-wrapper">
                <ReactPlayer 
                    url={trailer.trailerUrl}
                    width="100%"
                    height="100%"
                    className="react-player"
                    controls={true}
                />
            </div>
            <div className="trailer-detail-summary-container">
                <h1>{trailer.title}&nbsp;&nbsp;
                            <span className="trailer-detail-summary-span">{trailer.year}</span>&nbsp;&nbsp;
                            <span className="trailer-detail-summary-span">{trailer.ageRestriction}+</span>&nbsp;&nbsp;
                            {trailer.type==="movie" ? <span className="trailer-detail-summary-span">{trailer.duration}</span>
                            : <span className="trailer-detail-summary-span">S{trailer.seasonNumber} E{trailer.episodeNumber}</span>
                            }                       
                </h1> 
                <p>{trailer.description}</p> 
            </div>
           
            <div className="trailer-detail-info-container">               
                <div> 
                    <h3>
                        Starring:{trailer.cast && trailer.cast.map((item,index)=><span className="trailer-detail-info-span">&nbsp;{item}
                          {index < trailer.cast.length-1 ? ', ': null}
                        </span>)} 
                    </h3>   
                    <h3>
                        Genre:{trailer.genre && trailer.genre.map((item,index)=><span className="trailer-detail-info-span">&nbsp;{item.name}
                        {index < trailer.genre.length-1 ? ', ': null}
                        </span>)} 
                    </h3> 
                    <h3>
                        Tags: {trailer.tags && trailer.tags.map((item,index)=><span className="trailer-detail-info-span">&nbsp;{item}
                        {index < trailer.tags.length-1 ? ', ': null}
                        </span>)}   
                    </h3> 
                    {trailer.type==="show" ? 
                    <div>
                        <h3>
                            Episode Title:&nbsp;<span className="trailer-detail-info-span">{trailer.episodeTitle}</span>
                        </h3> 
                        <h3>
                            Total Number of Seasons:&nbsp;<span className="trailer-detail-info-span">{trailer.totalSeasons}</span>
                         </h3>
                    </div> 
                    
                  :null}
                       
                </div>
                <div className="media-container">
                    <div>
                        <h3>Movie Image</h3>
                        <img className="trailer-images" src={trailer.mediaId && trailer.mediaId.url}  alt="trailer-img"/>
                    </div>
                    <div>
                        <h3>Banner Image</h3>
                        <img className="trailer-images" src={trailer.bannerId && trailer.bannerId.url} alt="banner-img"/>
                    </div>
                </div>
                <div className="trailer-detail-buttons-container">
                    <Link to="/trailers"><button className="submit-button back-to-trailers-button"> Back to Trailer List</button></Link>
                </div> 
                      
                </div>         
        </div>
    )
}
