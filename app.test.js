const sebCg  = require('./configGen')
const courseID = 1234
let testConfig = sebCg.generateSEBConfig(courseID)

test('Generated config contains Course ID', () => {
  expect(testConfig.elements[1].elements[0].elements[3].elements[0].text).toContain(`https://canvas.kth.se/courses/${courseID}`);
});
test('Rules included = rules enabled', () => {
  expect(testConfig.elements[1].elements[0].elements[237].elements.length).toEqual(testConfig.elements[1].elements[0].elements[245].elements[0].text.split(';').length)
});
