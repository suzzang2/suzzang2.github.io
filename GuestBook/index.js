const baseURL = "http://server.templ.es:8000/guestbooks/";
const container = document.getElementById('container');


// async function getGuestbooks(){
//   const fetchData = await fetch(baseURL);
//     console.log("<response>");
//     console.log(fetchData);

//   const data = await fetchData.json();
//   console.log("<json>");
//     console.log(data);

// }

// db에서 방명록 리스트 받아오는 함수
const getData = () => {
    while(container.firstChild){ 
        container.removeChild(container.firstChild);
    }

    fetch(baseURL)
    .then((response)=> {
        return response.json()
    })
    .then((response)=> {
        console.log(response)
        // console.log(response.frontend)
        // const datas = response.frontend

        response.map((data)=>{
            //전체 묶음 생성
            const wrapper = document.createElement('div');
            wrapper.classList.add('wrapper'); //클래스 추가

            //sentence 요소 생성
            const list = document.createElement('div');
            list.classList.add('sentence');
            list.innerHTML = `작성자 : ${data.writer} | 
            제목 : ${data.title} | 
            내용 : ${data.content}`

            //삭제 버튼 요소 생성
            const delBtn = document.createElement('button');
            delBtn.innerHTML = '삭제';
            delBtn.classList.add('delBtn');
            //삭제 버튼 클릭 시 삭제 함수 실행
            delBtn.addEventListener('click', (e)=>{
                //근데 이제 verifyPassword가 일치해야 삭제되게 해야 함
                console.log("삭제버트클릭됨");

                // 클릭된 버튼의 부모 요소를 찾음 --> 중요!!! 딱 그 버튼 옆의 value를 선택하도록!!!
                const parent = e.target.parentNode;
                const verifyPassword = parent.querySelector('.verifyPassword').value; 
                console.log(verifyPassword);
                // if(verifyPassword !== data.password){
                //     alert('비밀번호가 일치하지 않습니다');
                //     return;
                // }
                // else{
                //     delData(data.id);
                // }
                delData(data.id, verifyPassword);
                parent.querySelector('.verifyPassword').value = ''; //입력 필드 비워주기
            })

            //비밀번호 입력칸 생성
            const passwordInput = document.createElement('input');
            passwordInput.setAttribute('type', 'password'); //???
            passwordInput.classList.add('verifyPassword');
            passwordInput.placeholder = '비밀번호';

            wrapper.appendChild(list); //이렇게 한 묶음으로 보내서, 
            wrapper.appendChild(delBtn);
            wrapper.appendChild(passwordInput);

            container.appendChild(wrapper); //최종으로 container에 보내기
            console.log(data);
        })
    })
}

// db에 방명록 추가하는 함수
const postData = () => {

    const writerInput = document.getElementById('writerInput');
    const passwordInput = document.getElementById('passwordInput');
    const titleInput = document.getElementById('titleInput');
    const contentInput = document.getElementById('contentInput');


        // if (input.value === '') {
        //     window.alert('할 일을 입력해주세요!');
        //     return; //입력값이 없으면 목록 추가 안 함(예외처리)
        // }
        const writer = writerInput.value;
        const password = passwordInput.value;
        const title = titleInput.value;
        const content = contentInput.value;
        console.log(writer, password, title, content); //입력값 확인

    

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
    // fetch(baseURL + id, {
    //     method: 'DELETE'
    // })
    // .then((response)=> {
    //     return response.json()
    // })
    // .then((response)=> {
    //     console.log(response);
    //     getData();
    // })

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

