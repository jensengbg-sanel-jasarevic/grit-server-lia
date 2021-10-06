const supertest = require("supertest"); // Module for testing HTTP. Use to test Business Logic (API) layer of app. 
const app = require("../api/server"); // Express server
const dbQueries = require("../model/database-queries"); // Database layer testing

test("should return correct draft when passing parameter to dynamic URL", async () => {
    // Arrange
    const expected = 1
    const param = expected
    let actual;
    
    // Act
    dbQueries.addSketchToDrafts({});
    await supertest(app).get('/api/drafts/' + param)
    .then((response) => {
        actual = response.body.id
     })

     // Assert
     expect(actual).toBe(expected);
    });
