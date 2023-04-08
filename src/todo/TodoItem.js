import React from "react";
import { useRecoilState } from "recoil";
import { todoListState } from "./TodoList";

const removeItemAtIndex = (arr, index) => {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
};
const replaceItemAtIndex = (arr, index, newValue) => {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
};

const TodoItem = ({ item }) => {
  // TodoList 에 정의한  todoListState를 읽고 항목 텍스트를
  // 업데이트하고,
  // 완료된 것으로 표시하고,
  // 삭제하는 데 사용하는 setter 함수를 얻기 위해 useRecoilState()를 사용한다.
  const [todoList, setTodoList] = useRecoilState(todoListState);

  const index = todoList.findIndex((listItem) => listItem === item);

  const editItemText = ({ target: { value } }) => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      text: value,
    });

    setTodoList(newList);
  };

  const toggleItemCompletion = () => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      isComplete: !item.isComplete,
    });

    setTodoList(newList);
  };

  const deleteItem = () => {
    const newList = removeItemAtIndex(todoList, index);

    setTodoList(newList);
  };

  return (
    <div>
      <input type="text" value={item.text} onChange={editItemText} />
      <input
        type="checkbox"
        checked={item.isComplete}
        onChange={toggleItemCompletion}
      />
      <button onClick={deleteItem}>X</button>
    </div>
  );
};

export default TodoItem;
