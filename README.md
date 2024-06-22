# 카페모아
개인 프로젝트: 카페 컬렉션 사이트

# 사용된 기술
- 프런트엔드: React, TypeScript, Redux-Toolkit, React-Query, Styled Components, Axios
- 백엔드: Express.js, MongoDB, Mongoose
인증: Firebase

프로젝트 설명
Cafe More는 사용자가 카페를 검색하고 리뷰할 수 있는 풀스택 애플리케이션입니다. 이 플랫폼은 카페 세부정보 탐색, 프로필 관리, 리뷰 남기기 등 원활한 사용자 경험을 제공합니다.

주요 특징들
• 카페 목록 및 세부 정보: 사용자는 카페 목록을 탐색하고 각 카페에 대한 자세한 정보를 볼 수 있습니다.
사용자 인증: Firebase 인증을 사용하여 사용자 로그인 및 등록을 보호합니다.
리뷰: 로그인한 사용자는 사용자 평가 및 댓글을 포함한 리뷰를 카페에 남길 수 있습니다.
데이터 흐름
프런트엔드(클라이언트 측)
React 구성요소: UI는 React를 사용하여 구축되었습니다. 구성 요소는 데이터를 가져와 사용자에게 표시합니다.
사용자 작업: 사용자는 카페 탐색, 세부 정보 보기, 리뷰 남기기, 프로필 관리 등을 할 수 있습니다.
상태 관리:
Redux 툴킷: 사용자 정보 및 카페 데이터를 포함하여 애플리케이션의 전역 상태를 관리합니다.
React-Query: 데이터 가져오기, 캐싱, 서버와의 동기화를 처리합니다.

백엔드(서버측)
1. 익스프레스 서버: 들어오는 HTTP 요청을 처리하고 API 엔드포인트를 제공합니다.
MongoDB: 카페, 사용자, 리뷰와 관련된 데이터를 저장합니다.
Mongoose: 애플리케이션 데이터 모델링을 위한 스키마 기반 솔루션을 제공합니다.
API 엔드포인트
카페 엔드포인트: 모든 카페 가져오기, 특정 카페의 세부정보 가져오기, 새 카페 추가 및 카페 삭제가 가능합니다.
리뷰 엔드포인트: 특정 카페에 대한 리뷰를 얻고 새로운 리뷰를 추가합니다.
사용자 끝점: 사용자 프로필을 가져오고 프로필을 업데이트합니다.
데이터 통합
Axios: React 구성 요소에서 Express 서버에 대한 API 호출을 만드는 데 사용됩니다.
Firebase: 사용자 인증을 처리하고 데이터베이스에서 사용자를 식별하기 위한 사용자 ID를 제공합니다.
카페 데이터를 가져오는 흐름의 예
사용자 상호작용: 사용자는 카페 목록을 보기 위해 React 프런트엔드와 상호작용합니다.
프런트엔드 요청: React 구성 요소는 Axios를 사용하여 /cafes 엔드포인트에 GET 요청을 보냅니다.
백엔드 처리: Express 서버는 요청을 처리하고 Mongoose를 사용하여 MongoDB를 쿼리한 다음 데이터를 프런트엔드로 다시 보냅니다.
데이터 표시: 프런트엔드는 데이터를 수신하고 상태를 업데이트하며 카페 목록을 표시합니다.
프로젝트 하이라이트
안전한 액세스를 보장하기 위해 Firebase를 사용하여 사용자 인증을 구현했습니다.
효율적인 데이터 가져오기 및 캐싱을 위해 React-Query를 사용하여 서버 부하를 줄이고 성능을 향상시켰습니다.
MongoDB의 강력한 데이터 모델링 및 검증을 위해 Mongoose를 활용했습니다.
스타일 구성 요소를 사용하여 반응성이 뛰어나고 시각적으로 매력적인 UI를 디자인했습니다.




문제 1: TypeScript 컴파일 이슈
문제 상황: TypeScript 파일 실행 시 "Unknown file extension '.ts'" 오류 발생.

해결 방안:

ts-node와 함께 tsconfig.json 설정을 확인하고, 필요한 TypeScript 컴파일러 옵션을 적절하게 설정.
프로젝트의 TypeScript 버전과 ts-node 버전이 호환되는지 확인.

