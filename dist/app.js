"use strict";
(function () {
    let totalArray = [];
    const container = document.querySelector(".grid-container");
    const totalPrice = document.querySelector(".total-price");
    const clearCartButton = document.querySelector(".clear-cart");
    const wrapperContent = document.querySelector(".wrapper-content");
    async function getData() {
        const response = await fetch("./data.json");
        const data = await response.json();
        data.forEach((el) => {
            totalArray.push(el.price * el.amount);
            const item = creatItem(el.model, el.price, el.amount, el.action, el.image);
            container.appendChild(item);
        });
        totalPrice.innerHTML =
            "$" +
                totalArray
                    .reduce((a, b) => a + b, 0)
                    .toFixed(2)
                    .toString();
        clearCart();
        quantityHandling();
        quantityHandlingCart();
    }
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
        textPrice.innerHTML = "$" + price.toString();
        const removeButton = document.createElement("button");
        removeButton.innerHTML = action;
        removeButton.addEventListener("click", () => {
            totalArray.splice(totalArray.indexOf(price * amount), 1);
            totalPrice.innerHTML = totalArray
                .reduce((a, b) => a + b, 0)
                .toFixed(2)
                .toString();
            gridItem.remove();
            quantityHandlingCart();
        });
        const amountContainer = document.createElement("div");
        amountContainer.classList.add("amount-container");
        const upButton = document.createElement("button");
        upButton.setAttribute("id", "up");
        upButton.innerHTML = "&#10095;";
        const amountSpan = document.createElement("span");
        amountSpan.innerHTML = amount.toString();
        amountSpan.setAttribute("data-price", price.toString());
        amountSpan.classList.add("amount");
        const downButton = document.createElement("button");
        downButton.setAttribute("id", "down");
        downButton.innerHTML = "&#10094;";
        itemImage.appendChild(img);
        itemInfo.append(textModel, textPrice, removeButton);
        amountContainer.append(upButton, amountSpan, downButton);
        gridItem.append(itemImage, itemInfo, amountContainer);
        return gridItem;
    }
    function clearCart() {
        clearCartButton.addEventListener("click", () => {
            totalArray = [];
            wrapperContent.innerHTML = `<p>is currently empty</p>`;
            quantityHandlingCart();
        });
    }
    function quantityHandling() {
        const upButton = document.querySelectorAll("#up");
        const downButton = document.querySelectorAll("#down");
        const amountSpan = document.querySelectorAll(".amount");
        upButton.forEach((el, index) => {
            let priceCurrent = amountSpan[index].dataset.price;
            el.addEventListener("click", () => {
                amountSpan[index].innerHTML = (parseInt(amountSpan[index].innerHTML) + 1).toString();
                if (parseInt(amountSpan[index].innerHTML) > 20) {
                    amountSpan[index].innerHTML = "1";
                }
                totalArray[index] =
                    Number(priceCurrent) * parseInt(amountSpan[index].innerHTML);
                totalPrice.innerHTML = totalArray
                    .reduce((a, b) => a + b, 0)
                    .toFixed(2)
                    .toString();
                quantityHandlingCart();
            });
        });
        downButton.forEach((el, index) => {
            let priceCurrent = amountSpan[index].dataset.price;
            el.addEventListener("click", () => {
                amountSpan[index].innerHTML = (parseInt(amountSpan[index].innerHTML) - 1).toString();
                if (amountSpan[index].innerHTML <= "0") {
                    amountSpan[index].innerHTML = "1";
                }
                totalArray[index] =
                    Number(priceCurrent) * parseInt(amountSpan[index].innerHTML);
                totalPrice.innerHTML = totalArray
                    .reduce((a, b) => a + b, 0)
                    .toFixed(2)
                    .toString();
                quantityHandlingCart();
            });
        });
    }
    function quantityHandlingCart() {
        const headerCartAmount = document.querySelector(".header-cart-amount");
        let sum = 0;
        const amountAll = document.querySelectorAll(".amount");
        amountAll.forEach((el, index) => {
            sum += Number(el.innerHTML);
        });
        headerCartAmount.innerHTML = sum.toString();
    }
    function init() {
        getData();
    }
    return init();
})();
