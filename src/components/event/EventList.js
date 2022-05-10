import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { getEvents } from "./EventManager.js"

export const EventList = (props) => {
    const [ events, setEvents ] = useState([])
    const history = useHistory()

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (
        <article className="events">
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/events/new" })
                }}
            >Plan a New Event</button>
            {
                events.map(event => {
                    return (
                        <section key={`event--${event.id}`} className="event">
                            <div className="event__game">
                                Join us for {event.description} where we will play {event.game.title}
                            </div>
                            <div className="event__date">
                                On {event.date} at {event.time}
                            </div>
                            <div className="event_organizer">
                                Hosted by {event.organizer.user.username}
                            </div>
                            <button onClick={() => {
                                history.push(`events/edit/${event.id}`)
                            }}>Edit</button>
                        </section>
                    )
                })
            }
        </article>
    )
}