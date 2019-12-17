import React from "react";
import styled from "styled-components";
import App from "../../App";
import "abortcontroller-polyfill/dist/polyfill-patch-fetch";
import "regenerator-runtime/runtime";

const StyledInput = styled.input`
  border-radius: 6px;
  border: 2px solid rgba(255, 255, 255, 0.5);
  font-size: 1em;
  margin: 10px;
  padding: 10px;
`;

const StyledStatus = styled.div`
  width: auto;
  height: auto;
  position: absolute;
  top: 35%;
  left: 35%;
  border-radius: 6px;
  font-size: 1em;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  text-margin: 0 auto;
  background: #f76c6c;
  -webkit-box-shadow: 1px 1px 1px 0 rgba(0, 0, 0, 0.3);
  box-shadow: 1px 1px 1px 0 rgba(0, 0, 0, 0.3);
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
  padding: 60px;
  margin: 20px;
`;

const StyledBtn = styled.button`
  border-radius: 6px;
  border: 2px solid rgba(255, 255, 255, 0.5);
  font-size: 1em;
  margin: 10px;
  background: #f3d250;
  padding: 10px 80px 10px 80px;
`;

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.keyPressed = this.keyPressed.bind(this);
    this.clicked = this.clicked.bind(this);
    this.validateCredentials = this.validateCredentials.bind(this);
    this.changeResponse = this.changeResponse.bind(this);
    this.changeSiteStatus = this.changeSiteStatus.bind(this);
    this.changeServiceStatus = this.changeServiceStatus.bind(this);

    this.state = {
      responseStatus: null,
      siteStatus: null,
      siteCounter: 0,
      serviceStatus: null,
      username: null,
      password: null,
      token: null
    };
  }

  changeResponse(newValue) {
    this.setState({ responseStatus: newValue });
  }
  changeSiteStatus(newSite, newCount) {
    this.setState({
      siteStatus: newSite,
      siteCounter: newCount
    });
  }
  changeServiceStatus(newValue) {
    this.setState({ serviceStatus: newValue });
  }

  componentDidMount() {
    setInterval(() => {
      this.validateCredentials();
      this.forceUpdate();
    }, 10000);
  }

  validateCredentials() {
    const request = async () => {
      await fetch("api-url")
        .then(res => {
          if (res.ok) this.changeServiceStatus(res.status);
          else throw Error(res.status);
        })
        .catch(error => {
          this.changeServiceStatus(error);
        });
    };
    request();
    const request1 = async () => {
      await fetch("api-url")
        .then(res => {
          if (res.ok) {
            this.setState({
              siteCounter: 0
            });
            this.changeSiteStatus(res.status);
          } else throw Error(res.status);
        })
        .catch(error => {
          if (this.state.siteStatus === error) {
            this.setState({
              siteCounter: this.state.siteCounter + 1
            });
          }
          this.changeSiteStatus(error);
        });
    };
    request1();
    const request2 = async () => {
      const response = await fetch("api-url", {
        method: "GET",
        headers: new Headers({
          Authorization: "Basic " + this.getToken()
        })
      });
      this.changeResponse(response.status);
    };
    request2();
  }

  clicked() {
    this.validateCredentials();
    this.forceUpdate();
  }

  keyPressed(event) {
    if (event.key === "Enter") {
      this.clicked();
    }
  }

  getToken() {
    return btoa(this.state.username + ":" + this.state.password);
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    if (this.state.siteStatus === null && this.state.serviceStatus === null)
      return (
        <StyledStatus>
          <p>Loading ...</p>
        </StyledStatus>
      );
    if (
      this.state.siteStatus !== 200 &&
      this.state.siteStatus !== null &&
      this.state.siteCounter >= 19
    )
      return (
        <StyledStatus>
          <p>Website is currently offline ...</p>
        </StyledStatus>
      );
    if (this.state.serviceStatus !== 200 && this.state.siteStatus !== null)
      return (
        <StyledStatus>
          <p>Web Service is currently offline ...</p>
        </StyledStatus>
      );

    if (
      this.state.responseStatus !== 401 &&
      this.state.responseStatus !== 204 &&
      this.state.responseStatus !== null
    )
      return (
        <div>
          <App
            token={this.getToken()}
            changeResponse={this.changeResponse}
            changeServiceStatus={this.changeServiceStatus}
            changeSiteStatus={this.changeSiteStatus}
          />
        </div>
      );
    else {
      return (
        <StyledStatus>
          <StyledInput
            type="text"
            placeholder="Username"
            name="username"
            onChange={this.handleInputChange}
          />
          <br />
          <StyledInput
            placeholder="Password"
            type="password"
            name="password"
            onChange={this.handleInputChange}
            onKeyPress={this.keyPressed}
          />
          <br />
          <StyledBtn onClick={this.clicked} label="Submit">
            Log In{" "}
          </StyledBtn>
        </StyledStatus>
      );
    }
  }
}
export default LogIn;
