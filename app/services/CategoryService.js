const { stringify } = require("uuid");
const Category = require("../models/mongoose/Category");
const { db } = lulu.use("app/helpers");
const NotFoundError = lulu.use("app/errors/NotFoundError");
const ResourceAlreadyExistsError = lulu.use(
  "app/errors/ResourceAlreadyExistsError"
);

const slugify = require("slugify");

function titleCheck(title) {
  let findTitle = Category.findOne({ title: title });
  return findTitle;
}

async function categorCreate(data) {
  let checkTitle = await titleCheck(data.title);
  if (checkTitle) {
    throw new ResourceAlreadyExistsError("title already exists.");
  }
  const title = data.title;
  // Generate a slug from the title
  const slug = slugify(title, {
    remove: /[*+~.()'"!:@]/g,
    lower: true,
  });

  return await Category.create({
    title: title,
    slug: slug,
    file: data.file,
    created_by: data.created_by,
  });
}

async function CatrgoryList(req) {
  let { page = 1, limit } = req.query;
  const skip = (page - 1) * limit;
  const category = await Category.find({ exist: { $ne: false}}).sort({ _id: -1 }).skip(skip).limit(limit);
  return category;
}

async function getCategoryById(id) {
  if(!db.isValidObjectId(id)){
    return null;
  }
  const category =  await Category.findOne({_id: id, exist: true});
  console.log(category)
  if(category){
    return category
  }else{
    throw new NotFoundError(
      "There is no such category"
    );
  }
}

async function updateCategory(req) {
  console.log(req.body.title)
  const { id } = req.params;
  if (!db.isValidObjectId(id)) {
    return null;
  }

  const { title, slug } = req.body;
  const category = await Category.findOne({ _id: id, exist: true });
  if (!category) {
    throw new NotFoundError("Category not found.");
  }
  const existingCategoryByTitle = await Category.findOne({
    _id: { $ne: id },
    title: title,
    exist: true,
  });
  if (existingCategoryByTitle) {
    throw new ResourceAlreadyExistsError("Title already exists.");
  }

  const existingCategoryBySlug = await Category.findOne({
    _id: { $ne: id },
    slug: slug,
    exist: true,
  });
  if (existingCategoryBySlug) {
    throw new ResourceAlreadyExistsError("Slug already exists.");
  }
  category.title = title;
  const updateSlug = slugify(slug, {
    remove: /[*+~.()'"!:@]/g,
    lower: true,
  });

  category.slug = updateSlug;
  category.file = req.file;
  category.save();
  return category;
  
}


async function discard(req){
  let { id } = req.params;
  if(!db.isValidObjectId(id)){
    return null;
  }

  let categoryDelete = await Category.findOne({_id: id, exist: true});
  if(categoryDelete)
  {
    categoryDelete.exist = false;
    categoryDelete.save();
    return[];
  }else{
    throw new NotFoundError(
      "There is no such category"
    );
  }

}
module.exports = {
  categorCreate,
  CatrgoryList,
  getCategoryById,
  updateCategory,
  discard
};
