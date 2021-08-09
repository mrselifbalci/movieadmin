import React,{useMemo,useEffect,useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import {useTable,useSortBy,useGlobalFilter,usePagination} from 'react-table';
import { BsArrowUpDown } from "react-icons/bs";
import { BsFillEyeFill,BsPencilSquare,BsFillTrashFill } from "react-icons/bs";
import Modal from 'react-modal';
import {COLUMNS} from './UserTableData'
import '../../styles/users.css' 
Modal.setAppElement('#root');
export default function Users({apiBaseUrl}) {
    const [data,setData]=useState([])
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalPost,setModalPost]=useState('');
    const [mediaId,setMediaId]=useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname,setLastname]=useState('');
    const [email,setEmail]=useState('');
    const [country,setCountry]=useState('');
    const [createdAt,setCreatedAt]=useState('');
    const [isActive,setIsActive]=useState(true);


    const handleSubmit=(userId)=>{
   console.log(userId)
        const formData = new FormData();
        formData.append("mediaId", mediaId);
        formData.append("firstname", firstname);
        formData.append("lastname", lastname);
        formData.append("country", country);
        formData.append("isActive", isActive);
        axios.put(`${apiBaseUrl}/users/${userId}`,formData)
        .then(res=>{
            window.location.reload()
        })
        .catch(err=>{console.log(err)})     
    }
    const editUser=async (userId)=>{
       await  axios
        .get(`${apiBaseUrl}/users/${userId}`)
        .then((res) => {  
            setModalPost(res.data);
            setMediaId(res.data.mediaId)
            setFirstname(res.data.firstname)
            setLastname(res.data.lastname)
            setEmail(res.data.email)
            setCountry(res.data.country)
            setCreatedAt(res.data.createdAt)
            setIsActive(res.data.isActive)
        })
        .catch((err) => {
            console.log(err);
        });     
            setModalIsOpen(true)    
    }
    const deleteuser=(userId)=>{
        axios
        .delete(`${apiBaseUrl}/users/${userId}`)
        .then((res) => {
            window.location.reload()
        })   
        .catch((err) => {
            console.log(err);
        }); 
    }
    useEffect(() => {
        axios
			.get(`${apiBaseUrl}/users`)
			.then((res) => {
				setData(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
    }, [])
    const columns = useMemo(() => COLUMNS,[])
    const users = useMemo(() => data,[])
    useTable({
        columns:columns,
        data:users
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
                className="users-modal-content"
                overlayClassName="users-modal-overlay"
			>
				<div className="users-modal-container">
                        <p className="close-users-modal-x" onClick={() => setModalIsOpen(false)}>X</p>
                        <h1 className="users-modal-title">Edit User</h1>
                        <form onSubmit={(e)=>{e.preventDefault();handleSubmit(modalPost._id)}} className="users-modal-form">
                            <div className="users-modal-image-container">
                                <img className="users-modal-image" src={mediaId.url} alt="profile"/>
                            </div>
                            <div className="users-modal-info-container">
                                <div>
                                     <p><span>USER FULLNAME:</span> {firstname.toUpperCase()}{' '}{lastname.toUpperCase()}</p>
                                     <p><span>USER EMAIL:</span> {email}</p>
                                     <p><span>COUNTRY:</span> {country}</p>
                                     <p><span>JOINED AT:</span> {createdAt.slice(0,10)}</p>
                                    <div>
                                        <div className="users-modal-status-container">
                                            <label>Status</label>
                                            <select value={isActive} onChange={(e)=>{setIsActive(e.target.value)}}>
                                                <option value='true'>Active</option>
                                                <option value='false'>Block</option>
                                            </select>
                                        </div>                                      
                                    </div>
                                  
                                </div>
                                <div className="users-update-button-container" >
                                  <button className="users-update-button submit-button" type="submit">Submit</button>
                                </div>                              
                            </div>           
                        </form>            
                </div>
			</Modal>
        </div>      
        <div className="table-container">
            <h1 className="table-title">Users List</h1>         
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
                            <tr className="table-row-wrapper" {...row.getRowProps()}>                          
                                {row.cells.map((cell)=>{
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                                <td className="table-action-icons-wrapper">
                                    <BsPencilSquare className="table-edit-icon action-icons" onClick={()=>{editUser(row.original._id)}}/>&nbsp; 
                                    <BsFillTrashFill className="table-delete-icon action-icons" onClick={()=>{deleteuser(row.original._id)}}/>
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