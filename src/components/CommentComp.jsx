import React from 'react'

// 코멘트 삭제 버튼에 쓸 메소드를 Board에서 작성 후 전달 받아 사용
export default function CommentComp(props) {
//props로 전달한 comment를 구조분해를 통해서 쓰기 쉽게 작성
const {writer, text, date, cId} = props.comment;
const { deleteComment } = props;

  return (
    <div>
        <h5>{cId} : {writer}</h5>
        <p>
            {text}
            <button
                // 메소드를 사용할 때, cID 전달해야 함
                // ()=>{} 화살표 함수로 감싸서 사용
                onClick={()=>{deleteComment(cId)}}
            >X</button>
        </p>
        <span>{date}</span>
        <hr />
    </div>
  )
}
