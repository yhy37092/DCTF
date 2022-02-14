import React, {useState} from "react";
import {Button, Col, Form, FormControl, FormGroup, FormLabel, FormText, Row} from "react-bootstrap";
import DateTimePicker from "react-datetime-picker";
import SimpleMDE from "react-simplemde-editor";

export default ({drizzle, drizzleState}) => {

    const {add} = drizzle.contracts.Contests.methods;

    const [contestType, setContestType] = useState("Jeopardy")
    const [name, setName] = useState("");
    const [fee, setFee] = useState(0);
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [message, setMessage] = useState("");

    const handleSubmit = event => {
        event.preventDefault();
        add.cacheSend([contestType, name, fee, parseInt(start.getTime()/1000), parseInt(end.getTime()/1000), message]);
    }

    return(
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col md={3}>
                    <FormLabel>Challenge Types</FormLabel>
                    {
                        ['Jeopardy', 'Attack With Defence'].map((type) => (
                            <Form.Check type={"radio"} name={'type'} label={type} key={type}
                                        defaultChecked={type === 'Jeopardy'}
                                        onClick={() => setContestType(type)}/>
                        ))
                    }
                </Col>
                <Col>
                    <FormGroup>
                        <FormLabel as={Row}>Name:</FormLabel>
                        <FormText as={Row} muted>The name of your challenge</FormText>
                        <FormControl key="name" type="text" value={name}
                                     placeholder="Enter contest name"
                                     onChange={event => setName(event.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel as={Row}>Fee:</FormLabel>
                        <FormText as={Row} muted>The fee of your contest</FormText>
                        <FormControl type="number" value={fee}
                                     placeholder="Enter contest fee"
                                     onChange={event => setFee(event.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel as={Row}>Start:</FormLabel>
                        <FormText as={Row} muted>This is the time your contest start.</FormText>
                        <DateTimePicker onChange={setStart} value={start} />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel as={Row}>End:</FormLabel>
                        <FormText as={Row} muted>This is the time your contest end.</FormText>
                        <DateTimePicker onChange={setEnd} value={end} />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel as={Row}>Message:</FormLabel>
                        <FormText as={Row} muted>Use this to give a brief introduction to your
                            contest.</FormText>
                        <SimpleMDE value={message} onChange={setMessage}/>
                    </FormGroup>

                    <FormGroup>
                        <Button className="float-end" key="submit" variant="primary" type="button"
                                onClick={handleSubmit}>Create</Button>
                    </FormGroup>
                </Col>
            </Row>
        </Form>
    )
}