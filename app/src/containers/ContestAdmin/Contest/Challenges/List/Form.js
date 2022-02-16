import React, {useEffect, useState} from "react";
import {Button, Col, Form, FormCheck, Row, Table} from "react-bootstrap";
import {useParams} from "react-router";
import {Link} from "react-router-dom";

export default ({drizzle, drizzleState}) => {

    const {remove, gets} = drizzle.contracts.Challenges.methods;
    const {contestId} = useParams();

    const [challengesKey, setChallengesKey] = useState(0);
    const {Challenges} = drizzleState.contracts;
    const challenges = Challenges.gets[challengesKey]
    useEffect(() => {
        const challengesKey = gets.cacheCall(contestId);
        setChallengesKey(challengesKey);
    }, [gets, contestId])

    const [checkList, setCheckList] = useState([]);
    const handleSubmit = (event) => {
        event.preventDefault();
        checkList.forEach((value, index) => {
            value && remove.cacheSend(contestId,challenges.value[index].id)
        });
    }
    useEffect(() => {
        challenges && setCheckList(Array(challenges.value.length).fill(false));
    }, [challenges])

    return(
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
                    <th>ID</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Value</th>
                    <th>Type</th>
                </tr>
                </thead>
                <tbody>
                {challenges ? (
                    challenges.value.map((challenge, index) => (
                        <tr key={index}>
                            <td><FormCheck type="checkbox" id={index}
                                           checked={checkList.length > index && checkList[index]}
                                           onChange={event => {
                                               const tmp = checkList.slice();
                                               tmp[index] = event.target.checked;
                                               setCheckList(tmp);
                                           }}/></td>
                            <td>{challenge.id}</td>
                            <td><Link
                                to={`/ContestAdmin/Contest-${contestId}/Challenges/Challenge-${challenge.id}`}>{challenge.challengeInfo.name}</Link>
                            </td>
                            <td>{challenge.challengeInfo.category}</td>
                            <td>{challenge.challengeInfo.value}</td>
                            <td>{challenge.challengeInfo.challengeType}</td>
                        </tr>
                    ))
                ) : null}
                </tbody>
            </Table>
        </Form>
    )
}