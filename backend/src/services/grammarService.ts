import Grammar from "../models/Grammar";
import { AuthRequest } from "../middleware/authMiddleware";
import { Op } from "sequelize";
import sequelize from "../config/database";
import { UserProgressGrammar } from "../models";

export async function createGrammar(data: any) {
  const existingGrammar = await Grammar.findOne({ where: { pattern: data.pattern } });
  if (existingGrammar) {
    throw new Error("Grammar pattern already exists");
  }
  const grammar = await Grammar.create(data);
  return grammar;
}

export async function updateGrammar(id: string, data: any) {
  const grammar = await Grammar.findByPk(id);
  if (!grammar) throw new Error("Grammar not found");

  await grammar.update(data);
  return grammar;
}

export async function getAllGrammar(req: AuthRequest, search?: string, level?: string, page = 1, pageSize = 10  ) {
  const where: any = {};

  if (level) where.level = level;
  if (search) {
    where[Op.or] = [
      { pattern: { [Op.iLike]: `%${search}%` } },
      { meaning: { [Op.iLike]: `%${search}%` } },
      { example: { [Op.iLike]: `%${search}%` } },
    ];
  }

  const offset = (page - 1) * pageSize;

  const { rows, count } = await Grammar.findAndCountAll({
    attributes: ["id", "pattern", "meaning", "example", "level"],
    where: {
      ...where,
      id: {
        // ❌ Exclude kanji_id yang sudah ada di user_kanji_progress user ini
        [Op.notIn]: sequelize.literal(`(
          SELECT grammar_id FROM user_grammar_progress WHERE user_id = ${req.user.id}
        )`),
      },
    },
    limit: pageSize,
    offset,
    order: [["id", "ASC"]],
  });

  return {
    data: rows,
    meta: {
      total: count,
      page,
      pageSize,
      totalPages: Math.ceil(count / pageSize),
    },
  };
}

export async function getGrammarById(id: string) {
  const grammar = await Grammar.findByPk(id, { attributes: ["id", "pattern", "meaning", "example"], order: [["id", "ASC"]] });
  return grammar;
}

export async function getGrammarByLevel(level: string) {
  const grammar = await Grammar.findAll({ where: { level }, attributes: ["id", "pattern", "meaning", "example"], order: [["id", "ASC"]] });
  return grammar;
}

export async function deleteGrammar(id: string) {
    const grammar = await Grammar.findByPk(id);
    if (!grammar) throw new Error("Grammar not found");

    await grammar.destroy();
    return grammar;
}


export async function getGrammarForLearning(user_id: number, limit = 10, level?: string) {
  const learnedOrMastered = await UserProgressGrammar.findAll({
    where: { 
      user_id, 
      status: { [Op.in]: ["learned", "mastered"] },
    },
    attributes: ["grammar_id"],
  });

  const excludeIds = learnedOrMastered.map((p) => p.grammar_id);

  const newGrammar = await Grammar.findAll({
    where: {
      ...(level && { level }),
      ...(excludeIds.length > 0 && { id: { [Op.notIn]: excludeIds } }),
    },
    order: [["id", "ASC"]],
    limit,
  });

  const result = newGrammar.map((v) => ({
    ...v.get(),
    status: null,
  }));

  return result;
}