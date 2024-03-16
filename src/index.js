import { readFile, writeFile } from 'fs';
import compiler from './compiler/compiler.js';

let [,, input_path, output_path] = process.argv;

if (!input_path) {
    console.error('Please provide an input file');
    process.exit(1);
}

if (!output_path) {
    output_path = input_path.replace(/\.\w+$/, '.html');
}
console.log(`Transpiling file from ${input_path}`);
compiler().read(input_path).tokenize().parse().write(output_path);
console.log(`File written to ${output_path}`);