문제 2: 모듈 해석 이슈
문제 상황: 특정 모듈을 찾을 수 없거나, 임포트 시 오류 발생.

해결 방안:

npm install을 실행하여 모든 필요한 패키지와 그 의존성이 올바르게 설치되었는지 확인.
esModuleInterop 및 allowSyntheticDefaultImports 등의 TypeScript 컴파일러 옵션을 사용하여 ES 모듈과 CommonJS 모듈 간 호환성 문제 해결.

문제 3: 포트 충돌
문제 상황: Express 서버 실행 시 "EADDRINUSE: address already in use" 오류로 인해 특정 포트를 사용할 수 없음.

해결 방안:

lsof -i :PORT 명령어를 사용하여 해당 포트를 사용 중인 프로세스 확인.
해당 프로세스를 kill -9 PID 명령어로 종료.
필요시 서버 설정에서 다른 포트 번호를 사용하도록 변경.

문제 4: MongoDB 연결 이슈
문제 상황: mongoose.connect() 호출 시 오류 발생.

해결 방안:

.env 파일 또는 환경 변수에 정의된 MONGO_DB_URI 값이 올바르게 설정되었는지 확인.
useNewUrlParser 및 useUnifiedTopology 옵션은 최신 버전의 Mongoose에서 더 이상 필요하지 않으므로 제거.
일반적인 해결 전략:
환경 설정(.env 파일 및 tsconfig.json)을 주의 깊게 확인하고 올바르게 설정.
의존성 문제가 발생하면 npm install 또는 npm update를 통해 해결.
오류 메시지를 주의 깊게 읽고, 구체적인 해결책을 구글링하거나 공식 문서를 참조.
포트 충돌이나 프로세스 관리 문제는 시스템 수준에서 해결 필요.


+ 카페 컬렉션 사이트에 스타일 있는 메인 페이지 레이아웃을 구현했습니다.
+ 이메일, 비밀번호, 비밀번호 확인 및 닉네임 필드를 포함하여 신규 사용자를 위한 양식으로 등록 페이지를 만들었습니다. 이메일 확인 및 등록 버튼이 추가되었습니다.
+ Google, Facebook, Naver, Kakao의 스타일 컴포넌트를 사용하여 SNS 버튼을 메인 페이지와 등록 페이지 모두에서 사용할 수 있도록 디자인했습니다.
+ 특히 동적 스타일을 위한 소품 전달과 관련된 스타일 구성 요소의 TypeScript 및 스타일 문제를 해결했습니다.

# 발생한 문제
1. 스타일 구성 요소의 TypeScript 오류: 스타일 구성 요소에서 props를 사용할 때 암시적 'any' 유형과 관련된 TypeScript 오류가 발생했습니다. 또한 스타일이 지정된 구성 요소의 속성에서 사용자 정의 속성(bg 및 color)이 인식되지 않는 문제에 직면했습니다.


2. 스타일 구성 요소를 사용하여 동적 요소 스타일링: 배경색 및 텍스트 색상에 대한 소품을 기반으로 SNS 버튼의 스타일을 동적으로 지정하는 방법이 필요했지만 스타일 구성 요소 및 TypeScript를 사용하여 이를 구현하는 데 어려움이 있었습니다.


# 솔루션
1. 스타일 구성 요소의 TypeScript 오류: 스타일 구성 요소에 전달된 모든 소품이 명시적으로 형식화되었는지 확인하여 TypeScript 오류를 해결했습니다. TypeScript가 유형을 올바르게 추론할 수 있도록 props에 대한 인터페이스 정의를 사용하여 암시적 '모든' 유형 오류를 방지합니다.


2. 스타일 구성 요소를 사용하여 동적 요소 스타일 지정: 스타일 구성 요소에서 attrs 생성자를 사용하여 소품을 기반으로 요소를 동적으로 스타일링하는 문제를 해결했습니다. 이를 통해 SNS 버튼의 스타일을 동적으로 지정하기 위해 props를 직접 전달할 수 있었습니다. 'attrs'가 예상대로 작동하지 않는 경우 스타일이 지정된 구성 요소 내에서 조건부 렌더링과 CSS-in-JS 기술을 조합하여 소품을 기반으로 다양한 스타일을 적용했습니다.


