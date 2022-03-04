import {ContestPreview} from "./index";
import React from "react";
import {Row, Stack} from "react-bootstrap";

export default ({contests, filter}) => {
    const _filter = (value) => {
        if (filter === undefined) return true
        return filter({_data: value})
    }
    return (
        <Stack gap={2}>
            {contests.map((value, index) => _filter(value) ? (
                <Row key={index}><ContestPreview contest={value}/></Row>) : null)}
        </Stack>
    )
}