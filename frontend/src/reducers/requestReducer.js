import {
  ADD_REQUEST,
  REMOVE_REQUEST,
  UPDATE_STATUS,
} from "../actions/requestActions";


const requestsData = [
  {
    id: 1,
    title: "Не работает розетка",
    description: "Розетка искрит и не подаёт питание",
    location: "Комната 214",
    status: "submitted",
  },
  {
    id: 2,
    title: "Поломка кондиционера",
    description: "Кондиционер не включается",
    location: "Комната 505",
    status: "in-progress",
    image: '/example.jpg',
  },
];

const initialState = {
  requests: requestsData,
};

const requestReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_REQUEST:
      return {
        ...state,
        requests: [...state.requests, action.payload],
      };

    case REMOVE_REQUEST:
      return {
        ...state,
        requests: state.requests.filter(
          (req) => req.id !== action.payload
        ),
      };

    case UPDATE_STATUS:
      return {
        ...state,
        requests: state.requests.map((req) =>{
            if (req.id === action.payload.id) {
              return { ...req, status: action.payload.status };
            }
            return req;
          }
        ),
      };

    default:
      return state;
  }
};

export default requestReducer;