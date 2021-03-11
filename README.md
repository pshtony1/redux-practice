# Redux Practice

`React`를 사용하다 보니, 필요해져서 공부해보는 `Redux`

<img src="https://user-images.githubusercontent.com/67461578/110816469-b666db00-82ce-11eb-819d-0336ff655526.jpg" width="80%" />

---

## 목차 
* [**React의 상태 관리와 문제점**](https://github.com/pshtony1/redux-practice/blob/master/README.md#react%EC%9D%98-%EC%83%81%ED%83%9C-%EA%B4%80%EB%A6%AC%EC%99%80-%EB%AC%B8%EC%A0%9C%EC%A0%90)
  * [React의 상태 관리](https://github.com/pshtony1/redux-practice/blob/master/README.md#react%EC%9D%98-%EC%83%81%ED%83%9C-%EA%B4%80%EB%A6%AC)
  * [그러나..](https://github.com/pshtony1/redux-practice/blob/master/README.md#%EA%B7%B8%EB%9F%AC%EB%82%98)
* [**다양한 상태 관리 방법**](https://github.com/pshtony1/redux-practice/blob/master/README.md#%EB%8B%A4%EC%96%91%ED%95%9C-%EC%83%81%ED%83%9C-%EA%B4%80%EB%A6%AC-%EB%B0%A9%EB%B2%95)
* [**Redux 란?**](https://github.com/pshtony1/redux-practice/blob/master/README.md#redux-%EB%9E%80)
  * [Flux Pattern](https://github.com/pshtony1/redux-practice/blob/master/README.md#flux-pattern)
  * [그래서 Redux를 왜 쓰는데?](https://github.com/pshtony1/redux-practice/blob/master/README.md#%EA%B7%B8%EB%9E%98%EC%84%9C-redux%EB%A5%BC-%EC%99%9C-%EC%93%B0%EB%8A%94%EB%8D%B0)
  * [❗ Redux는 React에만 사용되는 것이 아니다](https://github.com/pshtony1/redux-practice/blob/master/README.md#%EA%B7%B8%EB%9E%98%EC%84%9C-redux%EB%A5%BC-%EC%99%9C-%EC%93%B0%EB%8A%94%EB%8D%B0)

* 작성중
---

<br />

## React의 상태 관리와 문제점

### React의 상태 관리
`React`를 사용하다 보면, 필연적으로 상태(`state`)를 만들고, 수정하는 상황을 만나게 된다.  
이렇게 만들어낸 상태는 `props`를 이용해 자식에게 전달할 수도 있고, `ref`를 이용해 자식의 상태를 참조할 수도 있다.

이를 [`Prop Drilling`](https://kentcdodds.com/blog/prop-drilling) 이라고 하는데, 정말 편리한 컨셉인 것에 이견이 없을 것이다. 👍

<br />

### 그러나..

그러나 **컴포넌트의 깊이가 점점 깊어지는 상황**에서 `Prop Drilling`을 하게 되면 문제가 발생한다.

우선, `React`의 렌더링 시점은 다음과 같다. 👇
* `state`가 수정되었을 때
* `props`가 수정되었을 때
* 부모 컴포넌트가 렌더링 되었을 때
* `forceUpdate()`를 호출했을 때

<br />

이 로직을 다음 상황에 적용해보자.

> Component 1, setState A
>> Child Component 2, props A
>>> Child Component 3, props A
>>>>...
>>>>> Child Component 10, props A

즉 Component `N`의 자식이 Component `N + 1` 로, 총 10개의 컴포넌트가 연결된 상황이며,  
최상위 컴포넌트(Component 1)에서 만든 `state A`를 최하위 컴포넌트(Component 10)까지 `props`를 이용해  
`Prop Drilling`을 하는 상황이다.

<br />

이때 Component 1 에서, `state A`를 수정하고 렌더링하게되면,  
앞서 말한 `React`의 렌더링 시점에 의해, **Component 1 뿐만 아니라, 그의 자식들(2 ~ 10)도 전부 렌더링된다.**  
즉, 영향을 받지 않아도 될 컴포넌트까지 모두 렌더링하기 때문에 성능 손실이 발생하게 된다.

<br />

만약 프로젝트의 규모가 더 커진다면, 성능 손실은 물론이며  
데이터의 흐름 조차 복잡해지기 때문에 디버깅이 힘들어질 가능성도 농후하다.

<br />

## 다양한 상태 관리 방법

위의 문제를 해결하기 위해, 가장 보편적으로 사용하는 방법은 상태 관리 라이브러리를 사용하는 것이다.  
대표적으로 많이 사용되는 라이브러리는 `Redux`, `Mobx` 등이 있다.

특히, `React`는 자체적으로 `Context API`라는 상태 관리 도구를 지원한다.

나는 가장 많이 사용하는 `Redux`를 선택하여 공부해보기로 결정했다.  
*(물론 다 공부할 것이긴 하지만..)*

<br />

## Redux 란?

[Redux의 공식 홈페이지](https://redux.js.org/) 에서는 `Redux`를 다음과 같이 소개한다.

> **A Predictable State Container for JS Apps**

즉, `Redux`의 핵심 컨셉은 **예측 가능한 상태 관리** 라는 것이다.

그런데 **예측 가능한 상태 관리** 라는게 어떤 의미일까?

<br />

### Flux Pattern

![flux-simple-f8-diagram-1300w](https://user-images.githubusercontent.com/67461578/110816344-99caa300-82ce-11eb-85a5-5d477bf78fcd.png)

<br />

각 용어는 다음을 의미한다.

* `Action`: 사용자의 요청
* `Dispatcher`: 발생한 `Action`들을 정리하여 `Store`에 개입하는 역할
* `Store`: 일종의 상태(데이터) 저장소
* `View`: 어플리케이션이 유저에게 보여지는 부분

`Flux Pattern`은 다음의 과정을 거치게 된다.

1. 어떠한 `Action`이 발생
2. `Dispatcher`가 발생한 `Action`을 이용해 `Store`에 저장된 값 수정
3. 변경된 `Store` 값으로 `View`를 변경

<br />

이러한 패턴의 최고 장점은 개발 흐름이 **단방향** 으로 흐르기 때문에,  
코드의 흐름이 **예측 가능(Predictable)** 하다는 것이다.

<br />

이 장점은, 개발 흐름이 양방향인 `MVC Pattern`과 비교했을 때 부각된다.

`MVC Pattern`은 프로젝트의 규모가 커지게 되면, `Model`과 `View`가 급격히 늘어나고 그에 따라 각각의 모듈들이 어떤 식으로 연결되어있는지 파악하기가 매우 어려워진다.  
즉, `MVC Pattern`은 코드의 흐름을 예측하기 힘들다는 것이다.

`Flux Pattern`은 이러한 문제점을 크게 해소해주었다.

<br />

이러한 `Flux Pattern`에 `Reducer` 개념을 장착해 [Dan Abramov](https://github.com/gaearon) 라는 개발자가 `Redux`를 세상에 내놓는다.

<br />

### 그래서 Redux를 왜 쓰는데?

결국 앞서 설명했던 `Prop Drilling` 에서 발생하는 문제점들을 다음과 같이 개선한다.

* 데이터/코드 흐름을 개선하는 예측 가능한 상태 관리
* 불필요한 렌더링 억제

<br />

또한 중요한 기능으로, **상태의 중앙화**가 있다.

> 상태를 전역적으로 저장하는 공간(`Store`)이 있어, 상태의 위치에 대한 고민을 하지 않아도 된다.

<br />

이 외에도, 읽기 전용 상태나 [Side-Effect](https://www.reddit.com/r/reactjs/comments/8avfej/what_does_side_effects_mean_in_react/)가 없는 `Reducer` 등 편리한 기능들을 제공한다.

대박이다.😆

<br />

### ❗ Redux는 React에만 사용되는 것이 아니다

무엇보다도 `Redux`는 `React` 전용 상태 관리 라이브러리가 아니다.  
`React` 전용으로는 `Context API` 라는게 존재하며, `Redux`는 Vanilla Javascript, `Vue`, `Angular` 등에도 사용이 가능한 라이브러리이다.
