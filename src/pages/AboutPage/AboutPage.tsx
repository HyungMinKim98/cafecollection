// src > pages > AboutPage > AboutPage.tsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  font-family: 'Arial', sans-serif;
  padding: 20px;
  color: #333;
`;

const Title = styled.h1`
  color: #007BFF;
`;

const Section = styled.section`
  margin-top: 20px;
`;

const SectionTitle = styled.h2`
  color: #343A40;
`;

const Paragraph = styled.p`
  color: #6C757D;
`;

const AboutPage = () => {
  return (
    <PageContainer>
      <Title>커피에 대하여</Title>
      <Section className="history">
        <SectionTitle>커피의 역사</SectionTitle>
        <Paragraph>커피의 역사는 15세기로 거슬러 올라가며, 일부 보고서와 전설에 따르면 그 이전에도 사용되었다고 합니다. 커피의 첫 사용에 관한 많은 이야기가 있으며, 그 중 가장 유명한 이야기는 에티오피아의 한 목자가 커피나무의 열매를 먹은 후 양들이 이상하게 활력을 되찾는 것을 발견한 것에서 시작됩니다. 이후 목자는 이 열매의 효능을 스승에게 알렸고, 이로써 커피는 사람들 사이에서 퍼지기 시작했습니다.</Paragraph>
        <Paragraph>초기에는 커피가 주로 승려들 사이에서 기도를 할 때 깨어있기 위해 사용되었습니다. 15세기경 아라비아 반도에서는 커피가 종교 모임에서 벗어나 사회적 모임의 장소로 자리잡게 되었습니다. 이 시점부터 커피 하우스가 등장하였고 '정보 교환소' 역할을 하였습니다.</Paragraph>
      </Section>

      <Section className="origins">
        <SectionTitle>커피의 기원</SectionTitle>
        <Paragraph>커피나무는 원래 아프리카와 아시아의 열대 지역에서 자랐습니다. 그러나 오늘날에는 전 세계 70개 이상의 국가에서 재배되고 있습니다. 특히 에티오피아는 커피의 기원으로 간주되며, 이 지역에는 다양한 종류와 맛의 커피가 존재합니다. 커피의 인기가 증가함에 따라 커피나무는 전 세계로 퍼졌습니다.</Paragraph>
      </Section>
    </PageContainer>
  );
};

export default AboutPage;