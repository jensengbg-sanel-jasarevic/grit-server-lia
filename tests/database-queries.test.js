const dbQueries = require("../model/database-queries");


test("should check if table has column named 'filename'", async () => {
    // Arrange
    const expected = "filename"
    let actual = []
    
    // Act
    await dbQueries.getSketches()
    .then((response) => {
        let record = response[0]
        for (column in record) {
            actual.push(column);
        }
    })
    
    // Assert
    expect(actual).toContain(expected);
});