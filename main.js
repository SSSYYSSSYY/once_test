const mealList = [
    {
        "name": "食在一方",
        "category": ["brunch"],
        "filter": false
    },
    {
        "name": "日十",
        "category": ["brunch"],
        "filter": false
    },
    {
        "name": "鹽行站",
        "category": ["buffet", "rice"],
        "filter": false
    },
    {
        "name": "鍋燒意麵",
        "category": ["noodle"],
        "filter": false
    },
    {
        "name": "炒飯",
        "category": ["rice"],
        "filter": false
    },
    {
        "name": "八方雲集",
        "category": ["others"],
        "filter": false
    },
    {
        "name": "火鍋",
        "category": ["others"],
        "filter": false
    },
    {
        "name": "韓式料理",
        "category": ["rice", "noodle"],
        "filter": false
    },
    {
        "name": "小飯糰大飯糰",
        "category": ["rice"],
        "filter": false
    },
    {
        "name": "後校門滷肉飯",
        "category": ["rice", "noodle"],
        "filter": false
    },
    {
        "name": "魚耶",
        "category": ["brunch", "rice", "noodle"],
        "filter": false
    },
    {
        "name": "吳家鴨香飯",
        "category": ["rice", "noodle"],
        "filter": false
    },
    {
        "name": "施家雞肉飯",
        "category": ["rice"],
        "filter": false
    },
    {
        "name": "黑盤",
        "category": ["rice", "noodle"],
        "filter": false
    },
    {
        "name": "神武拉麵",
        "category": ["noodle"],
        "filter": false
    },
    {
        "name": "森井丼飯",
        "category": ["rice"],
        "filter": false
    },
    {
        "name": "雙醬咖哩",
        "category": ["rice"],
        "filter": false
    },
    {
        "name": "麺や青鈴",
        "category": ["noodle"],
        "filter": false
    },
    {
        "name": "金拱門",
        "category": ["noodle", "rice"],
        "filter": false
    }
];

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
        console.log("貓貓");
    }
}


