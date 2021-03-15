module.exports = function check(str, bracketsConfig) {
  let counts = {
    '(': 0,
    '[': 0,
    '{': 0
  },
  
  pairs = toObject(bracketsConfig),

  openBr = getOpenBrackets(bracketsConfig),
  closeBr = getCloseBrackets(bracketsConfig),
  sameBr = getSameBrackets(bracketsConfig),


  i = 0,
  n = str.length,

  bracket,
  stack = [];

for (; i < n; ++i) {

  bracket = str[i];

  if (sameBr.indexOf(bracket) != -1){
    if (stack[stack.length - 1] !== bracket){
      stack.push(bracket);
    }
    else{
      stack.pop();
    }
    continue;
  }

  if (openBr.indexOf(bracket)!=-1){
    stack.push(bracket);
      continue;
  }

  if (closeBr.indexOf(bracket)!=-1){
    if (stack[stack.length - 1] !== pairs[bracket]) {
      return false;
    }
    stack.pop();
  }
}

return !stack.length;
}


function toObject(arr) {
  let rv = {};
  for (let i = 0; i < arr.length; ++i)
    if (arr[i] !== undefined) rv[arr[i][1]] = arr[i][0];
  return rv;
}

function getOpenBrackets(arr){
  return arr.map(item=>item[0]);
}

function getCloseBrackets(arr){
  return arr.map(item=>item[1]);
}

function getSameBrackets(arr){
  return arr.filter(item=>item[0]==item[1]).map(item=>item[0]);
}
