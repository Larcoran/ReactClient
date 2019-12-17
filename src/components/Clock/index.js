import React from 'react';
import styled from 'styled-components'


const StyledClock = styled.div`
width: 160px;
position: absolute;
  bottom: 2%;
  left: 2%;
  padding: 20px;
  overflow: hidden;
  border: none;
  font-size: 28px;
  border-radius: 6px;
  color: rgba(255,255,255,1);
  text-align: center;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  background: #0199d9;
  -webkit-box-shadow: 1px 1px 1px 0 rgba(0,0,0,0.3) ;
  box-shadow: 1px 1px 1px 0 rgba(0,0,0,0.3) ;
  text-shadow: 1px 1px 1px rgba(0,0,0,0.2) ;
`

class Clock extends React.Component {

    constructor(props) {
        super(props);
        this.state =
            {
                curTime: new Date()
            }
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({
                curTime: new Date()
            })
        }, 1000)
    }

    render() {
        const { curTime } = this.state;
        //return <StyledClock >{curTime.getHours() + ":" + curTime.getMinutes() + ":" + curTime.getSeconds()}</StyledClock>
        return <StyledClock >{curTime.toLocaleTimeString()}</StyledClock>

    }
}
export default Clock;