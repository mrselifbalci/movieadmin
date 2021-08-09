import React,{useMemo,useEffect,useState} from 'react'
import axios from 'axios'
import {useTable,useSortBy,useGlobalFilter,usePagination} from 'react-table';
import { BsArrowUpDown } from "react-icons/bs";
import { BsPencilSquare,BsFillTrashFill } from "react-icons/bs";
import Modal from 'react-modal';
import {COLUMNS} from './CategoryTableData'
import '../../styles/categories-faq.css'
import '../../styles/table.css'
 

Modal.setAppElement('#root');

export default function Categories({apiBaseUrl}) {
    
    let initial=[{name:'Comedy',count:0,description:""},{name:'Drama', count:0, description:""},{name:'Crime', count:0, description:""}]
    
    const [data,setData]=useState(initial)
    const [modalIsOpen, setModalIsOpen] = useState(false); 
    const [modalPost,setModalPost]=useState('')
    const [number,setNumber]=useState('')
    const [name,setName]=useState('')
    const [description,setDescription]=useState('')
    const [movie,setMovie]=useState()


    const handleSubmit=(categoryId)=>{
        console.log(categoryId)
        const updatedCategory={
            name,
            description    
        }
        axios.put(`${apiBaseUrl}/categories/${categoryId}`,updatedCategory)
        .then(res=>{
            console.log(res)
            window.location.reload()
        })
        .catch(err=>{console.log(err)})
    }


    const editCategory=async (categoryId)=>{
       await  axios
        .get(`${apiBaseUrl}/categories/${categoryId}`)
        .then((res) => {  
            setModalPost(res.data);
            setName(res.data.name)
            setDescription(res.data.description)
            setMovie(res.data.movieCount)
            setModalIsOpen(true) 
        })
        .catch((err) => {
            console.log(err)
        });
            setModalIsOpen(true)      
    }



    const deleteCategory=(categoryId)=>{
        axios
        .delete(`${apiBaseUrl}/categories/${categoryId}`)
        .then((res) => {
            window.location.reload()
        })   
        .catch((err) => {
            console.log(err);
        });
       
    }


    useEffect(() => {
        axios
			.get(`${apiBaseUrl}/categories`)
			.then((res) => {
               setData(res.data)            
               setNumber(res.data.number)
               setName(res.data.name)
               setDescription(res.data.description)
               setMovie(res.data.movieCount)
              })

			.catch((err) => {
				console.log(err);
			});
    }, [])

    const columns = useMemo(() => COLUMNS,[])
    const categories = useMemo(() =>data,[])  

    useTable({
        columns:columns,
        data:categories
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
                className="categories-faq-modal-content"
                overlayClassName="categories-faq-modal-overlay"
			>
				<div className="categories-faq-modal-container">
                    <p className="close-categories-faq-modal-x" onClick={() => setModalIsOpen(false)}>X</p>
                    <h1 className="edit-categories-faq-modal-title">Edit Category</h1>
                    <form className="categories-faq-modal-form" onSubmit={(e)=>{e.preventDefault();handleSubmit(modalPost._id)}} >       
                                <div className="categories-faq-modal-form-item">
                                        <label>Name</label>
                                        <input value={name} onChange={(e)=>{setName(e.target.value)}}/>
                                </div>
                                <div className="categories-faq-modal-form-item">
                                        <label>Description</label>
                                        <textarea value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
                                </div>
                               <div className="category-faq-update-button-container" >
                                  <button className="category-faq-update-button submit-button" type="submit">Submit</button>
                               </div>
                    </form>
                </div>
			</Modal>
        </div>
        <div className="table-container">
            <h1 className="table-title">Category Lists</h1>
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
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                                 <td className="table-action-icons-wrapper">
                                      
                                    <BsPencilSquare className="table-edit-icon action-icons" onClick={()=>{editCategory(row.original._id)}}/>&nbsp; 
                                    <BsFillTrashFill className="table-delete-icon action-icons" onClick={()=>{deleteCategory(row.original._id)}}/>
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