import { readFileSync } from 'fs';
import { json } from 'stream/consumers';

// So there is a white space issue in the initial json data
// Instead of manually fixing the data let's do a little bit of data cleaning while the JSON is still a string
const jsonData = JSON.parse(
    readFileSync("./data/primaryResults.json", 'utf8')
        .replace(/"\s+|\s+"/g,'"')
    )

export default jsonData