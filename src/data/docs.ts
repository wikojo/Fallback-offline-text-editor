export interface DocEntry {
  id: string;
  topic: string;
  category: string;
  title: string;
  shortDescription: string;
  syntax?: string;
  description: string;
  note?: string;
  errorMsg?: string;
  errorDescription?: string;
  errorExample?: string;
  keywords: string[];
  url?: string;
}

export const docDatabase: DocEntry[] = [
  {
    id: "const",
    topic: "const",
    category: "JavaScript > Core > Statements",
    title: "const",
    shortDescription: "Creates a variable that cannot be reassigned.",
    syntax: "const name1 = value1;",
    description: "This declaration creates a constant whose scope can be either global or local to the block in which it is declared.",
    note: "const does not mean the value it holds is immutable—just that the variable identifier cannot be reassigned.",
    errorMsg: "TypeError: Assignment to constant variable",
    errorDescription: "Attempting to modify a const variable will throw a runtime error.",
    errorExample: "const score = 100;\nscore = 150; // TypeError: Assignment to constant variable.",
    keywords: ["const", "constant", "variable"],
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const"
  },
  {
    id: "let",
    topic: "let",
    category: "JavaScript > Core > Statements",
    title: "let",
    shortDescription: "Creates a block-scoped variable that can be reassigned.",
    syntax: "let name1 = value1;",
    description: "Declares a reassignable, block-scoped local variable, optionally initializing it to a value.",
    keywords: ["let", "variable", "block"],
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let"
  },
  {
    id: "var",
    topic: "var",
    category: "JavaScript > Core > Statements",
    title: "var",
    shortDescription: "Declares a variable, optionally initializing it to a value.",
    syntax: "var varname1 = value1;",
    description: "The var statement declares a function-scoped or globally-scoped variable.",
    keywords: ["var", "variable", "global"],
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var"
  },
  {
    id: "forEach",
    topic: "Array.prototype.forEach()",
    category: "JavaScript > Objects > Array",
    title: "forEach()",
    shortDescription: "Executes a provided function once for each array element.",
    syntax: "array.forEach(callbackFn);\narray.forEach((element) => { /* ... */ })",
    description: "Calls a function for each element in an array. It does not wait for promises and always returns undefined.",
    keywords: ["forEach", "array", "iterate", "loop"],
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach"
  },
  {
    id: "map",
    topic: "Array.prototype.map()",
    category: "JavaScript > Objects > Array",
    title: "map()",
    shortDescription: "Creates a new array populated with the results of calling a provided function on every element.",
    syntax: "array.map(callbackFn);",
    description: "map() calls a provided callbackFn function once for each element in an array, in order, and constructs a new array from the results.",
    keywords: ["map", "array", "transform"],
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map"
  },
  {
    id: "filter",
    topic: "Array.prototype.filter()",
    category: "JavaScript > Objects > Array",
    title: "filter()",
    shortDescription: "Creates a shallow copy of a portion of a given array, filtered down to just the elements that pass the test.",
    syntax: "array.filter(callbackFn);",
    description: "The filter() method iterates over the array and returns a new array with all elements that pass the test implemented by the provided function.",
    keywords: ["filter", "array", "find", "search"],
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter"
  },
  {
    id: "fetch",
    topic: "Fetch API",
    category: "JavaScript > Web APIs > Fetch",
    title: "fetch()",
    shortDescription: "Starts the process of fetching a resource from the network, returning a promise.",
    syntax: "fetch(resource)\nfetch(resource, options)",
    description: "The global fetch() method starts the process of fetching a resource from the network, returning a promise which is fulfilled once the response is available.",
    keywords: ["fetch", "network", "api", "request", "http", "promise"],
    url: "https://developer.mozilla.org/en-US/docs/Web/API/fetch"
  },
  {
    id: "arrow_functions",
    topic: "Arrow function expressions",
    category: "JavaScript > Functions",
    title: "Arrow Functions",
    shortDescription: "A compact alternative to a traditional function expression.",
    syntax: "(param1, param2) => { statements }\n(param1, param2) => expression",
    description: "Arrow functions do not bind their own 'this', 'arguments', or 'super'. They are ill-suited as methods and cannot be used as constructors.",
    keywords: ["=>", "arrow", "function", "lambda"],
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions"
  }
];

export const getDocById = (id: string) => docDatabase.find(doc => doc.id === id);

export const searchDocs = (query: string) => {
  if (!query.trim()) return docDatabase;
  const lowerQuery = query.toLowerCase();
  return docDatabase.filter(doc => 
    doc.title.toLowerCase().includes(lowerQuery) ||
    doc.topic.toLowerCase().includes(lowerQuery) ||
    doc.shortDescription.toLowerCase().includes(lowerQuery) ||
    doc.keywords.some(kw => kw.toLowerCase().includes(lowerQuery))
  );
};
