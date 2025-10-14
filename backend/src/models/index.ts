import Vocab from "./Vocab";
import UserVocabProgress from "./UserVocabProgress";
import User from "./User";
import Review from "./Review";
import Kanji from "./Kanji";
import Grammar from "./Grammar";

// === Relasi antara User, Vocab, dan UserVocabProgress ===
Vocab.hasMany(UserVocabProgress, { foreignKey: "vocab_id", as: "progressList" });
UserVocabProgress.belongsTo(Vocab, { foreignKey: "vocab_id", as: "progressVocab" });

User.hasMany(UserVocabProgress, { foreignKey: "user_id", as: "vocabProgressList" });
UserVocabProgress.belongsTo(User, { foreignKey: "user_id", as: "progressUser" });

// === Relasi antara Review dan User/Vocab ===
Review.belongsTo(User, { foreignKey: "user_id", as: "reviewUser" });
Review.belongsTo(Vocab, { foreignKey: "item_id", as: "reviewVocab" });

Review.belongsTo(Vocab, { foreignKey: "item_id", as: "vocab" });
Review.belongsTo(Kanji, { foreignKey: "item_id", as: "kanji" });
Review.belongsTo(Grammar, { foreignKey: "item_id", as: "grammar" });
Review.belongsTo(User, { foreignKey: "user_id", as: "user" });

export { Vocab, UserVocabProgress, Review, User, Kanji, Grammar };
