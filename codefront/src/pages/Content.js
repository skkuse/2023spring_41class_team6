import { Fragment } from "react";
import Navbar from "../component/Navbar";
import "./Workbook.css";
import { useLocation,  } from 'react-router-dom';
import { useEffect, useState } from 'react';
import React from "react";
import axios from "axios";


function Content(props) {

    // Assuming you have a state variable named "data"
    const [lecture, setLecture] = useState([]);

    // Inside the component or useEffect
    /*
    useEffect(() => {
        fetch(`url`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                 Authorization: `Token ${localStorage.getItem('token')}`
            },
        })
            .then(response => response.json())
            .then(data => {
                setData(data);
            })
            .catch(error => {
                console.log(error)// Handle any errors
            });
    }, []);

    */

    
    const location = useLocation();
    const num = location.state.num;
    console.log(num);
    useEffect(() => {
        axios
          .get("/workbook", {
            params: {
              abc: "가나다",
              number:num
            },
          })
          .then((response) => setLecture(JSON.stringify(response.data)));
      });


    /*
        const string = data.map((item) => { item.id == num ? item.content : "" });
    */

    return (
        <Fragment className="content_background">
            <Navbar />

            <button className="back_button" ><img src="../images/backspace.jpg" height="50" /></button>
            <div className="support-grid"></div>

            <div className="band">
                <div className="title">
                    <a className="card_workbook">
                        <h1 id="title_workbook" align="center" style={{ marinTop: "50px" }}>Workbook</h1>
                    </a>
                </div>
                <div className="content_workbook">
                    {lecture}
                </div>
            </div>

        </Fragment >

    );
}

export default Content;