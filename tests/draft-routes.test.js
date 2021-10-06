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

test("should return 0 rows affected when attempting to delete a draft by passing large number as parameter", async () => {
    // Arrange
    const expected = 0
    const largeNumber = 3213344455577788
    let actual;
        
    // Act
    await dbQueries.removeDraft(largeNumber)
    .then((response) => {
        actual = response
    })
    
    // Assert
    expect(actual).toBe(expected);
 });