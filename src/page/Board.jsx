import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// import data from '../data/dummy.json'
import DataContext from '../context/DataContext';
import CommentComp from '../components/CommentComp';

// board에 data의 내용이 필요함
export default function Board() {
    const navigate = useNavigate();

    const {id} = useParams();
    
    // data 출력 변수
    // json 내용 대신에 DataContext에 있는 boardlist 들고 와서 화면에 출력하기
    //    const value = useContext(DataContext);
    // Context의 값을 가져옴
    // 삭제를 위해 action 속성도 들고오기
    const {state, action} = useContext(DataContext);
    const {boardlist} = state;

    // 코멘트의 작성할 글을 저장하기 위한 공간
    const [text, setText] = useState("");

    // 배열의 함수인 find를 이용하여
    // 함수의 조건이 참인 하나의 값을 가져온다
    // find로 가져온 값은 배열 안에 있는 하나의 값
    // find로 값을 찾지 못할 경우 undefined를 출력
    // undefined의 값 속성을 찾으려고 하면 >> 오류!
    const boardData = boardlist.find((d)=>(d.id==id));

    // state의 commentlist에서 boardId와 param의 id 값이 같은
    // 새로운 배열을 작성 (filter)
    const boardCommentList = state.commentlist.filter(
        (comment)=>(comment.boardId == id));

    // useEffect를 사용해서 boardData 값이 undefined면
    // 오류 페이지 컴포넌트로 이동 혹은 목록으로 이동
    // 두번쨰 인자값이 빈 배열이라면 컴포넌트 생성 시에 실행
    useEffect(()=>{
        if (boardData == undefined){
            navigate('/boardlist');
        }
    }, [])


    // 게시물 삭제 메소드 작성
    // id값 비교해서 동일하면 삭제
    const deleteBoard = () => {
    // 1. 현재 id를 들고온다
    // 2. id와 동일한 객체를 제외한 새로운 배열을 만든다 (filter)
    // 일치 연산자의 경우 자료형이 같아야 한다 (숫자형으로 바꿔줌)
    const newBoardlist = boardlist.filter((board)=>(board.id !== Number(id)))
    // 3. 새로운 배열을 set메소드를 통해 넣어준다
    action.setBoardlist(newBoardlist);

    // 삭제 이후에 boardlist로 이동 > navigate
    navigate('/boardlist');
    }
    
    // 코멘트 추가 메소드
    const addComment = () => {
        // 1. 추가할 코멘트 객체 생성
        const newComment = {
            cId : state.cId,
            boardId : boardData.id,
            text : text,
            date : "2023-04-19",
            writer : state.user.writer
        }
        // 1-1. cId 값 1씩 증가
        action.cIdCount();

        // 2. 코멘트가 추가된 새로운 배열
        const newCommentlist = state.commentlist.concat(newComment);
        // 3. 새로운 배열을 set메소드를 통해 값을 넣어줌
        action.setCommentlist(newCommentlist);
    }

    // 코멘트 삭제 메소드
    const deleteComment = (cId) => {
        // 1. 삭제/수정을 할 때는 값의 id(유일한값)을 통해 확인
        // boardCommentlist의 각 객체에 id가 있음
        // >> map으로 객체를 하나씩 출력할 때 id 값을 가져옴

        // 2. filter로 id 값을 제외한 새로운 배열 생성
        // state.commentlist를 통해서 새로운 배열 생성!
        const newCommentlist = state.commentlist.filter(
            (comment)=>(comment.cId !== cId));

        // 3. 새로운 배열 set메소드로 출력
        action.setCommentlist(newCommentlist)
    }

  return (
    <div>
        {   // 화면이 먼저 화면에 렌더되고, useEffect 실행
            // 화면 상에서 나타나는 오류를 제거하고
            // useEffect로 이동
            boardData && (
                <>
                    <h3>제목 : {boardData.title}</h3>
                    <p>작성자 : {boardData.writer}</p>
                    <p>내용 : {boardData.content}</p>
                    <p>날짜 : {boardData.date}</p>
                </>
            )
        }
        { /**
         * writer 값이 같을 때만 아래 버튼들 보이기 - 삼항 연산자 
         * boardData의 값이 있을 때 비교!     
         * 먼저는 boardData가 있는지 확인한 후에 출력
         * >> 연달아서 확인하기 위해 && 연산자 사용
         * 1) boardData가 있는지 확인 (있으면 T/없으면 F)
         * 2) writer 비교
        */}
        {
            boardData &&
                (state.user.writer === boardData.writer &&
                    <div>
                        <button
                            onClick={deleteBoard}
                        >게시글 삭제</button>
                        <button
                            // navigate의 state를 이용하여 boardData 객체를 전달
                            onClick={()=>{navigate('/board-modify-form', {state: boardData})}}
                        >게시글 수정하기</button>
                    </div>                    
                )
        }
        <hr />
        {/** 코멘트를 작성할 공간 */}
        <input type="text"
            onChange={(e)=>(setText(e.target.value))}
        />
        <button
            onClick={addComment}
        >댓글 작성</button>
        <hr />
        {
            // 값을 넘길 형태가 객체로 주어져 있으면 객체로 넘길 수 있다
            // state의 commentlist를 그대로 쓰게 되면 리스트 전체가 나옴
            // >> 동일한 boardId를 가진 commentlist를 만들어야 함
            boardCommentList.map((comment)=>(
                <CommentComp
                    key={comment.cId}
                    comment={comment}
                    deleteComment={deleteComment}
                />
            ))
        }
    </div>
  )
}
