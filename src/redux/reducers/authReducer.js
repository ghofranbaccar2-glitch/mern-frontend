const initialState = {
    login:false,
    register:false,
    user: null

};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_LOGIN':
            return {
                login: true,
                register: false
                
            };
        case 'TOGGLE_REGISTER':
            return {
                login: false,
                register: true
            };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                user: action.payload,
            };
        case 'LOGOUT_SUCCESS':
            return {
                ...state,
                user: null
            };
            case "GET_ CURRENT_USER":
                return {
                    ...state,
                    user: action.payload
                };
        default:
            return state;
    }
};

export default authReducer;