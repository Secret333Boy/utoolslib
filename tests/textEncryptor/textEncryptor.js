'use strict';
const assert = require('assert').strict;
const TextEncryptor = require('../../src/tools/textEncryptor/textEncryptor.js');

const tests = {
  seeds: ['1', 214125161],
  pars: [
    '',
    'Hello',
    'Рыба',
    'Індія',
    'Sed ut perspiciatis, unde omnis iste natus error sit' +
      ' voluptatem accusantium doloremque laudantium, totam rem' +
      ' aperiam eaque ipsa, quae ab illo inventore veritatis et ' +
      'quasi architecto beatae vitae dicta sunt, explicabo. Nemo ' +
      'enim ipsam voluptatem, quia voluptas sit, aspernatur aut ' +
      'odit aut fugit, sed quia consequuntur magni dolores eos,' +
      ' qui ratione voluptatem sequi nesciunt, neque porro quisquam' +
      ' est, qui dolorem ipsum, quia dolor sit, amet, consectetur,' +
      ' adipisci velit, sed quia non numquam eius modi tempora' +
      ' incidunt, ut labore et dolore magnam aliquam quaerat' +
      ' voluptatem. Ut enim ad minima veniam, quis nostrum ' +
      'exercitationem ullam corporis suscipit laboriosam, nisi ' +
      'ut aliquid ex ea commodi consequatur? Quis autem vel eum' +
      ' iure reprehenderit, qui in ea voluptate velit esse, quam' +
      ' nihil molestiae consequatur, vel illum, qui dolorem eum ' +
      'fugiat, quo voluptas nulla pariatur? At vero eos et accusamus' +
      ' et iusto odio dignissimos ducimus, qui blanditiis praesentium' +
      ' voluptatum deleniti atque corrupti, quos dolores et quas molestias' +
      ' excepturi sint, obcaecati cupiditate non provident, similique ' +
      'sunt in culpa, qui officia deserunt mollitia animi, id est' +
      ' laborum et dolorum fuga. Et harum quidem rerum facilis' +
      ' est et expedita distinctio. Nam libero tempore, cum soluta' +
      ' nobis est eligendi optio, cumque nihil impedit, quo minus' +
      ' id, quod maxime placeat, facere possimus, omnis voluptas' +
      ' assumenda est, omnis dolor repellendus. Temporibus autem' +
      ' quibusdam et aut officiis debitis aut rerum necessitatibus' +
      ' saepe eveniet, ut et voluptates repudiandae sint et molestiae' +
      ' non recusandae. Itaque earum rerum hic tenetur a sapiente ' +
      'delectus, ut aut reiciendis voluptatibus maiores alias ' +
      'consequatur aut perferendis doloribus asperiores repellat.',
  ],
};

for (const seed of tests.seeds) {
  console.log(`Seed ${seed}:`);
  try {
    new TextEncryptor(seed);
  } catch (error) {
    console.log(error);
    continue;
  }

  for (const par of tests.pars) {
    try {
      const TE = new TextEncryptor(seed);
      console.log(` ${par}: `);
      assert.notDeepEqual(TE.encryptString(par), par);
      assert.deepEqual(TE.encryptString(TE.encryptString(par)), par);
      console.log('SUCCESS');
    } catch (error) {
      console.log('FAILURE: ' + error);
      continue;
    }
  }
}
