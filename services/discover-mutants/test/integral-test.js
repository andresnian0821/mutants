const index = require('../dist/index');
let request = '{\n'+
  '"body": {\n'+
    // '"dna": ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"]\n' +
    '"dna": ["ATGCGA", "CAGTGC", "TTCTGT", "AGAAAG", "CCACTA", "TCACTG"]\n'+
  '}\n'+
'}'
const requestSucces = {
  "dna": ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"]
}

index.handler(requestSucces).then(response => {
  console.log(response)
}).catch(err => console.log(err));


