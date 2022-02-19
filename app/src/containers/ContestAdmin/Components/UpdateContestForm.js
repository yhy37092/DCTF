import React, {useEffect, useState} from "react";
import {Button, Form, FormControl, FormGroup, FormLabel, FormText, Row} from "react-bootstrap";
import DateTimePicker from "react-datetime-picker";
import SimpleMDE from "react-simplemde-editor";

export default ({onSubmit, data}) => {

    const [contestType, setContestType] = useState(data.info.contestType)
    const [name, setName] = useState(data.info.name)
    const [fee, setFee] = useState(data.info.fee)
    const [start, setStart] = useState(new Date(parseInt(data.info.start) * 1000))
    const [end, setEnd] = useState(new Date(parseInt(data.info.start) * 1000));
    const [message, setMessage] = useState(data.info.message);

    useEffect(()=>{
        setContestType(data.info.contestType)
        setName(data.info.name)
        setFee(data.info.fee)
        setStart(new Date(parseInt(data.info.start) * 1000))
        setEnd(new Date(parseInt(data.info.end) * 1000))
        setMessage(data.info.message)
    },[data])

    return (
        <Form onSubmit={event => {
            event.preventDefault()
            onSubmit({
                _data: [contestType, name, fee, parseInt(start.getTime() / 1000), parseInt(end.getTime() / 1000), message]
            })
        }
        }>
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
                <Button className="float-end" variant="primary" type="submit">Update</Button>
            </FormGroup>
        </Form>
    )
}