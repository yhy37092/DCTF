import React from "react";
import {Row, Stack} from "react-bootstrap";
import {ChallengePreview} from "../index";

export default ({challenges, filter}) => {
    const _filter = (value) => {
        if (filter === undefined) return true
        return filter({_data: value})
    }
    return (
        <Stack gap={2}>
            {challenges.map((challenge, index) => _filter(challenge) ?
                <Row><ChallengePreview key={index} challenge={challenge}/></Row> : null)}
        </Stack>
    )
}