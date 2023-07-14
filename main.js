// JSON格式的key值，一定要寫成字串
//引入外部的JSON資料至這個main.js中，
//需要使用非同步的方式「fetch」

let mealList = [];
console.log("抓資料前")
fetch("mealList.json")
    .then(res => res.json())//既定格式，背起來即可，注意.json()的括號為必須
    .then(data => {
        //在這裡處理fetch來的資料
        // console.log("抓完資料了");
        // console.log(data); //確保.then()中的程式碼，一定是確定抓到資料後才執行
        //就算在這裡把data賦值給mealList陣列，在此區塊外還是會顯示是空陣列
        //因為fetch()和其他程式碼的執行環境不同
        //所以需要用到這個data的所有程式碼，
        //都要寫在這裡面

        mealList = data;
        console.log(mealList);

    })
    

// console.log("抓資料後")

//先把各個會需要操作到的元素抓進來
const brunch = document.getElementById("brunch");
const rice = document.getElementById("rice");
const noodle = document.getElementById("noodle");
const buffet = document.getElementById("buffet");
const others = document.getElementById("others");
const result = document.getElementById("result");

const mealTypeArr = [brunch, rice, noodle, buffet, others];

const btn = document.getElementById("btn");

let checkedType = [];
let resultArr = [];
let noRepeatResult = [];

let counter = 0;

//fetch和EventListener在同一個執行環境
//因此在EventListener內可以使用到fetch到的資料
//而且也因為fetch資料速度一定比使用者的速度還快

btn.addEventListener("click", () =>{
    mealTypeArr.forEach(item =>{
        if(item.checked){
            checkedType.push(item.id);
            //把被使用者勾選的類型存進一個新陣列
        }
    });
    
    let noRepeatCheckedType = checkedType.filter((item, index, arr) =>{
        return arr.indexOf(item) === index;
        //避免陣列中有重複的值
    });

    // console.log("使用者選擇的是：");
    // console.log(noRepeatCheckedType);

    // console.log("==========")

    noRepeatCheckedType.forEach(checkedItem =>{
        //針對被選中的每一個類型
        //比較mealList中是否有符合的餐廳
        // console.log(checkedItem)
        mealList.forEach(mealItem =>{
            if(mealItem.category.some(category => category == checkedItem)){
                resultArr.push(mealItem);
                //從mealList中篩選
                //category中具有這些類型的資料
                //存進resultArr

                //可以改用.includes()會更方便
            }
        });
            
        noRepeatResult = resultArr.filter((item, index, arr) =>{
            return arr.indexOf(item) === index;
            //避免陣列中有重複的值
        });
        // console.log(noRepeatResult);
        //接下來對這個陣列做隨機處理
        
    });
    randomMeal();
    counter++;
    if(counter > 10){
        alert("不要再挑啦！吃土算了！");
    }
});

//做隨機處理
function randomMeal(){
    if (noRepeatResult.length != 0){
        const random = Math.floor(Math.random() * noRepeatResult.length);
        // console.log("隨機選出以下結果：")
        console.log(noRepeatResult);
        result.innerText = noRepeatResult[random].name;
    }else{
        const random = Math.floor(Math.random() * mealList.length);
        // console.log(mealList[random].name);
        // console.log("沒勾選任何東西");
        result.innerText = mealList[random].name;
        // console.log("貓貓");
    }
}


