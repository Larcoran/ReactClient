import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Icon = ({ status }) => {
    switch (status) {
        case 'operational':
            return <FontAwesomeIcon icon='check' color='#5cdb95' size='lg' />;
        case 'under maintenance':
            return <FontAwesomeIcon icon='exclamation' color='#f3d250' size='lg' />;
        case 'service disruption':
            return <FontAwesomeIcon icon='exclamation' color='#f3d250' size='lg' />;
        case 'warning':
            return <FontAwesomeIcon icon='exclamation' color='#f3d250' size='lg' />;
        case 'service outage':
            return <FontAwesomeIcon icon='times' color='#f76c6c' size='lg' />;
        case 'error !':
            return <FontAwesomeIcon icon='times' color='#f76c6c' size='lg' />;
        default: return <FontAwesomeIcon icon='times' color='#f76c6c' size='lg' />;
    }
}

export default Icon;