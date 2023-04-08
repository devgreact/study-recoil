import React from "react";
import { atom, selector, useRecoilValue } from "recoil";
import TodoItemCreator from "./TodoItemCreator";
import TodoItem from "./TodoItem";
import TodoListFilters, { todoListFilterState } from "./TodoListFilters";
import TodoListStats from "./TodoListStats";
export const todoListState = atom({
  key: "todoListState",
  default: [],
});

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
  //   const todoList = useRecoilValue(todoListState);
  const todoList = useRecoilValue(filteredTodoListState);
  return (
    <>
      <TodoListStats />
      <TodoListFilters />
      <TodoItemCreator />
      {todoList.map((todoItem) => (
        <TodoItem key={todoItem.id} item={todoItem} />
      ))}
    </>
  );
};

export default TodoList;
