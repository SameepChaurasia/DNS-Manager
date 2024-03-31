// const BASE_URL='http://localhost:4000/api'
const BASE_URL='http://3.110.83.6/api'
// All user api
export const REGISTER_URL=BASE_URL + '/users/register'
export const LOGIN_URL=BASE_URL + '/users/login'

// all record api
export const ADD_RECORD=BASE_URL + '/record/add'
export const GET_RECORD=BASE_URL + '/record'
export const UPDATE_RECORD=BASE_URL + '/record/update'
export const DELETE_RECORD=BASE_URL + '/record/delete'
export const UPLOAD_CSV=BASE_URL + '/record/upload'

// aws record
export const AWS_RECORD=BASE_URL + '/record/aws'