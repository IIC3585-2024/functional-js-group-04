import { readFile, writeFile } from 'fs';
import tokenize from './tokenizer/tokenizer.js';
import parse from './parser/parser.js';


let [,, input_path, output_path] = process.argv;

if (!input_path) {
    console.error('Please provide an input file');
    process.exit(1);
}

if (!output_path) {
    output_path = input_path.replace(/\.\w+$/, '.html');
}

readFile(input_path, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error reading file from disk: ${err}`);
    } else {
        const src = data;
        const tokens = tokenize(src);
        const html = parse(tokens);
        const out = html;

        writeFile(output_path, out, err => {
            if (err) {
                console.error(`Error writing file to disk: ${err}`);
            } else {
                console.log(`File has been written to ${output_path}`);
            }
        });
    }
});

