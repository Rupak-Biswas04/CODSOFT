const clr = document.querySelector(".clear");
const digits = document.querySelectorAll(".opr");
const exp = document.querySelector(".exp");
const res = document.querySelector(".res");
const back = document.querySelector(".remove");
let a, b, c, lenA, totLen = 0;
let operator;
let num="";
let expression="";
let isErased = false;

digits.forEach((opr)=>{
    opr.addEventListener("click", (evt)=>{
        let symb = evt.target.innerText;
        if(symb === "+" || symb === "-" || symb === "x" || symb === "/" || symb === "%"){
            if(isErased === false) {
                a = Number(num);
                lenA = num.length;
            }
            if(totLen <= lenA && isErased === true) {
                a = Number(expression);
                lenA = totLen;
                isErased = false;
            }
            num = "";
            operator = symb;
            expression += operator;
        } 
        else if (symb === "="){
            b = Number(num);
            num = "";
            c = operations(a, b, operator);
            exp.style.visibility = "visible";
            exp.innerText = `${expression}`;
            res.innerText = `${c}`;
            return;
        } 
        else {
            num += symb;
            expression += symb;
        }
        totLen++;
        res.innerText = `${expression}`;
    });
});

function operations(a, b, operator){
    let result=0;
    switch(operator){
        case "+":
            result = a+b;
            break;
        case "-":
            result = a-b;
            break; 
        case "x":
            result = a*b;
            break;
        case "/":
            if(b === 0){
                return undefined;
            }
            result = a/b;
            result = Math.round(result * 1e6) / 1e6;
            break;
        case "%":
            if(b === 0){
                return undefined;
            }
            result = a%b;
            break;
        default:
            alert("Wrong Choice!");
    }
    return result;
};

clr.addEventListener("click", ()=>{
    a = 0, b = 0, totLen = 0;
    num = "";
    expression = "";
    isErased = false;
    res.innerText="0";
    exp.style.visibility = "hidden";
});

back.addEventListener("click", ()=>{
    num = num.slice(0, -1);
    expression = expression.slice(0, -1);
    isErased = true;
    totLen--;

    res.innerText=`${expression}`;
    if(expression === ""){
        res.innerText="0";
    }
});