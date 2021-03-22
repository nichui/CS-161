import { BoldOutlined } from '@ant-design/icons';
import React from 'react'

const FAQ = () => {
    const style = {
        backgroundColor: "white",
        fontSize: "45px",
        fontFamily:"Aerial",
        padding:'20px',
        textAlign:'center',
    };

    const style1 = {
        backgroundColor: "#d0dbd1",
        fontSize: "33px",
        fontFamily:'Papyrus',
        fontWeight:'bold',
        padding:'15px',
        opacity:'0.6'
    };

    const style2 = {
        backgroundColor: "white",
        fontSize: "27px",
        fontFamily:'Dosis',
        padding:'10px',
    
    };
    

    return (

<div style={style}>
        <h1 style={{ backgroundColor: "#d0dbd1" , fontSize:'48px', fontFamily:'Papyrus', fontWeight: 'bold', padding:'15px', border:'5px blue'}}>Got A Spot: FAQ</h1>
        <h1 style={style1}> How do we sign up?</h1>
        <h1 style={style2}>Simply register with your email account and verify it with the confirmation link sent to your email.</h1>
        <h2 style={style1}>What type of spots can I find here?</h2>
        <h2 style={style2}>You can find everything from outdoor spots like hiking trails to indoor spots like museums.</h2>
        <h3 style={style1}>How many spots can I book at once?</h3>
        <h3 style={style2}>You can book as many spots as you can, as long as your reservation times don't conflict.</h3>
        <h4 style={style1}>How do I know if the spot is safe for me to visit?</h4>
        <h4 style={style2}>All safety guidelines are shown under each location.</h4>
        <h5 style={style1}>What happens when the vendor publishes a suspicious spot?</h5>
        <h5 style={style2}>Then Danh the gambler and lone shark will penalize the vendor with a $500 fine.</h5> 
        <h6 style={style1}>Was this FAQ helpful?</h6>
        <h6 style={style2}>We sure hope this was helpful! If not, please email us at coolbeanscs161@gmail.com.</h6>

        </div>

    )};

export default FAQ
