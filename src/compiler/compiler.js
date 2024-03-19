import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import _tokenize from "../tokenizer/tokenizer.js";
import _parse from "../parser/parser.js";

function compiler() {
    let _output = null;

    function tokenize() {
        _output = _tokenize(_output);
        return this
    }

    function parse() {
        _output = _parse(_output);
        return this;
    }

    function compile() {
        this.tokenize().parse();
        return this;
    }

    function output() {
        return _output;
    }

    function setSource(source) {
        _output = source;
        return this;
    }

    function write(out_path) {
        try {
            if (typeof _output !== 'string') {
                writeFileSync(out_path, JSON.stringify(_output, null, 2));
            } else {
                writeFileSync(out_path, _output);
            }    
        } catch (error) {
            console.error(`Error writing file to disk: ${error}`);
        }
        return this;
    }

    function style(out_path, st_path) {
        try {
            const styleContent = readFileSync(join('src', 'assets', st_path), 'utf-8');
            const cssFilePath = join(dirname(out_path), 'style.css');
            writeFileSync(cssFilePath, styleContent);
        } catch (error) {
            console.error(`Error writing style file to disk: ${error}`);
        }
        return this;
    }

    function read(in_path) {
        try {
            _output = readFileSync(in_path, 'utf8');
        } catch (error) {
            console.error(`Error reading file from disk: ${error}`);
        }
        return this;
    }

    return {
        tokenize,
        parse,
        compile,
        setSource,
        output,
        read,
        write,
        style,
    }
}

export default compiler;