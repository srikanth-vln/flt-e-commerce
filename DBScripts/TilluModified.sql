CREATE TABLE Users (
	UserID INT
	,FirstName VARCHAR(max)
	,LastName VARCHAR(max)
	,userName VARCHAR(max)
	,password VARCHAR(max)
	,CreatedOn DATETIME
	)

INSERT INTO Users
VALUES (
	7911
	,'Tillu'
	,'Blaster'
	,'admin'
	,'admin'
	,GETDATE()
	)

GO
CREATE PROC validateUser @UserName VARCHAR(max)
	,@Password VARCHAR(max)
AS
BEGIN
	SELECT *
	FROM dbo.Users U
	WHERE U.userName = @UserName
		AND U.password = @Password
END

CREATE TABLE productsOfUserTransaction (
	userID INT
	,productID INT
	,UpdatedOn DATETIME
	)

CREATE PROC updateProductsOfUser @Input NVARCHAR(max)
	,@UserName VARCHAR(max)
AS
BEGIN
	DECLARE @userID INT = (
			SELECT UserID
			FROM Users
			WHERE userName = @UserName
			)

	DELETE
	FROM productsOfUserTransaction
	WHERE userID = @userID

	INSERT INTO productsOfUserTransaction (
		userID
		,productID
		,UpdatedOn
		)
	SELECT @userID
		,[id]
		,GETDATE()
	FROM OPENJson(@Input) WITH (ID INT '$.id')
END


CREATE PROC getCartItems @userName VARCHAR(max)
AS
BEGIN
	SELECT P.id
		,P.amount
		,P.description
		,P.IMAGE
		,P.title
	FROM productsOfUserTransaction PUT
	JOIN Users U ON U.UserID = PUT.userID
	JOIN products P ON P.id = PUT.productID
	WHERE U.userName = @userName
END