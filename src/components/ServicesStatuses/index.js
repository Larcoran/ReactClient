import React, { forwardRef, useImperativeHandle } from "react";
import styled from "styled-components";
import StatusRow from "./StatusRow";

const SectionHeader = styled.h3`
  width: 100%;
  padding: 8px;
  color: #254e58;
  text-align: center;
  margin: 0;
  background: ${props => props.background};
  border-radius: 6px 6px 0 0;
`;

var failTime = null;

class ServiceStatuses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      credentialsValid: true,
      siteCounter: 0,
      data: null,
      apierror: null,
      isLoaded: false,
      hasError: false
    };
  }

  HttpErrorParser(error) {
    switch (error) {
      case "400":
        return "Bad Request";
      case "401":
        return "Unauthorized";
      case "403":
        return "Forbidden";
      case "404":
        return "Not Found";
      case "500":
        return "Internal Server Error";
      case "502":
        return "Bad Gateway";
      case "503":
        return "Service Unavailable";
      case "504":
        return "Gateway Timeout";
      default:
        return "Unrecognized error (" + error + ")";
    }
  }

  componentDidMount() {
    setInterval(() => {
      this.checkSiteStatus();
      fetch(this.props.endpoint, {
        method: "GET",
        headers: new Headers({
          "Access-Control-Allow-Origin": "*",
          Authorization: "Basic " + this.props.token,
          "Content-Type": "application/json"
        })
      })
        .then(response => {
          if (response.status !== 200) {
            this.props.changeServiceStatus(res.status);
            throw new Error(response.status);
          }
          return response.json();
        })
        .then(data => {
          this.setState({
            isLoaded: true,
            hasError: false,
            apierror: null,
            data,
            failTime: null
          });
        })
        .catch(e => {
          this.props.changeServiceStatus(e);
          if (e != "TypeError: Failed to fetch") {
            failTime =
              failTime !== null && failTime !== undefined
                ? failTime
                : new Date(Date.now());
            this.setState({
              credentialsValid: true,
              hasError: true,
              isLoaded: true,
              data: null,
              apierror: {
                name: "API ERROR",
                statusString: "Error !",
                dataValidated: false,
                statusCode: 500,
                error: this.HttpErrorParser(e.message),
                failTime: failTime
              }
            });
          }
        });
    }, parseInt(this.props.timer, 10) * 1000);
  }

  checkSiteStatus() {
    const request = async () => {
      await fetch("api-url")
        .then(res => {
          if (res.ok) {
            this.setState({
              siteCounter: this.state.siteCounter + 1
            });
            this.props.changeSiteStatus(res.status, this.state.siteCounter);
          } else throw Error(res.status);
        })
        .catch(error => {
          this.setState({
            siteCounter: this.state.siteCounter + 1
          });
          this.props.changeSiteStatus(error, this.state.siteCounter);
        });
    };
    request();
  }

  getSectionBackground(data) {
    const errors = [];
    const warnings = [];

    if (Array.isArray(data)) {
      data.map(item => {
        switch (item.statusString) {
          case "Under Maintenance":
            warnings.push(item.error);
            return;
          case "Service Disruption":
            warnings.push(item.error);
            return;
          case "Warning":
            warnings.push(item.error);
            return;
          case "Service Outage":
            errors.push(item.error);
            return;
          case "Error !":
            errors.push(item.error);
            return;
        }
      });
      if (errors.length > 2) return "#f76c6c";
      if (errors.length > 0) return "#f3d250";
      if (warnings.length >= 2) return "#f3d250";
      return "#5cdb95";
    } else {
      if (data.error) return "#f76c6c";
      else return "#5cdb95";
    }
  }

  render() {
    const { isLoaded, data, apierror, hasError } = this.state;
    const { title } = this.props;

    const isArray = Array.isArray(data);

    const loadingObject = {
      name: "Loading ...",
      statusString: "Warning",
      dataValidated: false,
      statusCode: 500,
      error: "Loading ...",
      failTime: new Date(Date.now())
    };

    if (apierror !== null && apierror.error === "Unauthorized") {
      this.props.changeResponse(401);
    }
    if (data !== null) {
      return (
        <div>
          <SectionHeader background={this.getSectionBackground(data)}>
            {title}
          </SectionHeader>
          {isArray ? (
            data.map(item => (
              <StatusRow
                key={item.name}
                data={item}
                timer={this.props.timer}
                counter={item.failTime}
              />
            ))
          ) : (
            <StatusRow
              key={data.name}
              data={data}
              timer={this.props.timer}
              counter={data.failTime}
            />
          )}
        </div>
      );
    }

    if (hasError) {
      return (
        <div>
          <SectionHeader background="#f76c6c">{title}</SectionHeader>
          <StatusRow
            data={apierror}
            timer={this.props.timer}
            counter={apierror.failTime}
          />
        </div>
      );
    }

    if (!isLoaded) {
      return (
        <div>
          <SectionHeader background="#f3d250">{title}</SectionHeader>
          <StatusRow
            data={loadingObject}
            timer={this.props.timer}
            counter={loadingObject.failTime}
          />
        </div>
      );
    }
  }
}
export default ServiceStatuses;
