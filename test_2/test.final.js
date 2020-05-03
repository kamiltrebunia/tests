'use strict';

/* global $, jQuery */
function solution() {
    const URL = "https://www.example.com/"
    let datas = []

    function getContent() {
        let elements = document.getElementsByClassName("comment-list");
        if (elements.length !== 0) {
            for (let i = 0; i < elements.length; i++) {
                datas.push({
                    el: elements[i],
                    count: elements[i].getAttribute("data-count") || 0,
                    loader: null
                })
            }
        }
    }

    function createTextNode(text){
        return document.createTextNode(text);
    }

    function createDiv(attr, text) {
        let element = document.createElement("div");
        let attrElement = document.createAttribute("class")
        attrElement.value = attr
        element.setAttributeNode(attrElement);
        element.appendChild(createTextNode(text));
        return element;
    }

    function removeLoadingElement(listElement) {
        let container = listElement.el
        let loadingElement = listElement.loadingElement;
        if (container.contains(loadingElement)) {
            container.removeChild(loadingElement)
        }
    }

    function addLoadingElement(listElement) {
        let loadingElement = createTextNode("Loading...")
        listElement.loadingElement = loadingElement;
        listElement.el.appendChild(loadingElement);
    }

    function updateContent() {
        for (let i = 0; i < datas.length; i++) {
            addLoadingElement(datas[i]);

            fetch(`${URL}comments?count=${datas[i].count}`)
                .then(response => response.json()).then(res => {
                removeLoadingElement(datas[i]);
                for (let j = 0; j < res.length; j++) {
                    let newElement = document.createElement("div");
                    let attr1 = document.createAttribute("class");
                    attr1.value = "comment-item";
                    newElement.setAttributeNode(attr1);
                    let el1 = createDiv("comment-item__username", res[j].username);
                    let el2 = createDiv("comment-item__message", res[j].message);
                    newElement.appendChild(el1);
                    newElement.appendChild(el2);
                    datas[i].el.appendChild(newElement)
                }
            }).catch(error => {
                removeLoadingElement(datas[i])
            })
        }
    }

    getContent();
    updateContent();
}