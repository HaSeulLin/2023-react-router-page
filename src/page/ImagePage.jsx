import React from 'react'
// scr에서 이미지를 들고오는 방법 1
import logo from '../logo.svg'

export default function ImagePage() {
  return (
    <div>
        <h3>ImagePage</h3>
        <div>
            <img src="/logo192.png" alt="" />
            <img src="/img/logo512.png" alt="" />
            <p>1. public에서 가져오는 방법</p>
            <p>build 할 때 그 내용을 함께 가져감</p>
        </div>
        <div>
            <img src={logo} alt="" width={200} height={200} />
            <img src={require('../logo.svg').default} />
            <p>2. src에서 가져오는 방법</p>
            <p>1 import를 통해서 가져올 수 있다</p>
            <p>2 require('').default를 통해서 접근</p>
        </div>

        <div>
            <div style={{
                width:"192px", height:"192px",
//                backgroundImage:`url("/logo192.png")`,
                backgroundImage:`url(${logo})`
            }}>
            </div>
            <p>style 백그라운드 이미지 확인 : public/src에서 들고온 값</p>
        </div>
    </div>
  )
}
