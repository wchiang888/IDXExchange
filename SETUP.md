# Local Database Setup

## Requirements
- Docker Desktop installed and running
- Access to `rets_property.sql` and `rets_openhouse.sql` (not included in repo)

## Step 1 — Start the MySQL Container
```bash
docker run --name idx-mysql-local \
  -e MYSQL_ROOT_PASSWORD=yourpassword \
  -e MYSQL_DATABASE=rets \
  -p 3306:3306 \
  -d mysql:8
```
Wait ~20 seconds for MySQL to initialize, then verify with:
```bash
docker ps
```

## Step 2 — Import the SQL Files
Navigate to the folder containing the .sql files, then run:
```bash
docker exec -i idx-mysql-local mysql -uroot -pyourpassword rets < rets_property.sql
docker exec -i idx-mysql-local mysql -uroot -pyourpassword rets < rets_openhouse.sql
```
The password warning is expected and harmless.

## Step 3 — Verify
```bash
docker exec -it idx-mysql-local mysql -uroot -pyourpassword rets
```
Then inside the MySQL shell:
```sql
SHOW TABLES;
SELECT COUNT(*) FROM rets_property;
SELECT COUNT(*) FROM rets_openhouse;
DESCRIBE rets_property;
DESCRIBE rets_openhouse;
```

## What is Docker and why use it?
Docker runs MySQL inside an isolated container rather than installing it directly
on your machine. This means there will be no version conflicts, no leftover config files, and
anyone on the team can open up the exact same environment with one command.
