net start MongoDB
set MONGO_URL=mongodb://localhost:27017/yourDatabaseName
meteor --settings settings.json --port 5000

cd C:\Users\Flavien\Source\Repos\SpeedBox-Meteor
pm2 start pm2.json