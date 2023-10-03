# GDSC Front-end Onboarding Project

> GDSC 프론트엔드 팀에 오신 것을 환영합니다!

## Task 3. 서버와 통신하기

우리가 만드는 웹 애플리케이션은 어느정도 스스로 정보를 가지고 보여줄 수도 있지만, 수많은 정보나 새로운 정보를 받으려면 단순히 개발자가 웹 애플리케이션 코드에 하드 코딩하는 것만으로는 부족합니다.
새로운 정보와 꾸준히 유지되어야 하는 - 그리고 비즈니스에 연결되는 중요한 정보 등 - 은 따로 저장소에 저장해둬야 하는데요. 이 저장소의 역할을 하는 곳이 서버입니다.
웹 애플리케이션(Client)에서는 서버에게 네트워크 통신을 보내면, 서버는 내부에서 해당 값을 처리하고 그 결과를 response로 보내줍니다.
당연히 서버와 클라이언트가 소통하기 위해서는 서로 규칙을 정해두어야 하고, 그 규칙을 **API**라고 합니다. 서로 미리 약속해둔 형태로 데이터를 주고 받는 것이죠.
예를 들어 `'/user' 주소로 userId를 number 타입으로 보내면, {name: string, id: number} 이렇게 된 객체를 돌려줄게` 대강 이렇게 약속을 하는 것이죠.
이번 Task에서는 Task 2에서 만들었던 기능을 서버 기반으로 옮겨보려고 합니다.

### 비동기란?

전산과 수업을 듣다보면 이미 알고 있을 수도 있겠지만, 우선 비동기 작업의 개념을 먼저 알아보려고 합니다.
코드를 실행시킬 때 동기(sync)적으로 실행시키는 코드들이 있고, 상황에 따라 비동기(async)적으로 실행시켜야 하는 코드들이 있습니다.
예를 들어 아래 코드를 봅시다.

```
# case 1
const data = [ ... ];
console.log(data[0].name);

# case 2
getDataFromServer( ... )
  .then(data => {
    console.log("Data come in:", data);
  })
console.log("start networking task");
```

case 1의 경우에는 그냥 동기적으로 동작하는 코드입니다. 중간에 멈추거나 다른 곳으로 가지 않고 그냥 data 리스트에서 데이터를 꺼내와서 보여주면 끝이죠.
하지만 두 번째는 다릅니다. 두 번째는 (컨셉 상) 서버로부터 데이터를 받아오는 경우입니다. 서버로부터 데이터를 받아오는 것은 '오래 걸리는' 일입니다. "네트워크 요청 순식간에 오던데 뭐가 오래 걸리냐?"라고 생각할 수 있겠지만, 컴퓨터는 원래 단 시간에 엄청나게 많은 명령을 처리할 수 있다는 것을 고려해보면 네트워크를 타고 서버의 처리 시간을 고려한 후 다시 데이터가 네트워크를 통해 도착하는 시간은 엄청나게 긴 시간입니다.
따라서 일단 요청을 보내놓으면, 이 요청에 대한 답변이 오기 전까지는 잠시 다른 코드들을 처리하고 있는 식으로 되어있습니다. 따라서 동기적인 코드와 다르게 순서대로 동작하지 않으며, 비동기적으로 동작한다고 말하는 것입니다.
위 case 2 코드는, 실제로 구동해보면 콘솔에 `start networking task`가 먼저 나오고, 그 후 요청이 완료되면 `Data come in: data`가 나올 것입니다. `getDataFromServer`로 데이터 요청을 보내놓고, `.then`을 이용해 네트워크 요청이 완료될 시 구동할 callback을 등록해둡니다. 그 후 요청을 하는 동안 다른 코드를 동작시키기 때문에 아래에 있는 `console.log("start networking task")`가 먼저 호출되는 것입니다.
이 `.then`과 `.catch`(에러 처리용)는 JavaScript의 `Promise` 객체를 다루는 가장 기본적인 방법입니다. Promise는 이런 비동기적 작업을 표현할 때 사용이 되는데, 이름 그대로 나중에 성공이든 실패든 결과를 돌려주겠다는 약속을 하는 느낌으로 받아들이셔도 됩니다.
참고로 `async/await`라는 것도 있는데, 이는 callback 지옥에 빠지지 않고 비동기 코드를 동기적으로 보이게 하는 기술이긴 합니다. 자주 사용되긴 하지만... 궁금하면 이 부분은 더 찾아보면 좋을 것 같습니다.

이 비동기 처리는 사실 네트워크에서만 사용되는 것은 아닙니다. 오래 걸리는 작업 대다수에 적용할 수 있습니다. 예를 들어 파일 입출력이 필요한 일이라거나, 연산이 오래 걸리는 경우 모두 비동기 작업으로 만들어서 애플리케이션이 멈춰버리는 일을 최소화하는데 사용됩니다.

