import React, {useEffect, useState} from "react";
import {Button, Form, FormControl, FormGroup, FormLabel, FormText, Row} from "react-bootstrap";
import DateTimePicker from "react-datetime-picker";
import SimpleMDE from "react-simplemde-editor";
import {useParams} from "react-router";

export default ({drizzle, drizzleState}) => {

    const {contestId} = useParams();

    const {update, contests} = drizzle.contracts.Contests.methods;

    const [contestKey, setContestKey] = useState(0);
    const {Contests} = drizzleState.contracts;
    const contest = Contests.contests[contestKey];
    useEffect(() => {
        const contestKey = contests.cacheCall(contestId);
        setContestKey(contestKey);
    }, [contests, contestId])

    const [contestType, setContestType] = useState("")
    const [name, setName] = useState("");
    const [fee, setFee] = useState(0);
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [message, setMessage] = useState("");
    useEffect(() => {
        contest && setContestType(contest.value.contestInfo.contestType)
        contest && setName(contest.value.contestInfo.name);
        contest && setFee(contest.value.contestInfo.fee);
        contest && setStart(new Date(parseInt(contest.value.contestInfo.start) * 1000));
        contest && setEnd(new Date(parseInt(contest.value.contestInfo.end) * 1000));
        contest && setMessage(contest.value.contestInfo.message);
    }, [contest])

    const handleSubmit = event => {
        event.preventDefault();
        update.cacheSend(contestId, [contestType, name, fee, start.getTime()/1000, end.getTime()/1000, message]);
    }

    return(
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <FormLabel as={Row}>Name:</FormLabel>
                <FormText as={Row} muted>The name of your challenge</FormText>
                <FormControl type="text" value={name}
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
                <DateTimePicker onChange={setStart} value={start}/>
            </FormGroup>
            <FormGroup>
                <FormLabel as={Row}>End:</FormLabel>
                <FormText as={Row} muted>This is the time your contest end.</FormText>
                <DateTimePicker onChange={setEnd} value={end}/>
            </FormGroup>
            <FormGroup>
                <FormLabel as={Row}>Message:</FormLabel>
                <FormText as={Row} muted>Use this to give a brief introduction to your
                    contest.</FormText>
                <SimpleMDE value={message} onChange={setMessage}/>
            </FormGroup>

            <FormGroup>
                <Button className="float-end" key="submit" variant="primary" type="button"
                        onClick={handleSubmit}>Update</Button>
            </FormGroup>
        </Form>
    )
}