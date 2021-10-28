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

test("should return HTTP 200 when hitting post endpoint with required data", async () => {
    // Arrange
    const expected = 200 
    let actual;
    
    // Act
    await supertest(app).post('/api/mailbox')
    .send({ text: "abc", draftId: 1, filename: "abc.png" })
    .then((resp) => {
        actual = resp.statusCode
    })

     // Assert
     expect(actual).toStrictEqual(expected);
});

test("should return HTTP 400 when hitting post endpoint without passing required data", async () => {
    // Arrange
    const expected = 400
    let actual;
    
    // Act
    await supertest(app).post('/api/mailbox')
    .then((resp) => { 
        actual = resp.statusCode 
    })

     // Assert
     expect(actual).toStrictEqual(expected);
});