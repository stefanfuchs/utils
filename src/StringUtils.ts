import { NumberFormat } from 'intl'
// import Intl = require('Intl')
// const NumberFormat = Intl.NumberFormat
// Note: you only need to require the locale once
// require('intl/locale-data/jsonp/pt-BR.js');

export default class StringUtils {

  /** Merge all clusters of spaces into only one space character */
  public static mergeSpaces(str: string): string {
    return str.replace(/ +/g, " ")
  }

  /**
   * Find the index of the nth gapturing group in a regexp match
   * https://stackoverflow.com/questions/1985594/how-to-find-indices-of-groups-in-javascript-regular-expressions-match
   * @static
   * @param {*} match
   * @param {*} n
   * @returns
   * @memberof StringUtils
   */
  public static indexOfGroup(match: RegExpMatchArray, n: number): number {
    var ix = match.index
    for (var i = 1; i < n; i++)
      ix += match[i].length
    return ix
  }

  /**
   * Returns an array of strings, containing all the words combined with all the prefixes
   *
   * @static
   * @param {string[]} words
   * @param {string[]} prefixes
   * @returns
   * @memberof RealEstateDescriptionAnalyzer
   */
  public static getWordsWithPrefixes(prefixes: string[], words: string[]) {
    const wordsWithPrefixes: string[] = []
    for (const word of words) {
      for (const prefix of prefixes) {
        wordsWithPrefixes.push(`${prefix}${word}`)
      }
    }
    return wordsWithPrefixes
  }

  /**
 * Returns a filtered version of 'inputArray' that contains any of the elements from 'filterArray'
 *
 * @static
 * @param {string[]} inputArray
 * @param {string[]} filterArray
 * @memberof RealEstateDescriptionAnalyzer
 */
  public static filterArrayThatContainsAny(inputArray: string[], filterArray: (string | RegExp)[], wholeWords: boolean = false) {
    return inputArray.filter(inputString =>
      this.stringContainsAny(inputString, filterArray, wholeWords)
    )
  }

  /**
   * Checks if 'inputString' contains in it any of the elements from 'filterArray'
   * 
   *
   * @static
   * @param {string} inputString
   * @param {string[]} filterArray
   * @param {boolean} wholeWords Whether to consider only whole words in the input string
   * @memberof RealEstateDescriptionAnalyzer
   * 
   * @todo test the 'whole words' functionality 
   */
  public static stringContainsAny(inputString: string, filterArray: (string | RegExp)[], wholeWords: boolean = false) {
    for (let filterPattern of filterArray) {
      if (wholeWords) {
        if (typeof filterPattern === 'string')
          filterPattern = new RegExp('\\b' + filterPattern.trim() + '\\b')
        else
          filterPattern = new RegExp('\\b' + filterPattern + '\\b')
      }
      if (inputString.match(filterPattern)) {
        return true
      }
    }
    return false
  }

  public static currencyStringToNumber(str: string) {
    if ((str.match(/,/g) || []).length === 1)
      //If the number of commas 1, the comma is probably a decimal separator
      //e.g. R$3.000.000,00 -> 3000000.00
      return parseFloat(str.replace(/\./g, '').replace(/,/g, '.').replace(/[^.0-9]/g, ''))
    else if ((str.match(/\./g) || []).length > 1)
      //If the number of dots is greater than 1, the dots are probably not decimal separators
      //e.g. R$3.000.000 -> 3000000.00
      return parseFloat(str.replace(/[^0-9]/g, ''))
    else
      //Defaults using the dot as decimal separator
      //e.g. R$3000.50 -> 3000.50
      return parseFloat(str.replace(/[^.0-9]/g, ''))
  }

  public static formatCurrency(number: number) {
    const numberFormat = new NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
    return numberFormat.format(number)
    //the code below does not output the correct locale with node
    // return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }
}