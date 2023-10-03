# GDSC Front-end Onboarding Project

> GDSC 프론트엔드 팀에 오신 것을 환영합니다!

## Task 2. 상태 관리하기

이번 Task 2에서는 상태를 본격적으로 사용해보려 합니다!
경우에 따라서 Task 1에서 이미 useState 등의 상태를 이용해서 기능을 만들어보셨을 수도 있을 것 같은데요.
Task 2에서 조금 더 본격적으로 정보를 저장하고 그에 따른 Effect를 관리하는 법을 연습해보시게 될 것입니다!

### Task 2-1. 접수 Modal 만들기

Figma에서 접수하기 Modal을 확인하실 수 있습니다! Modal은 기존 화면 위에 덮어지면서 별개의 작업 흐름을 보여주는 팝업 같은 UI을 말합니다.
이 Modal 자체는 MUI에서 가져와서 사용해주시면 되고, MUI Modal 안에 우리가 만든 컨텐츠를 넣어주면 됩니다.

#### 상태(useState)와 그로 인한 영향(useEffect)

모든 코드가 Pure할 수 있다면 좋겠지만, 대부분의 애플리케이션은 필연적으로 '상태'를 관리하게 됩니다.
여기서 말하는 상태는 'UI에 영향을 끼치는 어떤 값'입니다. 예를 들면 Modal이 켜져있는지 여부를 확인하기 위한 Boolean 값을 상태로 만들고, 그 값이 true가 되면 Modal이 보이고, false면 안보이게 만들 수 있습니다.
React에서는 이런 상태를 `useState`라는 Hook을 이용해서 정할 수 있습니다. 위에서 말한 Modal 온오프 여부는 `const [isModalOpen, setModalOpen] = useState(false)` 이런 식으로 만들 수 있습니다.
사실 React에서 이 state라는게 처음 보면 그냥 변수(`let data = 0`)를 사용하는 것과 무슨 차이가 있을까? 라고 생각할 수도 있습니다.
만약 카운터를 React 컴포넌트로 만든다고 생각해봅시다.

```
case 1.
let count = 0;

function up() {
  count += 1;
}

return <div onClick={() => up()}>{count}</div>

================
case 2.
const [count, setCount] = useState(0);

function up() {
  setCount(count + 1);
}

return <div onClick={() => up()}>{count}</div>
```

카운트 숫자를 누르면 카운트가 늘어나도록 의도한 코드입니다.
실제로 해보면 1번 케이스는 제대로 동작하지 않고, 2는 제대로 동작할 것입니다.
왜냐하면 그냥 변수가 바뀔 때는 React가 UI를 리랜더링하지 않고, `useState`가 제공하는 Setter를 이용해서 값을 업데이트하면 UI를 리랜더링하기 때문입니다.
따라서 React에서 이 상태라는 것은 화면을 우리가 원하는대로 랜더링하기 위해서 적절하게 사용해야 하는 요소이기 때문에, `useState`의 동작에 대해 잘 이해해야 합니다.

`useEffect`는 상태의 변화에 따른 그 영향(side effect)을 처리하는 Hook입니다. 카운트 값이 올라갈 때마다 10이 넘어가면 콘솔에 넘었다고 출력이 한 번 되게 하고 싶다면, 아래처럼 할 수 있습니다.

```
useEffect(() => {
  if (count >= 10) console.log("10을 넘었어요");
}, [count]);
```

`useEffect(callback, deps)`에서, 이 `deps`는 값들이 들어간 array입니다. 위 코드에서는 `count`가 들어있는데, 이 뜻은 리랜더링될 때마다 `count` 값이 이전과 달라졌는지 확인하고, 달라졌다면 첫 번째 parameter로 넘겨둔 콜백을 구동하게 됩니다.
상황에 따라 컴포넌트가 처음 랜더링 됐을 때 딱 한 번 구동하고 싶은 코드들이 있다면, `useEffect(() => { ... }, [])` 이런 식으로 `deps`를 비워두면 됩니다. 주로 초기화 중 네트워크 통신을 위해 데이터를 받아와야 할 때 많이 사용합니다.

