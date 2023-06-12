import React, { useEffect } from 'react';
import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../component/Navbar";
import "./Curriculum.css";
import { useCookies } from 'react-cookie';
import axios from 'axios';

function Curriculum() {

    const [cookies] = useCookies(['user_id']);
    const [userdata, setUserData] = useState("");
    const [curriculum, setCurriculum] = useState("");
    const [curridata, setCurri] = useState(null);
    const [lecture, setLecture] = useState([]);
    const [chap11, set11] = useState([]);
    const [chap12, set12] = useState([]);
    const [chap13, set13] = useState([]);

    const [chap21, set21] = useState([]);
    const [chap22, set22] = useState([]);
    const [chap23, set23] = useState([]);

    const [chap31, set31] = useState([]);
    const [chap32, set32] = useState([]);
    const [chap33, set33] = useState([]);

    const [chap41, set41] = useState([]);
    const [chap42, set42] = useState([]);
    const [chap43, set43] = useState([]);

    const [chap51, set51] = useState([]);
    const [chap52, set52] = useState([]);
    const [chap53, set53] = useState([]);

    const getCheckboxValue = (event) => {
        let result = '';
        if (event.target.checked) {
            result = event.target.value;
        } else {
            result = '';
        }
        console.log(result);
    };

    const navigate = useNavigate();

    const moveToWorkbook = () => {
        navigate("/content");
    };

    /*const data = {
        num: 0,
        level: userdata.level,
        language: userdata.level
    }*/

    /*useEffect(() => {
        axios.get("/curri")
      .then(response => {
        setCurri(response.data); // 데이터를 상태에 저장
      })
  }, []);*/

  useEffect(() => {
    axios
      .get("/curri", {
        params: {
          abc: "테스트용",
        },
      })
      .then((response) => {
        set11(response.data.chapter11);set12(response.data.chapter12);set13(response.data.chapter13);
        set21(response.data.chapter21);set22(response.data.chapter22);set23(response.data.chapter23);
        set31(response.data.chapter31);set32(response.data.chapter32);set33(response.data.chapter33);
        set41(response.data.chapter41);set42(response.data.chapter42);set43(response.data.chapter43);
        set51(response.data.chapter51);set52(response.data.chapter52);set53(response.data.chapter53);

      console.log(response.data.chapter11);
    })
  },[]);



      /*
    useEffect(() => {
        fetch(`url` + "/" + cookies.id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                 Authorization: `Token ${localStorage.getItem('token')}`
            },
        })
            .then(response => response.json())
            .then(userdata => {
                setUserData(userdata);
            })
            .catch(error => {
                console.log(error)// Handle any errors
            });
    }, []);

    */

    /*
    const level = userdata.level;
    const language = userdata.language;

    useEffect(() => {
        fetch(`url` + "/" + level + "/" language, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                 Authorization: `Token ${localStorage.getItem('token')}`
            },
        })
            .then(response => response.json())
            .then(curridata => {
                setCurriculum(curridata);
            })
            .catch(error => {
                console.log(error)// Handle any errors
            });
    }, []);

    const titles = curridata.map((item) => { item.title };

    */



    return (
        <Fragment className="curriculum_backgroud">

            <Navbar />


            <div className="support-grid"></div>
            
            <div className="band">
                <div className="title">
                    <a className="card">
                        <article>
                            <h1>Curriculum</h1>
                        </article>
                    </a>
                </div>
                <div className="item-1">
                    

                    <a className="card">
                        <div className="thumb" style={{ backgroundImage: "url(https://ifh.cc/g/Rzw08k.jpg)" }}></div>
                        <article>
                            <h1>Week1</h1>
                            Ohyeah
                            <button

                                onClick={() => {
                                    navigate("/content", { state: { num: 1 } });
                                }}
                                style={{ marginTop: "1rem" }}> {chap11} </button>
                            <button onClick={() => {
                                navigate("/content", { state: { num: 2 } });
                            }} style={{ marginTop: "1rem" }}> {chap12} </button>
                            <button onClick={() => {
                                navigate("/content", { state: { num: 3 } });
                            }} style={{ marginTop: "1rem" }}> {chap13} </button>
                            <div className="checkbox" style={{ marginTop: "1rem" }}>
                                check
                                <input type="checkbox" name="input_check" value="4" id="check" onChange={getCheckboxValue} />
                            </div>
                        </article>

                    </a>

                </div>
                <div className="item-2">
                    <a className="card">
                    <div className="thumb" style={{ backgroundImage: "url(https://ifh.cc/g/DcLfBx.jpg)" }}></div>
                        <article>
                            <h1>Week2</h1>
                            Ohyeah
                            <button onClick={() => {
                                    navigate("/content", { state: { num: 4 } });
                                }} style={{ marginTop: "1rem" }}> {chap21} </button>
                            <button onClick={() => {
                                    navigate("/content", { state: { num: 5 } });
                                }} style={{ marginTop: "1rem" }}> {chap22} </button>
                            <button onClick={() => {
                                    navigate("/content", { state: { num: 6 } });
                                }} style={{ marginTop: "1rem" }}> {chap23} </button>
                            <div className="checkbox" style={{ marginTop: "1rem" }}>
                                check
                                <input type="checkbox" name="input_check" value="4" id="check" onChange={getCheckboxValue} />
                            </div>
                        </article>
                    </a>
                </div>
                <div className="item-3">
                    <a className="card">
                    <div className="thumb" style={{ backgroundImage: "url(https://ifh.cc/g/Rz3OTA.jpg)" }}></div>                        <article>
                            <h1>Week3</h1>
                            Ohyeah
                            <button onClick={() => {
                                    navigate("/content", { state: { num: 7 } });
                                }} style={{ marginTop: "1rem" }}> {chap31} </button>
                            <button onClick={() => {
                                    navigate("/content", { state: { num: 8 } });
                                }} style={{ marginTop: "1rem" }}> {chap32} </button>
                            <button onClick={() => {
                                    navigate("/content", { state: { num: 9 } });
                                }} style={{ marginTop: "1rem" }}> {chap33} </button>
                            <div className="checkbox" style={{ marginTop: "1rem" }}>
                                check
                                <input type="checkbox" name="input_check" value="4" id="check" onChange={getCheckboxValue} />
                            </div>

                        </article>
                    </a>
                </div>
                <div className="item-4">
                    <a className="card">
                    <div className="thumb" style={{ backgroundImage: "url(https://ifh.cc/g/63tvl5.jpg)" }}></div>                        <article>
                            <h1>Week4</h1>
                            Ohyeah
                            <button onClick={() => {
                                    navigate("/content", { state: { num: 10 } });
                                }} style={{ marginTop: "1rem" }}> {chap41} </button>
                            <button onClick={() => {
                                    navigate("/content", { state: { num: 11 } });
                                }} style={{ marginTop: "1rem" }}> {chap42} </button>
                            <button onClick={() => {
                                    navigate("/content", { state: { num: 12 } });
                                }} style={{ marginTop: "1rem" }}> {chap43} </button>
                            <div className="checkbox" style={{ marginTop: "1rem" }}>
                                check
                                <input type="checkbox" name="input_check" value="4" id="check" onChange={getCheckboxValue} />
                            </div>
                        </article>
                    </a>
                </div>
                <div className="item-5">
                    <a className="card">
                    <div className="thumb" style={{ backgroundImage: "url(https://ifh.cc/g/n26Tqd.jpg)" }}></div>                        <article>
                            <h1>Week5</h1>
                            Ohyeah
                            <button onClick={() => {
                                    navigate("/content", { state: { num: 13 } });
                                }} style={{ marginTop: "1rem" }}> {chap51} </button>
                            <button onClick={() => {
                                    navigate("/content", { state: { num: 14 } });
                                }} style={{ marginTop: "1rem" }}> {chap52} </button>
                            <button onClick={() => {
                                    navigate("/content", { state: { num: 15 } });
                                }} style={{ marginTop: "1rem" }}> {chap53} </button>
                            <div className="checkbox" style={{ marginTop: "1rem" }}>
                                check
                                <input type="checkbox" name="input_check" value="4" id="check" onChange={getCheckboxValue} />
                            </div>
                        </article>
                    </a>
                </div>
            </div>

        </Fragment>
    );
}

export default Curriculum;