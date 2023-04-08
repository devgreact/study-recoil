# TodoList.js

```js
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
```

# TodoItem.js

```js
function replaceItemAtIndex(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function removeItemAtIndex(arr, index) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}
```

```js
const removeItemAtIndex = (arr, index) => {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
};
const replaceItemAtIndex = (arr, index, newValue) => {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
};
```

# TodoListStats.js

```js
//   const formattedPercentCompleted = Math.round(percentCompleted * 100);
const formattedPercentCompleted = Math.round(percentCompleted);
```
