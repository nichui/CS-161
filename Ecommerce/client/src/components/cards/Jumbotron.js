import React from 'react'
import Typewriter from 'typewriter-effect'

const style = {
    fontFamily: "Papyrus",
    color: "#3d8a44",
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