"use strict";

var selectTags = document.querySelectorAll(".custom-select select");
var selectTagslength = selectTags.length;

for (var i = 0; i < selectTagslength; i++) {
    var select = selectTags[i];
    generateCustomSelect(select);
    select.onchange = selectChange;
}

function selectChange() {
    //let selectedAttr = this.querySelector("option[selected]")
    var selectLabel = this.nextElementSibling;
    var changeDropdown = selectLabel.nextElementSibling;
    selectLabel.innerText = this.options[this.selectedIndex].text;
    if (this.parentNode.classList.contains("select-activated") && changeDropdown.getElementsByClassName('same-as-selected')[0]) {
        changeDropdown.getElementsByClassName('same-as-selected')[0].classList.remove('same-as-selected');
        //selectedAttr && selectedAttr.removeAttribute("selected")
    }
    changeDropdown.getElementsByTagName('div')[this.selectedIndex].classList.add("same-as-selected");
    /* Get updated value on select's change event */
    // console.log(this.options[this.selectedIndex].text);
}

function generateCustomSelect(selectTag) {
    var select = selectTag;
    var selectLength = select.options.length;
    var selectParent = selectTag.parentNode;

    var selectedOption = document.createElement("div");
    selectedOption.setAttribute("class", "select-selected");
    selectedOption.innerText = select.options[select.selectedIndex].innerText;
    selectParent.appendChild(selectedOption);

    var selectItems = document.createElement("div");
    selectItems.setAttribute("class", "select-items select-hide");

    for (var ctr = 0; ctr < selectLength; ctr++) {
        var option = document.createElement("div");
        option.setAttribute("data-count", ctr);
        option.innerText = select.options[ctr].value;
        selectItems.appendChild(option);
    }

    selectParent.appendChild(selectItems);
    selectParent.classList.add('custom-select-initialized');
}

(function toggleDropDown() {
    var dropDown = document.getElementsByClassName("select-selected");
    var dropDownLength = dropDown.length;
    for (var _i = 0; _i < dropDownLength; _i++) {
        dropDown[_i].onclick = function (e) {
            e.stopPropagation();
            this.classList.toggle("select-arrow-active");
            this.nextElementSibling.classList.toggle("select-hide");
        };
    }
})();

(function selectFunctionality() {
    var selectItems = document.querySelectorAll(".select-items div");
    var selectItemsLength = selectItems.length;
    for (var _i2 = 0; _i2 < selectItemsLength; _i2++) {
        selectItems[_i2].onclick = function (e) {
            closeAllSelect(this);
            this.parentNode.classList.add("select-hide");
            this.parentNode.parentNode.classList.add("select-activated");
            var selectedAttr = this.parentNode.parentElement.firstElementChild.querySelector("option[selected]");
            selectedAttr && selectedAttr.removeAttribute("selected");
            this.parentNode.parentElement.firstElementChild.options[e.target.dataset.count].click();
            this.parentNode.parentElement.firstElementChild.options[e.target.dataset.count].setAttribute("selected", "selected");
            this.parentNode.parentElement.firstElementChild.dispatchEvent(new Event("change"));
        };
    }
})();

function closeAllSelect(elem) {
    var x,
        y,
        i,
        arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    for (i = 0; i < y.length; i++) {
        if (elem == y[i]) {
            arrNo.push(i);
        } else {
            y[i].classList.remove("select-arrow-active");
        }
    }
    for (i = 0; i < x.length; i++) {
        if (arrNo.indexOf(i)) {
            x[i].classList.add("select-hide");
        }
    }
}
document.addEventListener("click", closeAllSelect);