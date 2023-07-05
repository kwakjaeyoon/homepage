# homepage
<br>

## Summary

### 1. Goal

- 연구실PR 및 내부 구성원 간 문서 및 파일의 공유를 위해 제작
- 게시판 기능 구현을 통한 웹 개발 기본기 학습을 위함.

### 2. About Project

- 권한이 없는 접근자는 연구실 연혁, 연구실 관련 정보만 열람 가능
- 권한이 있는 일반 사용자는 게시물 작성 및 파일 업로드, 게시물 조회, 댓글 달기, 파일 조회 및 다운로드 가능
- 관리자 권한이 있는 사용자는 관리자 페이지를 통해 사용자, 게시물 및 댓글, 목록의 관리가 가능
- 로그인 통해 권한 있는지 여부 확인, 인증은 express-session을 이용, SHA-256을 통해 암호화

### 3. Stacks

- HTML5, CSS3, Bootstrap
- Node.js (express, ejs), MySQL, Docker

<br/><br/><br/>




## Architecture & ERD
![System Architecture](https://github.com/kwakjaeyoon/homepage/assets/61172855/a622b665-23be-4a23-a782-45559e03a448)
![ERD](https://github.com/kwakjaeyoon/homepage/assets/61172855/be987d9a-28af-410a-b8dc-5fe096081626)

<br/><br/><br/>








## Installation


```sh
curl -fsSL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt i nodejs
sudo apt i npm
```
<br/><br/><br/>


## Development setup

테스트 이전에 package.json 다음과 같이 변경
```json
"scripts": {
    "start": "nodemon app.js",
    "test": "node app.js"
  }
```
test:
```sh
npm run test
```

production:
```sh
npm start
```



