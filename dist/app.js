"use strict";
let totalArray = [];
const container = document.querySelector(".grid-container");
const totalPrice = document.querySelector(".total-price");
async function getData() {
    const response = await fetch("./data.json");
    const data = await response.json();
    data.forEach((el) => {
        totalArray.push(el.price * el.amount);
        const item = creatItem(el.model, el.price, el.amount, el.action, el.image);
        container.appendChild(item);
    });
    totalPrice.innerHTML = '$' + totalArray.reduce((a, b) => a + b, 0).toFixed(2).toString();
}
getData();
function creatItem(model, price, amount, action, image) {
    const gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");
    const itemImage = document.createElement("div");
    itemImage.classList.add("item-image");
    const img = document.createElement("img");
    img.src = image;
    img.alt = model.toString();
    const itemInfo = document.createElement("div");
    itemInfo.classList.add("item-info");
    const textModel = document.createElement("p");
    textModel.innerHTML = model;
    const textPrice = document.createElement("p");
    textPrice.innerHTML = '$' + price.toString();
    const removeButton = document.createElement("button");
    removeButton.innerHTML = action;
    removeButton.addEventListener("click", () => {
        totalArray.splice(totalArray.indexOf(price * amount), 1);
        totalPrice.innerHTML = totalArray.reduce((a, b) => a + b, 0).toFixed(2).toString();
        gridItem.remove();
    });
    const amountContainer = document.createElement("div");
    amountContainer.classList.add("amount-container");
    const upButton = document.createElement("button");
    upButton.innerHTML = "&#10095;";
    const amountSpan = document.createElement("span");
    amountSpan.innerHTML = amount.toString();
    amountSpan.classList.add("amount");
    const downButton = document.createElement("button");
    downButton.innerHTML = "&#10094;";
    itemImage.appendChild(img);
    itemInfo.append(textModel, textPrice, removeButton);
    amountContainer.append(upButton, amountSpan, downButton);
    gridItem.append(itemImage, itemInfo, amountContainer);
    return gridItem;
}
