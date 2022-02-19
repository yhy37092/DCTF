import {Link, useMatch, useResolvedPath} from "react-router-dom";
import React from "react";

export default ({children, to, ...props}) => {
    let resolved = useResolvedPath(to);
    let match = useMatch({path: resolved.pathname, end: true});

    return (<div>
        <Link className="nav-link"
              style={{textDecoration: match ? "underline" : "none"}}
              to={to}
              {...props}
        >
            {children}
        </Link>
        {match && ""}
    </div>);
}