import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function readFormData() {
    const filePath = path.join(__dirname,'../testData/formData.json');

    const data = fs.readFileSync(filePath, 'utf-8');

    return JSON.parse(data);
}