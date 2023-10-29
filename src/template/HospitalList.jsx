import React, { useState } from 'react';
import styled from 'styled-components';
import Chip from '../components/Chip';
import Colors from '../style/Colors';
import ListItem from '../components/ListItem';

const Container1 = styled.div`
  width: 100%;
  height: 85vh;
  display: flex;
  flex-direction: column; /* 아이템을 세로로 배열 */
  padding: 16px;
  background-color: ${Colors.WHITE100};
  border-radius: 8px;
  align-items: top;
  gap: 16px;

  .title {
    font-family: 'Noto Sans KR Bold';
    font-size: 24px;
  }
`;

const Container2 = styled.div`
  display: flex; /* 가로로 나열하려면 flex 사용 */
  align-items: center; /* 세로 중앙 정렬 */
  justify-content: flex-start; /* 버튼을 가로로 분포 */
`;

const HospitalList = () => {
  const [selectedCondition, setSelectedCondition] = useState('전체');

  const handleChipClick = condition => {
    // 클릭된 Chip 버튼의 상태를 업데이트합니다.
    setSelectedCondition(condition);
  };

  return (
    <Container1>
      <Container2>
        <Chip selected={selectedCondition === '전체'} onClick={() => handleChipClick('전체')} name="전체" />
        <Chip selected={selectedCondition === '내과'} onClick={() => handleChipClick('내과')} name="내과" />
        <Chip
          selected={selectedCondition === '이비인후과'}
          onClick={() => handleChipClick('이비인후과')}
          name="이비인후과"
        />
      </Container2>
      <ListItem type="내과" name="이희찬 내과" time="오늘 09:00 ~ 18:00" region="대전 서구 만년동" patients="3명" />
      <ListItem type="이비인후과" name="구글 이비인후과" time="오늘 휴무" region="대전 서구 월평동" patients="-" />
    </Container1>
  );
};

export default HospitalList;
