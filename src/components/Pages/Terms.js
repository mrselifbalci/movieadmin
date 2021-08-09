import React, {useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import '../../styles/pages.css' 


 
Modal.setAppElement("#root");
export default function Terms({apiBaseUrl}) {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");



  const handleSubmit = (id) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("content", content);
    axios
      .put(
        `${apiBaseUrl}/staticpage/${data._id}`,
      formData
      )
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/staticpage/name/Privacy Policy`)
      .then((res) => {
        setData(res.data.data);
        console.log(res.data.data);
        setName(res.data.data.name);
        setContent(res.data.data.content);

      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const cancelUpload = (e) => {
    e.preventDefault()
    setContent(data.content) 
}

  return (
    <div className="component-wrapper pages-wrapper">
          <form className="pages-form-container" onSubmit={handleSubmit}>
                <div className="pages-title"><h1>{name}</h1></div>
                <div className="pages-content">
                            <textarea placeholder="Content" value={content} onChange={(e)=>setContent(e.target.value)} />
                </div>
                <div className="pages-button-container">
                        <button className="submit-button pages-buttons" type="submit">Submit</button>
                        <button className="cancel-button pages-buttons" onClick={cancelUpload}>Cancel</button>
                </div>
          </form>
      </div>
  );
}
