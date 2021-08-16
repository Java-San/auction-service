import getEndedAuctions from '../lib/getEndedAuctions';

async function processAuctions( event, context ){
    const auctionsToClose = await getEndedAuctions();

    console.log( 'acutions to close', auctionsToClose );

    
}

export const handler = processAuctions;