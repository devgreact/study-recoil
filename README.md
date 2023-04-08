# Selectors

- todo/TodoListFilters.js 생성

- Selector는 파생된 상태(derived state)의 일부를 나타낸다. 파생된 상태를 어떤 방법으로든 주어진 상태를 수정하는 순수 함수에 전달된 상태의 결과물로 생각할 수 있다.

- 파생된 상태는 다른 데이터에 의존하는 동적인 데이터를 만들 수 있기 때문에 강력한 개념이다. 우리의 todo 리스트 애플리케이션 맥락에서는 다음과 같은 것들이 파생된 상태로 간주된다.

  - 필터링 된 todo 리스트 : 전체 todo 리스트에서 일부 기준에 따라 특정 항목이 필터링 된 새 리스트(예: 이미 완료된 항목 필터링)를 생성되어 파생된다.

  - Todo 리스트 통계 : 전체 todo 리스트에서 목록의 총 항목 수, 완료된 항목 수, 완료된 항목의 백분율 같은 리스트의 유용한 속성들을 계산하여 파생된다.

## TodoListFilters.js

```js
import React from "react";
import { atom } from "recoil";

export const todoListFilterState = atom({
  key: "todoListFilterState",
  default: "Show All",
});
const TodoListFilters = () => {
  return <div>TodoListFilters</div>;
};

export default TodoListFilters;
```

```js
import React from "react";
import { atom, useRecoilState } from "recoil";
// 1. 필터링 된 todo 리스트를 구현하기 위해서 우리는 atom에 저장될 수 있는 필터 기준을 선택해야 한다.
// 우리가 사용하게 될 필터 옵션은 "Show All", "Show Completed"과 "Show Uncompleted"가 있다.
// 기본값은 "Show All"이 될 것이다.
export const todoListFilterState = atom({
  key: "todoListFilterState",
  default: "Show All",
});

const TodoListFilters = () => {
  const [filter, setFilter] = useRecoilState(todoListFilterState);
  const updateFilter = ({ target: { value } }) => {
    setFilter(value);
  };

  return (
    <>
      Filter:
      <select value={filter} onChange={updateFilter}>
        <option value="Show All">All</option>
        <option value="Show Completed">Completed</option>
        <option value="Show Uncompleted">Uncompleted</option>
      </select>
    </>
  );
};

export default TodoListFilters;
```

## TodoList.js

- todoListFilterState와 todoListState를 사용해서 우리는 필터링 된 리스트를 파생하는 filteredTodoListState selector를 구성할 수 있다.

```js
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
```

```js
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
// 내부적으로 2개의 의존성 todoListFilterState와 todoListState을 추적한다.
// 그래서 둘 중 하나라도 변하면 filteredTodoListState는 재 실행된다.
// 컴포넌트 관점에서 보면 selector는 atom을 읽을 때 사용하는 같은 훅을 사용해서 읽을 수 있다.
// 그러나 특정한 훅은 쓰기 가능 상태 (즉, useRecoilState())에서만 작동하는 점을 유의해야 한다.
// 모든 atom은 쓰기 가능 상태지만
// selector는 일부만 쓰기 가능한 상태(get과 set 속성을 둘 다 가지고 있는 selector)로 간주된다.
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
```
