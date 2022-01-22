'use strict';

const CurrencyParser = require('./tools/currencyParser/currencyParser.js');
const DataOrganizer = require('./tools/dataOrganizer/dataOrganizer.js');
const SpellChecker = require('./tools/spellChecker/spellChecker.js');
const TextEncryptor = require('./tools/textEncryptor/textEncryptor.js');
const EventEmmiter = require('./tools/EventEmmiter/EventEmmiter.js');

const fetch = require('./tools/fetch/fetch.js');
const proxify = require('./tools/proxify/proxify.js');

const Dictionary = require('./tools/dataStructures/Dictionary.js');
const Graph = require('./tools/dataStructures/Graph.js');
const Tree = require('./tools/dataStructures/Tree.js');
const Node = require('./tools/dataStructures/Node.js');
const Stack = require('./tools/dataStructures/Stack.js');
const Queue = require('./tools/dataStructures/Queue.js');
const PriorityQueue = require('./tools/dataStructures/PriorityQueue.js');
const Table = require('./tools/dataStructures/Table.js');
const Matrix = require('./tools/dataStructures/Matrix.js');

module.exports = {
  tools: {
    CurrencyParser,
    DataOrganizer,
    SpellChecker,
    TextEncryptor,
    EventEmmiter,
    fetch,
    proxify,
  },
  dataStructures: {
    Dictionary,
    Graph,
    Node,
    Stack,
    Table,
    Tree,
    Queue,
    PriorityQueue,
    Matrix,
  },
};
