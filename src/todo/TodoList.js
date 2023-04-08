import React from "react";
import { atom, selector, useRecoilValue } from "recoil";
import TodoItemCreator from "./TodoItemCreator";
import TodoItem from "./TodoItem";
import TodoListFilters, { todoListFilterState } from "./TodoListFilters";
export const todoListState = atom({
  key: "todoListState",
  default: [],
});

// 1. todoListFilterState와 todoListState를 사용해서
// 우리는 필터링 된 리스트를 파생하는 filteredTodoListState selector를 구성할 수 있다.
export const filteredTodoListState = selector({
  key: "FilteredTodoList",
  get: ({ get }) => {
    const filter = get(todoListFilterState);
    const list = get(todoListState);

    switch (filter) {
      case "Show Completed":
        return list.filter((item) => item.isComplete);
      case "Show Uncompleted":
        return list.filter((item) => !item.isComplete);
      default:
        return list;
    }
  },
});

const TodoList = () => {
  const todoList = useRecoilValue(todoListState);
  return (
    <>
      {/* 2.  */}
      <TodoListFilters />
      <TodoItemCreator />
      {todoList.map((todoItem) => (
        <TodoItem key={todoItem.id} item={todoItem} />
      ))}
    </>
  );
};

export default TodoList;
