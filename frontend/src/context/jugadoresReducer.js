export const initialState = {
  jugadores: [],
  cargando: true,
  error: null,
  jugadorEnEdicion: null,
};

export const jugadoresReducer = (state, action) => {
  switch (action.type) {
    case 'SET_JUGADORES':
      return { ...state, jugadores: action.payload, cargando: false };
    case 'ADD_JUGADOR':
      return { ...state, jugadores: [...state.jugadores, action.payload] };
    case 'UPDATE_JUGADOR':
      return {
        ...state,
        jugadores: state.jugadores.map(j => (j.id === action.payload.id ? action.payload : j)),
        jugadorEnEdicion: null,
      };
    case 'DELETE_JUGADOR':
      return { ...state, jugadores: state.jugadores.filter(j => j.id !== action.payload) };
    case 'SET_EDIT':
      return { ...state, jugadorEnEdicion: action.payload };
    case 'CLEAR_EDIT':
      return { ...state, jugadorEnEdicion: null };
    case 'SET_ERROR':
      return { ...state, error: action.payload, cargando: false };
    case 'SET_LOADING':
      return { ...state, cargando: action.payload };
    default:
      return state;
  }
};

export default jugadoresReducer;
