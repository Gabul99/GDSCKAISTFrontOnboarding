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

**Task 요구사항**

- 증상 선택 드롭다운은 MUI Select를 이용해서 구현
- 증상은 '콧물', '두통', '복통' 3가지로 제한
- 추가 참고 사항은 MUI TextField를 이용해서 구현
- 접수하기 버튼은 MUI Button을 이용해서 구현
- 접수하기 버튼은 최소 증상을 선택해야 활성화

### Task 2-2. Recoil 이용해 전역 상태 관리 해보기

#### 전역 상태 관리 라이브러리란

#### Recoil이란

**Task 요구사항**

- 접수 내역을 저장하는 Recoil atom 만들기
- 접수 Modal에서 접수하기를 누르면 Recoil로 만든 저장 공간에 접수 내역 추가하는 것 구현
  - 접수 내역은 병원 이름, 앞에 남은 사람, 증상, 추가 참고 사항, 그리고 접수한 시간을 저장한다.

### Task 2-3. Router 이용해 새로운 페이지를 만들고, 내 예약 내역 보기 페이지 만들기

#### Single Page Application, SPA란

#### Router란

**Task 요구사항**

- `router.jsx` 파일에서 `"/my"`로 연결되도록 Routing 추가
- 접수 내역을 저장하고 있는 Recoil atom으로부터 데이터를 받아와 리스트처럼 보여주는 화면 구현
- 취소하기 버튼을 누르면 Recoil atom으로부터 해당 데이터를 삭제하는 것 구현
