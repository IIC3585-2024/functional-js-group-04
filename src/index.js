import { readFile, writeFile, existsSync } from 'fs';
import { join } from 'path';
import compiler from './compiler/compiler.js';

let action = "compile";
let style_path = "style.css";

if (process.argv.length < 4) {
    console.error('Usage: node src/index.js <input_file> <output_file> [--action <action>] [--style <style_file>]');
    process.exit(1);
}

const input_path = process.argv[2];
const output_path = process.argv[3];

process.argv.slice(4).forEach((arg, index, array) => {
    if (arg === '--action') {
        action = array[index + 1];
    }
    if (arg === '--style') {
        style_path = array[index + 1];
    }
});

if (!input_path) {
    console.error('Please provide an input file');
    process.exit(1);
}

if (!output_path) {
    console.error('Please provide an output file');
    process.exit(1);
}

if (!existsSync(join('src', 'assets', style_path))) {
    console.error('Please provide an existing style file');
    process.exit(1);
}

const action_message = {
    'tokenize': 'Tokenizing',
    'compile': 'Compiling',
}

const style_message = {
    'tokenize': '',
    'compile': ` with style from ${style_path}`,
}

console.log(`${action_message[action]} file from ${input_path}${style_message[action]}`);

switch (action) {
    case 'tokenize':
        compiler().read(input_path).tokenize().write(output_path);
        break;
    case 'compile':
        compiler().read(input_path).tokenize().style(style_path).parse().write(output_path);
        break;
    default:
        console.error('Invalid action');
        process.exit(1);
}

console.log(`File written to ${output_path}`);
