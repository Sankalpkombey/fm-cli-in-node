function hello () {
  console.log('Hello, world!');
}

function bye () {
  console.log('Goodbye, world!');
}

/* hello();
bye(); */

const commands = {}

/* console.log(commands.greet()); */
// const command = commands[commandName];

/* if(!command) {
  console.log('Unknown command');
  return;
}

console.log(command["departure"]());  */

function addCommand(name, fn) {
  commands[name] = fn;
  // if command already exists, warn the user
  if (commands[name]) {
    console.warn(`Command "${name}" already exists. Overwriting.`);
  }
}

function executeCommand(name) {
  const command = commands[name];
  
if (!command) {
    console.log(`${name} not found`);
    return;
  }
  
  command();
}


/* addCommand('greet', () => {
    console.log('Hello, world!');
});
addCommand('farewell', () => {
    console.log('Goodbye, world!');
}); */

/* executeCommand('greet');    // Output: Hello, world!
executeCommand('farewell'); // Output: Goodbye, world!
executeCommand('delete');   // Output: delete not found 

// help to display all commands
function help() {
  console.log('Available commands:');
  for (const [name, fn] of Object.entries(commands)) {
    console.log(`  ${name}`);
  }
}

help(); */


function list(dirPath) {
  console.log("dirPath", dirPath);
}

console.log("Calling with one argument");
list("./utils");

console.log("Calling with two arguments");
list("./utils", "./commands");


function copy (src, dst) {
  console.log("src", src);
  console.log("dst", dst);
}

console.log("Calling with one argument");
copy("./utils");

console.log("\nCalling with two arguments");
copy("./utils", "./commands");