######Run prod
`npm run start-prod`

######Run dev
`npm run start-dev`

######Database setup
Create a empty database in mysql with the name **bookaway**
then run the following command
and it will setup all tabels
`npx sequelize-cli db:migrate`
You can refer to:
https://sequelize.org/master/manual/migrations.html