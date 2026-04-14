# 더존비즈온 화상영어 수강신청 사이트

더존비즈온 인턴십 프로젝트로 개발한 화상영어 수강신청 시스템의 프론트엔드입니다.

**배포 사이트:** [http://douzonesumin.kro.kr](http://douzonesumin.kro.kr)

---

## 목차

- [개요](#개요)
- [주요 기능](#주요-기능)
- [기술 스택](#기술-스택)
- [설치 및 실행](#설치-및-실행)
- [프로젝트 구조](#프로젝트-구조)

---

## 개요

더존비즈온 인턴십 기간 동안 혼자 설계부터 개발, 배포까지 담당한 프로젝트입니다.

사용자가 직관적으로 영어 강좌를 조회하고 수강신청할 수 있는 웹 기반 플랫폼을 만들었습니다.

**개발 기간:** 2025년 11월 ~ 12월  
**개발자:** SumiNK03

---

## 주요 기능

- **회원 관리** - 회원가입, 로그인, 개인정보 관리
- **강좌 조회** - 영어 강좌 검색 및 상세 정보 확인
- **수강신청** - 원하는 강좌 신청 및 신청 취소
- **일정 관리** - 캘린더로 강의 일정 확인
- **마이페이지** - 신청한 강좌 현황 확인

---

## 기술 스택

**프론트엔드**
- React 19.1.1
- React Router DOM 7.9.4
- Vite 7.1.7

**스타일링**
- Styled Components 6.1.19
- Tailwind CSS 3.4.17

**상태관리 & 통신**
- Axios 1.13.2
- JWT Decode 4.0.0

**추가 라이브러리**
- Framer Motion (애니메이션)
- React Calendar (캘린더)
- date-fns (날짜 처리)

**배포**
- Oracle Cloud (인스턴스)
- 도메인: douzonesumin.kro.kr

---

## 설치 및 실행

### 필수 요구사항
- Node.js v16 이상
- npm 또는 yarn

### 설치
```bash
git clone https://github.com/SumiNK03/douzone_FE.git
cd douzone_FE
npm install
