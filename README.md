# IMF Gadget API 🚀
A secure API for managing the Impossible Missions Force (IMF) gadget inventory using Node.js, Express, PostgreSQL, and Sequelize ORM.

## Deployed API Link
https://imf-gadget-api-raev.onrender.com/

## Features
- Gadget Inventory Management
  - Retrieve all gadgets with a random mission success probability.
  - Add new gadgets with a randomly generated codename.
  - Update existing gadgets.
  - Soft-delete (decommission) gadgets instead of actual deletion.
- Self-Destruct Mechanism
  - Trigger a self-destruct sequence for any gadget with a confirmation code.

## Prerequisites
Ensure you have the following installed before proceeding:
- Node.js
- PostgreSQL (Ensure it's running on your system)
- Sequelize CLI (for database migrations)

## Installation & Setup
1. Clone the Repository and Install Dependencies
```sh
git clone https://github.com/your-repo/imf-gadgets-api.git
cd imf-gadgets-api
npm install
```

2. Configure Environment Variables
Create a .env file in the root directory and add your PostgreSQL credentials:
```env
NODE_ENV=development
APP_PORT=3000
 
DB_PORT=5432
DB_HOST=localhost
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=imf_gadgets
```

## Database Setup
1. Create Database
```sh
npx sequelize-cli db:create
```
2. Generate Model & Migration File
```sh
npx sequelize-cli model:generate --name Gadget --attributes "id:uuid, name:string, status:string"
```
This will create:
- Model File → models/gadget.js
- Migration File → migrations/YYYYMMDDHHMMSS-create-gadget.js
3. Modify Migration File
After generating the migration file, edit it to ensure:
- id is a UUID and auto-generated.
- status is an ENUM ("Available", "Deployed", "Destroyed", "Decommissioned")
- Add decommissionedAt (nullable date) for soft deletion.
4. Run Migrations
```sh
npx sequelize-cli db:migrate
```
5. Undo the Last Migration (If Needed)
```sh
npx sequelize-cli db:migrate:undo
```

## Running the API
Start the Server
```sh
npm run start:dev
```

## API Endpoints
1. Retrieve All Gadgets
GET /gadgets
📌 Retrieves a list of all gadgets with a random mission success probability.

Example Request
```sh
curl -X GET http://localhost:3000/gadgets
```
Example Response
```json
[
  {
    "id": "205fd50c-bd03-4d2c-b219-fb7f1d5346a3",
    "name": "Silent Hawk",
    "status": "Available",
    "createdAt": "2025-01-30T18:11:15.654Z",
    "updatedAt": "2025-01-30T18:11:15.654Z",
    "decommissionedAt": null,
    "missionSuccessProbability": "32% success probability"
  }
]
```
2. Retrieve Gadgets by Status
GET /gadgets?status={status}
📌 Retrieves gadgets filtered by their status (Available, Deployed, Destroyed, Decommissioned).

Example Request
```sh
curl -X GET "http://localhost:3000/gadgets?status=Available"
```

3. Add a New Gadget
POST /gadgets
📌 Adds a new gadget with a randomly generated codename.

Example Request
```sh
curl -X POST http://localhost:3000/gadgets
```
Example Response
```json
{
  "id": "971f9bba-e81b-485b-96f3-21d87df29129",
  "name": "The Nightingale",
  "status": "Available",
  "createdAt": "2025-01-30T18:40:28.244Z",
  "updatedAt": "2025-01-30T18:40:28.244Z",
  "decommissionedAt": null
}
```

4. Update a Gadget
PATCH /gadgets/:id
📌 Updates the status of an existing gadget.

Example Request
```sh
curl -X PATCH http://localhost:3000/gadgets/971f9bba-e81b-485b-96f3-21d87df29129 \
     -H "Content-Type: application/json" \
     -d '{"status": "Deployed"}'
```
Example Response
```json
{
  "id": "971f9bba-e81b-485b-96f3-21d87df29129",
  "name": "The Nightingale",
  "status": "Deployed",
  "updatedAt": "2025-01-30T19:00:00.000Z"
}
```
5. Decommission (Soft Delete) a Gadget
DELETE /gadgets/:id
📌 Marks a gadget as "Decommissioned" instead of actually deleting it.

Example Request
```sh
curl -X DELETE http://localhost:3000/gadgets/971f9bba-e81b-485b-96f3-21d87df29129
```
Example Response
```json
{
  "message": "Gadget decommissioned successfully",
  "gadget": {
    "id": "971f9bba-e81b-485b-96f3-21d87df29129",
    "status": "Decommissioned",
    "decommissionedAt": "2025-01-30T19:15:00.000Z"
  }
}
```
6. Trigger Self-Destruct for a Gadget
POST /gadgets/:id/self-destruct
📌 Simulates a self-destruct sequence for a gadget and returns a confirmation code.

Example Request
```sh
curl -X POST http://localhost:3000/gadgets/971f9bba-e81b-485b-96f3-21d87df29129/self-destruct
```
Example Response
```json
{
  "message": "Self-destruct sequence initiated for The Nightingale",
  "confirmationCode": "XJ82LK"
}
```

## License
This project is licensed under the MIT License.

🚀 Mission Accomplished! Your IMF API is now fully documented! Let me know if you need any updates. 
