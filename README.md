# homepage
<br>

### Table of Contents
[1.Summary](#summary) <br/>
[2.System & ERD](#system--erd) <br/>
[3.ScreenShot](#screenshot) <br/>
[4.Installation](#installation) <br/>
[5.Development setup](#development-setup) 
<br/><br/><br/>

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




## System & ERD
![System Architecture](https://github.com/kwakjaeyoon/homepage/assets/61172855/a622b665-23be-4a23-a782-45559e03a448)
![ERD](https://github.com/kwakjaeyoon/homepage/assets/61172855/be987d9a-28af-410a-b8dc-5fe096081626)

<br/><br/><br/>


## ScreenShot
### **1. 초기화면**

 로그인 없이 누구나 접속 가능하며, 연구실 수상 내역 및 위치 등을 확인할 수 있다.

![image](https://github.com/kwakjaeyoon/homepage/assets/61172855/1c397763-4adb-46b9-a22d-fda1fb63c655)


### 2. 권한 없이 게시판 접속 시도

 내부 구성원이 아닌 사용자가 게시판 접속 시도 시, 다음과 같이 팝업이 뜨며 로그인 페이지로 이동한다.
 ![image](https://github.com/kwakjaeyoon/homepage/assets/61172855/d9298fa7-323a-434a-ba11-951a54d739be) |![image2](https://github.com/kwakjaeyoon/homepage/assets/61172855/84644cb0-1d5e-4e7f-9046-2079f4651fa8)
--- | --- | 




### 3. 게시판 초기 화면

 로그인 완료 후 게시판 접속 시 다음과 같이 게시물을 확인할 수 있다. 목록별로 확인하고자 하는 경우 category를 클릭하여 원하는 목록의 게시물만 선택할 수 있다.

![image](https://github.com/kwakjaeyoon/homepage/assets/61172855/b68f7072-9261-4d37-9102-250425f60e1a)

![image](https://github.com/kwakjaeyoon/homepage/assets/61172855/172dec46-8e82-4d9a-a438-ac5f6406dd97)


### 4. 게시물 작성

위의 게시물 작성 버튼을 누르면 화면과 같이 게시물 작성 페이지로 이동한다. 게시물 작성 및 목록 선택하여 글을 작성할 수 있으며, 파일 공유가 필요할 경우 파일 선택 또한 가능하다.

![image](https://github.com/kwakjaeyoon/homepage/assets/61172855/1fe7f518-1234-4f33-acc6-e64166eee2dc)


### 5. 게시물 확인

3번의 화면에서 제목을 클릭하게 되면 아래와 같이 게시물 조회가 가능하다. 이 화면에서 파일을 클릭할 경우 파일을 다운로드 할 수 있다.

![image](https://github.com/kwakjaeyoon/homepage/assets/61172855/893ac98a-059f-4678-9393-ee2050a8b241)


### 6. 댓글 작성

 5번의 화면에서 댓글란에 게시물에 대한 댓글을 작성할 수 있다. 댓글 작성 후 아래와 같이 댓글이 보여진다.

![image](https://github.com/kwakjaeyoon/homepage/assets/61172855/222fa104-525f-435a-a147-34f5f2a97291)


### 7.  게시물 수정

 5번의 화면에서 게시물 수정을 클릭하면 다음과 같이 게시물 수정을 진행할 수 있다. 수정이 완료되면 아래와 같이 적용된 것을 확인할 수 있다.

![image](https://github.com/kwakjaeyoon/homepage/assets/61172855/668d381b-e59e-4976-990f-cecadd8bf76a)

![image](https://github.com/kwakjaeyoon/homepage/assets/61172855/46879088-f7be-4a7b-956f-944a8ceb0b34)


### 8. 게시물 검색

 필요한 게시물을 찾고자 하는 경우 게시물 검색을 통해 필요한 게시물만 따로 찾을 수 있다. 다만 이 프로젝트에서는 제목이 정확하게 일치한 경우에만 검색이 가능하도록 구현하였다.

![image](https://github.com/kwakjaeyoon/homepage/assets/61172855/caaabf4f-5157-4b6b-80fa-21f5afca2311)


### 9. 로그아웃

 화면 우측 상단의 로그아웃 버튼을 누르게 되면 다음과 같이 팝업창이 뜨고 초기화면으로 돌아간다.

![image](https://github.com/kwakjaeyoon/homepage/assets/61172855/753031d1-6865-4e08-b694-58147aa34055)


### 10. 권한 없이 관리자 페이지 접속 시도

 관리자 권한이 없는 사용자가 관리자 페이지에 접근하는 경우 다음과 같이 팝업창이 뜨고 초기화면으로 이동한다.

![image](https://github.com/kwakjaeyoon/homepage/assets/61172855/4e2cfc5d-75d5-42e2-adaf-e6c051ff2b27)


### 11. 관리자 페이지

 관리자 페이지를 통해 사용자 및 게시물과 댓글, 목록 관리를 할 수 있다. 사용자와 목록은 추가 및 삭제가 가능하며, 게시물과 댓글은 삭제만 가능하다.

![image](https://github.com/kwakjaeyoon/homepage/assets/61172855/b24ef3c8-688a-421e-b3dc-3552c005be2c)
 ![image](https://github.com/kwakjaeyoon/homepage/assets/61172855/049e8527-fb9d-42ae-a965-6d8c065c2aca) |![image2](https://github.com/kwakjaeyoon/homepage/assets/61172855/08639a37-d26c-4ba5-a0ed-15898b86408e)
--- | --- | 

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



