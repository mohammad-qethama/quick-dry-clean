import ts from 'typescript';
import { readFile, writeFile } from 'node:fs/promises';
const entries = [];
for (const filename of ['src/i18n/ar.ts', 'src/config/site.ts', 'src/i18n/en.ts']) {
  const source = await readFile(filename, 'utf8');
  const ast = ts.createSourceFile(filename, source, ts.ScriptTarget.Latest, true);
  function visit(node) {
    if ((ts.isStringLiteral(node) || ts.isTemplateExpression(node)) && /[\u0600-\u06FF]/u.test(node.getText(ast))) {
      const { line } = ast.getLineAndCharacterOfPosition(node.getStart(ast));
      const value = ts.isStringLiteral(node) ? node.text : node.getText(ast).slice(1,-1);
      entries.push({file:filename,line:line+1,value});
      return;
    }
    ts.forEachChild(node,visit);
  }
  visit(ast);
}
const output = '# Arabic native-speaker review\n\nEvery Arabic string below is flagged `// REVIEW: native speaker check` at its source. Repeated strings remain listed for their separate contexts. Template expressions include the city supplied in `site.ts`. Review the final rendered copy again after replacing placeholders.\n\n' + entries.map(e => `- [ ] ${e.value} — [source](${e.file}#L${e.line})`).join('\n') + '\n';
await writeFile('ARABIC_REVIEW.md', output);
console.log(`Exported ${entries.length} Arabic strings for review.`);
