import React, { useMemo, useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import { BsFileArrowDown, BsFileArrowUp, BsArrowUpDown } from "react-icons/bs";
import { BsFillEyeFill, BsPencilSquare, BsFillTrashFill } from "react-icons/bs";
import Modal from 'react-modal';
import { COLUMNS } from './MessageTableData'
import '../../styles/table.css'

Modal.setAppElement('#root');
export default function Messages({apiBaseUrl}) {

    const [data, setData] = useState([])
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalPost, setModalPost] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState("");



    const handleSubmit = (messageId) => {
        const updatedcontact = {
            firstname,
            lastname,
            email,
            phoneNumber,
            subject,
            content
        }
        axios.put(`${apiBaseUrl}/messages/${messageId}`, updatedcontact)
            .then(res => {
                window.location.reload()
            })
            .catch(err => { console.log(err) })
    }

    const editcontact = async (messageId) => {
        await axios
            .get(`${apiBaseUrl}/messages/${messageId}`)
            .then((res) => {
                setModalPost(res.data);
                setFirstname(res.data.firstname)
                setLastname(res.data.lastname)
                setEmail(res.data.email)
                setPhoneNumber(res.data.phoneNumber)
                setSubject(res.data.subject)
                setContent(res.data.content)
            })
            .catch((err) => {
                console.log(err);
            });
        setModalIsOpen(true)
    }

    // const viewContactDetail = (contactId) => {
    //     console.log(contactId)
    // }

    const deleteContact = (messageId) => {
     
        axios
            .delete(`${apiBaseUrl}/messages/${messageId}`)
            .then((res) => {
                window.location.reload()
            })
            .catch((err) => {
                console.log(err);
            });
    }


    useEffect(() => {
        axios
            .get(`${apiBaseUrl}/messages`)
            .then((res) => {
                setData(res.data.response);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])

    const columns = useMemo(() => COLUMNS, [])
    const message = useMemo(() => data, [])

    useTable({
        columns: columns,
        data: message
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
        pageOptions,
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
        useGlobalFilter, useSortBy, usePagination)

    const { globalFilter, pageIndex, pageSize } = state

    return (
        <div className="component-wrapper">

            <div>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={() => setModalIsOpen(false)}
                    style={{
                        overlay: {
                            top: 35,
                            backgroundColor: 'rgba(211, 211, 211, 0.60)',
                            marginTop: "30px"
                        },
                        content: {
                            padding: 2,
                            height: 500,
                            marginTop: "10px",
                            backgroundColor: '#181818',
                            border: "none",
                            width: "95%",
                            margin: "auto",
                            paddingTop: "2%"
                        },
                    }} 
                >
                    <div className="modal-container">
                        <p className="close-modal-x" onClick={() => setModalIsOpen(false)}>X</p>
                        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(modalPost._id) }} className="modal-form">
                            <div className="modal-column-one">
                                <div className="modal-description-container form-item">
                                    <label>Firstname</label>
                                    <input value={firstname} onChange={(e) => { setFirstname(e.target.value) }} />
                                </div>
                                <div className="modal-description-container form-item">
                                    <label>Lastname</label>
                                    <input value={lastname} onChange={(e) => { setLastname(e.target.value) }} />
                                </div>

                                <div className="modal-year-container form-item">
                                    <label>Email</label>
                                    <input value={email} onChange={(e) => { setEmail(e.target.value) }} />
                                </div>

                                <div className="modal-duration-container form-item">
                                    <label>Phone</label>
                                    <input value={phoneNumber} onChange={(e) => { setPhoneNumber(e.target.value) }} />
                                </div>
                            </div>
                            <div className="modal-column-two">
                                <div className="modal-description-container form-item">
                                    <label>Subject</label>
                                    <input value={subject} onChange={(e) => { setSubject(e.target.value) }} />
                                </div>
                                <div className="modal-description-container form-item">
                                    <label>Content</label>
                                    <textarea value={content} onChange={(e) => { setContent(e.target.value) }} />
                                </div>
                                <div className="trailer-update-button-container" >
                                    <button className="trailer-update-button submit-btn" type="submit">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </Modal>
            </div>

            <div className="table-container">
                <h1 className="table-title">Messages</h1>
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
                            headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {/* <th></th> */}
                                    {headerGroup.headers.map((column) => (
                                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                            <div className="table-sort-icon-container">
                                                <div>{column.render('Header')}</div>
                                                <div className="table-sort-icon"><BsArrowUpDown /></div>
                                            </div>
                                        </th>))}
                                    <th>ACTION</th>
                                </tr>
                            ))
                        }
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {
                            page.map(row => {
                                prepareRow(row)
                                return (
                                    <tr className="table-row-wrapper"  {...row.getRowProps()}>

                                        {row.cells.map((cell) => {
                                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        })}
                                        <td className="table-action-icons-wrapper">
                                            <Link to={`/singlemessage/${row.original._id}`}>
                                                <BsFillEyeFill className="table-view-icon action-icons" />&nbsp;
                                            </Link>
                                            <BsFillTrashFill className="table-delete-icon action-icons" onClick={() => { deleteContact(row.original._id) }} />
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