만약 Hooks나 이런 상태에 대해 좀 더 알고 싶다면 제가 쓴 [글 1](https://medium.com/hcleedev/web-react-hooks%EC%9D%98-%EB%93%B1%EC%9E%A5-%EB%B0%B0%EA%B2%BD%EA%B3%BC-%EC%9D%98%EC%9D%98-d400cbc203a4), [글 2](https://medium.com/hcleedev/web-usestate%EC%9D%98-%EB%8F%99%EC%9E%91-%EC%9B%90%EB%A6%AC%EC%99%80-%ED%95%A8%EC%A0%95-7b4825c16b9)나 [공식 문서](https://react.dev/reference/react)를 참고해보세요!

**Task 요구사항**

- 증상 선택 드롭다운은 MUI Select를 이용해서 구현
- 증상은 '콧물', '두통', '복통' 3가지로 제한
- 추가 참고 사항은 MUI TextField를 이용해서 구현
- 접수하기 버튼은 MUI Button을 이용해서 구현
- 접수하기 버튼은 최소 증상을 선택해야 활성화

### Task 2-2. Recoil 이용해 전역 상태 관리 해보기

#### 전역 상태 관리 라이브러리란

위에서 사용했던 `useState` 같은 경우는 해당 컴포넌트 - 혹은 하위 컴포넌트 - 정도에 한정되어있습니다. 물론 대부분의 경우 그정도도 문제 없지만 가끔 애플리케이션 전체적으로 적용하고 싶은 상태라거나(ex. 다크모드) 너무 깊은 하위 컴포넌트로 Props를 계속 넘겨줘야 해서 귀찮은 경우가 있습니다.
그런 경우 전역 상태 라이브러리를 사용합니다. 특정 컴포넌트에 한정되지 않고 보다 넓은 범위에서 상태를 이용하기 위한 라이브러리고, 대표적으로 Redux, MobX, Recoil, Zustand 같은게 있습니다.
좀 더 알고 싶으면 제가 쓴 [이 글](https://medium.com/hcleedev/web-%EC%83%81%ED%83%9C-%EA%B4%80%EB%A6%AC-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC%EB%9E%80-%EA%B0%9C%EB%85%90-redux-%EC%98%88%EC%8B%9C-acf48c51ae14)을 참고하면 좋을 것 같습니다!

#### Recoil이란

우리는 그 중에 Recoil을 사용해보려고 합니다. Redux가 가장 범용적이긴 하지만, 요즘은 Recoil이나 Zustand가 핫합니다. 물론 이것도 한 1년 지나면 또 트렌드 바뀔 수도 있음...
Recoil은 전역에서 사용할 수 있는 state를 `atom`을 이용해 만들 수 있습니다. 아마 store 폴더를 보면 예시를 확인하실 수 있을 것입니다. 앞으로 만들 때도 store 폴더 안에 파일을 하나씩 파서 만들어주세요!

```
// atomExample.js
const exampleAtom = atom({
  key: 'exampleAtom',
  default: null,
});

export default exampleAtom;

// component.jsx
import exampleAtom from '~~';

const Component = () => {
  const [example, setExample] = useRecoilState(exampleAtom);
  ...
}
```

이런 식으로 컴포넌트에서 가져와서 사용할 수 있습니다. 이러면 여러 컴포넌트에서 공유하면서 사용하기 훨씬 편해집니다.
이때 `useRecoilState`, `useRecoilValue`, `useRecoilSetState` 등 다양한 custom hook을 제공하니 적절히 필요에 따라 사용하시면 됩니다!
하지만 편하다고 남용하면 안됩니다. 적절히 해당 컴포넌트 내에서, 하위 컴포넌트 한 두 단계 정도에서만 사용될 것이라면 그냥 `useState`를 사용하는 것이 가장 좋습니다. 좀 뜬금없이 여기저기 같은 값을 공유해야 할 때 적절히 Recoil을 사용하게 되면 좋을 것입니다.

**Task 요구사항**

- 접수 내역을 저장하는 Recoil atom 만들기
- 접수 Modal에서 접수하기를 누르면 Recoil로 만든 저장 공간에 접수 내역 추가하는 것 구현
  - 접수 내역은 병원 이름, 앞에 남은 사람, 증상, 추가 참고 사항, 그리고 접수한 시간을 저장한다.

### Task 2-3. Router 이용해 새로운 페이지를 만들고, 내 예약 내역 보기 페이지 만들기

#### Single Page Application, SPA란

과거의 웹 페이지는, URL 하나를 바꿀 때마다 서버로부터 새로운 HTML 파일을 받아와 로딩해야 했습니다. 어릴 때는 하이퍼 링크 하나를 누를 때마다 중간중간 하얀 화면과 빙글빙글 로딩창이 돌아갔던걸 기억하실겁니다. (일단 제가 어릴 때는 그랬습니다..)
하지만 요즘은 완전 처음에만 하얀 화면으로 로딩을 하지, URL이 바뀌어도 화면이 새로 로딩되는 것이 아니라 빠릿빠릿하게 변경되는 것을 느낄 수 있습니다.
이런 경우는 대부분 Single Page Application, SPA를 적용한 경우라고 생각해도 됩니다.
SPA는 이 웹 애플리케이션을 만들기 위한 모든 재료(JavaScript 등)를 초기 로딩에 받아와서, URL이 바뀌어도 웹 서버에 새로운 페이지를 요청하는게 아닌, 알아서 JavaScript로 필요한 화면을 만들어서 즉각 보여줍니다.
물론 SPA도 처음에 받아와야 하는 번들의 크기가 워낙 큰 것이 단점으로 꼽히고, 빈 HTML 파일에 JavaScript로 내용물을 채워넣는 방식이다보니 검색 엔진 봇이 HTML만 보고 비어있다고 판단한 후 정보를 다 수집하지 못하는 단점이 있었습니다. (SEO 최적화라고 부릅니다) 그래서 지금은 그런 문제들을 해결하기 위한 Next.js, Qwik 등 온갖 새로운 프레임워크도 등장하고 있죠.
다만 저희는 단순한 React만 사용하기 때문에, SPA로 애플리케이션을 만들 것이라고 이해해주시면 됩니다.

#### Router란

그러면 이 SPA에서는 URL의 변화를 '인지'하고, 그에 적절한 '대응'을 해주는 로직도 필요합니다. 브라우저가 알아서 해주는게 아니라, 개발자가 이를 정해줘야 하죠.
React에서는 react-router 라이브러리가 주로 사용됩니다. 우리도 `page/router.jsx` 파일을 보면 확인하실 수 있을 것입니다.
이 Router는 브라우저가 URL이 바뀌었다는 이벤트를 발생시키면, 이를 인지하고 URL 값에 맞는 컴포넌트를 랜더링하고 정보를 전달하는 역할을 합니다.
물론 웹 애플리케이션 내에서 하이퍼 링크 같은 것을 눌러서 Router에게 URL 변경을 요청할 수도 있습니다. react-router가 제공하는 `navigate`같은 함수들이 있습니다.
이번 Task 2-3에서는 이 Router 기능을 살짝이나마 사용해 새로운 페이지를 만드는 경험을 해보려고 합니다.

**Task 요구사항**

- `router.jsx` 파일에서 `"/my"`로 연결되도록 Routing 추가
- 접수 내역을 저장하고 있는 Recoil atom으로부터 데이터를 받아와 리스트처럼 보여주는 화면 구현
- 취소하기 버튼을 누르면 Recoil atom으로부터 해당 데이터를 삭제하는 것 구현
