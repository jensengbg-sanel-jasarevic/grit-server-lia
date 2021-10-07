const app = require("../api/server"); // Express server
const supertest = require("supertest"); // Module for testing HTTP. Use to test Business Logic (API) layer of app. 

test("should return HTTP 404 if attempting to get a non-existing file from endpoint", async () => {
    // Arrange
    const expected = 404
    const nonExisting = "OaemvJA7z3YFFbFbOrU9Tam"
    let actual;

    // Act
    await supertest(app).get('/api/storage/space/' + nonExisting)
    .then((resp) => {
        actual = resp.statusCode
    })

    // Assert
    expect(actual).toBe(expected);
});

test("should return HTTP 403 if attempting to get files without passing valid parameter", async () => {
    // Arrange
    const expected = 403
    let actual;

    // Act
    await supertest(app).get('/api/storage/space')
    .then((resp) => {
        actual = resp.statusCode
    })

    // Assert
    expect(actual).toBe(expected);
});