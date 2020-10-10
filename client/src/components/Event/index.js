import React from "react";

function Event(props) {
    return (
        <div>
            <div className="row">
                <div className="col"><h2>{props.date}: {props.eventName} at {props.venueName}</h2>
                <h3>{props.startTime} / {props.address} / {props.cover}</h3></div>
            </div>
            <div className="row">
                <div className="col"><ul>{props.sets.map(set => (
                    <li>
                        <h1>{set.startTime}</h1>
                        <h3>{set.artists.join(", ")}</h3>
                    </li>
                ))}
                </ul></div>
            </div>
        </div>
    )
}

export default Event;

