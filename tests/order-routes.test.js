const supertest = require("supertest"); // Module for testing HTTP. Use to test Business Logic (API) layer of app. 
const app = require("../api/server"); // Express server
const dbQueries = require("../model/database-queries"); // Database layer testing

test("should return HTTP 200 when hitting endpoint that gets all orders", async () => {
    // Arrange
    const expected = 200
    let actual;
    
    // Act
    await supertest(app).get('/api/orders')
    .then((resp) => {
        actual = resp.statusCode
    })

     // Assert
     expect(actual).toBe(expected);
});

test("should return HTTP 201 when hitting post endpoint with valid payload", async () => {
    // Arrange
    const expected = 201
    let draft;
    let actual;
        
    // Act
    await dbQueries.addDraft({})
    .then((res) => {
        draft = res[0]
    })
    await supertest(app).post('/api/orders/')
    .send({ id: draft })
    .then((resp) => {
        actual = resp.statusCode
    })

    // Assert
    expect(actual).toBe(expected);
});

test("should return HTTP 500 when attempting to post without any payload", async () => {
    // Arrange
    const expected = 500
    let actual;
        
    // Act
    await supertest(app).post('/api/orders/')
    .then((resp) => {
        actual = resp.statusCode
    })

    // Assert
    expect(actual).toBe(expected);
});