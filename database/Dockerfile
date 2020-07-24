FROM mongo

COPY . .

CMD mongoimport --collection processadors --file ./cpuSeeds.json --jsonArray --uri "mongodb://mongo:27017" && mongoimport --collection lojas --file ./storeSeeds.json --uri "mongodb://mongo:27017"