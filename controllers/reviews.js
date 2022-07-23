const Hotel = require('../models/hotel');
const Review = require('../models/review');

module.exports.createReview = async (req, res) => {
    const { id } = req.params;
    const hotel = await Hotel.findById(id);

    const review = new Review(req.body.review);
    review.author = req.user._id;
    hotel.reviews.push(review);

    await review.save();
    await hotel.save();

    req.flash('success', 'Отзыв добавлен');
    res.redirect(`/hotels/${hotel._id}`);
};

module.exports.deleteReview = async (req, res, next) => {
    const { id, reviewId } = req.params;
    await Hotel.findByIdAndUpdate(id, {$pull: {reviews : reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Отзыв удалён');

    res.redirect(`/hotels/${id}`);
};