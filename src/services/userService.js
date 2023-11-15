import axios from "../axios"


let handleUserLogin = async (email, password) => {
    await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password })
    })
        // const result = await data.json()
        .then(data => {
            if (!data.ok) {
                throw new Error("Error: " + data.status())
            }
            return data.json()
        })
        .catch(error => {
            return error.status
        })

}

let handleLoginapi = async (email, password) => {
    let data = await axios.post('/api/login', { email, password })
    console.log("data:", data)
    return data
}

// const getAllUsers = (userId) => {
//     return axios.get(`/api/get_all_users/?id=${userId}`)
// }

const getAllUsers = (userId) => {
    return axios.get(`/api/get_all_users?id=${userId}`)
}

const createNewUserService = (data) => {
    console.log("Check data from userService: ", data)
    return axios.post('/api/create_New_User', data)
}

const deleteUser = async (userId) => {
    console.log("Check userid : ", userId)
    let response = await axios.delete('/api/delete_User',
        {
            data: {
                id: userId
            }
        }
    )
    return response
}

let getOneUser = async (userid) => {
    return await axios.post('/api/getOneUser', { id: userid })

}

let updateUser = async (userData) => {
    return await axios.put('/api/update_User', {
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        address: userData.address,
        gender: userData.gender
    })
}

const editUserService = (inputData) => {
    return axios.put('/api/update_User', inputData)
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)
}

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top_doctor_home?limit=${limit}`)
}

const getAllDoctors = () => {
    return axios.get(`/api/getAllDoctor`)
}

const saveDetailDoctors = (data) => {
    return axios.post('/api/save-infor-doctors', data)
}

const getDetailInforDoctor = (inputId) => {
    return axios.get(`api/get-detail-doctor-by-id?id=${inputId}`)
}

const createNewClinic = (data) => {
    return axios.post('/api/create_new_clinic', data)
}

const getAllClinic = () => {
    return axios.get('/api/get_all_clinic')
}

// export default handleUserLogin
export {
    handleLoginapi, getAllUsers, createNewUserService,
    deleteUser, getOneUser, updateUser, editUserService,
    getAllCodeService, getTopDoctorHomeService,
    getAllDoctors, saveDetailDoctors,
    getDetailInforDoctor, createNewClinic,
    getAllClinic
}