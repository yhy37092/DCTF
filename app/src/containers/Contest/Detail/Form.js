import React, {useEffect, useState} from "react";
import {Button, Col, Form, FormControl, FormLabel, Row} from "react-bootstrap";

export default ({drizzle, drizzleState, contestId}) => {
    const {contests} = drizzle.contracts.Contests.methods;

    const [name, setName] = useState("");
    const [captain, setCaptin] = useState(drizzleState.accounts[0]);
    const [members, setMembers] = useState([]);
    const [count, setCount] = useState(0);
    const [contestKey, setContestKey] = useState(0);
    const contest = drizzleState.contracts.Contests.contests[contestKey]
    useEffect(() => {
        const contestKey = contests.cacheCall(contestId);
        setContestKey(contestKey);
    }, [contests, contestId])
    useEffect(() => {
        setCaptin(drizzleState.accounts[0]);
    }, [drizzleState.accounts])
    const handleSubmit = event => {
        event.preventDefault();
        drizzle.contracts.Teams.methods.applyContest.cacheSend(contestId, [name, captain, members], {value: contest.value.contestInfo.fee});
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormLabel>team name</FormLabel>
            <FormControl key="name" type="text" name="name" value={name} placeholder="Enter name"
                         onChange={event => setName(event.target.value)}/>
            <FormLabel>captain account</FormLabel>
            <FormControl key="captain" type="text" name="captain" value={captain} placeholder="Enter captain"
                         onChange={event => setCaptin(event.target.value)}/>
            {
                members.map((member, index) => (
                    <div key={index + 1}>
                        <FormLabel>member {index + 1}</FormLabel>
                        <FormControl type="text" name={index + 1} value={member} placeholder="Enter member account"
                                     onChange={event => {
                                         const tmp = members.slice();
                                         tmp[index] = event.target.value;
                                         setMembers(tmp);
                                     }}/>
                    </div>
                ))
            }
            <Row>
                <Col>
                    <Button className="float-start" key="Add member" variant="outline-secondary" type="button"
                            onClick={() => {
                                setCount(count + 1);
                                members.splice(count, 0, '');
                            }}>Add</Button>
                </Col>
                <Col>
                    <Button className="float-end" key="Delete member" variant="outline-secondary" type="button"
                            onClick={() => {
                                count > 0 && setCount(count - 1);
                                members.splice(members.length - 1, 1);
                            }}>sub</Button>
                </Col>
            </Row>
            <Button key="submit" variant="primary" type="button" onClick={handleSubmit}>Submit</Button>
        </Form>
    )
}