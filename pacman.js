/*PACMAN*/

/*Score variable*/
let score = 0; //variable that tracks our score

/*Creating Pacman*/
class Pacman {
  //Added "position" and "speed" as objects so I won't need to memorize the order of arguments
  constructor({ position, speed }) {
    //The dimensions, position, and speed of Pacman
    this.position = position; //position
    this.speed = speed; //speed
    this.radius = 16; //radius of the circle (Pacman's body)
    this.radians = 0.75; //angle measurment for Pacman's mouth (in radians)
    this.rate = 0.12; //rate of movement for the mouth
    this.rotating = 0; //rotation property
  }

  //Drawing Pacman
  shape() {
    context.save();
    context.translate(this.position.x, this.position.y); //translates the canvas so Pacman rotates
    context.rotate(this.rotating); //rotates the canvas
    context.translate(-this.position.x, -this.position.y); //translates the canvas back to it original position

    //starting a new path - similar to the push() function
    context.beginPath();
    context.arc(
      this.position.x,
      this.position.y,
      this.radius,
      this.radians,
      Math.PI * 2 - this.radians
    );
    //Pacman's shape and position. We multiplied Math.PI by 2 to get a full circle
    context.lineTo(this.position.x, this.position.y); //draws the line for Pacman's mouth
    context.fillStyle = "yellow"; //Pacman color
    context.fill(); //to fill the arc
    context.closePath(); //closing the path - similar to the pop() function
    context.restore();
  }

  //Moving Pacman
  update() {
    this.shape();
    this.position.y += this.speed.y; //Moves the Pacman up and down
    this.position.x += this.speed.x; //Moves the Pacman right and left

    if (this.radians < 0 || this.radians > 0.75) this.rate = -this.rate;

    this.radians += this.rate;
  }
}

/*Calling Pacman*/
const pacman = new Pacman({
  position: {
    x: 70,
    y: 70,
  }, //setting position and dimensions
  speed: { x: 0, y: 0 }, //setting the starting speed
});

/*Controlling the condition of the keys so they don't move unexpectdly when pressing two keys at the same time*/
const keyscon = {
  left: {
    pressed: false,
  },
  down: {
    pressed: false,
  },
  right: {
    pressed: false,
  },
  up: {
    pressed: false,
  },
};

/*Collision detection function*/
//Testing wether or not Pacman collides to make the movement more controlable
function collide({ cir, recta }) {
  //Pacman will stop when colliding with any of the boundaries but since he will not actually hit it, the code will be false and we will be able to move it
  return (
    cir.position.y - cir.radius + cir.speed.y <=
      recta.position.y + recta.length &&
    cir.position.x + cir.radius + cir.speed.x >= recta.position.x &&
    cir.position.y + cir.radius + cir.speed.y >= recta.position.y &&
    cir.position.x - cir.radius + cir.speed.x <= recta.position.x + recta.width
  );
}

