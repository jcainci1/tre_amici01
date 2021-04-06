const { recipeSchema, reviewSchema } = require('./schemas.js');
const ExpressError = require('./utils/ExpressError');
const Recipe = require('./models/recipe');
const Review = require('./models/review')

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
            req.session.returnTo = req.originalUrl
            req.flash('error', 'you must be signed in');
            return res.redirect('/login');
    }
    next();
}

module.exports.validateRecipe = (req, res, next) => {
    const { error } = recipeSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.isAuthor = async(req, res, next) => {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);
    if (!recipe.author.equals(req.user._id)){
        req.flash('error', 'You do not have permission!');
        return res.redirect(`/recipes/${id}`);
    }
    next();
}

module.exports.isReviewAuthor = async(req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)){
        req.flash('error', 'You do not have permission!');
        return res.redirect(`/recipes/${id}`);
    }
    next();
}

module.exports.validateReview = (req, res, next) => {
    const {error} = reviewSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}