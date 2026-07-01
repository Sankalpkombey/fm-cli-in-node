const commands = {};

function addCommand(name, fn) {
  commands[name] = fn;
}

function getCommand(name) {
  return commands[name];
}

function hasCommand(name) {
    return commands[name] !== undefined;
}

function listCommands() {
    console.log('Available commands:');
    for (const [name, fn] of Object.entries(commands)) {
        console.log(`  ${name}`);
    }
}

module.exports = { addCommand, getCommand, hasCommand, listCommands };