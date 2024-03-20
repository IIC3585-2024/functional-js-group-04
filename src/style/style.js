import { readFileSync } from 'fs';

function style(file_path) {
    try {
        const _stylesheet = readFileSync(file_path, 'utf-8');
        return _stylesheet;
    } catch (error) {
        throw new Error(`Error reading style file from disk: ${error}`)
    }
}

export default style
