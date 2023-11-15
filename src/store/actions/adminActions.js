import actionTypes from "./actionTypes";
import {
    getAllCodeService, createNewUserService,
    getAllUsers, deleteUser, editUserService, getTopDoctorHomeService,
    getAllDoctors, saveDetailDoctors, createNewClinic, getAllClinic
} from "../../services/userService";
import { toast } from "react-toastify";
// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })
            let response = await getAllCodeService("GENDER");
            if (response && response.errCode == 0) {
                dispatch(fetchGenderSuccess(response.data));
            }
            else {
                dispatch(fetchGenderFail())
            }

        } catch (error) {
            dispatch(fetchGenderFail())
            console.log('fetchGenderStart error: ', error)
        }
    }

}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFail = () => ({
    type: actionTypes.FETCH_GENDER_FAIL
})

export const fetchPositionSucess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFail = () => ({
    type: actionTypes.FETCH_POSITION_FAIL
})

export const fetchRoleSucess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFail = () => ({
    type: actionTypes.FETCH_ROLE_FAIL
})

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getAllCodeService("POSITION")
            if (response && response.errCode == 0) {
                dispatch(fetchPositionSucess(response.data))
            }
            else {
                dispatch(fetchPositionFail())
            }
        } catch (error) {
            dispatch(fetchPositionFail())
            console.log("fetchRole error: ", error)
        }

    }
}

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getAllCodeService("ROLE")
            if (response && response.errCode == 0) {
                dispatch(fetchRoleSucess(response.data))
            }
            else {
                dispatch(fetchRoleFail())
            }
        } catch (error) {
            dispatch(fetchRoleFail())
            console.log("fetchRole error: ", error)
        }

    }
}

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let response = await createNewUserService(data);
            if (response) {
                dispatch(saveUserSuccess())
                dispatch(fetchAllUsersStart())

            }
            else {
                dispatch(saveUserFail())
            }
        } catch (error) {
            dispatch(saveUserFail())
            console.log("saveUserFail error: ", error)
        }
    }
}

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const saveUserFail = () => ({
    type: actionTypes.CREATE_USER_FAIL
})

export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getAllUsers("ALL")
            if (response) {
                dispatch(fetchAllUserSuccess(response.users.reverse()))
            }
            else {
                dispatch(fetchAllUsersFail())
            }
        } catch (error) {
            console.log("check error", error)
            dispatch(fetchAllUsersFail())

        }
    }
}

export const fetchAllUserSuccess = (userData) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    data: userData
})

export const fetchAllUsersFail = ({
    type: actionTypes.FETCH_ALL_USERS_FAIL
})

export const deleteAUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let response = await deleteUser(userId);
            console.log("check response:", response.response.errCode)
            if (response && response.response.errCode == 0) {
                dispatch(deleteUserSucess())
                dispatch(fetchAllUsersStart())

            }
            else {
                dispatch(deleteUserFail())
            }
        } catch (error) {
            dispatch(deleteUserFail())
            console.log("saveUserFail error: ", error)
        }
    }
}

export const deleteUserSucess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserFail = () => ({
    type: actionTypes.DELETE_USER_FAIL
})

export const editAUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let response = await editUserService(data);
            if (response && response.response.errCode == 0) {
                toast.success("update user succeed")
                dispatch(editUserSucess())
                dispatch(fetchAllUsersStart())

            }
            else {
                toast.success("update user failed")
                dispatch(editUserFail())
            }
        } catch (error) {
            toast.success("update user error")
            dispatch(editUserFail())
            console.log("saveUserFail error: ", error)
        }
    }
}

export const editUserSucess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const editUserFail = () => ({
    type: actionTypes.EDIT_USER_FAIL
})

export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getTopDoctorHomeService('')
            if (response && response.errCode == 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
                    dataDoctor: response.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_FAIL
                })
            }

        } catch (error) {
            console.log("FETCH_TOP_DOCTOR_FAIL: ", error)
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTOR_FAIL
            })
        }
    }
}

export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getAllDoctors()
            if (response) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
                    dataDoctor: response.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_FAIL
                })
            }
        } catch (error) {
            console.log("Fetch all doctor errors: ", error)
            dispatch({ type: actionTypes.FETCH_ALL_DOCTOR_FAIL })
        }
    }
}

export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let response = await saveDetailDoctors(data)
            if (response) {
                console.log("check response: ", response)
                toast.success("Save infor detail doctor succeed.")
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                })
            }
            else {
                toast.success("Save infor detail doctor error.")

                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAIL
                })
            }
        } catch (error) {
            toast.error("Save infor detail doctor error.")
            console.log("Fetch all doctor errors: ", error)
            dispatch({ type: actionTypes.SAVE_DETAIL_DOCTOR_FAIL })
        }
    }
}

export const createClinic = (data) => {
    return async (dispatch, getState) => {
        try {
            let response = await createNewClinic(data)
            if (response && response.errCode == 0) {
                toast.success("Clinic created successfully!")
                dispatch({ type: actionTypes.CREATE_CLINIC_SUCCESS, })
            }
            else {
                toast.error("Creating clinics failed")
                dispatch({ type: actionTypes.CREATE_CLINIC_FAIL })
            }
        } catch (error) {
            toast.error("Save infor detail doctor error.")
            console.log("Create clinic error: ", error)
            dispatch({ type: actionTypes.CREATE_CLINIC_FAIL })
        }
    }
}

export const fetchAllClinic = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getAllClinic()
            if (response && response.errCode == 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_CLINIC_SUCCESS,
                    dataClinic: response.respone
                })
            }
            else {
                dispatch({ type: actionTypes.FETCH_ALL_CLINIC_FAIL })
            }
        } catch (error) {
            console.log("fetch all clinic error: ", error)
            dispatch({ type: actionTypes.FETCH_ALL_CLINIC_FAIL })
        }
    }
}






// let response2 = await getTopDoctorHomeService(3)
