import React, { Component, Fragment } from "react";
import styled from "styled-components";
import Icon from "./Icon";
import Status from "./Status";
import ErrorTimer from "./ErrorTimer";

const GridWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row no-wrap;
`;
const GridBlock = styled.div`
  width: 100%;
  text-align: center;
  font-weight: bold;
`;

const StyledError = styled.div`
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
`;

const StyledP = styled.p`
  font-size: 20px;
  margin-top: 4px;
  margin-bottom: 0;
`;
const Spacer = styled.div`
  margin-top: 20px;
`;

const StatusRow = ({ data: { name, statusString, error }, timer, counter }) => {
  return (
    <StyledError>
      <GridWrapper>
        <GridBlock>
          <p> {name}</p>
        </GridBlock>
        <GridBlock>
          <Status status={statusString.toLowerCase()} error={error} />
        </GridBlock>
        <GridBlock>
          <Spacer>
            <Icon status={statusString.toLowerCase()} />
            {name.toLowerCase() !== "receiving orders" && (
              <StyledP>
                {statusString.toLowerCase() !== "operational" && (
                  <ErrorTimer
                    status={statusString}
                    timer={timer}
                    counter={counter}
                  />
                )}
              </StyledP>
            )}
          </Spacer>
        </GridBlock>
      </GridWrapper>
    </StyledError>
  );
};

export default StatusRow;
