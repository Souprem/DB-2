import { MongoClient } from "mongodb";

//updates document
const updateCardPrice = async () => {
    const client = await MongoClient.connect('mongodb://localhost:27017/');
    const coll = client.db("project2").collection("tournaments");

    const query = {
        "tournamentName": "Western Wizards",
        "decks.deckName": "Dragon's Lair",
        "decks.cards.name": "Ledger Shredder"
    };

    const update = {
        $set: {
            "decks.$[deck].cards.$[card].price": 50
        }
    };

    const options = {
        arrayFilters: [
            { "deck.deckName": "Dragon's Lair" },
            { "card.name": "Ledger Shredder" }
        ]
    };

    const result = await coll.updateOne(query, update, options);
    console.log(result.modifiedCount ? "Price updated successfully" : "No card found to update");
    
    await client.close();
};

updateCardPrice();
