/*********** Constants *************/
const NUMBER_DUPLICATION = 5;
const TOKEN_CLASS = 'category-token';
const TOKEN_WRAPPER_ELT = document.querySelector('.cc-tokens-wrapper');
const Y_FORCE = 1; // Upward force applied on hover
const BOUNCINESS = 0.9; // Restitution for the balls
const X_FORCE_RANDOMNESS = 0.5; // Range for the random X force

// Module aliases
var Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Mouse = Matter.Mouse,
  MouseConstraint = Matter.MouseConstraint;

var engine = Engine.create();
var render;

// Temporarily show all .circle elements to calculate their dimensions
const initialTokens = document.querySelectorAll('.' + TOKEN_CLASS);

function duplicateTokens() {
  initialTokens.forEach(token => {
    token.style.display = 'block';
  });

  // Loop through each element found
  initialTokens.forEach(initialToken => {
    // Get the parent element where the duplicates will be appended
    const parent = initialToken.parentNode;

    // Create the specified number of duplicates
    for (let i = 0; i < NUMBER_DUPLICATION; i++) {
      // Clone the current element
      const clone = initialToken.cloneNode(true);

      // Append the cloned node to the parent element
      parent.appendChild(clone);
    }
  });
}

// Function to initialize Matter.js
function initializeMatter() {
  // Ensure .circle elements are hidden again after Matter.js bodies are created
  ALL_GENERATED_TOKENS.forEach(token => {
    token.style.display = 'block';
  });
  // Remove existing bodies and renderer if they exist
  if (render) {
    Render.stop(render);
    World.clear(engine.world);
    Engine.clear(engine);
    render.canvas.remove();
    render.canvas = null;
    render.context = null;
    render.textures = {};
  }

  /***************** Set Up the Physics Engine Matter JS ***********************/
  var container = TOKEN_WRAPPER_ELT;
  var bounds = container.getBoundingClientRect();

  render = Render.create({
    element: container,
    engine: engine,
    options: {
      width: bounds.width,
      height: bounds.height,
      wireframes: false,
      background: 'transparent'
    }
  });

  /********************* Create Physics Bodies for Each Token *****************/
  // Select all tokens
  var tokens = container.querySelectorAll('.' + TOKEN_CLASS);
  var bodies = [];

  tokens.forEach(function (token) {
    var tokenRect = token.getBoundingClientRect();
    var x = tokenRect.left - bounds.left + tokenRect.width / 2;
    var y = bounds.top + tokenRect.height; // Start just above the top of the container

    // Extract background color and image from the DOM element
    var backgroundColor = window.getComputedStyle(token).backgroundColor;
    var backgroundImage = window.getComputedStyle(token).backgroundImage;
    var texture = '';
    if (backgroundImage !== 'none') {
      texture = backgroundImage.slice(5, -2).replace(/['"]/g, '');
    }
    var borderColor = window.getComputedStyle(token).borderColor;
    var borderWidth = parseFloat(window.getComputedStyle(token).borderWidth);

    // Create a Matter.js body for each element
    var body = Bodies.circle(x, y, tokenRect.width / 2, {
      restitution: BOUNCINESS, // Add bounciness
      render: {
        fillStyle: backgroundColor,
        strokeStyle: borderColor,
        lineWidth: borderWidth,
        sprite: {
          texture: texture,
          xScale: 1,
          yScale: 1
        }
      }
    });
    body.backgroundColor = backgroundColor; // Store background color in body

    bodies.push(body);
  });

  // Hide the original DOM elements permanently
  tokens.forEach(function (token) {
    token.style.display = 'none';
  });

  World.add(engine.world, bodies);

  /*************** Contain the Tokens Within the Wrapper *******************/
  var boundaries = [
    Bodies.rectangle(bounds.width / 2, -25, bounds.width, 50, { isStatic: true }), // top boundary
    Bodies.rectangle(bounds.width / 2, bounds.height + 25, bounds.width,
      50, { isStatic: true }), // bottom boundary
    Bodies.rectangle(-25, bounds.height / 2, 50, bounds
      .height, { isStatic: true }), // left boundary
    Bodies.rectangle(bounds.width + 25, bounds.height / 2, 50, bounds
      .height, { isStatic: true }) // right boundary
  ];

  World.add(engine.world, boundaries);

  Render.run(render);
  Engine.run(engine);

  /*************** Add Mouse Interaction *******************/
  var mouse = Mouse.create(render.canvas);
  var mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
      render: {
        visible: false
      }
    }
  });

  World.add(engine.world, mouseConstraint);

  var currentlyHoveredBody = null;

  Matter.Events.on(mouseConstraint, 'mousemove', function (event) {
    var foundBodies = Matter.Query.point(bodies, event.mouse.position);
    if (foundBodies.length > 0) {
      var body = foundBodies[0];
      if (body !== currentlyHoveredBody) {
        currentlyHoveredBody = body;
        // Apply force to make the ball bounce up with slight random x movement
        var randomXForce = (Math.random() - 0.5) * X_FORCE_RANDOMNESS; // Random x force
        Matter.Body.applyForce(body, body.position, { x: randomXForce, y: Y_FORCE });
      }
    } else {
      currentlyHoveredBody = null;
    }
  });

  // Ensure .circle elements are hidden again after Matter.js bodies are created
  ALL_GENERATED_TOKENS.forEach(token => {
    token.style.display = 'none';
  });
}

// Duplicate tokens once
duplicateTokens();
const ALL_GENERATED_TOKENS = document.querySelectorAll('.' + TOKEN_CLASS);

// Initialize Matter.js on page load
initializeMatter();

// Debounce function to limit how often the resize function can run
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Re-initialize Matter.js on window resize with debounce
window.addEventListener('resize', debounce(initializeMatter, 200));
