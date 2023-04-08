# Recoil(https://recoiljs.org/ko/)

## 1. 설치

```
npx create-react-app ./
npm install recoil
```

## 2. 개념

### Atom

- Atom은 상태(state)의 일부를 나타낸다.
- Atoms는 어떤 컴포넌트에서나 읽고 쓸 수 있다.
- atom의 값을 읽는 컴포넌트들은 암묵적으로 atom을 구독한다.
- 그래서 atom에 어떤 변화가 있으면 그 atom을 구독하는 모든 컴포넌트들이 재 렌더링 되는 결과가 발생할 것이다

```js
const textState = atom({
  key: "textState", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});
```

#### useRecoilState()

- 컴포넌트가 atom을 읽고 쓰게 하기 위해서 사용

- 컴포넌트가 atom을 읽고 쓰게 하기 위해서는 useRecoilState()를 아래와 같이 사용하면 된다.

```js
function CharacterCounter() {
  return (
    <div>
      <TextInput />
      <CharacterCount />
    </div>
  );
}

function TextInput() {
  const [text, setText] = useRecoilState(textState);

  const onChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <input type="text" value={text} onChange={onChange} />
      <br />
      Echo: {text}
    </div>
  );
}
```

### Selector

- Selector는 파생된 상태(derived state)의 일부를 나타낸다.
- Recoil 에서의 함수 또는 파생된 상태.
- 파생된 상태는 상태의 변화다.
- Selector는 주어진 atom의 상태에 대해 항상 동일한 값을 반환하는 순수함수이다.
- 파생된 상태란 atom의 상태에서 파생된 데이터, 즉 atom의 상태에 의존하는 동적인 데이터다.

- 파생된 상태를 어떤 방법으로든 주어진 상태를 수정하는 순수 함수에 전달된 상태의 결과물로 생각할 수 있다.

- 만약 Selector에 get함수만 제공된다면 Selector 함수는 읽기만 가능한 RecoilValueReadOnly 객체를 반환하고
- set 함수가 함께 제공되면 Selector는 읽기, 쓰기가 가능한 RecoilState 객체를 반환한다.

```js
const charCountState = selector({
  key: "charCountState", // 내부적으로 atom을 식별하는데 사용되는 문자열
  get: ({ get }) => {
    const text = get(textState);

    return text.length;
  },
});
```

- key : 내부적으로 atom을 식별하는데 사용되는 문자열
- get : 파생된 상태의 값을 평가하는 함수. 매개변수로 get 함수가 올 수 있는데 다른 atom이나 selector를 찾는데에 사용되는 함수이다.
- Promise나 다른 atom,slelector를 반환할 수 있다.
- set : 이 속성이 설정되면 selector는 쓰기 가능한 상태를 반환한다. 마찬가지로 get 함수가 매개변수로 올 수 있으며 set 함수도 올 수 있다.
- dangerouslyAllowMutability : Selector의 순수함수를 보장하기 위한 옵션

#### useRecoilValue()

- useRecoilValue() 훅을 사용해서 charCountState 값을 읽을 수 있다.

```js
function CharacterCount() {
  const count = useRecoilValue(charCountState);
  return <>Character Count: {count}</>;
}
```

## 3. Todo

```
npx create-react-app ./
npm install recoil
```

### 3-1. index.js

```js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { RecoilRoot } from "recoil";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>
);
```

### 3-2. App.js

```js
import TodoList from "./todo/TodoList";

function App() {
  return (
    <div className="App">
      <TodoList />
    </div>
  );
}

export default App;
```

## 4. 제작

- todo/TodoList.js
