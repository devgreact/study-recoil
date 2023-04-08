import React from "react";
import { atom, useRecoilValue } from "recoil";
import TodoItemCreator from "./TodoItemCreator";
import TodoItem from "./TodoItem";
// 1. Atoms
// Atoms는 애플리케이션 상태의 source of truth를 갖는다.
// todo 리스트에서 source of truth는 todo 아이템을 나타내는 객체로 이루어진 배열이 될 것이다.
// atom 리스트를 todoListState라고 하고 이것을 atom() 함수를 이용해 생성
// atom에 고유한 key를 주고 비어있는 배열 값을 default로 설정할 것이다.
export const todoListState = atom({
  key: "todoListState",
  default: [],
});

const TodoList = () => {
  // 2. 동시에 읽고 쓰기 위함.
  // atom의 항목을 읽기 위해, useRecoilValue() 훅을 우리의 TodoList 컴포넌트에서 사용할 수 있다.
  const todoList = useRecoilValue(todoListState);
  return (
    <>
      {/* 3. 목록생성 */}
      <TodoItemCreator />
      {/* 4. 목록 출력 */}
      {todoList.map((todoItem) => (
        <TodoItem key={todoItem.id} item={todoItem} />
      ))}
    </>
  );
};

export default TodoList;
