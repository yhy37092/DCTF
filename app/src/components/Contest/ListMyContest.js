import React, {useCallback} from "react";
import ListContest from "./ListContest";

export default ({data}) => {
    return <ListContest
        filter={useCallback(({_data}) => data.includes(_data.id), [data])}
    />
}