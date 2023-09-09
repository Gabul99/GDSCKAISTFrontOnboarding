# GDSC Front-end Onboarding Project

> GDSC 프론트엔드 팀에 오신 것을 환영합니다!

이 프로젝트는 React 프론트엔드에 대한 경험이 그닥 풍부하지 못하신 신입 팀원 분들께 React 프로젝트 경험을 제공하고 GDSC 팀에서 일하는 방식에 익숙해실 수 있도록 돕기 위해 만들어졌습니다.
이를 통해 여러분께 도움이 될 것으로 기대하는 점은 아래와 같습니다.

이 프로젝트는 총 4개의 Step으로 진행될 예정이며, 간단한 '병원 접수' 컨셉의 애플리케이션을 조금씩 개발하고 바꿔가면서 연습해보려고 합니다.
Task 진행은 아래와 같습니다.

- **Task 0. 프로젝트 초기 세팅**
  - VSCode 세팅
  - 초기 프로젝트 세팅
  - 폴더링, 스타일링 등 간단한 규칙 알아보기
- **Task 1. View 만들기**
  - CSS 이용해 레이아웃 및 디자인 하기 - Flexbox에 대해 알아보기
  - 컴포넌트화하기
- **Task 2. 상태 관리와 Routing**
  - 데이터를 입력 받는 Modal Form 만들기
  - React Hooks와 useState와 useEffect 사용하기
  - Recoil을 이용해 전역 상태 관리 만들기
  - Router를 이용해 화면 끼리의 Navigating 만들기
- **Task 3. 서버와 통신하기**
  - 비동기에 대해 이해하기
  - GET, POST API 이용 방법 알아보기
  - API 사용해 추가 기능 만들기

Task 1, 2, 3의 경우 진행 후 시니어와의 코드 리뷰가 진행될 예정입니다!

## Task 0. 프로젝트 초기 세팅

