import { MongoClient } from "mongodb";

//updates document
const updateCardPrice = async () => {
    const client = await MongoClient.connect('mongodb://localhost:27017/');
    const coll = client.db("project2").collection("tournaments");

    const pipeline = [
        {
            $unwind: "$decks"
        },
        {
            $unwind: "$decks.cards"
        },
        {
            $group: {
                _id: null,
                averagePrice: { $avg: { $toDouble: "$decks.cards.price" } }
            }
        }
    ];

    const result = await coll.aggregate(pipeline).toArray();
    
    if (result.length > 0) {
        console.log(`Average price of all cards: ${result[0].averagePrice.toFixed(2)}`);
    } else {
        console.log("No cards found");
    }
    
    await client.close();
};

updateCardPrice();
