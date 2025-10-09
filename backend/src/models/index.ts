import Vocab from "./Vocab";
import UserVocabProgress from "./UserVocabProgress";
import User from "./User";
import Review from "./Review";

// === Relasi antara User, Vocab, dan UserVocabProgress ===
Vocab.hasMany(UserVocabProgress, { foreignKey: "vocab_id", as: "progressList" });
UserVocabProgress.belongsTo(Vocab, { foreignKey: "vocab_id", as: "progressVocab" });

User.hasMany(UserVocabProgress, { foreignKey: "user_id", as: "vocabProgressList" });
UserVocabProgress.belongsTo(User, { foreignKey: "user_id", as: "progressUser" });

// === Relasi antara Review dan User/Vocab ===
Review.belongsTo(User, { foreignKey: "user_id", as: "reviewUser" });
Review.belongsTo(Vocab, { foreignKey: "item_id", as: "reviewVocab" });

export { Vocab, UserVocabProgress, Review, User };
