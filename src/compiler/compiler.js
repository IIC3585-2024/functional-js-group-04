import { readFileSync, writeFileSync } from 'fs';
import _tokenize from "../tokenizer/tokenizer.js";
import _parse from "../parser/parser.js";
import _style from "../style/style.js";

function compiler() {
    let _output = null;
    let _stylesheet = null;

    function tokenize() {
        _output = _tokenize(_output);
        return this
    }

    function style(file_path) {
        _stylesheet = _style(file_path)
        return this;
    }

    function parse() {
        _output = _parse(_output, _stylesheet);
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
            throw new Error(`Error writing file to disk: ${error}`);
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