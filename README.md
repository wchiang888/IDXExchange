# IDX Exchange Project — Wen Hao Chiang

## Project Overview
This repository contains my individual work for the IDX Exchange internship project.
The project involves working with real estate MLS data (properties and open houses)
stored in a MySQL database, with a Python backend for data access and analysis.

## Objectives
- Set up a local MySQL 8 database using Docker
- Import and explore MLS property and open house data
- Build Python scripts and/or notebooks to query and analyze the data
- Document findings and progress throughout the internship

## Tech Stack
- Docker Desktop (containerized MySQL 8)
- MySQL 8
- Python (coming soon)

## Database Setup
See [SETUP.md](./SETUP.md) for full instructions on how to run the MySQL container
and import the required data.

### Quick Reference
```bash
docker run --name idx-mysql-local \
  -e MYSQL_ROOT_PASSWORD=yourpassword \
  -e MYSQL_DATABASE=rets \
  -p 3306:3306 \
  -d mysql:8
```

## Repository Structure
