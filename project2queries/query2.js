import { MongoClient } from "mongodb";
const client = await MongoClient.connect(
    'mongodb://localhost:27017/'
  );

//gets average card price for each tournament
//complex search criterion
const coll = client.db("project2").collection("tournaments");
const query = {
    $or: [
        { "decks.archetype": "Control" },
        { "decks.archetype": "Aggro" }
    ]
};
const cursor = coll.find(query);
const result = await cursor.toArray();
console.log(result);
await client.close();