const storage = require("./storage");

storage.put("First","FirstPlayer");
storage.put("Second","SecondPlayer");
storage.update("First","ChangedFirstPlayer");
//console.log(storage.get("First"));
storage.del("Second");
//storage.clear();
storage.save();
storage.load();
storage.put("last","lastPlayer");
storage.save();
storage.load();
console.log(storage.getAll());

