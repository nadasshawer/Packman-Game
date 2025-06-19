/*BASIC SETUP*/

/*Acessing the canvas*/
const canvas = document.querySelector("canvas");

/*Acessing the score*/
const scoring = document.querySelector("#scoring");

/*Setting canvas size*/
canvas.width = window.innerWidth; //Sets the canvas equal to the window's width
canvas.height = window.innerHeight; //Sets the canvas equal to the window's height

/*Acessing the context and creating a 2D game*/
const context = canvas.getContext("2d");
console.log(context);