/*BOUNDARIES*/

/*Creating the boundaries*/
class Boundary {
  //Added "position" as an object so I won't need to memorize the order of arguments
  constructor({ position }) {
    //The dimensions and position of the boundary
    this.position = position; //position
    this.length = 45; //length
    this.width = 45; //width
  }

  //Drawing the boundary
  shape() {
    context.fillStyle = "blue"; //boundary color
    context.fillRect(this.position.x, this.position.y, this.length, this.width);
    //boundary's shape and position
  }
}
const boundaries = []; //Storing the boundaries

/*Creating the food*/
class Food {
  constructor({ position }) {
    //The dimensions and position of the food
    this.position = position; //position
    this.radius = 4; //radius of the food circles
  }

  //Drawing Pacman
  shape() {
    context.beginPath(); //starting a new path - similar to the push() function
    context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    //Pacman's shape and position. We multiplied Math.PI by 2 to get a full circle
    context.fillStyle = "pink"; //Food color
    context.fill(); //to fill the arc
    context.closePath(); //closing the path - similar to the pop() function
  }
}
const foods = []; //Storing the food circles

/**********************************CODE CITATION*************************************
  -A looped function that creates the boundaries for the pacman game in a couple of lines of code instead of creating each boundary box on its own and using hundreds of lines of code.
  
  -This was adapted from a video from Chris Courses on the Pacman game.
  
  -Video here: https://youtu.be/5IMXpp3rohQ
  
  -This code was mostly what I wanted to create but if I created it my way it would take lots of time and lines of code, so I slightly modified this code to fit my project's dimensions, position, and style.
  
  (Source: https://youtu.be/5IMXpp3rohQ retrieved on Jan, 2023.)
  ************************************************************************************/

/*Creating the map/grid*/
//Drawing a 6 column by 4 row grid
//Each dash "-" represents a filled box. Each dot "." represents an food circle
const grid = [
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", ".", ".", ".", ".", ".", ".", ".", ".", ".", "-"],
  ["-", ".", "-", ".", "-", "-", "-", ".", "-", ".", "-"],
  ["-", ".", ".", ".", ".", "-", ".", ".", ".", ".", "-"],
  ["-", ".", "-", "-", ".", ".", ".", "-", "-", ".", "-"],
  ["-", ".", ".", ".", ".", "-", ".", ".", ".", ".", "-"],
  ["-", ".", "-", ".", "-", "-", "-", ".", "-", ".", "-"],
  ["-", ".", ".", ".", ".", "-", ".", ".", ".", ".", "-"],
  ["-", ".", "-", "-", ".", ".", ".", "-", "-", ".", "-"],
  ["-", ".", ".", ".", ".", "-", ".", ".", ".", ".", "-"],
  ["-", ".", "-", ".", "-", "-", "-", ".", "-", ".", "-"],
  ["-", ".", ".", ".", ".", ".", ".", ".", ".", ".", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
];

/*Creating the grid*/
grid.forEach((row, i) => {
  row.forEach((dash, j) => {
    //Calling a switch statement to switch the symbol we are on for the case
    switch (dash) {
      case "-": //whenever we hit a dash, this code will be activated
        boundaries.push(
          new Boundary({
            position: {
              x: j * 45, //length
              y: i * 45, //width
            },
          })
        );
        //Closing the switch statement
        break;
      case ".": //whenever we hit a dot, this code will be activated
        foods.push(
          new Food({
            position: {
              x: j * 45 + 22.5, //length
              y: i * 45 + 22.5, //width
            },
          })
        );
        //Closing the switch statement
        break;
    }
  });
});