/*Animation function*/
function animate() {
  requestAnimationFrame(animate); //Loops the animation
  context.clearRect(0, 0, canvas.width, canvas.height); //Clears everything on the canvas while maintaining Pacman's shape

  //If the up arrow key is pressed, Pacman will move upwards
  //This for loop helps Pacman move in all directions smoothly without stopping
  if (keyscon.up.pressed) {
    for (i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        collide({
          cir: {
            ...pacman,
            speed: {
              x: 0,
              y: -5,
            },
          },
          recta: boundary,
        })
      ) {
        pacman.speed.y = 0;
        break;
      } else {
        pacman.speed.y = -5;
      }
    }
  }

  //If the down arrow key is pressed, Pacman will move downwards
  else if (keyscon.down.pressed) {
    for (i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        collide({
          cir: {
            ...pacman,
            speed: {
              x: 0,
              y: 5,
            },
          },
          recta: boundary,
        })
      ) {
        pacman.speed.y = 0;
        break;
      } else {
        pacman.speed.y = 5;
      }
    }
  } //If the left arrow key is pressed, Pacman will move to the left
  else if (keyscon.left.pressed) {
    for (i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        collide({
          cir: {
            ...pacman,
            speed: {
              x: -5,
              y: 0,
            },
          },
          recta: boundary,
        })
      ) {
        pacman.speed.x = 0;
        break;
      } else {
        pacman.speed.x = -5;
      }
    }
  } //If the right arrow key is pressed, Pacman will move to the right
  else if (keyscon.right.pressed) {
    for (i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        collide({
          cir: {
            ...pacman,
            speed: {
              x: 5,
              y: 0,
            },
          },
          recta: boundary,
        })
      ) {
        pacman.speed.x = 0;
        break;
      } else {
        pacman.speed.x = 5;
      }
    }
  }

  /*Win condition*/
  //After Pacman eats all the food pellets, the text "YOU WIN!" will be displayed on the screen
  if (foods.length === 1) {
    context.fillStyle = "white"; //Text color
    context.font = "bold 80px Trebuchet MS"; //Text font and size
    context.fillText("You Win!", 700, 300); //Text and position
  }

  //Looping through this code backwards to remove the flashing of the food circles
  for (let i = foods.length - 1; 0 < i; i--) {
    const food = foods[i];

    //Drawing the food circles
    food.shape();

    /*Food circles collision detection*/
    //If pacman is touching any of the food circles, they will disappear!
    if (
      Math.hypot(
        food.position.x - pacman.position.x,
        food.position.y - pacman.position.y
      ) <
      food.radius + pacman.radius
    ) {
      //Removes the food circles as soon as pacman touches them
      foods.splice(i, 1); //splices out the food circle we are touching from the food array using its index

      //Score tracker
      score += 5; //score will increase by 5 for every food circle
      scoring.innerHTML = score; //changes the "0" that is set in the innerHTML file into the actual score tracker
    }
  }

  //Looping through the boundaries array - drawing the boundaries
  boundaries.forEach((boundary) => {
    boundary.shape();

    /*Collision detection*/
    if (
      collide({
        cir: pacman,
        recta: boundary,
      })
    ) {
      pacman.speed.y = 0; //stops Pacman when colliding with a boudary while moving up/down
      pacman.speed.x = 0; //stops Pacman when colliding with a boudary while moving right/left
    }
  });
  //Drawing and updating Pacman
  pacman.update();

  //Controlling the direction of the rotation of Pacman - rotating Pacman in the correct direction when moving
  if (pacman.speed.x > 0) pacman.rotating = 0; //rotates when moving right
  else if (pacman.speed.x < 0)
    pacman.rotating = Math.PI; //rotates when moving left
  else if (pacman.speed.y < 0)
    pacman.rotating = Math.PI * 1.5; //rotates when moving up
  else if (pacman.speed.y > 0) pacman.rotating = Math.PI / 2; //rotates when moving down
}
animate(); //calling the animate function

/*EVENT LISTENERS*/

/*Eventlistener for pressing the keys*/
window.addEventListener("keydown", ({ keyCode }) => {
  //Switching between keycodes and the "up", "down", "right", and "left" arrow keys
  switch (keyCode) {
    //"left arrow" key
    case 37:
      keyscon.left.pressed = true; //Moves the player to the left when clicking the "left arrow" key
      break;

    //"down arrow" key
    case 40:
      keyscon.down.pressed = true; //Moves the player downwards when clicking the "down arrow" key
      break;

    //"right arrow" key
    case 39:
      keyscon.right.pressed = true; //Moves the player to the right when clicking the "right arrow" key
      break;

    //"up arrow" key
    case 38:
      keyscon.up.pressed = true; //Moves the player upwards when clicking the "up arrow" key
      break;
  }
});

/*Eventlistener for lifitng the keys*/
addEventListener("keyup", ({ keyCode }) => {
  //Switching between keycodes and the "up", "down", "right", and "left" arrow keys
  switch (keyCode) {
    //"left arrow" key
    case 37:
      keyscon.left.pressed = false; //Sets the speed to 0 when lifting the "left arrow" key
      break;

    //"down arrow" key
    case 40:
      keyscon.down.pressed = false; //Sets the speed to 0 when lifting the "down arrow" key
      break;

    //"right arrow" key
    case 39:
      keyscon.right.pressed = false; //Sets the speed to 0 when lifting the "right arrow" key

    //"up arrow" key
    case 38:
      keyscon.up.pressed = false; //Sets the speed to 0 when lifting the "up arrow" key
      break;
  }
});