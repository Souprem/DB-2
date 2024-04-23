import { MongoClient } from "mongodb";
const client = await MongoClient.connect(
    'mongodb://localhost:27017/'
  );

//returns all tournaments for John Gomez
//counting documents for a specific user
const coll = client.db("project2").collection("tournaments");
const query = {
    "decks.player.playerName": "John Gomez"
};
const count = await coll.countDocuments(query);
console.log(`Number of tournaments for John Gomez: ${count}`);
await client.close();