1. 서버 설정 및 기본 구성: JSON 구문 분석 및 CORS 처리를 위한 필수 미들웨어가 포함된 Express 서버를 설정하는 것으로 시작했습니다. 또한 Mongoose를 사용하여 MongoDB 데이터베이스에 연결하도록 서버를 구성했습니다.
2. 환경 구성: 'dotenv'를 사용하여 환경 변수를 관리하여 MongoDB 연결 문자열과 같은 민감한 정보가 안전하게 저장되도록 했습니다.
3. 스키마 정의: MongoDB 데이터베이스의 데이터를 구조화하기 위해 카페, 리뷰 및 사용자 프로필에 대한 Mongoose 스키마를 정의했습니다.
4. API 경로 구현:
    * /cafes 엔드포인트를 사용하여 카페를 만들고 검색하는 경로를 구현했습니다.
    * /cafes/:id를 사용하여 특정 카페 세부정보를 검색하는 기능이 추가되었습니다.
5. 	•	사용자 프로필 및 리뷰에 대한 경로를 설정했지만 사용자 ID를 가져오고 리뷰 제출을 설정하는 데 어려움을 겪었습니다.
6. 오류 처리 및 디버깅:
    * 서버 시작 문제, TypeScript 오류, 경로 처리 오류 등 다양한 문제를 해결했습니다.
    * 적절한 TypeScript 컴파일을 보장하기 위해 tsconfig.json의 실수를 수정했습니다.
7. 	•	스키마를 조정하고 프런트엔드가 올바른 데이터 형식을 전송하는지 확인하여 카페 이미지 경로 요구 사항과 관련된 'ValidationError'를 수정했습니다.
8. 우체부 테스트:
    * Postman을 활용하여 API 엔드포인트를 테스트하고 카페 목록과 특정 카페에 대한 세부정보를 성공적으로 검색했습니다.
9. 	•	경로 구성 및 매개변수 처리로 인해 리뷰 제출 및 사용자 프로필 가져오기에 문제가 발생하여 엔드포인트 테스트의 중요성이 강조되었습니다.
10. 코드 리팩토링 및 모듈화:
    * 가독성과 유지관리성을 높이기 위해 경로 정의, 모델, 서버의 주요 진입점을 분리하여 서버 코드를 구성했습니다.


백엔드 개발:


Express.js를 사용하여 카페 컬렉션 애플리케이션의 백엔드 설정을 개선하고 데이터 저장을 위해 MongoDB와 연결했습니다.
카페에 대한 CRUD 작업을 구현하여 새 카페 추가, 카페 세부정보 가져오기, 모든 카페 나열 등의 기능을 활성화했습니다.
라우팅 및 데이터베이스 스키마와 관련된 문제를 해결하여 애플리케이션이 요청을 올바르게 처리하고 의도한 대로 데이터베이스와 상호 작용할 수 있도록 했습니다.

Swagger를 사용한 API 문서:


API 문서화를 위해 Swagger 통합을 시작했습니다. 여기에는 대화형 API 문서를 생성하기 위해 Swagger UI 및 Swagger JSDoc을 설정하는 작업이 포함되었습니다.
카페 경로에 대한 Swagger 주석을 작성하여 모든 카페를 가져오고 새 카페를 추가하는 등 엔드포인트를 자세히 설명했습니다. 이러한 주석에는 요약, 응답 메시지 및 예상 요청 형식이 포함되었습니다.
API의 기본 정보를 정의하고 API 문서에 액세스하기 위한 경로를 설정하는 것을 포함하여 Swagger UI를 시작하고 실행하는 데 필요한 구조와 구성을 살펴보았습니다.

문제 해결 및 디버깅:


모듈 가져오기 및 경로 처리와 관련된 문제, 특히 Swagger 및 Express와의 TypeScript 호환성과 관련된 문제를 해결했습니다.
잘못된 경로 액세스, POST 요청 처리 등 API 테스트 중에 나타나는 오류 디버깅 작업을 진행하셨습니다.
