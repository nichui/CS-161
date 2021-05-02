import { BoldOutlined } from '@ant-design/icons';
import React from 'react';
import { Card, CardHeader, CardBody, CardTitle, CardText, Button } from 'reactstrap';

const FAQ = () => {
    const style = {
        backgroundColor: "#d7eaf5",
    };

    const text = {
        color: "black"
    }
    

    return (
        <>
        <link
            href="https://fonts.googleapis.com/css?family=Montserrat:400,700,200"
            rel="stylesheet"
            />
        <link
            href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css"
            rel="stylesheet"
            />
            <h1 className="text-center">
                Frequently Asked Questions
            </h1>
        <Card>
        <CardHeader style={style}><h4>How do we sign up?</h4></CardHeader>
        <CardBody>
            <CardText style={text}>Simply register with your email account and verify it with the confirmation link sent to your email.</CardText>
            <Button href="/register" color="primary">Register</Button>
        </CardBody>
        </Card>

        <Card>
        <CardHeader style={style}><h4>What type of spots can I find here?</h4></CardHeader>
        <CardBody>
            <CardText style={text}>You can find everything from outdoor spots like hiking trails to indoor spots like museums.</CardText>
            <Button href="/shop" color="primary">Shop</Button>
        </CardBody>
        </Card>

        <Card>
        <CardHeader style={style}><h4>How many spots can I book at once?</h4></CardHeader>
        <CardBody>
            <CardText style={text}>You can book as many spots as you can, as long as your reservation times don't conflict.</CardText>
        </CardBody>
        </Card>

        <Card>
        <CardHeader style={style}><h4>How do I know if the spot is safe for me to visit?</h4></CardHeader>
        <CardBody>
            <CardText style={text}>All safety guidelines are shown under each location.</CardText>
        </CardBody>
        </Card>

        <Card>
        <CardHeader style={style}><h4>What happens when the vendor publishes a suspicious spot?</h4></CardHeader>
        <CardBody>
            <CardText style={text}>Then Danh the Durian gambler and lone shark will penalize the vendor with a $500 fine.</CardText>
        </CardBody>
        </Card>

        <Card>
        <CardHeader style={style}><h4>Was this FAQ helpful?</h4></CardHeader>
        <CardBody>
            <CardText style={text}>We sure hope this was helpful! If not, please email us at coolbeanscs161@gmail.com.</CardText>
        </CardBody>
        </Card>

        </>
    )};

export default FAQ
