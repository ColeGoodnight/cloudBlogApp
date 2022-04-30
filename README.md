# 497U_Assignment1

DB/Auth strategy:
We chose to use postgres as the team has some prior experience with this 
database in production, as opposed to mysql. In addition we used sequelize
in place of mongoose in the original application, as this was an easier
transition to make compared to ditching the ORM concept entirely. In terms of
authentication, we chose to expand upon the functionality of the passport 
framework that was already implemented, this involved creating custom signup 
and signin strategies to accomodate our usage of sequelize. 

Link: https://ec2-34-220-69-95.us-west-2.compute.amazonaws.com:4000

Non-working:
Issues with the username/password validation that is handled by sequelize - otherwise functional.
