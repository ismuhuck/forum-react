import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store"


interface UserState {
    username: string,
    nickname: string,
    email: string,
    gender: string,
    password: string,
    userid: number | null
}
const initialState: UserState = {
    username: '',
    nickname: '',
    email: '',
    gender: '',
    password: '',
    userid: null
}
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        handleChangeUserInfo: (state, action: PayloadAction<UserState>) => {
            const {payload} = action
            state.email = payload.email
            state.gender = payload.gender
            state.nickname = payload.nickname
            state.userid = payload.userid
            state.username = payload.username
        }
    }
})

export const { handleChangeUserInfo } = userSlice.actions

// 选择器等其他代码可以使用导入的 `RootState` 类型
export const selectUser = (state: RootState) => state.user

export default userSlice.reducer

