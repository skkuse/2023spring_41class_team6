import React, { Fragment, useState } from "react";
import "./Login.css";
import Navbar from "../component/Navbar";


const options = [
    { id: "1", name: "C++" },
    { id: "2", name: "Java" },
    { id: "3", name: "Javascript" },
    { id: "4", name: "Python" },
  ];
  // -----------------------------------------------------------------
const options1 = [
    { id: "1", name: "신데렐라" },
    { id: "2", name: "어린왕자" },
    { id: "3", name: "토끼" },
];

export const Select = ({options, ...props}) => {
    const [selectValue, setSelectValue] = useState(props.initValue);

    return (
        <select
        //   name={props.name}
          value={selectValue}
          onChange={(e) => {
            setSelectValue(e.target.value);
            props.getResult({ [props.name]: e.target.value });
          }}
          onBlur={() => {
            props.getResult({ [props.name]: selectValue});
          }}
        >
            {options.map((option) => {
                return (
                    <option key={option.id} value={option.id}>
                        {option.name}
                    </option>
                );
            })}
        </select>
    );
};

export const Select1 = ({options1, ...props}) => {
    const [selectValue, setSelectValue] = useState(props.initValue);

    return (
        <select
        //   name={props.name}
          value={selectValue}
          onChange={(e) => {
            setSelectValue(e.target.value);
            props.getResult({ [props.name]: e.target.value });
          }}
          onBlur={() => {
            props.getResult({ [props.name]: selectValue});
          }}
        >
            {options1.map((option) => {
                return (
                    <option key={option.id} value={option.id}>
                        {option.name}
                    </option>
                );
            })}
        </select>
    );
};



function Register(){
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    language: "",
    teller: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('common/signup/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data); // 처리 결과를 콘솔에 출력
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const getResult = (obj) => {
    const key = Object.keys(obj)[0];
    setInputs({...inputs, [key]: obj[key]});
  };

  const {username: username, password, language}= inputs;

  function onChange(e) {
    const {value, name} = e.target;
    setInputs({
        ...inputs,
        [name]: value,
      });
  };

  const onClick = () => {
    console.log(inputs);
  };

  const renderForm = (
    <div className="login_form">
      <form>
        <div className="login_input-container">
          <label>User ID</label>
          <input type="text" name="username" onChange={onChange} value={username} required></input>
        </div>
        <div className="login_input-container">
          <label>Password </label>
          <input type="password" name="password" onChange={onChange} value={password} required></input>
        </div>
        <div className="login_input-container">

        </div>
        <div className="login_input-container">
        <label>Select Language</label>
            <Select
                name="language"
                options={options}
                initValue={options[0].id}
                getResult={getResult}
            />
        <label>Select Teller</label>
            <Select
                name="teller"
                options={options1}
                initValue={options1[0].id}
                getResult={getResult}
            />
        </div>
      </form>
      <br></br>
      <div className="login_input-container">
            <button onClick={handleSubmit}>Create</button>
      </div>
    </div>
  );

  return (
    <Fragment>
    <Navbar />
    <div className="login_app">
      <div className="login-form">
        <div className="login_title">Sign Up</div>
        {renderForm}
      </div>
    </div>
    </Fragment>
  );
}

export default Register;