# PostgreSQL to MySQL Migration Guide

## Summary of Changes Made

### 1. Package Dependencies Updated
- ✅ Removed: `pg`, `pg-hstore` (PostgreSQL drivers)
- ✅ Added: `mysql2` (MySQL driver)

### 2. Database Configuration Updated
- ✅ **File**: `src/config/config.js`
  - Changed dialect from `postgres` to `mysql`
  - Removed SSL configuration (PostgreSQL specific)
  - Updated default port to 3306

### 3. Sequelize Service Updated
- ✅ **File**: `src/modules/db/sequelize.service.ts`
  - Changed dialect from `postgres` to `mysql`
  - Removed SSL configuration
  - Updated default port to 3306

### 4. Entity Models Updated
- ✅ **File**: `src/models/user.entity.ts`
  - Changed `ARRAY(DataTypes.STRING)` to `DataTypes.JSON` for role field
  - Added missing `email` column declaration

- ✅ **File**: `src/models/file.entity.ts`
  - Added proper UUID handling for MySQL using `DataTypes.STRING(36)`
  - Added UUID default value generation

### 5. Docker Configuration Updated
- ✅ **File**: `docker-compose.yml`
  - Changed from PostgreSQL 15.2 to MySQL 8.0
  - Updated environment variables for MySQL
  - Added persistent volume for MySQL data

### 6. Migration Files Created
- ✅ Created MySQL-compatible migration files in `src/migrations/mysql/`
- ✅ Created MySQL-compatible seeder files in `src/seeders/mysql/`

## Database Structure

### Tables Created:

1. **User Table**
   - `id`: INT AUTO_INCREMENT PRIMARY KEY
   - `role`: JSON (stores array as JSON)
   - `firstName`: VARCHAR(255)
   - `lastName`: VARCHAR(255) 
   - `email`: VARCHAR(255) UNIQUE
   - `phoneNumber`: VARCHAR(255) UNIQUE
   - `password`: VARCHAR(255)
   - `createdAt`: DATETIME
   - `updatedAt`: DATETIME

2. **News Table**
   - `id`: INT AUTO_INCREMENT PRIMARY KEY
   - `title`: VARCHAR(255)
   - `body`: TEXT
   - `thumbnail`: VARCHAR(255)
   - `createdAt`: DATETIME
   - `updatedAt`: DATETIME

3. **Events Table**
   - `id`: INT AUTO_INCREMENT PRIMARY KEY
   - `title`: VARCHAR(255)
   - `body`: TEXT
   - `thumbnail`: VARCHAR(255)
   - `createdAt`: DATETIME
   - `updatedAt`: DATETIME

4. **file Table**
   - `id`: VARCHAR(36) PRIMARY KEY (UUID)
   - `filename`: VARCHAR(255)
   - `size`: INT
   - `path`: VARCHAR(255)
   - `createdAt`: DATETIME
   - `updatedAt`: DATETIME

## Next Steps

### 1. Set Up MySQL Database

**Option A: Using Docker Compose (Recommended)**
```bash
# Start MySQL container
docker-compose up db -d

# Connect to MySQL container
docker exec -it mo-api-db-1 mysql -uroot -prootpass

# Create database
CREATE DATABASE mo_api CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

**Option B: Using Local MySQL Installation**
```bash
# Connect to MySQL
mysql -u root -p

# Create database and user
CREATE DATABASE mo_api CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'appuser'@'localhost' IDENTIFIED BY 'apppass';
GRANT ALL PRIVILEGES ON mo_api.* TO 'appuser'@'localhost';
FLUSH PRIVILEGES;
```

### 2. Apply Database Structure

**Option A: Using the SQL Script**
```bash
# Apply the database structure
mysql -u appuser -p mo_api < mysql_database_structure.sql
```

**Option B: Using Sequelize CLI**
```bash
# Run migrations
npx sequelize-cli db:migrate --migrations-path src/migrations/mysql/

# Run seeders
npx sequelize-cli db:seed:all --seeders-path src/seeders/mysql/
```

### 3. Update Environment Variables

Create/update your `.env` file:
```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=mo_api
DB_USER=appuser
DB_PASSWORD=apppass
JWT_SECRET_KEY=your_jwt_secret_key
PORT=8080
```

### 4. Test the Application

```bash
# Start the application
yarn start:dev

# The application should now connect to MySQL instead of PostgreSQL
```

## Key Differences from PostgreSQL

1. **Array Storage**: PostgreSQL arrays are now stored as JSON in MySQL
2. **UUID Generation**: MySQL uses `VARCHAR(36)` with `UUID()` function instead of native UUID type
3. **Auto-timestamps**: MySQL uses `CURRENT_TIMESTAMP` and `ON UPDATE CURRENT_TIMESTAMP`
4. **Character Set**: Using `utf8mb4` for full Unicode support including emojis

## Potential Issues to Watch

1. **Role Field Access**: Since roles are now stored as JSON, make sure your application properly handles JSON serialization/deserialization
2. **UUID Generation**: Ensure UUID generation works properly in your application code
3. **Date Handling**: MySQL datetime handling might differ slightly from PostgreSQL timestamps

Your migration is now complete! The application should work with MySQL instead of PostgreSQL.
