import React from "react";
import {Row, Stack} from "react-bootstrap";
import ChallengePreview from "./ChallengePreview";

export default ({challenges, contestId}) => {
    return (
        <Stack gap={2}>
            {challenges.map((challenge, index) => (
                <Row key={index}>
                    <ChallengePreview
                        contestId={contestId}
                        challenge={challenge}
                    />
                </Row>))}
        </Stack>
    )
}