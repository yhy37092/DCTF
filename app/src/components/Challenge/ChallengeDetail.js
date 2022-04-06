import React, {useEffect, useState} from "react";
import {Button, Card, ListGroup, ListGroupItem} from "react-bootstrap";
import ReactMarkdown from 'react-markdown'
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import aes from "crypto-js/aes";
import utf8 from "crypto-js/enc-utf8";

export default ({challenge}) => {
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [message, setMessage] = useState('')
    const [connectionInfo, setConnectionInfo] = useState('')
    const [file, setFile] = useState('')
    const [hint, setHint] = useState('')
    const [value, setValue] = useState('0')
    const [key,setKey] = useState('')
    const [enc,setEnc] =useState(true);
    useEffect(() => {
        setName(challenge.info.name)
        setCategory(challenge.info.category)
        setMessage(challenge.info.message)
        setConnectionInfo(challenge.info.connectionInfo)
        setFile(challenge.info.file)
        setHint(challenge.info.hint)
        setValue(challenge.info.value)
        setKey(challenge.key)
    }, [challenge])
    return (
        <Card>
            <Card.Body>
                <Card.Title className="text-center"><strong>{name}</strong></Card.Title>
            </Card.Body>
            <ListGroup variant="flush">
                <ListGroupItem
                    className="text-center"><strong>{value}</strong> points</ListGroupItem>
                <ListGroupItem><ReactMarkdown>{message}</ReactMarkdown></ListGroupItem>
                {connectionInfo !== '' ?
                    <ListGroupItem>URL: <a href={connectionInfo}>Go to</a></ListGroupItem> : null}
                {file !== '' ?
                    <ListGroupItem>File: <a href={file}><FontAwesomeIcon
                        icon={solid("download")}/>Download</a></ListGroupItem> : null}
                {hint !== '' ?
                    <ListGroupItem>hint: {hint}</ListGroupItem> : null}
                <ListGroupItem>Key: {key} {key !== '' ? <Button variant={"primary"} type={"button"} onClick={()=>{
                    if(enc){
                        try {
                            setName(aes.decrypt(name,key).toString(utf8))
                            setCategory(aes.decrypt(category,key).toString(utf8))
                            setMessage(aes.decrypt(message,key).toString(utf8))
                            setConnectionInfo(aes.decrypt(connectionInfo,key).toString(utf8))
                            setFile(aes.decrypt(file,key).toString(utf8))
                            setHint(aes.decrypt(hint,key).toString(utf8))
                        }catch (e) {
                            alert(e)
                        }
                        setEnc(false)
                    }
                }}>Decrypt</Button>:null}</ListGroupItem>
            </ListGroup>
        </Card>
    )
}