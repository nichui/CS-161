import React from 'react'
import Typewriter from 'typewriter-effect'

const style = {
    fontFamily: "Arial",
    color: "#2b637a",
};

const Jumbotron = ({text}) => (
    <div style={style}>
    <Typewriter
        options={{
        strings: text,
        autoStart: true,
        loop: true,
    }} />
    </div>
);

export default Jumbotron;