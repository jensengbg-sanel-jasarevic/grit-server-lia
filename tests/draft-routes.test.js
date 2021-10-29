const app = require("../api/server"); // Express server 
const supertest = require("supertest"); // Module for testing HTTP. Use to test Business Logic (API) layer of app. 
const dbQueries = require("../model/database-queries"); // Database layer testing

test("should return HTTP 200 when hitting endpoint that gets all drafts", async () => {
    // Arrange
    const expected = 200
    let actual;
        
    // Act
    await supertest(app).get('/api/drafts')
    .then((resp) => {
        actual = resp.statusCode
    })

    // Assert
    expect(actual).toBe(expected);
});

test("should return HTTP 500 if attempting to hit delete endpoint without passing payload", async () => {
    // Arrange
    const expected = 500
    let actual;
            
    // Act
    await supertest(app).delete('/api/drafts/')
    .then((resp) => {
        actual = resp.statusCode
    })

    // Assert
    expect(actual).toBe(expected);
});

test("should return HTTP 200 when hitting delete endpoint with valid payload", async () => {
    // Arrange
    const expected = 200
    let draft;
    let actual;
            
    // Act
    await dbQueries.addDraft({})
    .then((res) => {
        draft = res[0]
    })
    await supertest(app).delete('/api/drafts/')
    .send({ id: draft })
    .then((resp) => {
        actual = resp.statusCode
    })

    // Assert
    expect(actual).toBe(expected);
});