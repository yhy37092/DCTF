import React, {useEffect, useState} from "react";
import {Button, Col, Form, FormCheck, Row, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {toContestState, toDate, toEther} from "../../utils/utils";

export default ({drizzle, drizzleState}) => {

    const {remove, gets} = drizzle.contracts.Contests.methods;

    const [contestsKey, setContestsKey] = useState(0);
    const {Contests} = drizzleState.contracts;
    const contests = Contests.gets[contestsKey]
    useEffect(() => {
        const contestsKey = gets.cacheCall(drizzleState.accounts[0]);
        setContestsKey(contestsKey);
    }, [gets,drizzleState.accounts])

    const [checkList, setCheckList] = useState([]);
    const handleSubmit = (event) => {
        event.preventDefault();
        checkList.forEach((value, index) => {
            value &&  remove.cacheSend(contests.value[index].id);
        });
    }
    useEffect(() => {
        contests && setCheckList(Array(contests.value.length).fill(false));
    }, [contests])

    return (
        <Form onSubmit={handleSubmit}>
            <Row><Col>
                <Button className="float-end" variant="outline-danger" type="submit">
                    <i className="btn-fa fas fa-trash-alt"/>
                </Button>
            </Col></Row>
            <Table responsive bordered hover>
                <thead className="thead-light">
                <tr>
                    <th><FormCheck type={"checkbox"} id={"default-checkbox"}
                                   onChange={event => (setCheckList(checkList.slice().fill(event.target.checked)))}/>
                    </th>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Fee</th>
                    <th>Start</th>
                    <th>End</th>
                    <th>State</th>
                </tr>
                </thead>
                <tbody>
                {contests ? (contests.value.map((contest, index) => (
                    <tr key={index}>
                        <td><FormCheck type="checkbox" id={index}
                                       checked={checkList.length > index && checkList[index]}
                                       onChange={event => {
                                           const tmp = checkList.slice();
                                           tmp[index] = event.target.checked;
                                           setCheckList(tmp);
                                       }}/></td>
                        <td>{contest.id}</td>
                        <td><Link
                            to={`/contestAdmin/contest/${contest.id}`}>{contest.contestInfo.name}</Link>
                        </td>
                        <td>{contest.contestInfo.contestType}</td>
                        <td>{toEther(contest.contestInfo.fee)} ether</td>
                        <td>{toDate(contest.contestInfo.start)}</td>
                        <td>{toDate(contest.contestInfo.end)}</td>
                        <td>{toContestState(contest.state)}</td>
                    </tr>
                ))) : null}
                </tbody>
            </Table>
        </Form>
    )
}