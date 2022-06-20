const convert   = require('xml-js')
const fs        = require('fs');

function generateSEBConfig (courseID) {
    const xml = fs.readFileSync('template.xml', 'utf8')
    const readOptions = { ignoreComment: false, alwaysChildren: true }
    const sebConfig = convert.xml2js(xml, readOptions)
    let ruleString = ''
    const ruleArr = []
  
    const regexArr = ['([\\w\\d]+\\.)?canvas\\.kth\\.se(\\/)?$', `([\\w\\d]+\\.)?canvas\\.kth\\.se\\/courses\\/${courseID}$`, `([\\w\\d]+\\.)?canvas\\.kth\\.se\\/courses\\/${courseID}\\/assignments(\\/.*)?$`, `([\\w\\d]+\\.)?canvas\\.kth\\.se\\/courses\\/${courseID}\\/external_tools\\/retrieve\\?display=full_width&url=https%3A%2F%2Fkth.quiz-lti-dub-prod.instructure.com(.*)?$`, `([\\w\\d]+\\.)?canvas\\.kth\\.se\\/courses\\/${courseID}\\/modules(\\/.*)?$`, `([\\w\\d]+\\.)?canvas\\.kth\\.se\\/courses\\/${courseID}\\/modules/items/([0-9]+)?$`, `([\\w\\d]+\\.)?canvas\\.kth\\.se\\/courses\\/${courseID}\\/modules\\#module_([0-9]+)$`, `([\\w\\d]+\\.)?canvas\\.kth\\.se\\/courses\\/${courseID}\\/pages\\/([a-zA-Z0-9_.-]+)\\?module_item_id=([0-9]+)$`, `([\\w\\d]+\\.)?canvas\\.kth\\.se\\/courses\\/${courseID}\\/quizzes(\\/.*)?$`, `([\\w\\d]+\\.)?canvas\\.kth\\.se\\/courses\\/${courseID}\\/student_view(\\/.*)?$`, `([\\w\\d]+\\.)?canvas\\.kth\\.se\\/courses\\/${courseID}\\/test_student(\\/.*)?$`, '([\\w\\d]+\\.)?canvas\\.kth\\.se\\/login(\\/.*)?$', '([\\w\\d]+\\.)?kth\\.mobius\\.cloud(\\/.*)?$', '([\\w\\d]+\\.)?login\\.sys\\.kth\\.se(\\/.*)?$', '([\\w\\d]+\\.)?login\\.ug\\.kth\\.se(\\/.*)?$', '([\\w\\d]+\\.)?saml-5\\.sys\\.kth\\.se(\\/.*)?$', '([\\w\\d]+\\.)?saml-5\\.ug\\.kth\\.se(\\/.*)?$', '([\\w\\d]+\\.)?sso\\.canvaslms\\.com\\/delegated_auth_pass_through\\?target=(.*)$', `([\\w\\d]+\\.)?canvas\\.kth\\.se\\/courses\\/${courseID}\\/files\\/([a-zA-Z0-9_.-]+)\\?module_item_id=([0-9]+)$`]
  
    const stencilRuleObj = {
      type: 'element',
      name: 'dict',
      elements: [
        { type: 'element', name: 'key', elements: [{ type: 'text', text: 'active' }] },
        { type: 'element', name: 'true', elements: [] },
        { type: 'element', name: 'key', elements: [{ type: 'text', text: 'regex' }] },
        { type: 'element', name: 'true', elements: [] },
        { type: 'element', name: 'key', elements: [{ type: 'text', text: 'expression' }] },
        { type: 'element', name: 'string', elements: [{ type: 'text', text: '' }] },
        { type: 'element', name: 'key', elements: [{ type: 'text', text: 'action' }] },
        { type: 'element', name: 'integer', elements: [{ type: 'text', text: '1' }] }
      ]
    }
    sebConfig.elements[1].elements[0].elements[3].elements[0].text = `https://canvas.kth.se/courses/${courseID}`// starturl
    sebConfig.elements[1].elements[0].elements[237].elements = [] // purge existing rules
  
    for (let i = 0; i < regexArr.length; i++) {
      const rule = JSON.parse(JSON.stringify(stencilRuleObj))
      rule.elements[5].elements[0].text = regexArr[i]
      sebConfig.elements[1].elements[0].elements[237].elements.push(rule)
    }
  
    for (let i = 0; i < sebConfig.elements[1].elements[0].elements[237].elements.length; i++) {
      ruleArr.push(sebConfig.elements[1].elements[0].elements[237].elements[i].elements[5].elements[0].text)
      ruleString = ruleArr.join(';')
    }
  
    sebConfig.elements[1].elements[0].elements[245].elements[0].text = ruleString
  
    return(sebConfig)
  }

  module.exports = { generateSEBConfig }