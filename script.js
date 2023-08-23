const itemForm = document.querySelector("#item-form");
const itemInput = document.querySelector("#item-input");
const itemList = document.querySelector("#item-list");
const clearBtn = document.querySelector("#clear");
const filterInput = document.querySelector("#filter");
const formBtn = itemForm.querySelector("button");
const toggleLight = document.querySelector("#toggle-light");
const toggleNight = document.querySelector("#toggle-night");

let isEditMode = false;

function addItem(e) {
  e.preventDefault();

  const newItem = itemInput.value;

  //validate input
  if (newItem === "") {
    alert("Please add an item");
    return;
  }

  //check for edit-mode
  if (isEditMode === true) {
    const itemToEdit = itemList.querySelector(".edit-mode");
    itemToEdit.classList.remove("edit-mode");
    itemToEdit.remove();
    isEditMode = false;
    formBtn.innerHTML = `<i class="fa-solid fa-plus"></i> Add Item`;
    formBtn.style.backgroundColor = "#333";
  }

  if (checkDuplicate(newItem)) {
    return alert("duplicate item");
  } else {
    //CREATE LIST ITEM
    const li = document.createElement("li");

    li.appendChild(document.createTextNode(newItem));

    const button = createButton("remove-item btn-link text-red");
    li.appendChild(button);

    function createIcon(classes) {
      const icon = document.createElement("i");
      icon.className = classes;
      return icon;
    }

    function createButton(classes) {
      const button = document.createElement("button");
      button.className = classes;
      const icon = createIcon("fa-solid fa-xmark");
      button.appendChild(icon);
      return button;
    }

    //append new list to DOM
    itemList.appendChild(li);
    itemInput.value = "";
  }

  //clears input after adding
  checkUI();
}

//Removing items
function removeItem(e) {
  //alorithm to show if d parent element has a class called remove-item
  if (e.target.parentElement.classList.contains("remove-item")) {
    //if it has, delete the parent of the parent
    if (
      confirm(
        `Are you sure you want to delete ${e.target.parentElement.parentElement.innerText} ?`
      )
    ) {
      e.target.parentElement.parentElement.remove();
    }
  } else {
    setItemToEdit(e.target);
  }
  checkUI();
}

function setItemToEdit(item) {
  isEditMode = true;

  //remove all edit-mode at each call
  itemList.querySelectorAll("li").forEach((item) => {
    item.classList.remove("edit-mode");
  });

  //adds edit-mode
  item.classList.add("edit-mode");
  formBtn.innerHTML = `<i class="fa-solid fa-pen"></i> Update Item`;
  formBtn.style.backgroundColor = "green";
  itemInput.value = item.innerText;
}

//Clearing screen
function clearItem(e) {
  if (confirm("Are you sure you want to clear all items?")) {
    document.querySelectorAll("li").forEach((e) => {
      e.remove();
    });
  }
  checkUI();
}

//filtering items
function filterItems(e) {
  const items = document.querySelectorAll("li"); //getting the lists
  const text = e.target.value.toLowerCase(); //getting the userinput and converting to small letters

  items.forEach((item) => {
    const itemName = item.innerText.toLowerCase(); //getting the text content from the item

    //comparing the values of var. text and itemName
    if (itemName.includes(text)) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

//duplicate function
function checkDuplicate(item) {
  const newArr = [];
  itemList.querySelectorAll("li").forEach((i) => {
    newArr.push(i.innerText);
  });
  if (newArr.includes(item)) {
    return true;
  }
}

function toggleMode(e) {
  // e.preventDefault();
  const body = document.querySelector("body");

  //toggle class on body
  toggleLight.classList.toggle("dark-mode");

  if (toggleLight.classList.contains("dark-mode")) {
    body.style.backgroundColor = "black";
    body.style.color = "white";
    toggleLight.style.display = "none";
    toggleNight.style.display = "block";
    filterInput.style.color = "#fff";
  } else {
    body.style.backgroundColor = "white";
    body.style.color = "black";
  }
}

function toggleNightMode(e) {
  const body = document.querySelector("body");

  //toggle Night class on body
  toggleNight.classList.toggle("light-mode");

  if (document.querySelector(".light-mode")) {
    body.style.backgroundColor = "white";
    body.style.color = "black";
    toggleLight.style.display = "block";
    toggleNight.style.display = "none";
  } else {
    body.style.backgroundColor = "black";
    body.style.color = "white";
  }
}

function checkUI() {
  const items = document.querySelectorAll("li");

  if (items.length === 0) {
    filterInput.style.display = "none";
    clearBtn.style.display = "none";
  } else {
    filterInput.style.display = "block";
    clearBtn.style.display = "block";
  }
}

//Events listners
itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
clearBtn.addEventListener("click", clearItem);
filterInput.addEventListener("input", filterItems);
toggleLight.addEventListener("click", toggleMode);
toggleNight.addEventListener("click", toggleNightMode);

checkUI();
