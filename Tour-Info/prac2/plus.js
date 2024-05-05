const baseURL = "https://apis.data.go.kr/B551011/PhotoGalleryService1";
const urlParams = new URLSearchParams(window.location.search);

const image = urlParams.get("image");
const date = urlParams.get("date");
const year = date.substring(2, 4);
const month = date.substring(4, 6);
const day = date.substring(6, 8);

const photoGrapher = urlParams.get("photoGrapher");
const keyWord = urlParams.get("keyWord");

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

async function getMore(){
    // console.log("getMore테스트입니다");
    const img = document.createElement("img");
    img.src = image;
    const test = document.createElement("test");
    test.innerText = `
    날짜 : ${year}/${month}/${day}
    촬영자 : ${photoGrapher}
    키워드 : ${keyWord}`;
    document.body.appendChild(img);
    document.body.appendChild(test);



    const url = `${baseURL}/galleryList1?numOfRows=${option.numofRows}&MobileApp=${option.MobileApp}&MobileOS=${option.MobileOS}&arrange=${option.arrange}&_type=${option._type}&pageNo=${"1"}&serviceKey=${option.serviceKey}`;
    const fetchData = await fetch(url);
    console.log(fetchData);
}
