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
            const list = document.createElement('div');
            list.innerHTML = `id : ${data.id} / 
            writer : ${data.writer} / 
            title : ${data.title}`

            container.appendChild(list);
            console.log(data);
        })
    })
}

const postData = () => {
    // const writer = 'writer test!!!'
    // const title = 'title test!!!'
    // const content = 'content test!!!'
    // const password = 'password test!!!'

    // ///////
    const addBtn = document.getElementById('addBtn');
    
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
}

