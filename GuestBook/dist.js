"use strict";

var baseURL = "https://toy-server.templ.es/guestbooks/";
var container = document.getElementById('container');

// db에서 방명록 리스트 받아오는 함수
var getData = function getData() {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  fetch(baseURL).then(function (response) {
    return response.json();
  }).then(function (response) {
    // console.log(response);
    console.log("당신! 제 개발자도구를 엿보시는군요!");
    console.log("zz 좋은 하루 보내세요~");

    //response의 시간을 내림차순으로 정렬
    response.sort(function (a, b) {
      return new Date(b.created_at) - new Date(a.created_at);
    });
    response.map(function (data) {
      //data 배열들을 돌면서 요소들 출력
      //wrapper 생성
      var wrapper = document.createElement('div');
      wrapper.classList.add('wrapper'); //클래스 추가

      //이거 밑에 개많은거 DOM으로 리팩토링할까...
      //(1) sheader 생성
      var sheader = document.createElement('div');
      sheader.classList.add('sheader');
      //(1)-1 writer 생성
      var writer = document.createElement('div');
      writer.classList.add('writer');
      writer.innerHTML = "\uD83D\uDC64&nbsp&nbsp&nbsp|&nbsp ".concat(data.writer);
      //(1)-2 date 생성
      var date = document.createElement('div');
      date.classList.add('date');
      var dateObject = new Date(data.created_at); //가공을 위해 내장된 날짜 객체 생성
      var year = dateObject.getFullYear(); // 년도 추출
      var month = dateObject.getMonth() + 1; // 월 추출 (0부터 시작하므로 1을 더함)
      var day = dateObject.getDate(); // 일 추출
      var hour = dateObject.getHours(); // 시 추출
      var minute = dateObject.getMinutes(); // 분 추출
      date.innerHTML = "".concat(year, "/").concat(month, "/").concat(day, "  ").concat(hour, ":").concat(minute);
      //sheader에 추가
      sheader.appendChild(writer);
      sheader.appendChild(date);

      //(2) stitle 생성
      var stitle = document.createElement('div');
      stitle.classList.add('stitle');
      stitle.innerHTML = "<strong>".concat(data.title, "</strong>");

      //(3) scontent 생성
      var scontent = document.createElement('div');
      scontent.classList.add('scontent');
      scontent.innerHTML = "".concat(data.content);

      //(4) sfooter 생성
      var sfooter = document.createElement('div');
      sfooter.classList.add('sfooter');
      //(4)-1 delBtn 생성
      var delBtn = document.createElement('button');
      delBtn.innerHTML = '삭제';
      delBtn.classList.add('delBtn');
      //삭제 버튼 클릭 시 삭제 함수 실행
      delBtn.addEventListener('click', function (e) {
        // 클릭된 버튼의 부모 요소를 찾음 --> 중요!!! 딱 그 버튼 옆의 value를 선택하도록!!!
        var parent = e.target.parentNode;
        var verifyPassword = parent.querySelector('.verifyPassword').value;
        console.log(verifyPassword);
        delData(data.id, verifyPassword);
        parent.querySelector('.verifyPassword').value = ''; //입력 필드 비워주기
      });
      //(4)-2 passwordInput 생성
      var passwordInput = document.createElement('input');
      passwordInput.setAttribute('type', 'password'); //???
      passwordInput.placeholder = '비밀번호';
      passwordInput.classList.add('verifyPassword');
      //sfooter에 추가
      sfooter.appendChild(passwordInput);
      sfooter.appendChild(delBtn);

      //wrapper로 묶기
      wrapper.appendChild(sheader);
      wrapper.appendChild(stitle);
      wrapper.appendChild(scontent);
      wrapper.appendChild(sfooter);

      //최종으로 container에 보내기
      container.appendChild(wrapper);
    });
  });
};

// db에 방명록 추가하는 함수
var postData = function postData() {
  var writerInput = document.getElementById('writerInput');
  var passwordInput = document.getElementById('passwordInput');
  var titleInput = document.getElementById('titleInput');
  // const contentInput = document.getElementById('contentInput');
  var contentInput = document.getElementById('contentInput');
  var writer = writerInput.value;
  var password = passwordInput.value;
  var title = titleInput.value;
  var contentBefore = contentInput.value;
  var content = contentBefore.replace(/\n/g, '<br>'); //개행문자를 <br>로 바꿔줌
  //입력값이 없으면 POST 안 함(예외처리)
  if (writer === '' || password === '' || title === '' || content === '') {
    alert('모든 항목을 입력하세요^^');
    return;
  }
  //게시할건지 알림창
  var confirmed = confirm('게시하시겠습니까?');
  if (!confirmed) {
    return;
  }
  fetch(baseURL, {
    method: 'POST',
    //이거중요!!
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      writer: writer,
      title: title,
      content: content,
      password: password
    })
  }).then(function (response) {
    return response.json();
  }).then(function (response) {
    console.log(response);
    getData();
  });

  //입력 필드 비워주기
  writerInput.value = '';
  passwordInput.value = '';
  titleInput.value = '';
  contentInput.value = '';
};

// db에서 방명록 삭제하는 함수
var delData = function delData(id, password) {
  //다른 거와 다르게 id값 필요함!!    
  var requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: password
    })
  };

  //삭제 전 확인창 띄우기
  var confirmed = confirm('정말 삭제하시겠습니까?');
  if (!confirmed) {
    return;
  }
  fetch(baseURL + id, requestOptions).then(function (response) {
    if (!response.ok) {
      //에러 발생(delete 실패)
      throw new Error('삭제에 실패했습니다.(비밀번호 오류)');
    }
    return response;
  }).then(function (data) {
    //delete 성공
    console.log(data);
    window.location.reload();
  })["catch"](function (error) {
    //delete 실패
    console.error(error);
    alert('비밀번호가 일치하지 않습니다');
  });
};

// 입력한 글의 길이를 체크하여 글자수 제한
var checkLength = function checkLength(element, maxLength, input) {
  if (element.value.length > maxLength) {
    alert("".concat(input, "\uC740 ").concat(maxLength, "\uC790 \uC774\uB0B4\uB85C \uC791\uC131\uD574\uC8FC\uC138\uC694^^"));
    element.value = element.value.substring(0, maxLength);
  }
};

// 글자수 카운트
function updateCounter(input, maxLength) {
  var currentLength = input.value.length;
  var counterElement = document.getElementById('charCounter');
  counterElement.textContent = "".concat(currentLength, "/").concat(maxLength);
  if (currentLength > maxLength) {
    alert("Input exceeds the maximum length of ".concat(maxLength, " characters."));
    input.value = input.value.slice(0, maxLength); // 초과된 부분 잘라내기
    counterElement.textContent = "".concat(maxLength, "/").concat(maxLength);
  }
}
