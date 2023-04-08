import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { todoListState } from "./TodoList";

// 3. 고유한 Id 생성을 위한 유틸리티
let id = 0;
function getId() {
  return id++;
}

const TodoItemCreator = () => {
  const [inputValue, setInputValue] = useState("");

  // 1. 새로운 todo 아이템을 생성하기 위해
  // TodoList.js에 정의한 todoListState 내용을
  // 업데이트하는 setter 함수에 접근해야 한다.
  // useSetRecoilState()을 사용하는 것은
  // 컴포넌트가 값이 바뀔 때 리렌더링을 하기 위해 컴포넌트를 구독하지 않고도 값을 설정하게 해줍니다.
  const setTodoList = useSetRecoilState(todoListState);

  const addItem = () => {
    // 2. 기존 todo 리스트를 기반으로 새 todo 리스트를 만들 수 있도록
    // setter 함수의 updater 형식을 사용한다는 점에 유의해야 한다.
    setTodoList((oldTodoList) => [
      ...oldTodoList,
      {
        id: getId(),
        text: inputValue,
        isComplete: false,
      },
    ]);
    setInputValue("");
  };

  const onChange = ({ target: { value } }) => {
    setInputValue(value);
  };
  return (
    <div>
      <input type="text" value={inputValue} onChange={onChange} />
      <button onClick={addItem}>Add</button>
    </div>
  );
};
export default TodoItemCreator;
