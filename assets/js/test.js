const h1 =document.getElementById("h1");
const btn1=document.getElementById("btn");
const btn2=document.getElementById("btn2");
const btn3=document.getElementById("btn3");
// const btn4=document.getElementById("button_unterrichte");
const unterricht=document.getElementById("unterrichte");

const monat= new Date().getMonth()+1;
const jahr=new Date().getUTCFullYear();
const tag=new Date().getDate();
const datum=`${tag}.${monat}.${jahr}`;
const allday=new Date().toLocaleDateString("de");

console.log(allday);
console.log(datum);

// hier machen wir die datum über eine App steuern

const testClick=()=>{

console.log("hallo funtioniert");
btn2.style.display="inline";
btn3.style.display="inline";
btn1.style.display="none";


};


 document.addEventListener("DOMContentLoaded",()=>{

    btn2.style.display="none";
    btn3.style.display="none";

 })
btn1.addEventListener("click",testClick);

btn2.addEventListener("click",()=>{
    window.location.assign("./routing/mitglieder.html");
    console.log("btn2 geht");
})
btn3.addEventListener("click",()=>{
console.log("btn3 geht");
window.location.assign("./routing/mitglieder.html");

})

document.addEventListener("DOMContentLoaded",()=>{
    const unterricht_style=unterricht.style.color="red";
    allday===datum?unterricht.innerHTML=`${allday} Achtung nur Schwestern`:unterricht.innerHTML="Anmelden";
    allday===datum?unterricht_style:unterricht.style.display="black";


})


const fetchprayerTimes=()=>{
    const url=`https://api.aladhan.com/v1/timingsByCity/${tag}-${monat}-${jahr}?city=Minden&country=Germany&method=1`
fetch(url)
.then(res=>res.json())
.then(results=>{

    // length=results.data.length
    // console.log(length)
    var result=""
    result+="Fajr: "+results.data.timings["Fajr"];
    result+=" "+"Dhuhr: "+results.data.timings["Dhuhr"];
    result+=" "+"Asr: "+results.data.timings["Asr"];
    result+=" "+"Maghrib: "+results.data.timings["Maghrib"];
    result+=" "+"Isha: "+results.data.timings["Isha"];
    h1.style.display="inline-block";




    // for(i=0;i<length;i++)
    // {
    //     result+=""+results.data[i].timings["Fajr"]

    // }
h1.innerHTML=result

}).catch(err=>{console.log(err)});



}

fetchprayerTimes();

