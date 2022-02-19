import React from "react";
import {Link, Route, Routes, useParams} from "react-router-dom";
import Challenges from "./Challenges";
import Teams from "./Teams";
import Submissions from "./Submissions";
import NoMatch from "../../../components/NoMatch";
import {ContestAdmin} from "../../../components/Navbars";
import {Breadcrumb, Col, Row} from "react-bootstrap";
import UpdateContest from "./UpdateContest";

export default ({drizzle, drizzleState}) => {

    const {contestId} = useParams();

    return (
        <>
            <ContestAdmin contestId={contestId}/>
            <Routes>
                <Route path={`/`} element={<MainPage drizzle={drizzle} drizzleState={drizzleState}/>}/>
                <Route path={`/Challenges/*`} element={<Challenges drizzle={drizzle} drizzleState={drizzleState}/>}/>
                <Route path={`/Teams`} element={<Teams drizzle={drizzle} drizzleState={drizzleState}/>}/>
                <Route path={`/Submissions`} element={<Submissions drizzle={drizzle} drizzleState={drizzleState}/>}/>
                <Route path="*" element={<NoMatch/>}/>
            </Routes>
        </>
    )
        ;
};

function MainPage(props) {
    const {drizzle, drizzleState} = props
    const {contestId} = useParams();

    return (
        <>
            <Row>
                <Col>
                    <Breadcrumb>
                        <Link to="/ContestAdmin" className="breadcrumb-item">ContestAdmin</Link>
                        <Breadcrumb.Item active>Contest-{contestId}</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1 align="center">Contest Detail</h1>
                </Col>
            </Row>

            <Row>
                <Col>
                    <UpdateContest drizzle={drizzle} drizzleState={drizzleState}/>
                </Col>
            </Row>
        </>

    );
}