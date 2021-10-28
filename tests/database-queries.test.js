const dbQueries = require("../model/database-queries"); // Database layer testing

test("should return collection of 4 elements after performing 'Read' operations on tables", async () => {
    // Arrange
    const expected = 4
    let actual = []
    
    // Act
    await dbQueries.getSketches().then((resp) => { actual.push(resp) })
    await dbQueries.getDrafts().then((resp) => { actual.push(resp) })
    await dbQueries.getOrders().then((resp) => { actual.push(resp) })
    await dbQueries.getMailbox().then((resp) => { actual.push(resp) })

    // Assert
    expect(actual.length).toBe(expected);
});

test("should return total collection of 4 elements after performing 'Create' operation on tables", async () => {
    // Arrange
    const expected = 4
    let actual = []
    
    // Act
    await dbQueries.addSketch({}).then((resp) => { actual.push(resp[0]) })
    await dbQueries.addDraft({}).then((resp) => { actual.push(resp[0]) })
    await dbQueries.addOrder({}).then((resp) => { actual.push(resp[0]) })
    await dbQueries.addMailbox({}).then((resp) => { actual.push(resp[0]) })

    // Assert
    expect(actual.length).toBe(expected);
});

test("should verify if unique ID's returned when performing 'Create' operation on table", async () => {
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
    await dbQueries.addMailbox({ message: msg })
    await dbQueries.getMailbox()
    .then((response) => {
        actual = response[response.length - 1].message
    })
    
    // Assert
    expect(actual).toEqual(expected);
});

test("should verify if table has the correct number of columns", async () => {
    // Arrange
    const expected = 2
    let actual = []
    
    // Act
    await dbQueries.addSketch({});
    await dbQueries.getSketches()
    .then((response) => {
        console.log(response)
        let record = response[0]
        for (column in record) {
            actual.push(column);
        }  
    })

    // Assert
    expect(actual.length).toBe(expected);
});

test("should check if table has 'draftId' column", async () => {
    // Arrange
    const expected = "draftId"
    let actual = []
    
    // Act
    await dbQueries.addMailbox({})
    await dbQueries.getMailbox()
    .then((response) => {
        let record = response[0]
        for (column in record) {
            actual.push(column);
        }
    })
    
    // Assert
    expect(actual).toContain(expected);
});

test("should return 0 rows affected when attempting to delete a draft by passing incorrect parameter", async () => {
    // Arrange
    const expected = 0
    const param = false
    let actual;
        
    // Act
    await dbQueries.removeDraft(param)
    .then((response) => {
        actual = response
    })
    
    // Assert
    expect(actual).toBe(expected);
 });

 test("should return 1 row affected when performing delete operation by passing valid draft", async () => {
    // Arrange
    const expected = 1
    let draftID;
    let actual;
        
    // Act
    await dbQueries.addDraft({})
    .then((resp) => {
        draftID = resp[0] })
    await dbQueries.removeDraft(draftID)
    .then((resp) => {
        actual = resp
    })
    
    // Assert
    expect(actual).toBe(expected);
 });