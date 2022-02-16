import React, {useEffect, useState} from "react";
import {Button, Col, Form, FormCheck, Row, Table} from "react-bootstrap";
import {toTeamState} from "../../../../utils/utils";
import {useParams} from "react-router";

export default ({drizzle, drizzleState}) => {

    const {gets, auditTeam} = drizzle.contracts.Teams.methods;
    const {contestId} = useParams();

    const [teamsKey, setTeamsKey] = useState(0);
    const {Teams} = drizzleState.contracts;
    const teams = Teams.gets[teamsKey]
    useEffect(() => {
        const teamsKey = gets.cacheCall(contestId);
        setTeamsKey(teamsKey);
    }, [gets, contestId])

    const [checkList, setCheckList] = useState([]);

    const handleApprove = (event) => {
        event.preventDefault();
        checkList.forEach((value, index) => {
            value && auditTeam.cacheSend(contestId,teams.value[index].id, true);
        });
    }
    const handleReject = (event) => {
        event.preventDefault();
        checkList.forEach((value, index) => {
            value && auditTeam.cacheSend(contestId,teams.value[index].id, false);
        });
    }
    useEffect(() => {
        teams && setCheckList(Array(teams.value.length).fill(false));
    }, [teams])

    return(
        <Form>
            <Row><Col>
                <Button className="float-end" variant="outline-danger" onClick={handleReject}>
                    <i className="fas fa-times-circle"/>
                </Button>
                <Button className="float-end" variant="outline-success" onClick={handleApprove}>
                    <i className="fas fa-check-circle"/>
                </Button>
            </Col></Row>
            <Table responsive bordered hover>
                <thead className="thead-light">
                <tr>
                    <th><FormCheck type={"checkbox"} id={"default-checkbox"}
                                   onChange={event => (setCheckList(checkList.slice().fill(event.target.checked)))}/>
                    </th>
                    <th>id</th>
                    <th>name</th>
                    <th>captain</th>
                    <th>state</th>
                </tr>
                </thead>
                <tbody>
                {teams ? (
                    teams.value.map((team, index) => (
                        <tr key={index}>
                            <td><FormCheck type="checkbox" id={index}
                                           checked={checkList.length > index && checkList[index]}
                                           onChange={event => {
                                               const tmp = checkList.slice();
                                               tmp[index] = event.target.checked;
                                               setCheckList(tmp);
                                           }}/></td>
                            <td>{team.id}</td>
                            <td>{team.teamInfo.name}</td>
                            <td>{team.teamInfo.captain}</td>
                            <td>{toTeamState(team.state)}</td>
                        </tr>
                    ))
                ) : null}
                </tbody>
            </Table>
        </Form>
    )
}