import { existsSync } from 'fs';
import compiler from './compiler/compiler.js';

// Defaults
let action = "compile";
let custom_style = false;
let style_path = "src/assets/themes/light.css"
let theme = "light";

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
        custom_style = true;
        style_path = array[index + 1];
    }

    if (arg === '--theme') {
        theme = array[index + 1];

        if (theme === 'light') {
            style_path = 'src/assets/themes/light.css';
        }

        if (theme === 'dark') {
            style_path = 'src/assets/themes/dark.css';
        }
    }
});

if (!existsSync(input_path)) {
    console.error('Please provide an input file');
    process.exit(1);
}

if (!output_path) {
    console.error('Please provide an output file');
    process.exit(1);
}

if (!existsSync(style_path)) {
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

const theme_emojis = {
    'light': 'light 🌞',
    'dark': 'dark 🌚',
}

const theme_message = {
    'tokenize': '',
    'compile': ` with theme ${theme_emojis[theme]}`,
}

console.log(`${action_message[action]} file from ${input_path}${custom_style ? style_message[action] : theme_message[action] }`);

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
