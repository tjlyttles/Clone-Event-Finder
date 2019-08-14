import React, { useReducer } from "react";
import axios from "axios";
import EventContext from "./eventContext";
import eventReducer from "./eventReducer";
import {
  GET_USER_EVENTS,
  GET_EVENTS,
  SORT_EVENTS,
  ADD_EVENT,
  JOIN_EVENT,
  GET_USERS,
  CLEAR_USERS,
  UNJOIN_EVENT,
  DELETE_EVENT,
  GET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_EVENT,
  FILTER_EVENTS,
  CLEAR_EVENTS,
  CLEAR_FILTER,
  EVENT_ERROR,
  EVENT_RERENDER
} from "../types";

const EventState = props => {
  const initialState = {
    events: null,
    userEvents: null,
    current: null,
    pastEvents: null,
    upcomingEvents: null,
    filtered: null,
    setUsers: null,
    error: null
  };

  const [state, dispatch] = useReducer(eventReducer, initialState);

  //Get Events
  const getEvents = async () => {
    try {
      const res = await axios.get("/api/events");

      dispatch({
        type: GET_EVENTS,
        payload: res.data
      });
      sortEvents();
    } catch (err) {
      dispatch({
        type: EVENT_ERROR,
        payload: err.response.msg
      });
    }
  };

  //Get User Events
  const getUserEvents = async () => {
    try {
      const res = await axios.get("/api/events/user");

      dispatch({
        type: GET_USER_EVENTS,
        payload: res.data
      });
      sortEvents();
    } catch (err) {
      dispatch({
        type: EVENT_ERROR,
        payload: err.response.msg
      });
    }
  };

  //Get User Events
  const sortEvents = async () => {
    dispatch({ type: SORT_EVENTS });
  };

  // Clear Profiles
  const clearUsers = () => {
    dispatch({ type: CLEAR_USERS });
  };

  // Add Event
  const addEvent = async event => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      console.log(event);
      const res = await axios.post("/api/events", event, config);

    
    } catch (err) {
      console.log(err);
      dispatch({
        type: EVENT_ERROR,
        payload: err
      });
    }
  };

  //Join Event
  const joinEvent = async eventId => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.put(`/api/events/join/${eventId}`, config);

      dispatch({
        type: JOIN_EVENT,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: EVENT_ERROR,
        payload: err.response.msg
      });
    }
  };

  //Leave Event
  const unjoinEvent = async eventId => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.put(`/api/events/leave/${eventId}`, config);

      dispatch({
        type: UNJOIN_EVENT,
        payload: res.data
        
      });
    } catch (err) {
      dispatch({
        type: EVENT_ERROR,
        payload: err.response.msg
      });
    }
  };

  //Delete Event
  const deleteEvent = async id => {
    try {
      await axios.delete(`/api/events/${id}`);

     
    } catch (err) {
      dispatch({
        type: EVENT_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Update Event
  const updateEvent = async event => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.put(`/api/events/${event._id}`, event, config);

      dispatch({
        type: UPDATE_EVENT,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: EVENT_ERROR,
        payload: err
      });
    }
  };
  //View User Profile
  const getUsersProfile = async event => {
    try {
      const res = await axios.get(`/api/events/profiles/${event}`, event);

      dispatch({
        type: GET_USERS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: EVENT_ERROR,
        payload: err
      });
    }
  };

  // Clear Events
  const clearEvents = () => {
    dispatch({ type: CLEAR_EVENTS });
  };

  // Filter Events
  const filterEvents = text => {
    dispatch({ type: FILTER_EVENTS, payload: text });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  // Set Current Event
  const getCurrent = async eventId => {
    try {
      const res = await axios.get(`/api/events/event/${eventId}`);

      dispatch({
        type: GET_CURRENT,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: EVENT_ERROR,
        payload: err
      });
    }
  };

  // Clear Current Event
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Need to be rerender flag
  const callReRender = input => {
    dispatch({type: EVENT_RERENDER, payload: input})
  }

  return (
    <EventContext.Provider
      value={{
        events: state.events,
        userEvents: state.userEvents,
        setUsers: state.setUsers,
        current: state.current,
        joinedEvents: state.joinEvents,
        pastEvents: state.pastEvents,
        upcomingEvents: state.upcomingEvents,
        cacheEvent: state.cacheEvent,
        filtered: state.filtered,
        error: state.error,
        needReRender: state.needReRender,
        getUserEvents,
        getUsersProfile,
        addEvent,
        sortEvents,
        joinEvent,
        unjoinEvent,
        deleteEvent,
        getCurrent,
        clearCurrent,
        clearUsers,
        updateEvent,
        filterEvents,
        clearFilter,
        getEvents,
        clearEvents,
        callReRender
      }}
    >
      {props.children}
    </EventContext.Provider>
  );
};

export default EventState;
