import {ContestPreview} from "./index";
import React from "react";
import {Row, Stack} from "react-bootstrap";

export default ({data, filter}) => {
    return (
        <Stack gap={2}>
            {data.map((value, index) => (filter({_data: value}) ? (
                <Row><ContestPreview key={index} data={value}/></Row>) : null))}
        </Stack>
    )
}