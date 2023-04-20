import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import DataContext from '../context/DataContext'

export default function NavHeader() {
  const { state } = useContext(DataContext);
  return (
    <div className='nav'>
        <Link to='/'>HOME</Link>
        <Link to='/boardlist'>BOARD</Link>
        <Link to='/boardwriteform'>WRITE</Link>
        <Link to='/image'>IMAGE</Link>
        <Link to='/login-form'>LOGIN</Link>
        {/**
         * state의 user의 login이 false일 때 : Link
         * true일 때 : user의 writer 출력
          */}
        {
          state.user.login ? <span>USER : {state.user.writer}</span>
          : <span>익명 로그인</span>
          // <Link to='/login-form'>LOGIN</Link>
        }
    </div>
  )
}
