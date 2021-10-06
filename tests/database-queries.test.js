const dbQueries = require("../model/database-queries"); // Database layer testing

test("should verify if unique IDs returning when performing database query to create", async () => {
    // Arrange
    let actual = []
    
    // Act
    await dbQueries.addSketch({})
    .then((res) => {
        actual.push(res[0])
    })
    await dbQueries.addSketch({})
    .then((res) => {
        actual.push(res[0])
    })
    
    // Assert
    expect(actual[0]).not.toEqual(actual[actual.length - 1])
});

test("should check if correct message is stored in table", async () => {
    // Arrange
    const expected = "text"
    const msg = expected
    let actual;
    
    // Act
    await dbQueries.addToContactsMailbox({ messages: msg })
    await dbQueries.getContactsMailbox()
    .then((response) => {
        actual = response[response.length - 1].messages
    })
    
    // Assert
    expect(actual).toEqual(expected);
});

test("should verify if table has the correct number of columns", async () => {
    // Arrange
    const expected = 5
    let actual = []
    
    // Act
    await dbQueries.addSketch({});
    await dbQueries.getSketches()
    .then((response) => {
        let record = response[0]
        for (column in record) {
            actual.push(column);
        }  
    })

    // Assert
    expect(actual.length).toBe(expected);
});

test("should check if table has column named 'filename'", async () => {
    // Arrange
    const expected = "filename"
    let actual = []
    
    // Act
    await dbQueries.addSketch({});
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

test("should check if table has 'messagesId' column", async () => {
    // Arrange
    const expected = "messagesId"
    let actual = []
    
    // Act
    await dbQueries.addToContactsMailbox({})
    await dbQueries.getContactsMailbox()
    .then((response) => {
        let record = response[0]
        for (column in record) {
            actual.push(column);
        }
    })
    
    // Assert
    expect(actual).toContain(expected);
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