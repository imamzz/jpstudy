import Grammar from "../models/Grammar";

export async function createGrammar(data: any) {
  const existingGrammar = await Grammar.findOne({ where: { pattern: data.pattern } });
  if (existingGrammar) {
    throw new Error("Grammar pattern already exists");
  }
  const grammar = await Grammar.create(data);
  return {
    grammar: { id: grammar.id, pattern: grammar.pattern, meaning: grammar.meaning },
  };
}

export async function getAllGrammar() {
  const grammar = await Grammar.findAll({ attributes: ["id", "pattern", "meaning", "example"], order: [["id", "ASC"]] });
  return {
    grammar: grammar,
  };
}

export async function getGrammarById(id: string) {
  const grammar = await Grammar.findByPk(id, { attributes: ["id", "pattern", "meaning", "example"], order: [["id", "ASC"]] });
  return {
    grammar: grammar,
  };
}

export async function getGrammarByLevel(level: string) {
  const grammar = await Grammar.findAll({ where: { level }, attributes: ["id", "pattern", "meaning", "example"], order: [["id", "ASC"]] });
  return {
    grammar: grammar,
  };
}