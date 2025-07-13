
const Base_URL ="https://v6.exchangerate-api.com/v6/25ac4989190d10858edec2c9/latest";
const dropdown = document.querySelectorAll(".dropdown select");
const fromCurrency=document.querySelector(".from select");
const toCurrency=document.querySelector(".to select");
let amountChangedByuser=document.querySelector(".message");


for (let select of dropdown){
   for(let currCode in countryList){
   let newOption=document.createElement("option");
   newOption.innerHTML=currCode;
   newOption.value=currCode;
   select.append(newOption);
   if(select.name==="from"  &&  currCode==="USD"){
    newOption.selected="selected";
   }
   else if(select.name==="to"  &&  currCode==="INR"){
    newOption.selected="selected";
}
// console.log(newOption)
  select.addEventListener("change",(event)=>{
    updateFlag(event.target);
    // console.log(event.target)
  });

}
}

function updateFlag(select){
    // console.log(select)
    let flagImg = select.parentElement.querySelector("img");
    flagImg.src=`https://flagsapi.com/${countryList[select.value]}/shiny/64.png`;
}


let convert =document.getElementById("convert");
convert.addEventListener("click",async (event)=>{
   event.preventDefault();
   let amount=document.getElementById("input");
   let amountValue=amount.value;
   if(amountValue==="" || amountValue<0){
    amountValue=1;
    amount.value="1";
   }
//   console.log(amountValue)
// console.log(fromCurrency.value,toCurrency.value)

// console.log(fromCurrency.value)
let conversion_from= `${Base_URL}/${fromCurrency.value}`;
// console.log(conversion_from)
let conversion_to= `${toCurrency.value}`;

let response=await fetch(conversion_from);
let data = await response.json();
// console.log(data);
for(let i of Object.keys(data.conversion_rates)){
    if(i===conversion_to){
        let rate=data.conversion_rates[i];
        let total=(rate*amountValue).toFixed(2);
        // console.log(total);
       amountChangedByuser.innerHTML=`${amountValue} ${fromCurrency.value} = ${total} ${toCurrency.value}`;
}
 

}})
