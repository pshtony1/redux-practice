# Redux Practice

`React`를 사용하다 보니, 자연스레 필요해져서 공부해보는 `Redux`

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

즉 Component `N`의 자식이 Component `N + 1` 로, 총 10개의 컴포넌트가 연결된 상황이며

최상위 컴포넌트(Component 1)에서 만든 `state A`를 최하위 컴포넌트(Component 10)까지 `props`를 이용해  
`Prop Drilling`을 하는 상황이다.

<br />

이때 Component 1 에서, `state A`를 수정하고 렌더링하게되면,

앞서 말한 `React`의 렌더링 시점에 의해, **Component 1 뿐만 아니라, 그의 자식들(2 ~ 10)도 전부 렌더링된다.**

즉, 영향을 받지 않아도 될 컴포넌트까지 모두 렌더링하기 때문에 성능 손실이 발생하게 된다.

<br />

만약 프로젝트의 규모가 더 커진다면, 성능 손실은 물론이며  
데이터의 흐름 조차 복잡해지기 때문에 디버깅이 힘들어질 가능성도 농후하다.


