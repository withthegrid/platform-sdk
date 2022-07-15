const issue = ['issue'] as const;
const report = ['report', 'rapport', 'meetrapport'] as const;
const command = ['command', 'opdracht'] as const;

// the regexp have been verified on https://makenowjust-labs.github.io/recheck
const matchers = [
  [
    'issues',
    new RegExp(`(?<key>${issue.join('|')}) #(?<hashid>[\\w\\d]{6,})`, 'gi'),
  ],
  [
    'reports',
    new RegExp(`(?<key>${report.join('|')}) #(?<hashid>[\\w\\d]{6,})`, 'gi'),
  ],
  [
    'commands',
    new RegExp(`(?<key>${command.join('|')}) #(?<hashid>[\\w\\d]{6,})`, 'gi'),
  ],
];

/**
 * Replace the references in the text with the correct links.
 * @param {string} environmentHashId The hashid of the environment.
 * @param {string} text The text to replace.
 * @returns {string} The text with the correct links.
 * @example
 * ```ts
 * const replaced = replaceLinks('eyr9dr', 'issue #eyr9dr')
 * console.log(replaced)
 * // => '<a href="/issues/eyr9dr">issue #eyr9dr</a>'
 * ```
 */
export const replaceLinks = (
  environmentHashId: string,
  text: string,
): string => {
  for (let i = 0, len = matchers.length; i < len; i += 1) {
    const [entity, regex] = matchers[i];
    const matches = text.match(regex);
    if (matches !== null) {
      text = text.replaceAll(regex, (match, _key, hashid) => {
        const url = `#/e/${environmentHashId}/${entity}/${hashid}`;
        return `<a href="${url}">${match.toLowerCase()}</a>`;
      });
    }
  }

  return text;
};

export default replaceLinks;
