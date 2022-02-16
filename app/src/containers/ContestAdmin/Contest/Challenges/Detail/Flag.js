import React, {useEffect, useState} from "react";
import {Button, Form, FormControl, Tab, Tabs} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {adminAdd, adminRemove, getAdminFlags} from "../../../../../reducers/flags";
import Web3Utils from "web3-utils";
import {useParams} from "react-router";

export default ({drizzle, drizzleState}) => {

    const {commitForAdmin} = drizzle.contracts.Moves.methods;

    const {contestId} = useParams();
    const {challengeId} = useParams();

    const flags = useSelector(getAdminFlags);
    const dispatch = useDispatch();

    const handleSubmit = event => {
        event.preventDefault();
        // remove old
        flags.forEach((item, index) => {
            if (item.challengeId === challengeId)
                dispatch(adminRemove(index));
        })
        // add new
        const salt = Web3Utils.randomHex(32);
        dispatch(adminAdd({contestId: contestId, challengeId: challengeId, flag: flag, salt: salt}));
        commitForAdmin.cacheSend(contestId, challengeId, Web3Utils.soliditySha3(flag, salt));
    }

    const [flag, setFlag] = useState('');

    useEffect(() => {
        flags.forEach(flag => flag.challengeId === challengeId && setFlag(flag.flag))
    },[flags, challengeId])

    return(
        <Tabs defaultActiveKey="Flag">
            <Tab eventKey="Flag" title="Flag">
                <p/><p/>
                <Form onSubmit={handleSubmit}>
                        <FormControl placeholder="flag" onChange={event => setFlag(event.target.value)}
                                     value={flag}/>
                    <Button type={"submit"}>Commit</Button>
                </Form>
            </Tab>
        </Tabs>
    )
}