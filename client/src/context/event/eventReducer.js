import {
  GET_USER_EVENTS,
  GET_EVENTS,
  ADD_EVENT,
  SORT_EVENTS,
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

export default (state, action) => {
  switch (action.type) {
    case GET_EVENTS:
      return {
        ...state,
        current: null,
        userEvents: null,
        events: action.payload
      };
    case GET_USER_EVENTS:
      return {
        ...state,
        current: null,
        events: null,
        userEvents: action.payload
      };
    case SORT_EVENTS:
      if(state.events) {return {
        ...state,
        upcomingEvents: state.events.filter(
          event => new Date(event.end) > new Date()
        ),
        pastEvents: state.events.filter(
          event => new Date(event.end) < new Date()
        ),
        loading: false
      } }else if (state.userEvents) {
        return {
          ...state,
          upcomingEvents: state.userEvents.filter(
            event => new Date(event.end) > new Date()
          ),
          pastEvents: state.userEvents.filter(
            event => new Date(event.end) < new Date()
          ),
          loading: false
        } 
      }
      return {
        ...state,
        upcomingEvents: state.events.filter(
          event => new Date(event.end) > new Date()
        ),
        pastEvents: state.events.filter(
          event => new Date(event.end) < new Date()
        ),
        loading: false
      };
    case UPDATE_EVENT:
    case GET_CURRENT:
      return {
        ...state,
        current: action.payload,
        loading: false
      };
    case GET_USERS:
      return {
        ...state,
        setUsers: action.payload,
        loading: false
      };
    case CLEAR_USERS:
      return {
        ...state,
        setUsers: null
      };
    case ADD_EVENT:
      return {
        ...state,
        userEvents: [action.payload, ...state.userEvents],
        loading: false
      };
    case UNJOIN_EVENT:
    case JOIN_EVENT:
      if (state.current) {
        return {
          ...state,

          current:
            state.current._id === action.payload._id
              ? action.payload
              : state.current,
          loading: false
        };
      } else {
        return {
          ...state,
          events: state.events.map(event =>
            event._id === action.payload._id ? action.payload : event
          )
        };
      }
    case DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter(event => event._id !== action.payload),
        loading: false
      };
    case CLEAR_EVENTS:
      return {
        ...state,
        events: null,
        filtered: null,
        error: null,
        current: null
      };
    case CLEAR_CURRENT:
      localStorage.removeItem("cacheEvent");
      return {
        ...state,
        current: null
      };
    case FILTER_EVENTS:
      return {
        ...state,
        filtered: state.events.filter(event => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return event.name.match(regex);
        })
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
    case EVENT_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case EVENT_RERENDER:
      return {
        ...state,
        needReRender: action.payload
      }
    default:
      return state;
  }
};
