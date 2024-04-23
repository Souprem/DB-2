import { MongoClient } from "mongodb";
const client = await MongoClient.connect(
    'mongodb://localhost:27017/'
  );

//gets average card price for each tournament
//uses aggregation
const coll = client.db("project2").collection("tournaments");
const agg = [
    { $unwind: "$decks" },
    { $unwind: "$decks.cards" },
    {
        $group: {
            _id: "$tournamentName",
            averagePrice: { $avg: { $toInt: "$decks.cards.price" } }
        }
    },
    {
        $project: {
            tournamentName: "$_id",
            averagePrice: 1,
            _id: 0
        }
   }
];
const cursor = coll.aggregate(agg);
const result = await cursor.toArray();
console.log(result);
await client.close();