import React, {useEffect, useState} from "react";
import Web3Utils from "web3-utils";
import {Button, Col, Form, FormCheck, Row, Table} from "react-bootstrap";

export default ({drizzle, drizzleState}) => {
    const CONTEST_ADMIN = Web3Utils.keccak256("CONTEST_ADMIN");
    const {getRoleMembers, revokeRole} = drizzle.contracts.AccessContr0l.methods;

    const [adminsKey, setAdminsKey] = useState(0);
    const {AccessContr0l} = drizzleState.contracts;
    const admins = AccessContr0l.getRoleMembers[adminsKey]
    useEffect(() => {
        const adminsKey = getRoleMembers.cacheCall(CONTEST_ADMIN);
        setAdminsKey(adminsKey);
    }, [getRoleMembers, CONTEST_ADMIN])

    const [checkList, setCheckList] = useState([]);
    const handleRevoke = (event) => {
        event.preventDefault();
        checkList.forEach((value, index) => {
            value && revokeRole.cacheSend(CONTEST_ADMIN, admins.value[index]);
        });
    }
    useEffect(() => {
        admins && setCheckList(Array(admins.value.length).fill(false));
    }, [admins])

    return (
        <Form onSubmit={handleRevoke}>
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
                    <th>account</th>
                </tr>
                </thead>
                <tbody>
                {admins ? (
                    admins.value.map((admin, index) => (
                        <tr key={index}>
                            <td><FormCheck type="checkbox" id={index}
                                           checked={checkList.length > index && checkList[index]}
                                           onChange={event => {
                                               const tmp = checkList.slice();
                                               tmp[index] = event.target.checked;
                                               setCheckList(tmp);
                                           }}/></td>
                            <td>{admin}</td>
                        </tr>
                    ))
                ) : null}
                </tbody>
            </Table>
        </Form>
    )
}