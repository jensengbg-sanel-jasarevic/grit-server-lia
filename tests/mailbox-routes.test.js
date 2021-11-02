const app = require("../api/server"); // Express server 
const supertest = require("supertest"); // Module for testing HTTP. Use to test Business Logic (API) layer of app. 

test("should return HTTP 200 when hitting endpoint that gets the mails", async () => {
    // Arrange
    const expected = 200
    let actual;
    
    // Act
    await supertest(app).get('/api/mailbox').then((resp) => {
        actual = resp.statusCode
     })
    
     // Assert
     expect(actual).toStrictEqual(expected);
});