import React from 'react';
import styled from 'styled-components';
import Colors from '../style/Colors';
import MuiButton from './MuiButton';

const Container = styled.div`
  width: 100%; //or fit-content
  height: 89px;
  display: flex;
  padding: 16px;
  background-color: ${Colors.WHITE100};
  border-radius: 4px;
  align-items: center;
  box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.08);
  gap: 16px;
  justify-content: space-between;

  .title {
    font-family: 'Noto Sans KR Bold';
    font-size: 24px;
  }
`;

const LeftArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  //justify-content: space-between; //이거 왜 작동 안함?

  .title {
    font-family: 'Noto Sans KR Bold';
    font-size: 24px;
  }
`;

const RightArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 4px;

  .title {
    font-family: 'Noto Sans KR Bold';
    font-size: 24px;
  }
`;

const ContainerRow = styled.div`
  display: flex; /* 가로로 나열하려면 flex 사용 */
  justify-content: flex-end;
  gap: 4px;
  //justify-content: flex-start; /* 버튼을 가로로 분포 */
`;

const TypeText = styled.div`
  color: ${Colors.BLACK40};
  font-size: 11px;
  .title {
    font-family: 'Noto Sans';
  }
`;

const NameText = styled.div`
  color: ${Colors.BLACK100};
  font-size: 14px;
  font-weight: bold;
  font-family: 'Arial'; //글꼴이 바뀌는 건지... -> 이건 작동 하는듯
  .title {
    font-family: 'Noto Sans'; //글꼴이 바뀌는 건지...
  }
`;

const TimeText = styled.div`
  color: ${Colors.BLACK80};
  font-size: 11px;
  .title {
    font-family: 'Noto Sans';
  }
`;

const RegionText = styled.div`
  color: ${Colors.BLACK40};
  font-size: 11px;
  .title {
    font-family: 'Noto Sans';
  }
`;

const PatientText1 = styled.div`
  color: ${Colors.BLACK60};
  font-size: 11px;
  .title {
    font-family: 'Noto Sans';
  }
`;

const PatientText2 = styled.div`
  color: ${Colors.BLACK100};
  font-size: 11px;
  font-weight: bold;
  .title {
    font-family: 'Noto Sans';
  }
`;

const ListItem = ({ type, name, time, region, patients }) => {
  // ' | ' 앞부분 띄어쓰기 어케함?
  return (
    <Container>
      <LeftArea>
        <TypeText>{type}</TypeText>
        <NameText>{name}</NameText>
        <ContainerRow>
          <TimeText>{time}</TimeText>
          <RegionText>|</RegionText>
          <RegionText>{region}</RegionText>
        </ContainerRow>
      </LeftArea>
      <RightArea>
        <ContainerRow>
          <PatientText1>대기자 수: </PatientText1>
          <PatientText2> {patients}</PatientText2>
        </ContainerRow>
        <MuiButton />
      </RightArea>
    </Container>
  );
};

export default ListItem;
