import React, { useMemo, useEffect, useState } from "react";
import axios from "axios";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import { BsArrowUpDown } from "react-icons/bs";
import { BsFillEyeFill, BsPencilSquare, BsFillTrashFill } from "react-icons/bs";
import Modal from "react-modal"; 
import { COLUMNS } from "./CommentsTableData";
import {Link} from 'react-router-dom'
import '../../styles/table.css'

Modal.setAppElement("#root");
export default function Comments({apiBaseUrl}) {
  const [data, setData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalPost, setModalPost] = useState("");
  // const [no, setNo] = useState("");
  const [authorFirstname, setAuthorFirstname] = useState("");
  const [authorLastname, setAuthorLastname] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [userId , setUserId]=useState('')
  const [block, setBlock]=useState(false)
  const [reasonBlock, setReasonBlock]=useState('')


  const handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    if (e.target.value === "false") {
      setBlock(true);
    } else{
      setBlock('')
    }
    setIsActive(e.target.value)
  };

  const handleSubmit = (commentId) => {
    const updatedComment = {
      isActive,
     reasonToBlock:reasonBlock,
    };
  
    axios
      .put(
        `${apiBaseUrl}comments/${commentId}`,
        updatedComment
      )
      .then((res) => {
        window.location.reload();
     })
      .catch((err) => {
        console.log(err);
      });
     
  };

 
  const editComment = async (commentId) => {
    await axios
      .get(`${apiBaseUrl}comments/${commentId}`)
      .then((res) => {
        setModalPost(res.data.data);
        // setNo(res.data.data.no);
        setAuthorFirstname(res.data.data.userId.firstname);
        setAuthorLastname(res.data.data.userId.lastname);
        setTitle(res.data.data.title);
        setDescription(res.data.data.content);
        setCreatedAt(res.data.data.createdAt);
        setIsActive(res.data.data.isActive);
        setUserId(res.data.data.userId._id)
        setReasonBlock(res.data.data.reasonToBlock)
        console.log(res.data.data.reasonToBlock)
      })
      .catch((err) => {
        console.log(err);
      });

    setModalIsOpen(true);
  
  };

  const deleteComment = (commentId) => {
    axios
      .delete(`${apiBaseUrl}/comments/${commentId}`)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/comments`)
      .then((res) => {
        setData(res.data.response)
        
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  

  const columns = useMemo(() => COLUMNS, []);
  const comments = useMemo(() => data, []);

  useTable({
    columns: columns,
    data: comments,
  });

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
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <div className="component-wrapper">
      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          style={{
            overlay: {
              top: 35,
              backgroundColor: "rgba(211, 211, 211, 0.60)",
              marginTop: "30px",
            },
            content: {
              padding: 2,
              height: 550,
              marginTop: "10px",
              backgroundColor: "#181818",
              border: "none",
              width: "70%",
              margin: "auto",
              paddingTop: "2%",
              paddingBottom: "2%",
            },
          }}
        >
          <div className="modal-container">
            <p className="close-modal-x" onClick={() => setModalIsOpen(false)}>
              X
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(modalPost._id);
              }}
              className="modal-form"
            >
              <div className="modal-column-two">
                <div>
                  <div>
                    <p>
                      {authorFirstname} {authorLastname}
                    </p>
                  
                    <p>{data.title}</p>
                    <p style={{fontSize:"18px"}}>{description}</p>
                    <p>{createdAt.slice(0,10)}</p>
                    <select  className="change-comment-active" 
                      value={isActive}
                      onChange={handleChange}
                    >
                      <option  value="true">Active</option>
                      <option value="false">Block</option> 
                      </select>

                  </div>
                </div>


                
                {block? <div className='block-reason'><label> Reason to block message</label><input className='blockMessage' value={reasonBlock} type='text' onChange={(e)=>setReasonBlock(e.target.value)}/></div>:"" }
                  
                <div className="comment-update-button-container">
                  <button
                    className="comment-update-button submit-btn"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Modal>
      </div>

      <div className="table-container">
        <h1 className="table-title">Comment Lists</h1>
        <hr className="hr-table" />
        <div className="table-show-search-wrapper">
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
                {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {/* <th></th> */}
                    {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                        <div className="table-sort-icon-container">
                            <div>{column.render("Header")}</div>
                            <div className="table-sort-icon"><BsArrowUpDown /></div>
                        </div>
                    </th> ))}
                    <th>ACTION</th>
                </tr>
                ))}
            </thead>

            <tbody {...getTableBodyProps()}>
                { 
               
                   page.map((row) => {
                      prepareRow(row);
                         return (
                            <tr className="table-row-wrapper" {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                return (
                                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                );
                            })}
                            <td className="table-action-icons-wrapper">
                                <Link  to={`/commentdetails/${row.original._id}`}>
                                 <BsFillEyeFill className="table-view-icon action-icons"/>&nbsp; 
                                </Link>
                                <BsPencilSquare className="table-edit-icon action-icons" onClick={() => {editComment(row.original._id)}}/>&nbsp;
                                <BsFillTrashFill className="table-delete-icon action-icons" onClick={() => {deleteComment(row.original._id)}}/>
                            </td>
                            </tr>
                );
                })}
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
  );
}
