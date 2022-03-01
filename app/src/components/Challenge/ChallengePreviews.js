import React from "react";
import {Row, Stack} from "react-bootstrap";
import {ChallengePreview} from "./index";

export default ({challenges}) => {
    return (
        <Stack gap={2}>
            {challenges.map((challenge, index) => <Row><ChallengePreview key={index} challenge={challenge}/></Row>)}
        </Stack>
    )
}