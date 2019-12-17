import React, { Component, Fragment, useRef } from "react";
import ServicesStatuses from "./components/ServicesStatuses";
import Clock from "./components/Clock";
import styled from "styled-components";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheck,
  faTimes,
  faExclamation
} from "@fortawesome/free-solid-svg-icons";
import "abortcontroller-polyfill/dist/polyfill-patch-fetch";

library.add(faCheck);
library.add(faTimes);
library.add(faExclamation);

const StyledGrid = styled.div``;

const GridWraper = styled.div`
  width: 100%;
  padding: 8px;
  display: flex;
  justify-content: space-between;
  flex-flow: row no-wrap;
`;
const GridCol = styled.div`
  width: ${props => (props.flexWidth ? props.flexWidth : "33%")}
  color: #254e58;
  text-align: center;
  
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
  }

  render() {
    const host = "---to be filled---";
    const itself = "---to be filled---";

    const host1 = "---to be filled---";

    return (
      <StyledGrid>
        <GridWraper>
          <GridCol>
            <ServicesStatuses
              endpoint={host + "extension"}
              title="Service X"
              timer="10"
              token={this.props.token}
              changeResponse={this.props.changeResponse}
              changeSiteStatus={this.props.changeSiteStatus}
              changeServiceStatus={this.props.changeSiteStatus}
            />
          </GridCol>
          <GridCol>
            <ServicesStatuses
              endpoint={host + "extension"}
              title="Service X"
              timer="10"
              token={this.props.token}
              changeResponse={this.props.changeResponse}
              changeSiteStatus={this.props.changeSiteStatus}
              changeServiceStatus={this.props.changeSiteStatus}
            />
          </GridCol>
          <GridCol>
            <ServicesStatuses
              endpoint={host + "extension"}
              title="Service X"
              timer="10"
              token={this.props.token}
              changeResponse={this.props.changeResponse}
              changeSiteStatus={this.props.changeSiteStatus}
              changeServiceStatus={this.props.changeSiteStatus}
            />
          </GridCol>
        </GridWraper>
        <GridWraper>
          <GridCol flexWidth="49.5%">
            <ServicesStatuses
              endpoint={host + "extension"}
              title="Service X"
              timer="10"
              token={this.props.token}
              changeResponse={this.props.changeResponse}
              changeSiteStatus={this.props.changeSiteStatus}
              changeServiceStatus={this.props.changeSiteStatus}
            />
            <p />
            <ServicesStatuses
              endpoint={host + "extension"}
              title="Service X"
              timer="10"
              token={this.props.token}
              changeResponse={this.props.changeResponse}
              changeSiteStatus={this.props.changeSiteStatus}
              changeServiceStatus={this.props.changeSiteStatus}
            />
            <p />
            <Clock />
          </GridCol>
          <GridCol flexWidth="49.5%">
            <ServicesStatuses
              ref={this.child}
              endpoint={host + "extension"}
              title="PayPal"
              timer="60"
              token={this.props.token}
              changeResponse={this.props.changeResponse}
              changeSiteStatus={this.props.changeSiteStatus}
              changeServiceStatus={this.props.changeSiteStatus}
            />
          </GridCol>
        </GridWraper>
      </StyledGrid>
    );
  }
}

export default App;
