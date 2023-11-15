import actionTypes from "../actions/actionTypes";

const initialState = {
    isLoadingGenders: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctors: [],
    allDoctors: [],
    allClinic: []

}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyState = { ...state }
            copyState.isLoadingGenders = true
            return {
                ...copyState
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data
            state.isLoadingGenders = false
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_FAIL:
            state.isLoadingGenders = false
            state.genders = []
            return {
                ...state
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data
            return {
                ...state
            }
        case actionTypes.FETCH_POSITION_FAIL:
            state.positions = []
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_FAIL:
            state.roles = []
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.data

            return {
                ...state
            }
        case actionTypes.FETCH_ALL_USERS_FAIL:
            state.users = []
            return {
                ...state
            }
        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            state.topDoctors = action.dataDoctor
            return {
                ...state
            }
        case actionTypes.FETCH_TOP_DOCTOR_FAIL:
            state.topDoctors = []
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
            state.allDoctors = action.dataDoctor
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_DOCTOR_FAIL:
            state.allDoctors = []
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_CLINIC_SUCCESS:
            state.allClinic = action.dataClinic
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_CLINIC_FAIL:
            state.allClinic = []
            return {
                ...state
            }

        default:
            return state
    }
}

export default adminReducer