> 만약 JavaScript에 익숙하지 않아서 걱정된다면, 우선 [벨로퍼트 자바스크립트](https://learnjs.vlpt.us/)에서 최소 1장과 2장을 읽고 오시면 도움이 될 것입니다!

### npm Package 다운로드

#### npm이란?

npm은 node package manager로, Node.js 개발 환경의 기본 패키지 관리자입니다.
여기서 말하는 패키지는 여러 라이브러리, 프레임워크 같은 코드를 말합니다. 즉 우리가 만든게 아니라 따로 다운받는 라이브러리들을 관리하는 소프트웨어라고 생각하시면 됩니다.
JS 기반 프로젝트는 거의 `node_modules` 라는 폴더를 가지고 있는데, 이는 npm을 통해 다운받은 다른 라이브러리에 대한 데이터가 들어있는 폴더입니다. 여기에는 React도 포함되고, styled-components, MUI, babel, eslint 등 코드 작업을 위한 굉장히 많은 코드들이 들어있습니다. 실제로 열어보면 깜짝 놀랍니다. 이런 외부 코드들은 서로 버전 관리가 꼬이거나 하는 경우가 있어서 직접 체크하기 힘들기에, npm이나 yarn 같은 도구를 사용해서 관리하는 편입니다.
우리의 웹 프로젝트를 구동시키려면 이 다운받은 라이브러리를 가져와서 연결시키는 빌드 과정이 필요합니다. 따라서 프로젝트 테스트, 빌드 등도 npm을 통해 Node.js로 구동시키게 됩니다.

#### package.json

package.json은 npm을 사용하는 프로젝트에는 반드시 있어야 하는 파일으로, 어떤 외부 패키지를 사용하고 있는지, 이 프로젝트의 정보는 무엇인지, 이 프로젝트에는 어떤 메서드들이 있는지 정보를 담고 있습니다.
package.json을 파일을 확인하면 코드를 어떻게 실행시킬지, 코드에 어떤 라이브러리들이 사용되고 있는지 확인할 수 있습니다. dependencies 를 보면 라이브러리들과 그 버전을, scripts 를 보면 npm run ~~ 로 쓸 수 있는 메서드를 확인할 수 있습니다.

#### (필수) Package 설치하기

아까 `node_modules` 라는 폴더가 있다고 했었는데, clone 받은 레포지토리에는 `node_modules` 폴더가 없을 것입니다. 왜냐면 온갖 코드가 다 들어있기 때문에 너무 무거워서 굳이 github에는 올리지 않기 때문인데요.
어차피 레포지토리 안에는 package.json, package-lock.json 파일이 있기 때문에 `node_modules` 가 없더라도 다른 팀원과 똑같은 환경을 구성할 수 있습니다.
따라서 **명령 프롬포트나 Terminal에서 `npm install` 을 한 번 구동**해주세요.
그러면 필요로 하는 라이브러리가 전부 설치가 될 것이고 `node_modules` 폴더가 생길겁니다.
차후 만약 다른 사람이 추가적인 라이브러리를 설치하거나 삭제해 변동이 생겼을 때도 다른 사람은 `npm install` 을 이용하면 됩니다.

### VSCode, ESLint, Prettier 설정

#### ESLint, Prettier란?

하나의 코드 베이스에서 협업을 할 때, 코드의 스타일은 가급적이면 같은 것이 좋습니다.
원래 사람마다 코드를 작성하는 법은 다 다릅니다. 누군가는 `{abc}` 로, 누군가는 `{ abc }` 로 작성하기도 합니다. 컴포넌트의 Props를 위한 `interface Props` 를 만들 때 컴포넌트 위에 작성하는 사람도 있고, 컴포넌트 아래에 작성하는 사람도 있습니다.
본인이 작성한 코드를 본인만 볼 때는 괜찮겠지만, 협업 상황에서는 자신의 코드 뿐만이 아니라 다른 코드도 확인하게 됩니다. 자신의 코드를 다른 동료가 확인하면서 개발을 해야 할 수도 있고, 동료의 코드에서 생긴 버그를 내가 급하게 고쳐야 하는 상황이 올 수도 있습니다. 그때마다 자신과 다른 스타일의 코드에 당황하면서 파악에 어려움을 겪으면 문제가 생깁니다.

따라서 **한 코드 베이스에서는 코드 스타일을 어느정도 비슷하게 가져가야 전반적인 생산성이 높아집니다**.

ESLint와 Prettier는 이를 도와줍니다.
**ESLint**는 JavaScript(TypeScript)의 코드 스타일을 확인해주는 역할을 합니다. 예를 들어 동등 비교(`==` )가 아닌 일치 비교(`===` )를 사용하고 있는지, 선언 이후 변하지 않는 상수인데 `let` 이나 `var` 를 사용하고 있지는 않은지 체크해줍니다. ESLint에서 제공하는 Rule은 굉장히 많습니다. 그걸 하나하나 다 설정하기엔 어렵기 때문에 흔히 airbnb에서 제공하는 ESLint 스타일을 가져와서 조금씩 고쳐쓰는 편입니다.
**Prettier**는 JavaScript의 코드를 분석하기보다는 파일 내 코드 형식을 신경쓰는 역할을 합니다. 주로 indentation이 2칸인지 4칸인지, 라인 마지막에 세미콜론(;)을 붙일지, 띄어쓰기는 어떻게 할지 등을 체크해줍니다. 주로 Prettier는 파일을 저장할 때마다 자동으로 적용되도록 만드는 편입니다.
우리 레포지토리에도 기본적인 ESLint와 Prettier를 도입하려고 하며, 아래는 여러분이 VSCode에서 이를 잘 활용할 수 있도록 돕는 내용을 담고 있습니다.

#### (필수) 처음 레포지토리를 Clone 받아서 초기 설정하는 경우

1. VSCode Extenstion에서 ESLint와 Prettier를 설치
2. (이미 하긴 했겠지만) 터미널에서 `npm install` 을 한 번 돌려준다.
   1. 이 과정을 하는 이유는 package.json에 있는 라이브러리, 플러그인을 한 번 싹 다운 받기 위함.
3. VSCode에서 F1 키를 눌러서 나오는 입력창에 Open User Settings(JSON)을 검색해서 JSON 파일을 연 다음, 아래에 있는 내용을 넣어준다.
   1. 아래 내용을 넣으면 포커스가 IDE가 아닌 **다른 창으로 갈 때마다 자동 저장이 되며, 저장될 때마다 Prettier가 format을 정리**해준다.

```jsx
{
    "files.autoSave": "onWindowChange",
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true,
    },
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "[typescriptreact]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[typescript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "editor.tabSize": 2
}
```

4. 이러고나서 VSCode를 한 번 껏다 키거나 하면 적용될 것.
5. 코드에 빨간 색 에러 표시나 노란색 워닝 표시가 나올 수 있는데, 특별한거 아니면 무시해도 되고, 에러 표시의 경우 한번 확인해보고 굳이 안해도 되는 규칙이면 제외하면 되니까 시니어에게 물어볼 것.

#### 체크하기

모든 세팅을 완료한 후 `npm run start` 를 입력해 애플리케이션이 에러 없이 잘 구동되는지 확인해주세요!

### (필수) 코드 작성 요령

이는 [미리 작성해둔 문서](https://www.notion.so/kaist-students/Convention-9a33e229a9db415194e3ad2fc8460b2e?pvs=4)로 대체합니다! 확인하실 수 없을 시 GDSC KAIST 노션 권한을 확인해주세요.
이 문서까지 한 번 쭉 읽고 돌아오시면 되겠습니다.

## Task 1으로.

세팅이 완료되었으면 이제 Task 1으로 가겠습니다.
여기서 `git checkout task1` 명령어를 통해 task1 브랜치로 이동한 후, 그쪽에 있는 README.md 파일의 가이드에 따라 Task를 진행해주세요!
