const Joi = require("joi");
const JoiValidationError = lulu.use("app/errors/JoiValidationError");
const config = lulu.use("app.config");

module.exports = {
  AuthBindDeviceRequestSchema: Joi.object({
    source: Joi.string()
      .min(3)
      .max(100)
      .required()
      .error(() => new JoiValidationError("Source is required.", "source")),
    token: Joi.string()
      .min(3)
      .required()
      .error(() => new JoiValidationError("Token is required.", "token")),
    optionals: Joi.object()
      .optional()
      .error(
        () =>
          new JoiValidationError(
            "Optionals is not properly formatted. It should be an Object",
            "optionals"
          )
      ),
  }),

  AuthRegisterRegularSchema: Joi.object({
    name: Joi.string()
      .min(3)
      .max(200)
      .required()
      .error(() => new JoiValidationError("Name is required.", "name")),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: {
          allow: config.app.allowedEmailDomainTLDs,
        },
      })
      .min(3)
      .max(150)
      .required()
      .error(
        () =>
          new JoiValidationError(
            "Email is not properly formatted or the TLD is not supported",
            "email"
          )
      ),
    password: Joi.string()
      .min(6)
      .max(32)
      .required()
      .error(
        () =>
          new JoiValidationError(
            "Password is required. Minimum 6 Letters. Maximum 32 Letters",
            "password"
          )
      ),
    confirm_password: Joi.ref("password"),
  }),

  UserCreateRequestSchema: Joi.object({
    name: Joi.string()
      .min(3)
      .max(200)
      .required()
      .error(() => new JoiValidationError("Name is required.", "name")),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: {
          allow: config.app.allowedEmailDomainTLDs,
        },
      })
      .min(3)
      .max(150)
      .required()
      .error(
        () =>
          new JoiValidationError(
            "Email is not properly formatted or the TLD is not supported",
            "email"
          )
      ),
    password: Joi.string()
      .min(6)
      .max(32)
      .required()
      .error(
        () =>
          new JoiValidationError(
            "Password is required. Minimum 6 Letters. Maximum 32 Letters",
            "password"
          )
      ),
  }),

  UserUpdateRequestSchema: Joi.object({
    name: Joi.string()
      .min(3)
      .max(200)
      .required()
      .error(
        () =>
          new JoiValidationError(
            "Name is required or must be in 3-200 letter",
            "name"
          )
      ),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: {
          allow: config.app.allowedEmailDomainTLDs,
        },
      })
      .min(3)
      .max(150)
      .required()
      .error(
        () =>
          new JoiValidationError(
            "Email is not properly formatted or the TLD is not supported",
            "email"
          )
      ),
    password: Joi.string()
      .min(6)
      .max(32)
      .error(
        () =>
          new JoiValidationError(
            "Password is required. Minimum 6 Letters. Maximum 32 Letters",
            "password"
          )
      ),
  }),

  UserPasswordResetRequestSchema: Joi.object({
    password: Joi.string()
      .min(6)
      .max(32)
      .required()
      .error(
        () =>
          new JoiValidationError(
            "Password is required. Minimum 6 Letters. Maximum 32 Letters",
            "password"
          )
      ),
  }),

  CategoryCreateRequestSchema: Joi.object({
    title: Joi.string()
      .min(3)
      .max(200)
      .required()
      .error(
        () =>
          new JoiValidationError(
            "Title is required and must be in 3-200 letter",
            "title"
          )
      ),
  }),

  CategoryUpdateRequestSchema: Joi.object({
    title: Joi.string()
      .min(3)
      .max(200)
      .required()
      .error(() => new JoiValidationError("title is required.", "title")),

    slug: Joi.string()
      .min(3)
      .max(150)
      .required()
      .error(
        () =>
          new JoiValidationError(
            "Slug is required ",
            "slug"
          )
      ),

  }),

  PortalAdd: Joi.object({
    title: Joi.string()
      .min(3)
      .max(100)
      .required()
      .error(() => new JoiValidationError("Title is required.", "title")),
    domain: Joi.string()
      .domain()
      .min(3)
      .required()
      .error(() => new JoiValidationError("Provide a Valid Domain.", "domain")),
    file: Joi.string()
      .optional()
      .error(
        () =>
          new JoiValidationError(
            "Image is not properly formatted. It should be an Object",
            "image"
          )
      ),
  }),

  TopicAdd: Joi.object({
    title: Joi.string()
      .min(3)
      .max(100)
      .required()
      .error(() => new JoiValidationError("Title is required.", "title")),
    slug: Joi.string()
      .min(3)
      .required()
      .error(() => new JoiValidationError("Slug is required.", "slug")),
    file: Joi.string()
      .optional()
      .error(
        () =>
          new JoiValidationError(
            "Image is not properly formatted. It should be an Object",
            "image"
          )
      ),
  }),

  AliasAdd: Joi.object({
    alias: Joi.string()
      .min(3)
      .max(100)
      .required()
      .error(() => new JoiValidationError("Alias is required.", "alias")),
  }),

  NewsCreateRequestSchema: Joi.object({
    link: Joi.string()
    .required()
    .error(() => new JoiValidationError("Link is required.", "link")),

    title: Joi.string()
    .required()
    .error(() => new JoiValidationError("title is required.", "title")),

    category_id: Joi.required()
    .error(() => new JoiValidationError("Category is required.", "category_id")),

    topic_id: Joi.required()
    .error(() => new JoiValidationError("Topic is required.", "topic_id")),
  })
};

/* It's better use your own validation error with custom error message. Handler works fine. */
