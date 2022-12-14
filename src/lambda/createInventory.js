const createItem = require("../dynamodb/createItem");
const formatParams = (body) => {
  let params = {};
  const keys = Object.keys(body);
  keys.forEach((key) => {
    params[key] = {
      S: body[key],
    };
  });

  const formattedImages = body.images.map((image) => ({
    M: {
      image_url: {
        S: image,
      },
      alt: {
        S: `${body.brand.toLowerCase()}-${body.model.toLowerCase()}-${body.model_number.toLowerCase()}`,
      },
    },
  }));
  params = {
    ...params,
    timestamp: {
      S: new Date().toISOString(),
    },
    colorway: {
      S: `${body.model_number.toLowerCase()}-${body.dial.toLowerCase()}-${body.bezel.toLowerCase()}`,
    },
  };

  if (params.images) {
    params.images = {
      L: formattedImages,
    };
  }

  return params;
};

module.exports = async (body) => {
  let params = {
    Item: formatParams(body),
    ConditionExpression: "attribute_not_exists(colorway)",
  };
  const result = await createItem(params, "watchInventory");
  return result;
};
