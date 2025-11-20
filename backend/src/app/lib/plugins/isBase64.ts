const strToTest = ['data', 'base64']
// const isBase64 = (str: string) => /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/.test(str)
export const isBase64 = (str: string) => strToTest.map(testStr => str.includes(testStr)).filter(isTrue => isTrue).length == strToTest.length