비동기와 Promise에 대해 좀 더 자세한 설명을 보고 싶으면 [이 문서](https://learnjs.vlpt.us/async/)를 참고해도 좋을 것 같습니다!

### axios와 네트워크 요청 처리 (response와 error handling)

네트워크 처리를 도와주는 여러가지 라이브러리들이 있지만, 아무래도 JavaScript 환경에서 가장 많이 사용되는 것은 `axios`라는 라이브러리일 것입니다.
사실 저도 왜 이걸 사용하는지는 여태껏 생각해본 적이 없는 것 같네요. 일단 쓰다보니 그렇게 됐습니다.
여러분들이 직접 axios와 뭔가 지지고 볶을 일은 크게 없을 것이라고 생각하지만, 우리 앱에서 어떻게 이를 사용하고 있는지를 보여드리려고 합니다.
아래 코드는 우리 프로젝트 `HttpRequests.js`에서 확인할 수 있는 코드입니다.

```
const requestForEntity = async (method, url, params, data, arrayNoBrackets) => {
  try {
    const axiosResult = await Axios.request({
      url,
      method,
      params,
      data,
      baseURL: 'http://localhost:8080/',
      paramsSerializer: arrayNoBrackets ? param => qs.stringify(param, { arrayFormat: 'repeat' }) : undefined,
    });
    return axiosResult.data;
  } catch (e) {
    if (e.code === 200) return Promise.resolve();
    throw e;
  }
};

export const getForEntity = (url, params, arrayNoBrackets) => {
  return requestForEntity(HttpMethod.GET, url, params, null, arrayNoBrackets);
};

export const postForEntity = (url, data) => {
  return requestForEntity(HttpMethod.POST, url, null, data);
};
```

`requestForEntity`에서는 Axios를 직접 이용해 요청을 보내고, 그 결과인 `axiosResult`로부터 data를 끄집어내 반환합니다.
유의해야 할 점은 이 `requestForEntity`는 parameter 앞에 `async`가 붙어있고, `try/catch` 문 안에 `await`가 들어있습니다.
`await` 문 뒤에는 비동기 작업이 들어와야 하는데, 비동기 작업이 진행되는 동안 `await`에서 기다리고 있다가, 에러가 돌아오면 `catch` 문으로 이동하고, 제대로 동작하면 그 다음에 있는 `return axiosResult.data`로 이동하게 됩니다.
근데 여러분은 `requestForEntity`를 직접 사용하실 일은 없고, 아래에 있는 `getForEntity`, `postForEntity`를 불러와서 사용하게 될 것입니다. 사용할 때는 아래처럼 사용하면 됩니다.

```
const [data, setData] = useState();

const loadData = () => {
  getForEntity('/user/data', { userId: 1557 })
    .then(response => {
      setData(response);
    })
    .catch(err => {
      console.error("Error!", err);
    })
}
```

`then`과 `catch`를 사용해서 성공했을 경우, 에러가 발생했을 경우를 모두 핸들링해주시면 됩니다!

### 우리 프로젝트에서 테스트하는 법

아주 간단한 서버를 만들어두었습니다. 해당 서버를 구동시킨 후 위에서 소개한 `getForEntity`와 `postForEntity`를 이용해 필요하신 곳에서 사용하시면 됩니다.

서버를 키는 법은, `/server` 폴더로 들어가신 후 `npm run start`를 구동시켜주세요. 그러면 http://localhost:8080 에 서버가 열릴 것입니다.
서버를 킨 후 브라우저에 http://localhost:8000/test 로 접속해보면 NETWORK OK 같은 메세지가 뜨도록 해두었으니, 한 번 확인해보세요!

그리고 MainLayout.jsx에 가시면 제가 만들어둔 간단한 예시도 있으니 확인해보면 좋을 것 같습니다.

여러분한테 요구하는 것은 2가지인데, 접수를 등록하는 것과 접수 내역을 로드하는 것입니다. 자세한건 아래 Task 요구사항을 확인해주세요!

**Task 요구사항**

- 접수 등록하기
  Modal에서 접수하기 버튼 누르면 **POST 요청**으로 `/registers` 주소에 데이터 보내기.
  성공 시 모달 닫기

```
# 보내야 하는 데이터
{
  hospitalName: 문자열,
  registerTime: 문자열(new Date() 를 이용해서 만들 것),
  symptom: 문자열,
  note: 문자열
}

# 성공 시 그냥 아무것도 없는 200 status의 응답이 온다
# 실패 시 status code 500의 에러가 오니, 에러가 올 시 window.alert를 이용해 에러가 발생했다고 표시하기. (랜덤하게 에러가 발생하게 되어있습니다)
```

> 한 가지 더 생각해볼만한 점: POST 요청 중에 또 버튼을 눌렀을 때 한 번 더 접수가 되면 안될텐데, 이는 어떤 UI UX로 해결하는게 좋을까?

- 접수 내역 불러오기

  '내 에약' 페이지에 들어갔을 때 예약 데이터들을 보여줄 수 있어야 한다.
  **GET** 요청으로 `/registers` 주소에 데이터 요청하기

  ```
  딱히 뭐 보낼 건 없고, 그냥 요청하면 접수 내역을 담은 리스트가 옵니다.
  {
  id: number,
  hospitalName: 문자열,
  registerTime: 문자열(new Date() 를 이용해서 만들 것),
  symptom: 문자열,
  note: 문자열
  }
  이 데이터가 리스트로 오니, 이를 바탕으로 리스트 아이템을 UI에 보여주시면 됩니다.
  ```
