"use client"
import { useRef, useEffect, useState } from "react"
import { Button } from "antd"
import LoginModule , {ChildComponentRef} from '../login/login-page'
import mainLayout from "../../css/layout-main.module.css"
import { selectUser, handleChangeUserInfo} from "@/app/store/reducers/userSlice"
import { useAppSelector, useAppDispatch } from '@/app/store/hooks'
import { get } from "@/app/service/http"
const App: React.FC = () => {
  // const loginRef = useRef(null)
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const loginRef = useRef<ChildComponentRef>(null);
  const [counter, setCounter] = useState(1)
  useEffect(() => {
    // 检测用户是否已经登录
    get('/api/user/is-login')
    .then(res => {
      if(res.status === 200) {
        dispatch(handleChangeUserInfo(res.data))
      }
    })
    .catch(err => {})
    // 依赖数组可以包含多个依赖项。只有当你指定的 所有 依赖项的值都与上一次渲染时完全相同，React 才会跳过重新运行该 Effect
    // 依赖数组为空时只会在组件挂载时运行一次
    // 当没有依赖数组时 代码会在每次渲染后运行
  }, [])
  function handleLogin() {
    if(loginRef.current) {
      loginRef.current.showModal()
    }
  }
  const handleIn =() => {
    setCounter(counter+1)
  }
  return (
    <>
      <LoginModule ref={loginRef} />
      <div className={ mainLayout.nav_box }>
        <nav className={mainLayout.main_header}>
          <div className="nav-left">左</div>
          <div className="nav-center"><button onClick={handleIn}>增加{counter}</button></div>
          <div className="nav-right">
            {user.username ? <span>{user.nickname}</span> :  <Button onClick={handleLogin} type="dashed" >登録</Button>}
            

          </div>
        </nav>
      </div>
    </>
  )
}

export default App;