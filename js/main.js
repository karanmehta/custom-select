"use strict";

var selectTags = document.querySelectorAll(".custom-select select");

if (selectTags) {
    var selectChange = function selectChange() {
        var selectLabel = this.nextElementSibling;
        var changeDropdown = selectLabel.nextElementSibling;
        selectLabel.innerText = this.options[this.selectedIndex].text;
        if (this.parentNode.classList.contains("select-activated") && changeDropdown.getElementsByClassName('same-as-selected')[0]) {
            changeDropdown.getElementsByClassName('same-as-selected')[0].classList.remove('same-as-selected');
        }
        changeDropdown.getElementsByTagName('div')[this.selectedIndex].classList.add("same-as-selected");
    };

    var generateCustomSelect = function generateCustomSelect(selectTag) {
        var select = selectTag;
        var selectLength = select.options.length;
        var selectParent = selectTag.parentNode;

        var selectedOption = document.createElement("div");
        selectedOption.setAttribute("class", "select-selected");
        selectedOption.innerText = select.options[select.selectedIndex].innerText;
        selectParent.appendChild(selectedOption);

        var selectItems = document.createElement("div");
        selectItems.setAttribute("class", "select-items select-hide");

        var option = void 0;

        for (var ctr = 0; ctr < selectLength; ctr++) {
            option = document.createElement("div");
            option.setAttribute("data-count", ctr);
            option.innerText = select.options[ctr].value;
            selectItems.appendChild(option);
        }

        selectParent.appendChild(selectItems);
        selectParent.classList.add('custom-select-initialized');
    };

    var closeAllSelect = function closeAllSelect(elem) {
        var i = void 0,
            arrNo = [];
        var x = document.getElementsByClassName("select-items");
        var y = document.getElementsByClassName("select-selected");
        var xLen = x.length;
        var yLen = y.length;
        for (i = 0; i < yLen; i++) {
            if (elem == y[i]) {
                arrNo.push(i);
            } else {
                y[i].classList.remove("select-arrow-active");
            }
        }
        for (i = 0; i < xLen; i++) {
            if (arrNo.indexOf(i)) {
                x[i].classList.add("select-hide");
            }
        }
    };

    var selectTagslength = selectTags.length;

    for (var i = 0; i < selectTagslength; i++) {
        generateCustomSelect(selectTags[i]);
        selectTags[i].onchange = selectChange;
    }

    (function toggleDropDown() {
        var dropDown = document.getElementsByClassName("select-selected");
        var dropDownLength = dropDown.length;
        for (var _i = 0; _i < dropDownLength; _i++) {
            dropDown[_i].onclick = function (e) {
                e.stopPropagation();
                closeAllSelect(this);
                this.classList.toggle("select-arrow-active");
                this.nextElementSibling.classList.toggle("select-hide");
            };
        }
    })();

    var event = document.createEvent('HTMLEvents');
    event.initEvent('change', true, false);

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
                this.parentNode.parentElement.firstElementChild.selectedIndex = e.target.dataset.count;
                this.parentNode.parentElement.firstElementChild.options[e.target.dataset.count].setAttribute("selected", "selected");
                this.parentNode.parentElement.firstElementChild.dispatchEvent(event);
            };
        }
    })();

    document.addEventListener("click", closeAllSelect);
}