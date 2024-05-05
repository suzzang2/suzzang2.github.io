
const baseURL = "https://apis.data.go.kr/B551011/PhotoGalleryService1";
const container = document.getElementById("container");

const option = {
    serviceKey:
      "kGCRQqWYpx3aJwULo87pejlZK8xfahgJrh5QX0hHjg6mxBu7gYlnDt1nsXqLHjteiyq7xTtRnRVs7IzTX6AhFQ%3D%3D",
    numofRows: 5,
    MobileApp: "test",
    MobileOS: "ETC",
    arrange: "A",
    _type: "json",
    pageNo: 1,
  };

let count = -1;

async function getData(){
    const random = Math.floor(Math.random()*100+1);

    //변수 값은 백틱(``) 사용, &로 연결
    const url = `${baseURL}/galleryList1?numOfRows=${option.numofRows}&MobileApp=${option.MobileApp}&MobileOS=${option.MobileOS}&arrange=${option.arrange}&_type=${option._type}&pageNo=${random}&serviceKey=${option.serviceKey}`;

    count ++;
    const fetchData = await fetch(url);
    console.log(fetchData);

    const toJson = await fetchData.json();
    console.log(toJson);

    const datas = await toJson.response.body.items.item;
    console.log(datas);

    //forEach로 datas를 돌면서 하나씩 출력
    datas.map((data, i)=>{
        console.log(data);
        const list = document.createElement("div"); //하나당 하나의 장소
        list.id = 'list';

        const image = document.createElement("img");
        image.src = data.galWebImageUrl;

        const info = document.createElement("span");
        info.innerText = `
        ✔︎ ${i+1 + 5*count}번째
        제목 : ${data.galTitle}
        장소 : ${data.galPhotographyLocation}`

        const button = document.createElement("button");
        button.innerText = "더보기";
        button.addEventListener("click", ()=>{
            const queryString = `image=${data.galWebImageUrl}&date=${data.galCreatedtime}&photoGrapher=${data.galPhotographer}&keyWord=${data.galSearchKeyword}`; 
            window.open(`plus.html?${queryString}`, "_blank");
        })

        list.appendChild(image);
        list.appendChild(info);
        list.appendChild(button);
        
        container.appendChild(list);
    })
}

// async function getMore(){
//     console.log("getMore테스트입니다");

// }