import React from "react";
import {Link, Route, Routes} from "react-router-dom";
import Contest from "./Contest"
import NoMatch from "../../components/NoMatch";
import {Breadcrumb, Button, Col, Row} from "react-bootstrap";
import Remove from "./RemoveContest";
import New from "./NewContest";

export default props => {
    const {drizzle, drizzleState} = props
    return (
        <Routes>
            <Route path={`/`} element={<MainPage drizzle={drizzle} drizzleState={drizzleState}/>}/>
            <Route path={`/ContestNew`}
                   element={<NewContest drizzle={drizzle} drizzleState={drizzleState}/>}/>
            <Route path={`/Contest-:contestId/*`}
                   element={<Contest drizzle={drizzle} drizzleState={drizzleState}/>}/>
            <Route path="*" element={<NoMatch/>}/>
        </Routes>
    );
};

function MainPage(props) {
    const {drizzle, drizzleState} = props
    return (
        <>
            <Row>
                <Col>
                    <Breadcrumb>
                        <Breadcrumb.Item active>ContestAdmin</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1 align="center">Contests
                        <Link to={"/ContestAdmin/ContestNew"}><Button variant="outline-secondary">
                            <i className="btn-fa fas fa-plus-circle"/>
                        </Button></Link>
                    </h1>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Remove drizzle={drizzle} drizzleState={drizzleState}/>
                </Col>
            </Row>
        </>
    );
}

function NewContest(props) {
    const {drizzle, drizzleState} = props
    return (
        <>
            <Row>
                <Col>
                    <Breadcrumb>
                        <Link to="/ContestAdmin" className="breadcrumb-item">ContestAdmin</Link>
                        <Breadcrumb.Item active>ContestNew</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1 align="center">Create Contest</h1>
                </Col>
            </Row>

            <Row>
                <Col>
                    <New drizzle={drizzle} drizzleState={drizzleState}/>
                </Col>
            </Row>
        </>
    );
}