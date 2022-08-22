const languageType = [
  {
    name: 'JavaScript',
    type: ['js', 'jsx', 'mjs', 'cjs'],
    comment: 'double', // 单行注释 + 多行注释
  },
  {
    name: 'Json',
    type: ['json'],
    comment: '',
  },
  {
    name: 'TypeScript',
    type: ['tsx', 'ts'],
    comment: 'double',
  },
  {
    name: 'HTML',
    type: ['html', 'htm'],
    comment: 'mult', // 多行注释
  },
  {
    name: 'SCSS',
    type: ['scss'],
    comment: 'double',
  },
  {
    name: 'CSS',
    type: ['css'],
    comment: 'alone', // 单行注释
  },
  {
    name: 'Java',
    type: ['java'],
    comment: 'double',
  },
]
export default languageType
