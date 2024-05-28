
const baseURL = "https://toy-server.templ.es/guestbooks/";
const container = document.getElementById('container');



// db에서 방명록 리스트 받아오는 함수
const getData = () => {
    while(container.firstChild){ 
        container.removeChild(container.firstChild);
    }

    fetch(baseURL)
    .then((response)=> {
        return response.json();
    })
    .then((response)=> {
        // console.log(response);
        console.log("당신! 제 개발자도구를 엿보시는군요!")
        console.log("zz 좋은 하루 보내세요~")

        //response의 시간을 내림차순으로 정렬
        response.sort((a, b) => {
            return new Date(b.created_at) - new Date(a.created_at);
        })

        response.map((data)=>{ //data 배열들을 돌면서 요소들 출력
            //wrapper 생성
            const wrapper = document.createElement('div');
            wrapper.classList.add('wrapper'); //클래스 추가

            //이거 밑에 개많은거 DOM으로 리팩토링할까...
            //(1) sheader 생성
            const sheader = document.createElement('div');
            sheader.classList.add('sheader');
            //(1)-1 writer 생성
            const writer = document.createElement('div');
            writer.classList.add('writer');
            writer.innerHTML = `👤&nbsp&nbsp&nbsp|&nbsp ${data.writer}`;
            //(1)-2 date 생성
            const date = document.createElement('div');
            date.classList.add('date');
            const dateObject = new Date(data.created_at); //가공을 위해 내장된 날짜 객체 생성
            const year = dateObject.getFullYear(); // 년도 추출
            const month = dateObject.getMonth() + 1; // 월 추출 (0부터 시작하므로 1을 더함)
            const day = dateObject.getDate(); // 일 추출
            const hour = dateObject.getHours(); // 시 추출
            const minute = dateObject.getMinutes(); // 분 추출
            date.innerHTML = `${year}/${month}/${day}  ${hour}:${minute}`; 
            //sheader에 추가
            sheader.appendChild(writer); sheader.appendChild(date);


            //(2) stitle 생성
            const stitle = document.createElement('div');
            stitle.classList.add('stitle');
            stitle.innerHTML = `<strong>${data.title}</strong>`;
            
            //(3) scontent 생성
            const scontent = document.createElement('div');
            scontent.classList.add('scontent');
            scontent.innerHTML = `${data.content}`;

            //(4) sfooter 생성
            const sfooter = document.createElement('div');
            sfooter.classList.add('sfooter');
            //(4)-1 delBtn 생성
            const delBtn = document.createElement('button');
            delBtn.innerHTML = '삭제';
            delBtn.classList.add('delBtn');
            //삭제 버튼 클릭 시 삭제 함수 실행
            delBtn.addEventListener('click', (e)=>{
                // 클릭된 버튼의 부모 요소를 찾음 --> 중요!!! 딱 그 버튼 옆의 value를 선택하도록!!!
                const parent = e.target.parentNode;
                const verifyPassword = parent.querySelector('.verifyPassword').value; 
                console.log(verifyPassword);
                delData(data.id, verifyPassword);
                parent.querySelector('.verifyPassword').value = ''; //입력 필드 비워주기
            })
            //(4)-2 passwordInput 생성
            const passwordInput = document.createElement('input');
            passwordInput.setAttribute('type', 'password'); //???
            passwordInput.placeholder = '비밀번호';
            passwordInput.classList.add('verifyPassword');
            //sfooter에 추가
            sfooter.appendChild(passwordInput); sfooter.appendChild(delBtn); 


            //wrapper로 묶기
            wrapper.appendChild(sheader); 
            wrapper.appendChild(stitle);
            wrapper.appendChild(scontent);
            wrapper.appendChild(sfooter);

            //최종으로 container에 보내기
            container.appendChild(wrapper); 
        })
    })
}

// db에 방명록 추가하는 함수
const postData = () => {

    const writerInput = document.getElementById('writerInput');
    const passwordInput = document.getElementById('passwordInput');
    const titleInput = document.getElementById('titleInput');
    // const contentInput = document.getElementById('contentInput');
    const contentInput = document.getElementById('contentInput');


    const writer = writerInput.value;
    const password = passwordInput.value;
    const title = titleInput.value;
    const contentBefore = contentInput.value;
    const content = contentBefore.replace(/\n/g, '<br>'); //개행문자를 <br>로 바꿔줌
    console.log(writer, password, title, content); //입력값 확인
        //입력값이 없으면 POST 안 함(예외처리)
        if(writer === '' || password === '' || title === '' || content === ''){
            alert('모든 항목을 입력하세요^^');
            return;
        }
    

    fetch(baseURL, {
        method: 'POST', //이거중요!!
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            writer: writer,
            title: title,
            content: content,
            password: password
        })
    })
    .then((response)=> {
        return response.json()
    })
    .then((response)=> {
        console.log(response);
        getData();
    })

    //입력 필드 비워주기
    writerInput.value = '';
    passwordInput.value = '';
    titleInput.value = '';
    contentInput.value = '';
}

// db에서 방명록 삭제하는 함수
const delData = (id, password) => { //다른 거와 다르게 id값 필요함!!    
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: password })
      };
    
      fetch(baseURL+id, requestOptions)
        .then(response => {
          if (!response.ok) { //에러 발생(delete 실패)
            throw new Error('삭제에 실패했습니다.(비밀번호 오류)');
          }
          return response;
        })
        .then(data => { //delete 성공
          console.log(data);
          window.location.reload();
        }) 
        .catch(error => { //delete 실패
          console.error(error);
          alert('비밀번호가 일치하지 않습니다');
        });
    };


// 입력한 글의 길이를 체크하여 글자수 제한
const checkLength = (element, maxLength, input) => {
    if(element.value.length > maxLength){
        alert(`${input}은 ${maxLength}자 이내로 작성해주세요^^`);
        element.value = element.value.substring(0, maxLength);
    }
}

// 글자수 카운트
function updateCounter(input, maxLength) {
    const currentLength = input.value.length;
    const counterElement = document.getElementById('charCounter');
    counterElement.textContent = `${currentLength}/${maxLength}`;

    if (currentLength > maxLength) {
        alert(`Input exceeds the maximum length of ${maxLength} characters.`);
        input.value = input.value.slice(0, maxLength); // 초과된 부분 잘라내기
        counterElement.textContent = `${maxLength}/${maxLength}`;
    }
}