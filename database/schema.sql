-- Run this script in SQL Server Management Studio (or sqlcmd) against your
-- local SQLEXPRESS instance to create the ChattingAppDb database and tables.

IF DB_ID('ChattingAppDb') IS NULL
BEGIN
    CREATE DATABASE ChattingAppDb;
END
GO

USE ChattingAppDb;
GO

IF OBJECT_ID('dbo.ReadReceipts', 'U') IS NOT NULL DROP TABLE dbo.ReadReceipts;
IF OBJECT_ID('dbo.Messages', 'U') IS NOT NULL DROP TABLE dbo.Messages;
IF OBJECT_ID('dbo.GroupMembers', 'U') IS NOT NULL DROP TABLE dbo.GroupMembers;
IF OBJECT_ID('dbo.Chats', 'U') IS NOT NULL DROP TABLE dbo.Chats;
IF OBJECT_ID('dbo.Users', 'U') IS NOT NULL DROP TABLE dbo.Users;
GO

CREATE TABLE dbo.Users (
    Id            INT IDENTITY(1,1) PRIMARY KEY,
    Name          NVARCHAR(100)   NOT NULL,
    Email         NVARCHAR(256)   NOT NULL UNIQUE,
    AvatarUrl     NVARCHAR(512)   NULL,
    CreatedAt     DATETIME2       NOT NULL DEFAULT SYSUTCDATETIME()
);
GO

CREATE TABLE dbo.Chats (
    Id            INT IDENTITY(1,1) PRIMARY KEY,
    IsGroup       BIT             NOT NULL DEFAULT 0,
    Name          NVARCHAR(200)   NULL,           -- group chats only
    CreatedAt     DATETIME2       NOT NULL DEFAULT SYSUTCDATETIME()
);
GO

CREATE TABLE dbo.GroupMembers (
    ChatId        INT             NOT NULL REFERENCES dbo.Chats(Id) ON DELETE CASCADE,
    UserId        INT             NOT NULL REFERENCES dbo.Users(Id) ON DELETE CASCADE,
    JoinedAt      DATETIME2       NOT NULL DEFAULT SYSUTCDATETIME(),
    PRIMARY KEY (ChatId, UserId)
);
GO

CREATE TABLE dbo.Messages (
    Id            INT IDENTITY(1,1) PRIMARY KEY,
    ChatId        INT             NOT NULL REFERENCES dbo.Chats(Id) ON DELETE CASCADE,
    SenderId      INT             NOT NULL REFERENCES dbo.Users(Id),
    Text          NVARCHAR(MAX)   NOT NULL,
    SentAt        DATETIME2       NOT NULL DEFAULT SYSUTCDATETIME()
);
GO

CREATE INDEX IX_Messages_ChatId_SentAt ON dbo.Messages(ChatId, SentAt);
GO

CREATE TABLE dbo.ReadReceipts (
    MessageId     INT             NOT NULL REFERENCES dbo.Messages(Id) ON DELETE CASCADE,
    UserId        INT             NOT NULL REFERENCES dbo.Users(Id),
    ReadAt        DATETIME2       NOT NULL DEFAULT SYSUTCDATETIME(),
    PRIMARY KEY (MessageId, UserId)
);
GO
