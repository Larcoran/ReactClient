import React from 'react';
import styled from 'styled-components';

const StyledOperationalMessage = styled.div`
  color: #5cdb95;
`;

const StyledErrorMessage = styled.div`
  color: #f76c6c;
`;

const StyledWarningMessage = styled.div`
  color: #f3d250;
`;

const Status = ({ status, error }) => {
    switch (status) {
        case 'operational':
            return <StyledOperationalMessage><p>{error}</p></StyledOperationalMessage>;
        case 'under maintenance':
            return <StyledWarningMessage><p>{status}</p></StyledWarningMessage>;
        case 'service disruption':
            return <StyledWarningMessage><p>{status}</p></StyledWarningMessage>;
        case 'warning':
            return <StyledWarningMessage><p>{error}</p></StyledWarningMessage>;
        case 'outage':
            return <StyledErrorMessage><p>{status}</p></StyledErrorMessage>;
        case 'error !':
            return <StyledErrorMessage><p>{error}</p></StyledErrorMessage>;
        default: return <StyledErrorMessage><p>{status}</p></StyledErrorMessage>;
    }

}

export default Status;