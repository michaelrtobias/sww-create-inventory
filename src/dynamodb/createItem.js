const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });

module.exports = async function (params, tableName) {
  const ddb = new AWS.DynamoDB({
    apiVersion: "2012-08-10",
    region: "us-east-1",
  });
  params["TableName"] = tableName;
  const query = await ddb.putItem(params).promise();
  const unmarshalledQuery = AWS.DynamoDB.Converter.unmarshall(query);
  return unmarshalledQuery;
};
