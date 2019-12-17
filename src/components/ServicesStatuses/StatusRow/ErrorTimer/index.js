import React from 'react';
import { faMinus } from '@fortawesome/free-solid-svg-icons';

const ErrorTimer = ({ counter }) => {


    let now = new Date(Date.now())
    let failtime = new Date(counter);
    let diff = now - failtime;

    var weeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
    diff -= weeks * (1000 * 60 * 60 * 24 * 7);

    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * (1000 * 60 * 60 * 24);

    var hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * (1000 * 60 * 60);

    var minutes = Math.floor(diff / (1000 * 60));
    diff -= minutes * (1000 * 60);

    if (weeks >= 12) return 'for too long'
    if (weeks >= 1) return weeks + 'w ' + days + 'd ' + hours + 'h and ' + minutes + 'min '
    if (days >= 1) return days + 'd ' + hours + 'h and ' + minutes + 'min '
    if (hours >= 1) return hours + 'h and ' + minutes + 'min '
    if (minutes >= 5) return minutes + 'min '
    return null
}
export default ErrorTimer;