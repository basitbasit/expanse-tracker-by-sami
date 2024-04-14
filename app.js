const balance = document.getElementById("balance")
const moneyPlus = document.getElementById("money-plus")
const moneyMinus = document.getElementById("money-minus")
const list = document.getElementById("list")
const form = document.getElementById("form")
const text = document.getElementById("text")
const amount = document.getElementById("amount")




const localStorageTransections = JSON.parse(localStorage.getItem("transections"))
let transections = localStorage.getItem("transections") !== null ? localStorageTransections : [];

function addTransection(e) {
    e.preventDefault();
    if (text.value.trim() === "" || amount.value.trim() === "") {
        alert("enter your value")
    } else {
        const transection = {
            id: generateID(),
            text: text.value,
            amount: +amount.value,
        };
        transections.push(transection)
        addTransectionDOM(transection)
        updateLocalStorage()
        updateValues()
        text.value = ""
        amount.value = ""
    }
}

function generateID() {
    return Math.floor(Math.random() * 100000000)
}

function addTransectionDOM(transection) {
    const sign = transection.amount < 0 ? "-" : "+";
    const item = document.createElement('li')

    item.classList.add(
        transection.amount < 0 ? "minus" : "plus"
    )
    item.innerHTML = `
    ${transection.text}<span>${sign}${Math.abs(transection.amount)}</span>
    <button class="delete-btn" onclick="removeTransection(${transection.id})">X</button>
    `
    list.appendChild(item)


}
function removeTransection(id) {
    transections = transections.filter(transection => transection.id !== id)
    Init();
    updateLocalStorage()
}
function updateValues() {
    const amounts = transections.map(transection => transection.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
    const expense = (
        amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1
    ).toFixed(2)
    balance.innerText = `$${total}`;
    moneyPlus.innerText = `$${income}`;
    moneyMinus.innerText = `$${expense}`;
}
function updateLocalStorage() {
    localStorage.setItem(
        "transections", JSON.stringify(transections)
    )
}
function Init() {
    list.innerHTML = "";
    transections.forEach(addTransectionDOM);
    updateValues()

}
Init();

form.addEventListener("submit", addTransection)






