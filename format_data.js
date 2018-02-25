const fs = require('fs');

const data_buffer = fs.readFileSync('./data.csv');
const data = data_buffer.toString();

const newLines = [];
data.split('\n').forEach(line => {
  const newLine = []
  const cols = line.split(';');
  newLine.push(cols[0]);
  newLine.push(cols[1]);

  // nationality full of special chars, get rid of them
  const re = new RegExp(/[^�].+/g);
  newLine.push(cols[2].match(re)[0]);

  // convert time to minutes
  const time = cols[3].split(':');
  newLine.push((parseInt(time[0]) * 60 + parseInt(time[1])).toString());
  newLine.push(cols[4]);
  newLines.push(newLine.join(';'));
})

const newData = newLines.join('\n');

fs.writeFileSync('./data_formatted.csv', newData);