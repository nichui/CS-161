import React from 'react'
import Typewriter from 'typewriter-effect'

var style = {
    fontFamily: "Verdana",
    color: "#3d8a44",
};

const Jumbotron = ({text}) => (
    <Typewriter
        options={{
        strings: text,
        autoStart: true,
        loop: true,
    }} />
);

export default Jumbotron;