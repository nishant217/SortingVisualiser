"use strict";
const start = async () => {
  let algoValue = Number(document.querySelector(".algo-menu").value);
  let speedValue = Number(document.querySelector(".speed-menu").value);

  if (speedValue === 0) {
    speedValue = 0.75;
  }
  if (algoValue === 0) {
    alert("No Algorithm Selected");
    return;
  }

  let algorithm = new sortAlgorithms(speedValue);
  if (algoValue === 1) await algorithm.BubbleSort(highlightSorted);
  if (algoValue === 2) await algorithm.SelectionSort(highlightSorted);
  if (algoValue === 3) await algorithm.InsertionSort(highlightSorted);
  if (algoValue === 4) await algorithm.MergeSort(highlightSorted);
  if (algoValue === 5) await algorithm.QuickSort(highlightSorted);
};

const RenderScreen = async () => {
  let algoValue = Number(document.querySelector(".algo-menu").value);
  setAlgorithmTitle(algoValue);
  await RenderList();
};

const setAlgorithmTitle = (algoValue) => {
  const titleNode = document.querySelector(".algo-title");
  let algoName = "";

  switch (algoValue) {
    case 1:
      algoName = "Bubble Sort";
      break;
    case 2:
      algoName = "Selection Sort";
      break;
    case 3:
      algoName = "Insertion Sort";
      break;
    case 4:
      algoName = "Merge Sort";
      break;
    case 5:
      algoName = "Quick Sort";
      break;
    default:
      algoName = "";
  }

  titleNode.innerText = algoName;
  titleNode.style.fontWeight = "bold";
  titleNode.style.fontSize = "20px";
  titleNode.style.textAlign = "center";
};

const RenderList = async () => {
  let sizeValue = Number(document.querySelector(".size-menu").value);
  if (!sizeValue) {
    sizeValue = 10;
  }
  await clearScreen();

  let list = await randomList(sizeValue);
  const arrayNode = document.querySelector(".array");

  for (const element of list) {
    const node = document.createElement("div");
    node.className = "cell";
    node.setAttribute("value", String(element));
    node.style.height = `${3.8 * element}px`;
    node.style.position = "relative";
    node.style.display = "flex";
    node.style.alignItems = "flex-start";
    node.style.justifyContent = "center";
    node.style.color = "white";
    node.style.fontSize = "18px";
    node.innerText = element; // Display value over the bar itself
    arrayNode.appendChild(node);
  }
};

const swapElements = async (index1, index2) => {
  let cells = document.querySelectorAll(".cell");
  let tempValue = cells[index1].innerText;
  cells[index1].innerText = cells[index2].innerText;
  cells[index2].innerText = tempValue;
};

const highlightSorted = async (index) => {
  let cells = document.querySelectorAll(".cell");
  if (index < cells.length) {
    cells[index].style.backgroundColor = "#9cec5b";
  }
};

const RenderArray = async (sorted) => {
  let sizeValue = Number(document.querySelector(".size-menu").value);
  await clearScreen();

  let list = await randomList(sizeValue);
  if (sorted) list.sort((a, b) => a - b);

  const arrayNode = document.querySelector(".array");
  const divnode = document.createElement("div");
  divnode.className = "s-array";

  for (const element of list) {
    const dnode = document.createElement("div");
    dnode.className = "s-cell";
    dnode.innerText = element;
    divnode.appendChild(dnode);
  }
  arrayNode.appendChild(divnode);
};

const randomList = async (Length) => {
  let list = [];
  let lowerBound = 10;
  let upperBound = 100;

  for (let counter = 0; counter < Length; ++counter) {
    let randomNumber = Math.floor(
      Math.random() * (upperBound - lowerBound + 1) + lowerBound
    );
    list.push(parseInt(randomNumber));
  }
  return list;
};

const clearScreen = async () => {
  document.querySelector(".array").innerHTML = "";
};

const response = () => {
  let Navbar = document.querySelector(".navbar");
  if (Navbar.className === "navbar") {
    Navbar.className += " responsive";
  } else {
    Navbar.className = "navbar";
  }
};

document.querySelector(".icon").addEventListener("click", response);
document.querySelector(".start").addEventListener("click", start);
document.querySelector(".size-menu").addEventListener("change", RenderScreen);
document.querySelector(".algo-menu").addEventListener("change", RenderScreen);
window.onload = RenderScreen;
