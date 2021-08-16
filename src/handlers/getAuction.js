import AWS from 'aws-sdk';
import createError from 'http-errors';
import commonMiddleware from '../lib/commonMiddleware';

const dynamoDB = new AWS.DynamoDB.DocumentClient();

export async function getAuctionById( id ){
    let auction;

    try{
        const result = await dynamoDB.get({
            TableName: process.env.AUCTIONS_TABLE_NAME,
            Key: { id }
        }).promise();  
    
        auction = result.Item;
    
        if( !auction ){
            throw new createError.NotFound( `Auction with id "${id}" not found!` );
        }
    } catch ( error ){
        console.error( error );
    
        throw new createError.InternalServerError( error );
    }

    return auction;
};

async function getAuction(event, context) {
    const { id } = event.pathParameters;

    const auction = await getAuctionById(id);

    return {
        statusCode: 200,
        body: JSON.stringify( auction ), // es preciso utilizar el JSON
    };
};

export const handler = commonMiddleware(getAuction);

