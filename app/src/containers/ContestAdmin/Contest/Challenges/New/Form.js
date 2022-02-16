import React, { useState} from "react";
import {Button, Col, Form, FormControl, FormGroup, FormLabel, FormText, Row} from "react-bootstrap";
import {useParams} from "react-router";
import SimpleMDE from "react-simplemde-editor";

export default ({drizzle, drizzleState}) => {

    const {add} = drizzle.contracts.Challenges.methods;
    const {contestId} = useParams();

    const [challengeType, setChallengeType] = useState("standard");
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [message, setMessage] = useState("");
    const [connectionInfo, setConnectionInfo] = useState("");
    const [file, setFile] = useState("");
    const [hint, setHint] = useState("");
    const [value, setValue] = useState(0);

    const handleSubmit = (event) => {
        event.preventDefault();
        add.cacheSend(contestId, [challengeType, name, category, message, connectionInfo, file, hint, value]);
    }

    return(
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col md={4}>
                    <FormLabel>Challenge Types</FormLabel>
                    {
                        ['standard'/*, 'code', 'dynamic', 'manual_verification', 'multiple_choice'*/].map((type) => (
                            <Form.Check type={"radio"} name={'type'} label={type} key={type}
                                        defaultChecked={type === 'standard'}
                                        onClick={() => setChallengeType(type)}/>
                        ))
                    }
                </Col>
                <Col>
                    <FormGroup>
                        <FormLabel as={Row}>Name:</FormLabel>
                        <FormText as={Row} muted>The name of your challenge</FormText>
                        <FormControl type="text" value={name}
                                     placeholder="Enter challenge name"
                                     onChange={event => setName(event.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel as={Row}>Category:</FormLabel>
                        <FormText as={Row} muted>The category of your challenge</FormText>
                        <FormControl type="text" value={category}
                                     placeholder="Enter challenge category"
                                     onChange={event => setCategory(event.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel as={Row}>Message:</FormLabel>
                        <FormText as={Row} muted>Use this to give a brief introduction to your
                            challenge.</FormText>
                        <SimpleMDE value={message} onChange={setMessage}/>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel as={Row}>Connection Info:</FormLabel>
                        <FormText as={Row} muted>The connection info of your challenge</FormText>
                        <FormControl type="text" value={connectionInfo}
                                     placeholder="Enter challenge connection info"
                                     onChange={event => setConnectionInfo(event.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel as={Row}>File URL:</FormLabel>
                        <FormText as={Row} muted>The files of your challenge</FormText>
                        <FormControl type="text" value={file}
                                     placeholder="Enter challenge hint"
                                     onChange={event => setFile(event.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel as={Row}>Hint:</FormLabel>
                        <FormText as={Row} muted>The hint of your challenge</FormText>
                        <FormControl type="text" value={hint}
                                     placeholder="Enter challenge hint"
                                     onChange={event => setHint(event.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel as={Row}>Value:</FormLabel>
                        <FormText as={Row} muted>This is how many points are rewarded for solving this
                            challenge.</FormText>
                        <FormControl type="number" value={value}
                                     onChange={event => setValue(event.target.value)}/>
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