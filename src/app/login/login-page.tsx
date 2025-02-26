"use client"
import "./login.css"
import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { Button, Modal, Form, Input, Select, message } from 'antd';
import { useAppSelector, useAppDispatch } from '@/app/store/hooks'
import { handleChangeUserInfo, selectUser} from "@/app/store/reducers/userSlice"

import { post } from "@/app/service/http"

export interface ChildComponentRef {
  showModal: () => void;
}
const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const App=({ref}:{ref: any}) => {
  // Selector可以从store状态树中提取指定的片段
  const user = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true)
  const [form] = Form.useForm();
  const [ registerForm ] = Form.useForm()
  useImperativeHandle(ref,() => ({
    showModal () {
      setIsModalOpen(true);
    }
  }))
  const handleSubmit = () => {
    if(isLogin) {
      form.validateFields({validateOnly: false})
      .then(() => {
        post("/api/user/login", form.getFieldsValue())
        .then(res => {
          if(res.status === 200) {
            dispatch(handleChangeUserInfo(res.data))
            setIsModalOpen(false)
            message.open({
              type: "success",
              content: "サインインに成功しました！"
            })
          }else {
            message.error(res.message)

          }
        })
        .catch(error => {
          message.error(error.message)
        })
      })
      .catch(() => {})
    } else {
      registerForm
      .validateFields({ validateOnly: false })
      .then(() => {
        post("/api/user/register", registerForm.getFieldsValue())
        .then(res => {
          if(res.status === 200) {
            message.open({
              type: "success",
              content: "ログインに成功しました！"
            })
            setIsLogin(true)
          } else {
            // message.error(res.message)
            message.open({
              type: "error",
              content: res.message
            })
          }
        })
        .catch(error => {
          console.log("error", error)
        })
      })
      .catch(() => {
        console.log('sb')
      });

      // console.log( "registerForm",registerForm.getFieldsValue())
    }
  }
  const handleCon = () => {
    console.log('user', user)
  }
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const setSpace = () => {
    setIsLogin(!isLogin)
    if(isLogin) {
      registerForm.resetFields()
    }else {
      form.resetFields()
    }
  }
  return (
    <>
      <Modal width={600} title="ログインして、さらに多くの特典を楽しもう！" className="login-modal" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <img src="/img/11.gif" alt="" className="login-img" />
        <div className="login-change">
          <span onClick={setSpace} className="change-log common-cursor" style={{color: isLogin ? "#1677FF" : "#4B4952"}}>サインイン</span>
          <span onClick={setSpace} className="change-register common-cursor" style={{color: !isLogin ? "#1677FF" : "#4B4952"}}>ログイン</span>
        </div>
        <div className="login-box">
          <div className="login-container">
          <Form
            {...layout}
            form={form}
            className={`login-form  ${isLogin ? "login-form-log" : "login-form-log-tran" }`}
            name="form-hooks"
            style={{ maxWidth: 800,  }}
          >
            <Form.Item name="username"  label="アカウント：" rules={[{ required: true, message: 'アカウントを入力してください!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="password" label="パスワード：" rules={[{ required: true, message: 'パスワードを入力してください!' }]}>
              <Input.Password />
            </Form.Item>
          </Form>
          <Form
            {...layout}
            form={registerForm}
            className={`login-form  ${isLogin ? "login-form-log-tran" : "login-form-log"}`}
            name="registerForm-hooks"
            style={{ maxWidth: 800 }}
          >
            <Form.Item name="username"  label="アカウント：" rules={[{ required: true, message: 'アカウントを入力してください!' }]} >
              <Input />
            </Form.Item>
            <Form.Item name="password" label="パスワード：" rules={[{ required: true, message: 'パスワードを入力してください!' }]}>
              <Input.Password />
            </Form.Item>
            <Form.Item name="nickname" label="あだ名：" rules={[{ required: true, message: 'あだ名を入力してください!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="email" label="メール：" rules={[{ required: true, message: 'メールを入力してください!' }, { type: 'email', message: 'メールアドレスの形式が正しくありません' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="gender" label="性別：" rules={[{ required: true, message: '性別を選んでください!' }]}>
              <Select
                allowClear
              >
                <Option value="1">男</Option>
                <Option value="0">女</Option>
                <Option value="2">その他</Option>
              </Select>
            </Form.Item>
          </Form>
          </div>
          <div className="middle-line"></div>
          <div className="login-notes">
            素敵な一日をお過ごしください！
          </div>
        </div>
        <div className="login-btn-con">
          <Button  type="dashed"  onClick={handleSubmit}>提出</Button>
          <Button  type="dashed"  onClick={handleCon}>提出1</Button>
        </div>
        
      </Modal>
    </>
  );
}

export default App;