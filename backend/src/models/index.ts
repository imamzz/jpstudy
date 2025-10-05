import Vocab from "./Vocab";
import UserVocabProgress from "./UserVocabProgress";

// 🧩 Definisikan relasi di satu tempat
Vocab.hasMany(UserVocabProgress, { foreignKey: "vocab_id", as: "progress" });
UserVocabProgress.belongsTo(Vocab, { foreignKey: "vocab_id", as: "vocab" });

export { Vocab, UserVocabProgress };
