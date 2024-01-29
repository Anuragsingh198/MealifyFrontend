import React, { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import "./ClientAuthorization.css";
const InitialState = {
  UserName: "UserName",
  Password: "Password",
  Email: "Email",
};
const InitialError = {
  err: "false",
  message: "Error Ocuured",
};
const ClientReducer = (state = InitialState, action) => {
  const NewState = { ...state };
  if (action.type === "addUserName") {
    NewState.UserName = action.val;
  } else if (action.type === "addPassword") {
    NewState.Password = action.val;
  } else if (action.type === "addEmail") {
    NewState.Email = action.val;
  } else if (action.type === "initalEmail") {
    if (NewState.Email === "") NewState.Email = "Email";
    else if (NewState.Email === "Email") NewState.Email = "";
  } else if (action.type === "initalUserName") {
    if (NewState.UserName === "") NewState.UserName = "UserName";
    else if (NewState.UserName === "UserName") NewState.UserName = "";
  } else if (action.type === "initalPassword") {
    if (NewState.Password === "") NewState.Password = "Password";
    else if (NewState.Password === "Password") NewState.Password = "";
  }
  return NewState;
};

const errorClientLogin = (state = InitialError, action) => {
  const NewState = { ...state };
  if (action.type === "SetError") {
    console.log("ewfrebtnfhfgbf");
    NewState.message = action.val;
    NewState.err = "true";
  } else {
    NewState.message = "";
    NewState.err = "false";
  }
  return NewState;
};
function ClientAuthorization(props) {
  const [ClientData, SetClientData] = useReducer(ClientReducer, InitialState);
  const [ErrorData, SetErrorData] = useReducer(errorClientLogin, InitialError);
  const Navigate = useNavigate();
  const ClientChange = (event) => {
    SetClientData({ type: event.target.name, val: event.target.value });
    if (ErrorData.err === "true") SetErrorData({ type: "noerror" });
  };
  const ClientBlurFocus = (event) => {
    if (event.target.name === "addUserName")
      SetClientData({ type: "initalUserName" });
    else if (event.target.name === "addPassword")
      SetClientData({ type: "initalPassword" });
    else SetClientData({ type: "initalEmail" });
    if (ErrorData.err === "true") SetErrorData({ type: "noerror" });
  };
  const ClientDataSubmit = (event) => {
    event.preventDefault();
    async function fetchClient() {
      const data = await fetch(props.loginlink, {
        method: "POST",
        body: JSON.stringify({
          username: ClientData.UserName,
          password: ClientData.Password,
          email: ClientData.Email,
        }),
        headers: { "Content-type": "application/json" },
      });
      // console.log(data);
      const js = await data.json();
      if (js.status === "200") {
        props.onSubFunc(js.user);
        console.log(props.localeData);
        const userData = {
          user: props.localeData,
          _id: js.user._id,
          Email: js.user.Email,
          UserName: js.user.UserName,
          HotelId:js.user.HotelId
          
        };
        localStorage.setItem("login-data", JSON.stringify(userData));
        console.log(props.transferlink + js.user._id);
        // if(props.localeData==='owner-data')
        if (props.localeData === "client") Navigate("/User");
        // window.location.reload();
        Navigate("/owner");
      } else if (js.status === "202") {
        SetErrorData({ type: "SetError", val: js.message });
      }
    }

    fetchClient();
  };
  return (
    <form
      className="add-client1-form"
      id="Login-SingUp-Form"
      onSubmit={ClientDataSubmit}
    >
      {ErrorData.err === "true" && (
        <div className="login-error-options">{ErrorData.message}</div>
      )}

      <div className="add-client1-div">
        <label className="add-client1-label">UserName:</label>
        <input
          className="add-client1-input"
          type="text"
          value={ClientData.UserName}
          name="addUserName"
          onChange={ClientChange}
          onFocus={ClientBlurFocus}
          onBlur={ClientBlurFocus}
        ></input>
      </div>
      <div className="add-client1-div">
        <label className="add-client1-label">Email:</label>
        <input
          className="add-client1-input"
          type="email"
          value={ClientData.Email}
          name="addEmail"
          onChange={ClientChange}
          onFocus={ClientBlurFocus}
          onBlur={ClientBlurFocus}
        ></input>
      </div>
      <div className="add-client1-div">
        <label className="add-client1-label">Password:</label>
        <input
          className="add-client1-input"
          type="password"
          value={ClientData.Password}
          name="addPassword"
          onChange={ClientChange}
          onFocus={ClientBlurFocus}
          onBlur={ClientBlurFocus}
        ></input>
      </div>
      <button className="add-client1-button">Login</button>
    </form>
  );
}

export default ClientAuthorization;
