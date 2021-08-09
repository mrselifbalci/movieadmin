
import React, { useMemo, useEffect, useState } from 'react'
import { format } from 'date-fns'
import axios from 'axios'
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import { BsArrowUpDown } from "react-icons/bs";
import { BsFillEyeFill, BsPencilSquare, BsFillTrashFill } from "react-icons/bs";
import Modal from 'react-modal';
import '../../styles/table.css'
import {Link} from 'react-router-dom' 
import {COLUMNS} from './RatingTableData' 


Modal.setAppElement('#root');
export default function Ratings({apiBaseUrl}) {

  const [data, setData] = useState([])
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalPost, setModalPost] = useState('')
  const [title, setTitle] = useState('')
  
  const viewTrailerDetail = (trailerId) => {
    console.log(trailerId)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(title)
  }

  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/trailers`)
      .then((res) => {
        setData(res.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])

  
  //delete
  const deleteComment = (id) => {
    console.log(id)
    axios
      .delete(`${apiBaseUrl}/ratings/${id}`)
      .then((res) => {
        window.location.reload()
      })
      .catch((err) => {
        console.log(err);
      });

  } 



  const columns = useMemo(() => COLUMNS, [])
  const comments = useMemo(() => data, [])


  useTable({
    columns: columns,
    data: comments
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
    // pageOptions,
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
            },
            content: {
              padding: 2,
              height: 700,
            },
          }}
        >
          <div>
            <h1 style={{ marginTop: "100px", color: "black" }}>
              <form onSubmit={handleSubmit}>
                <input
                  value={title}
                  onChange={(e) => { setTitle(e.target.value) }}
                />
                <p>{title}</p>
                <button type="submit">Submit</button>
              </form>

            </h1>
          </div>
        </Modal>
      </div>
      <div className="table-container">
        <h1 className="table-title">Rating List</h1>
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
                  <tr className="table-row-wrapper" {...row.getRowProps()}>

                    {row.cells.map((cell) => {
                      return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    })}
                    <td className="table-action-icons-wrapper">
                     <Link  to={`/ratingdetails/${row.original._id}`}>
                        <BsFillEyeFill className="table-view-icon action-icons" onClick={() => { viewTrailerDetail(row.original._id) }} />&nbsp;
                      </Link>
                      <BsFillTrashFill className="table-delete-icon action-icons" onClick={() => { deleteComment(row.original._id) }} />
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