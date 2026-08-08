-- One-time setup, run in SSMS as a sysadmin (e.g. your Windows account),
-- AFTER switching the server to "SQL Server and Windows Authentication mode"
-- (Server properties -> Security) and restarting the SQL Server service.
--
-- Creates a login that can only access ChattingAppDb, and only with the
-- permissions the app needs (read/write data, not schema changes).

USE master;
GO

IF NOT EXISTS (SELECT 1 FROM sys.server_principals WHERE name = 'chattingapp_user')
BEGIN
    CREATE LOGIN chattingapp_user WITH PASSWORD = 'ChangeMe_StrongPassword123!', CHECK_POLICY = ON;
END
GO

USE ChattingAppDb;
GO

IF NOT EXISTS (SELECT 1 FROM sys.database_principals WHERE name = 'chattingapp_user')
BEGIN
    CREATE USER chattingapp_user FOR LOGIN chattingapp_user;
END
GO

ALTER ROLE db_datareader ADD MEMBER chattingapp_user;
ALTER ROLE db_datawriter ADD MEMBER chattingapp_user;
GO
