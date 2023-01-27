const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {

  americanToBritish(text) {
    //console.log('American to British:', text)

    let translated = text

    //Replace values from 'americanOnly' file (case insensitive)
    Object.entries(americanOnly).forEach((entries) => {
      const regEx = new RegExp(`\\b(${entries[0]})\\b`, 'ig') //Regex for case insensitive
      const antiRegex = new RegExp(`-\\b(${entries[0]})\\b`, 'ig')
      if (antiRegex.test(entries[1]) == false) {
        translated = translated.replace(regEx, `<span class="highlight">${entries[1]}</span>`)
      }
    })

    //Replace values from 'americanToBritishSpelling' file (case insensitive)
    Object.entries(americanToBritishSpelling).forEach((entries) => {
      const regEx = new RegExp(`\\b(${entries[0]})\\b`, 'ig') //Regex for case insensitive
      const antiRegex = new RegExp(`-\\b(${entries[0]})\\b`, 'ig')
      if (antiRegex.test(entries[1]) == false) {
        translated = translated.replace(regEx, `<span class="highlight">${entries[1]}</span>`)
      }
    })

    //Replace values from 'americanToBritishTitles' file (case insensitive)
    Object.entries(americanToBritishTitles).forEach((entries) => {
      const regEx = new RegExp(entries[0], 'ig') //Regex for case insensitive
      let upperCaseTitle = entries[1].charAt(0).toUpperCase() + entries[1].slice(1) //Add capital letter to translated title
      translated = translated.replace(regEx, `<span class="highlight">${upperCaseTitle}</span>`)
    })

    let timeRegex = /([0-2][0-9]|[0-9]):[0-5][0-9]/gm //Regex for american time

    let times = translated.match(timeRegex) //Match american times

    if (times) { //If the text to translate math with the american time regex...
      times.forEach((time) => { //Replace all times matched
        translated = translated.replace(time, `<span class="highlight">${time.replace(':','.')}</span>`)
      })
    }

    //Return the translated text with capital letter
    return (translated.charAt(0).toUpperCase() + translated.slice(1))
  }

  britishToAmerican(text) {
    //console.log('British to American:', text)

    let translated = text

    //Replace values from 'britishOnly' file (case insensitive)
    Object.entries(britishOnly).forEach((entries) => {
      const regEx = new RegExp(`\\b(${entries[0]})\\b`, 'ig') //Regex for case insensitive
      const antiRegex = new RegExp(`-\\b(${entries[0]})\\b`, 'ig')
      if (antiRegex.test(entries[1]) == false) {
        translated = translated.replace(regEx, `<span class="highlight">${entries[1]}</span>`)
      }
    })

    //Replace values from 'americanToBritishSpelling' file (case insensitive)
    Object.entries(americanToBritishSpelling).forEach((entries) => {
      const regEx = new RegExp(`\\b(${entries[1]})\\b`, 'ig') //Regex for case insensitive
      const antiRegex = new RegExp(`-\\b(${entries[1]})\\b`, 'ig')
      if (antiRegex.test(entries[0]) == false) { //If the word have an '-' before it, then, no replace
        translated = translated.replace(regEx, `<span class="highlight">${entries[0]}</span>`)
      }
    })

    //Replace values from 'americanToBritishTitles' file (case insensitive)
    Object.entries(americanToBritishTitles).forEach((entries) => {
      const regEx = new RegExp(`\\b(${entries[1]})\\b`, 'ig')
      let upperCaseTitle = entries[0].charAt(0).toUpperCase() + entries[0].slice(1)
      translated = translated.replace(regEx, `<span class="highlight">${upperCaseTitle
      }</span>`)
    })

    let timeRegex = /([0-2][0-9]|[0-9]).[0-5][0-9]/gm //Regex for british time

    let times = translated.match(timeRegex) //Match british times

    if (times) { //If the text to translate math with the british time regex...
      times.forEach((time) => { //Replace all times matched
        translated = translated.replace(time, `<span class="highlight">${time.replace('.',':')}</span>`)
      })
    }

    //Return the translated text with capital letter
    return (translated.charAt(0).toUpperCase() + translated.slice(1))
  }
}

module.exports = Translator;