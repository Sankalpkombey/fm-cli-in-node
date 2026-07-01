#!/usr/bin/env node

const registry = require('./utils/registry');
const copy = require('./commands/copy');
const create = require('./commands/create');
const deleteFile = require('./commands/delete');
const list = require('./commands/list');
const mkdir = require('./commands/mkdir');
const move = require('./commands/move');
const read = require('./commands/read');
const search = require('./commands/search');
const tree = require('./commands/tree');
const { c } = require('./utils/colors');

const args = process.argv.slice(2);
const command = args[0];
const arg1 = args[1];
const arg2 = args[2];

const help = `
${c('bold', 'FM - File Manager CLI')}

${c('yellow', 'Usage:')}
    fm list   <dir>                 List files in a directory
    fm tree   <dir>                 Show directory tree
    fm read   <file>                Print file contents
    fm create <file>                Create a new file
    fm mkdir  <dir>                 Create a new directory
    fm delete <path>                Delete a file or directory
    fm move   <src> <dst>           Move or rename a file
    fm copy   <src> <dst>           Copy a file or directory
    fm search <pattern> <dir>       Search files by pattern (e.g. *.js)
`
async function main() {

    registry.addCommand('list', list);
    registry.addCommand('tree', tree);
    registry.addCommand('read', read);
    registry.addCommand('create', create);
    registry.addCommand('mkdir', mkdir);
    registry.addCommand('delete', deleteFile);
    registry.addCommand('move', move);
    registry.addCommand('copy', copy);
    registry.addCommand('search', search);

    if (registry.hasCommand(command)) {
        await registry.getCommand(command)(arg1, arg2)
    } else {
        console.log(help)
    }
}

main()