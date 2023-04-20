import React, { useState, useContext } from "react";
import DataContext from "../context/DataContext";
import { useNavigate } from "react-router-dom";

export default function BoardWriteForm() {
  // 사용자로 입력 받아올 공간을 useState로 작성
  // >> todoList에서 todo를 작성할 공간과 동일
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Context에서 작성한 value의 state의 oardlist의 값을 추가
  // value의 action의 setBoradlist에 접근해서 작성한 새로운 값 추가
  // >> todolist에서 값을 추가할 때 생각,
  // 이전의 배열을 들고 와서 뒤에 concat()을 통해 새로운 배열을 만들어 추가
  // * 위와 같이 데이터를 쓰는 이유 :
  // 서버의 데이터베이스를 사용하지 않고 자바스크립트로 값을 저장하고 있기 때문

  // DataContext를 통해서 공용데이터 값, 메소드 들고 오기
  const value = useContext(DataContext);
  const { state, action } = value;

  // navigate 선언 (글 작성 후 목록으로 자동 이동)
  const navigate = useNavigate();

  // 글 추가 메소드
  const addBoard = () => {
    // 1. 어떤 형태로 값을 저장할지
    const newBoard = {
      id: state.id,
      title: title,
      content: content,
      date: "2023-04-18",
      // DataContext에 들어가 있는 user의 writer값
      writer: state.user.writer,
    };
    // 1-1. id 값을 1씩 증가
    action.setId(state.id + 1);

    // 2. 배열에 추가한 새로운 배열을 만들어서(concat)
    const newBoardlist = state.boardlist.concat(newBoard);
    // 3. set메소드를 통해 추가
    action.setBoardlist(newBoardlist);

    // 내용이 추가된 후 그 내용을 확인하기 위해 BoardList로 이동
    // navigate 사용
    navigate("/boardlist");
  };

  return (
    <div>
      <h3>BoardWriteForm</h3>
      <label htmlFor="">제목</label>
      <input
        type="text"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <br />
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        onChange={(e) => {
          setContent(e.target.value);
        }}
      ></textarea>
      <br />
      <button onClick={addBoard}>글 작성 완료</button>
    </div>
  );
}
