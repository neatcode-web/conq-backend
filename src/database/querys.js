// and Password=CONVERT(varbinary,@password)
export const querys = {
  getUserByUserName: "SELECT * FROM UserTbl Where UserName = @username",
  getUserById: "SELECT * FROM UserTbl Where Id = @id",
  getUserByIdAndPassword: "SELECT * FROM UserTbl Where UserName = @username",
  addNewUser:
    "INSERT INTO UserTbl (UserName, Branch, Password) VALUES (@username,@branch,CONVERT(varbinary,@password));",
  getAllProducts: "SELECT TOP(500) * FROM [webstore].[dbo].[Products]",
  getProducById: "SELECT * FROM Products Where Id = @Id",
  addNewProduct:
    "INSERT INTO [webstore].[dbo].[Products] (name, description, quantity) VALUES (@name,@description,@quantity);",
  deleteProduct: "DELETE FROM [webstore].[dbo].[Products] WHERE Id= @Id",
  getTotalProducts: "SELECT COUNT(*) FROM webstore.dbo.Products",
  updateProductById:
    "UPDATE [webstore].[dbo].[Products] SET Name = @name, Description = @description, Quantity = @quantity WHERE Id = @id",
};
