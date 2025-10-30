import Vocab from "./Vocab";
import UserProgressVocab from "./UserProgressVocab";
import UserProgressGrammar from "./UserProgressGrammar";
import UserProgressKanji from "./UserProgressKanji";
import User from "./User";
import Review from "./Review";
import Kanji from "./Kanji";
import Grammar from "./Grammar";

// === Relasi antara User, Vocab, dan UserProgressVocab ===
UserProgressVocab.belongsTo(Vocab, { foreignKey: "vocab_id", as: "progressVocab" });
UserProgressVocab.belongsTo(Vocab, { foreignKey: "vocab_id", as: "vocab" });
UserProgressVocab.belongsTo(User, { foreignKey: "user_id", as: "progressUser" });

UserProgressGrammar.belongsTo(Grammar, { foreignKey: "grammar_id", as: "progressGrammar" });
UserProgressGrammar.belongsTo(Grammar, { foreignKey: "grammar_id", as: "grammar" });

// === Relasi antara Review dan User/Vocab ===
Review.belongsTo(Vocab, { foreignKey: "item_id", as: "vocab" });
Review.belongsTo(Kanji, { foreignKey: "item_id", as: "kanji" });
Review.belongsTo(Grammar, { foreignKey: "item_id", as: "grammar" });
Review.belongsTo(User, { foreignKey: "user_id", as: "user" });

// Kanji progress
UserProgressKanji.belongsTo(Kanji, { foreignKey: "kanji_id", as: "progressKanji" });
UserProgressKanji.belongsTo(Kanji, { foreignKey: "kanji_id", as: "kanji" });
UserProgressKanji.belongsTo(User, { foreignKey: "user_id", as: "progressUser" });
Kanji.hasMany(UserProgressKanji, { foreignKey: "kanji_id" });
Kanji.hasMany(UserProgressKanji, { foreignKey: "kanji_id", as: "progressList" });

// Grammar progress
Grammar.hasMany(UserProgressGrammar, { foreignKey: "grammar_id", as: "progressList" });
Grammar.hasMany(UserProgressGrammar, { foreignKey: "grammar_id" });

// Relasi untuk vocab
Vocab.hasMany(UserProgressVocab, { foreignKey: "vocab_id" });
Vocab.hasMany(UserProgressVocab, { foreignKey: "vocab_id", as: "progressList" });


User.hasMany(UserProgressVocab, { foreignKey: "user_id", as: "vocabProgressList" });
User.hasMany(UserProgressGrammar, { foreignKey: "user_id", as: "grammarProgressList" });
User.hasMany(UserProgressKanji, { foreignKey: "user_id", as: "kanjiProgressList" });

export {
  Vocab,
  UserProgressVocab,
  UserProgressGrammar,
  UserProgressKanji,
  Review,
  User,
  Kanji,
  Grammar,
};
