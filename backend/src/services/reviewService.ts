import Review from "../models/Review";

export async function createReview(data: any) {
  const existingReview = await Review.findOne({ where: { item_id: data.item_id, item_type: data.item_type } });
  if (existingReview) {
    throw new Error("Review already exists");
  }
  const review = await Review.create(data);
  return {
    review: { id: review.id, item_id: review.item_id, item_type: review.item_type, review_date: review.review_date, next_review: review.next_review, attempt_count: review.attempt_count, correct: review.correct },
  };
}

export async function updateReview(id: string, data: any) {
  const review = await Review.findByPk(id);
  if (!review) throw new Error("Review not found");

  await review.update(data);
  return review;
}

export async function getAllReview() {
  const review = await Review.findAll({ attributes: ["id", "item_id", "item_type", "review_date", "next_review", "attempt_count", "correct"], order: [["id", "ASC"]] });
  return {
    review: review,
  };
}

export async function getReviewById(id: string) {
  const review = await Review.findByPk(id, { attributes: ["id", "item_id", "item_type", "review_date", "next_review", "attempt_count", "correct"], order: [["id", "ASC"]] });
  return {
    review: review,
  };
}