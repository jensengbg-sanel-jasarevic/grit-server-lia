const supertest = require("supertest"); // Module for testing HTTP. Use to test Business Logic (API) layer of app. 
const app = require("../api/server"); // Express server
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

test("GET endpoint should return the correct filename when adding new record to database", async () => {
  // Arrange
  const expected = "ipsum.png"
  let actual;

  // Act
  await dbQueries.addSketch({ filename: "ipsum.png" });
  await supertest(app).get("/api/sketches")
    .then((response) => {
  actual = response.body[response.body.length - 1].filename
  });

  // Assert
  expect(actual).toEqual(expected);
});
