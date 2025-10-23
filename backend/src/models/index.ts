import Vocab from "./Vocab";
import UserProgressVocab from "./UserProgressVocab";
import UserProgressGrammar from "./UserProgressGrammar";
import UserProgressKanji from "./UserProgressKanji";
import User from "./User";
import Review from "./Review";
import Kanji from "./Kanji";
import Grammar from "./Grammar";

// === Relasi antara User, Vocab, dan UserProgressVocab ===
Vocab.hasMany(UserProgressVocab, { foreignKey: "vocab_id", as: "progressList" });
UserProgressVocab.belongsTo(Vocab, { foreignKey: "vocab_id", as: "progressVocab" });

User.hasMany(UserProgressVocab, { foreignKey: "user_id", as: "vocabProgressList" });
UserProgressVocab.belongsTo(User, { foreignKey: "user_id", as: "progressUser" });

// === Relasi antara Review dan User/Vocab ===
Review.belongsTo(Vocab, { foreignKey: "item_id", as: "vocab" });
Review.belongsTo(Kanji, { foreignKey: "item_id", as: "kanji" });
Review.belongsTo(Grammar, { foreignKey: "item_id", as: "grammar" });
Review.belongsTo(User, { foreignKey: "user_id", as: "user" });

export { Vocab, UserProgressVocab, UserProgressGrammar, UserProgressKanji, Review, User, Kanji, Grammar };
