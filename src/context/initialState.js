import { fetchUSer} from '../utils/fetchLocalStorageData'

const userInfo = fetchUSer()

export const initialState = {
    user:userInfo,
}