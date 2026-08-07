const l = require('lucide-react');
const k = Object.keys(l);
const matches = k.filter(x => /github|linkedin|send|telegram|git|linked/i.test(x));
console.log(matches.join(', '));
