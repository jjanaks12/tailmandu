
export const showImage = (fileName: string) => {
    const { public: { serverUrl } } = useRuntimeConfig()

    return fileName ? serverUrl + 'resources/images/' + fileName : ''
}

export const getGPXFile = (fileName: string) => {
    const { public: { serverUrl } } = useRuntimeConfig()

    return fileName ? serverUrl + 'resources/gpx/' + fileName : ''
}

export const strToTest = ['data', 'base64']
// const isBase64 = (str: string) => /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/.test(str)
const isBase64 = (str: string) => strToTest.map(testStr => str.includes(testStr)).filter(isTrue => isTrue).length == strToTest.length