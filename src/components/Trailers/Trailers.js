import React,{useMemo,useEffect,useState} from 'react'
import axios from 'axios'
import {useTable,useSortBy,useGlobalFilter,usePagination} from 'react-table';
import {BsArrowUpDown } from "react-icons/bs";
import { BsFillEyeFill,BsPencilSquare,BsFillTrashFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import ReactPlayer from "react-player";
import Modal from 'react-modal';
import {COLUMNS} from './TrailerTableData'
import '../../styles/table.css'
import '../../styles/trailers.css' 
 

 Modal.setAppElement('#root'); 

export default function Trailers({apiBaseUrl}) {
     
    
    const [data,setData]=useState([])
    const [modalIsOpen, setModalIsOpen] = useState(false); 
    const [modalPost,setModalPost]=useState('')
    const [title,setTitle]=useState('')
    const [episodeTitle,setEpisodeTitle]=useState('')
    const [type,setType]=useState('')
    const [year,setYear]=useState('')
    const [duration,setDuration]=useState('')
    const [mediaUrl,setMediaUrl]=useState('')
    const [bannerUrl,setBannerUrl]=useState('')
    const [description,setDescription]=useState('')
    const [ageRestriction,setAgeRestriction]=useState('')
    const [totalSeasons,setTotalSeasons]=useState('')
    const [seasonNumber,setSeasonNumber]=useState('')
    const [episodeNumber,setEpisodeNumber]=useState('')
    const [trailerUrl,setTrailerUrl]=useState('')
    const [cast,setCast]=useState('')
    const [genre,setGenre]=useState([])
    const [tags,setTags]=useState('')
    // const [websiteId,setWebsiteId]=useState([])

    const handleSubmit=(trailerId)=>{
        const updatedTrailer={
            title,
            episodeTitle,
            type,
            year,
            duration,
            description,
            ageRestriction,
            totalSeasons,
            seasonNumber,
            episodeNumber,
            trailerUrl,
            cast, 
            genre,
            tags
        }
        axios.put(`${apiBaseUrl}${trailerId}`,updatedTrailer)
        .then(res=>{
            window.location.reload()
        })
        .catch(err=>{console.log(err)})
    }


    const editTrailer=async (trailerId)=>{
       await  axios
        .get(`${apiBaseUrl}/trailers/${trailerId}`)
        .then((res) => {  
            setModalPost(res.data);
            setTitle(res.data.title)
            setEpisodeTitle(res.data.episodeTitle)
            setType(res.data.type)
            setYear(res.data.year)
            setDuration(res.data.duration)
            setMediaUrl(res.data.mediaId.url)
            setBannerUrl(res.data.bannerId.url)
            setDescription(res.data.description)
            setAgeRestriction(res.data.ageRestriction)
            setTotalSeasons(res.data.totalSeasons)
            setSeasonNumber(res.data.seasonNumber)
            setEpisodeNumber(res.data.episodeNumber)
            setTrailerUrl(res.data.trailerUrl)
            setCast(res.data.cast)
            setTags(res.data.tags)
            setGenre(res.data.genre)
        })
        .catch((err) => {
            console.log(err);
        });
            setModalIsOpen(true)
            
    }



    const deleteTrailer=(trailerId)=>{
        axios
        .delete(`${apiBaseUrl}/trailers/${trailerId}`)
        .then((res) => {
            window.location.reload()
        })   
        .catch((err) => {
            console.log(err);
        });
       
    }


    useEffect(() => {
        axios
			.get(`${apiBaseUrl}/trailers`)
			.then((res) => {
				setData(res.data.response);
            console.log(res.data.response)

			})
			.catch((err) => {
				console.log(err);
			});
    }, [])

    const columns = useMemo(() => COLUMNS,[])
    const trailers = useMemo(() => data,[])
     
   

    useTable({
        columns:columns,
        data:trailers
    })
   
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        gotoPage,
        pageCount,
        setPageSize,
        prepareRow,
        state,
        setGlobalFilter,
    } = useTable({
        columns,
        data
    },
    useGlobalFilter,useSortBy,usePagination)
 
    const { globalFilter,pageIndex,pageSize }=state


    return (
    <div className="component-wrapper">
        <div>
            <Modal
				isOpen={modalIsOpen}
				onRequestClose={() => setModalIsOpen(false)}
				style={{
					overlay: {
						backgroundColor: 'rgba(211, 211, 211, 0.60)'
					},
					content: {
						height: "auto",
                        backgroundColor: '#181818',
                        border:"none",
                        width:"90%",
                        padding:"0 2% 2% 2%",
                        
        			},
				}}
			>
				<div className="modal-container">
                        <p className="close-modal-x" onClick={() => setModalIsOpen(false)}>X</p>
                        <form onSubmit={(e)=>{e.preventDefault();handleSubmit(modalPost._id)}} className="modal-form">
                            <div className="modal-form-column-one">
                                    <div className="react-player-wrapper">
                                        <ReactPlayer
                                            className="modal-react-player"
                                            width="auto"
                                            url={trailerUrl}
                                            />
                                    </div>
                                    
                                    <label>Trailer Url</label>
                                    <input value={trailerUrl} onChange={(e)=>{setTrailerUrl(e.target.value)}}/>
                                            {type === 'show' 
                                    ? 
                                    <div className="additional-info-items-show">
                                        <div className="modal-group-container">
                                            <div className="modal-form-item">
                                                <label>Episode Title</label>
                                                <input value={episodeTitle} onChange={(e)=>{setEpisodeTitle(e.target.value)}}/> 
                                            </div>
                                            <div className="modal-form-item">
                                                <label>Episode Number</label>
                                                <input value={episodeNumber} onChange={(e)=>{setEpisodeNumber(e.target.value)}}/>
                                            </div>
                                        </div>
                                        <div className="modal-group-container">
                                            <div className="modal-form-item">
                                                <label>Total Seasons</label>
                                                <input value={totalSeasons} onChange={(e)=>{setTotalSeasons(e.target.value)}}/>
                                            </div>
                                            <div className="modal-form-item">
                                                <label>Season Number</label>
                                                <input value={seasonNumber} onChange={(e)=>{setSeasonNumber(e.target.value)}}/>
                                            </div>
                                            
                                        </div>
                                    </div>
                                    :null}
                            </div>
                            <div className="modal-form-column-two">
                                
                                    <div className="modal-form-item">
                                        <label>Title</label>
                                        <input value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
                                    </div>
                                    <div className="modal-form-item">
                                        <label>Description</label>
                                        <textarea value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
                                    </div>
                                    <div className="modal-form-item">
                                        <label>Cast</label>
                                        <input value={cast && cast.map(item=>item)} onChange={(e)=>{setCast(e.target.value.split(','))}}/>
                                    </div>
                              
                                    <div className="modal-form-item">
                                        <label>Tags</label>
                                        <input value={tags && tags.map(item=>item)} onChange={(e)=>{setTags(e.target.value.split(','))}}/>
                                    </div>
                                    <div className="modal-group-container">
                                        <div className="modal-form-item">
                                            <label>Type</label>
                                            <select value={type} onChange={(e)=>{setType(e.target.value)}}>
                                                <option value="movie">Movie</option>
                                                <option value="show">Show</option>
                                            </select>
                                            
                                        </div>
                                        <div className="modal-form-item">
                                            <label>Release Year</label>
                                            <input value={year} onChange={(e)=>{setYear(e.target.value)}}/>
                                        </div>
                                    </div>
                                    <div className="modal-group-container">
                                        <div className="modal-form-item">
                                            <label>Duration</label>
                                            <input value={duration} onChange={(e)=>{setDuration(e.target.value)}}/>
                                        </div>
                                        <div className="modal-form-item">
                                            <label>Age Restriction</label>
                                            <input value={ageRestriction} onChange={(e)=>{setAgeRestriction(e.target.value)}}/>
                                        </div>
                                    </div>
                                <div className="trailer-update-button-container" >
                                    <button className="trailer-update-button submit-button" type="submit">Submit</button>
                                </div>   
                            </div>
                        </form>
                </div>
			</Modal>
        </div>
        <div className="table-container">
            <h1 className="table-title">Trailer List</h1>
            <hr className="hr-table"/>
            <div className="table-show-search-wrapper" >
                <div className="table-show-bar">
                   <p>Show&nbsp;</p> <select  value={pageSize} onChange={e=>setPageSize(Number(e.target.value))}>
                                    {
                                        [10,20,50].map(pageSize=>(
                                            <option key={pageSize} value={pageSize}>
                                                {pageSize}
                                            </option>
                                        ))
                                    } 
                                </select>&nbsp; <p>entries</p>
                </div>
            
                <div className="table-search-bar">
                    <p>Search:&nbsp;&nbsp;</p>
                    <input value={globalFilter || ''}
                    onChange={e=>setGlobalFilter(e.target.value)}
                    />
                </div>
            </div>
          
         <table {...getTableProps()}>
                    <thead>
                        {
                            headerGroups.map((headerGroup)=>(
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                        {/* <th></th> */}
                                        {headerGroup.headers.map((column)=>(
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                            <div className="table-sort-icon-container">
                                                <div>{column.render('Header')}</div>
                                                <div className="table-sort-icon"><BsArrowUpDown/></div>
                                            </div>
                                    </th> ))}
                                    <th>ACTION</th>  
                                </tr>
                            ))
                        }
                    </thead>

                    <tbody {...getTableBodyProps()}>
                        {
                            page.map(row=>{ 
                                prepareRow(row)
                                return(
                                        <tr className="table-row-wrapper"  {...row.getRowProps()}>   
                                            {row.cells.map((cell)=>{
                                                return <td  {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                            })}
                                            <td className="table-action-icons-wrapper">
                                                <Link  to={`/trailerdetails/${row.original._id}`}>
                                                    <BsFillEyeFill className="table-view-icon action-icons" />&nbsp; 
                                                </Link>
                                                <BsPencilSquare className="table-edit-icon action-icons" onClick={()=>{editTrailer(row.original._id)}}/>&nbsp; 
                                                <BsFillTrashFill className="table-delete-icon action-icons" onClick={()=>{deleteTrailer(row.original._id)}}/>
                                            </td>
                                        </tr>
                                )
                            })
                        }
                    </tbody>
        </table>
       <div className="table-button-container">
            <button onClick={()=>gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
            <button className="table-page-nav" onClick={()=>previousPage()} disabled={!canPreviousPage}>Previous</button>
            <div className="table-current-page">{pageIndex+1}</div>
            <button className="table-page-nav" onClick={()=>nextPage()} disabled={!canNextPage}>Next</button>
            <button onClick={()=>gotoPage(pageCount-1)} disabled={!canNextPage}>{'>>'}</button>
       </div>
       
        
    </div>
</div> 
    )
}

