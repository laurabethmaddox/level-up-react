import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getGames } from "../game/GameManager";
import { createEvent } from "./EventManager";

export const EventForm = () => {
    const history = useHistory()
    const [games, setGames] = useState([])
    const [currentEvent, setCurrentEvent] = useState({
        game: 0,
        description: "",
        date: "",
        time: "",
        organizer: 0
    })

    useEffect(() => {
        getGames()
        .then(data => setGames(data))
    }, [])

    const changeEventState = (domEvt) => {
        let eventCopy = {...currentEvent}
        eventCopy[domEvt.target.name] = domEvt.target.value
        setCurrentEvent(eventCopy)
    }

    return (
        <form className="eventForm">
            <h2 className="eventForm__title">Plan a New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date:</label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time:</label>
                    <input type="time" name="time" required autoFocus className="form-control"
                        value={currentEvent.time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game">Game:</label>
                    <div className="control">
                        <select name="game"
                            proptype="int"
                            value={currentEvent.game}
                            onChange={changeEventState}>
                                <option value="0">Select a game...</option>
                                {games.map(game => (
                                    <option key={game.id} value={game.id}>
                                        {game.title}
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()

                    const event = {
                        game: currentEvent.game,
                        description: currentEvent.description,
                        date: currentEvent.date,
                        time: currentEvent.time,
                        organizer: parseInt(localStorage.getItem("token"))
                    }

                    createEvent(event)
                        .then(() => history.push("/events"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}