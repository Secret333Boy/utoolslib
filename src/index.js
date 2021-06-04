'use strict';

const CurrencyParser = require('./tools/currencyParser/currencyParser.js');
const DataOrganizer = require('./tools/dataOrganizer/dataOrganizer.js');
const SpellChecker = require('./tools/spellChecker/SpellChecker.js');
const TextEncryptor = require('./tools/textEncryptor/TextEncryptor.js');

const fetch = require('./tools/fetch/fetch.js');
const proxify = require('./tools/proxify/proxify.js');

const Dictionary = require('./tools/dataStructures/dictionary.js');
const Graph = require('./tools/dataStructures/graph.js');
const Node = require('./tools/dataStructures/node.js');
const Stack = require('./tools/dataStructures/stack.js');
const Table = require('./tools/dataStructures/table.js');

module.exports = {
  tools: {
    CurrencyParser,
    DataOrganizer,
    SpellChecker,
    TextEncryptor,
    fetch,
    proxify,
  },
  dataStructures: {
    Dictionary,
    Graph,
    Node,
    Stack,
    Table,
  },
};
