import React, { useMemo, useEffect, useState } from "react";
import axios from "axios";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import { BsFileArrowDown, BsFileArrowUp, BsArrowUpDown } from "react-icons/bs";
import { BsFillEyeFill, BsPencilSquare, BsFillTrashFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import Modal from "react-modal";
import { COLUMNS } from "./FaqTableData";
import '../../styles/table.css'


Modal.setAppElement("#root");

export default function Faqs({apiBaseUrl}) {
  const [data, setData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalPost, setModalPost] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isActive, setIsActive] = useState("");

  const handleSubmit = (faqId) => {
    const formData = new FormData();
    formData.append("question", question);
    formData.append("answer", answer);
    formData.append("isActive", isActive);
 
    axios
      .put(`${apiBaseUrl}/faqs/${faqId}`, formData)
      .then((res) => {
        window.location.reload();
        // console.log(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editFaq = async (faqId) => {
    await axios
      .get(`${apiBaseUrl}/faqs/${faqId}`)
      .then((res) => {
        setModalPost(res.data);
        setQuestion(res.data.question);
        setAnswer(res.data.answer);
        setIsActive(res.data.isActive);
      })
      .catch((err) => {
        console.log(err);
      });
    setModalIsOpen(true);
  };

  const deleteFaq = (faqId) => {
    axios
      .delete(`${apiBaseUrl}/faqs/${faqId}`)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/faqs`)
      .then((res) => {
        setData(res.data.response);
        console.log(res.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const columns = useMemo(() => COLUMNS, []);
  const faqs = useMemo(() => data, []);

  useTable({
    columns: columns,
    data: faqs,
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
      <Modal
        isOpen={modalIsOpen} 
        onRequestClose={() => setModalIsOpen(false)}
        className="categories-faq-modal-content"
        overlayClassName="categories-faq-modal-overlay"
      >
        <div className="categories-faq-modal-container">
        <p className="close-categories-faq-modal-x" onClick={() => setModalIsOpen(false)}>X</p>
        <h1 className="edit-categories-faq-modal-title">Edit FAQ</h1>
          <form className="categories-faq-modal-form" onSubmit={(e) => {e.preventDefault();handleSubmit(modalPost._id)}}>
            <div className="categories-faq-modal-form-item">
              <label htmlFor="question">Question</label>
              <input value={question} onChange={(e) => {setQuestion(e.target.value)}}/>
            </div>
            <div className="categories-faq-modal-form-item">
              <label htmlFor="answer">Answer</label>
              <textarea name="answer" className="faq-answer" value={answer} onChange={(e) => {setAnswer(e.target.value)}}/>
            </div>
            
            <div className="categories-faq-modal-form-item">
              <select className="faq-select" value={isActive} onChange={(e) => {setIsActive(e.target.value)}}>
                <option value="true">Active</option>
                <option value="false">Block</option>
              </select>
            </div>
            <div className="categories-faq-modal-form-item categories-faq-modal-form-button-container">
              <button type="submit" className="submit-button"> Submit</button>
            </div>
           
          </form>
        </div>
      </Modal>

      <div className="table-container">

        <h1 className="table-title">FAQ Lists</h1>
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
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {/* <th></th> */}
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    <div className="table-sort-icon-container">
                      <div>{column.render("Header")}</div>
                      <div className="table-sort-icon">
                        <BsArrowUpDown />
                      </div>
                    </div>
                  </th>
                ))}
                <th>ACTION</th>
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr className="table-row-wrapper" {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                  <td className="table-action-icons-wrapper">
                
                    <BsPencilSquare
                      className="table-edit-icon action-icons"
                      onClick={() => {
                        editFaq(row.original._id);
                      }}
                    />
                    &nbsp;
                    <BsFillTrashFill
                      className="table-delete-icon action-icons"
                      onClick={() => {
                        deleteFaq(row.original._id);
                      }}
                    />
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
