import AWS from 'aws-sdk';
import createError from 'http-errors';
import commonMiddleware from '../lib/commonMiddleware';

const dynamoDB = new AWS.DynamoDB.DocumentClient();

async function getAuctions(event, context) {
  let auctions;

  try {
    const result = await dynamoDB.scan( {
        TableName: process.env.AUCTIONS_TABLE_NAME
    } ).promise();

    auctions = result.Items
  } catch (error) {
    console.error( error );

    throw new createError.InternalServerError(error);
  }

  return {
    statusCode: 201,
    body: JSON.stringify( auctions ), // es preciso utilizar el JSON
  };
}


export const handler = commonMiddleware(getAuctions);


