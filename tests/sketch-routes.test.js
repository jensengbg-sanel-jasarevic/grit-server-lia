const app = require("../api/server"); // Express server
const supertest = require("supertest"); // Module for testing HTTP. Use to test Business Logic (API) layer of app. 
const dbQueries = require("../model/database-queries"); // Database layer testing

test("should return a data type that is array when making GET request", async () => {
  // Arrange
  const expected = true
  let actual;

  // Act
  await supertest(app).get("/api/sketches")
    .then((response) => {
  actual = Array.isArray(response.body)
  });

  // Assert
  expect(actual).toBe(expected);
});

test("should return HTTP 200 when hitting endpoint that gets all sketches", async () => {
  // Arrange
  const expected = 200
  let actual;
      
  // Act
  await supertest(app).get('/api/sketches')
  .then((resp) => {
      actual = resp.statusCode
  })

  // Assert
  expect(actual).toBe(expected);
});
