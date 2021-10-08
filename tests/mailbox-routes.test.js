const app = require("../api/server"); // Express server
const supertest = require("supertest"); // Module for testing HTTP. Use to test Business Logic (API) layer of app. 

test("should return HTTP 200 when hitting endpoints that gets the mails", async () => {
    // Arrange
    const expected = [ 200, 200 ]
    let actual = []
    
    // Act
    await supertest(app).get('/api/mailbox/contacts').then((resp) => { actual.push(resp.statusCode) })
    await supertest(app).get('/api/mailbox/client').then((resp) => { actual.push(resp.statusCode) })

     // Assert
     expect(actual).toStrictEqual(expected);
});

test("should return HTTP 200 when hitting post endpoints with required data", async () => {
    // Arrange
    const expected = [ 200, 200 ]
    let actual = []
    
    // Act
    await supertest(app).post('/api/mailbox/client')
    .send({ text: "abc", textId: 1, filename: "abc.png" })
    .then((resp) => {
        actual.push(resp.statusCode)
    })
    await supertest(app).post('/api/mailbox/contacts')
    .send({ text: "qwe", textId: 2, filename: "qwe.png" })
    .then((resp) => {
        actual.push(resp.statusCode)
    })

     // Assert
     expect(actual).toStrictEqual(expected);
});

test("should return HTTP 400 when hitting post endpoints without passing required data", async () => {
    // Arrange
    const expected = [ 400, 400 ]
    let actual = []
    
    // Act
    await supertest(app).post('/api/mailbox/client')
    .then((resp) => { actual.push(resp.statusCode) 
    })
    await supertest(app).post('/api/mailbox/contacts')
    .then((resp) => { actual.push(resp.statusCode) 
    })

     // Assert
     expect(actual).toStrictEqual(expected);
});