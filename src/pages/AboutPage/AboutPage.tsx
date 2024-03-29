import React from 'react';
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
      <Title>About Coffee</Title>
      <Section className="history">
        <SectionTitle>커피의 역사</SectionTitle>
        <Paragraph>커피의 역사는 15세기로 거슬러 올라가며, 일부 보고서와 전설에 따르면 그 이전부터 사용되었다고 합니다. 커피의 첫 사용과 관련된 다양한 이야기가 전해져 내려오고 있으며, 가장 유명한 이야기 중 하나는 에티오피아의 한 목동이 자신의 양들이 커피나무의 열매를 먹고 이상하게 활발해진 것을 발견한 것에서 시작됩니다. 이후 목동은 이 열매의 효능을 스승에게 알렸고, 그렇게 해서 커피는 사람들 사이에 퍼지기 시작했습니다.</Paragraph>
        <Paragraph>초기에는 주로 수도승들 사이에서 기도 중에 잠을 쫓기 위해 커피가 사용되었습니다. 15세기에 이르러, 아라비아 반도에서 커피는 종교적인 집회에서의 사용을 넘어 사교의 장으로 자리 잡기 시작했습니다. 이때부터 커피하우스가 등장하며, '정보의 교환소'로써의 역할을 하게 됩니다.</Paragraph>
        </Section>

      <Section className="origins">
        <SectionTitle>커피의 기원</SectionTitle>
        <Paragraph>커피나무는 원래 아프리카와 아시아의 열대 지역에서 자생했습니다. 하지만 오늘날에는 전 세계적으로 70개국 이상에서 재배되고 있습니다. 특히 에티오피아는 커피의 기원지로 여겨지며, 다양한 커피의 종류와 풍미가 이 지역에서 발견됩니다. 커피의 인기가 높아짐에 따라, 커피나무는 전 세계의 다양한 지역으로 전파되었습니다.</Paragraph>
      </Section>

      <Section className="types">
        <SectionTitle>커피의 종류</SectionTitle>
        <Paragraph>오늘날에는 주로 두 가지 커피 종, 아라비카와 로부스타가 재배됩니다. 아라비카 커피는 일반적으로 더 높은 평가를 받으며, 그 풍미가 풍부하고 카페인 함량이 낮은 것으로 알려져 있습니다. 반면, 로부스타 커피는 재배하기 쉽고 카페인 함량이 높으며, 맛이 강하고 쓴맛이 납니다. 이 두 종류 외에도, 여러 가지 희귀 종류의 커피가 세계 곳곳에서 재배되고 있으며, 각각 독특한 풍미와 특성을 가지고 있습니다.</Paragraph>
      </Section>
    </PageContainer>
  );
};

export default AboutPage;
