module.exports = {
  prompts: {
    projectName: {
      message: 'What is the name of your project?',
      default: ':folderName:',
      filter: val => val.toLowerCase()
    },
    version: {
      message: 'What version your project would have initially?',
      default: '0.0.1'
    },
    description: {
      message: 'What is description of your project',
      default: ''
    },
    fullname: {
      message: 'What is your fullname?',
      default: ':gitUser:',
      filter: val => val.toLowerCase(),
      store: true
    },
    username: {
      message: 'What is your GitHub username?',
      default: '',
      filter: val => val.toLowerCase(),
      store: true
    },
    email: {
      message: 'What is your GitHub email?',
      default: ':gitEmail:',
      store: true
    },
    repo: {
      message: 'What is repo of this project?',
      default: '',
      store: true
    },
    installDependencies: {
      type: 'confirm',
      message: 'Should dependencies be installed right now?',
      default: true
    },
    packageManager: {
      type: 'list',
      message: 'What package manager should be used?',
      choices: [
        'npm',
        'yarn'
      ],
      default: 'yarn',
      store: true,
      when: answers => answers.installDependencies
    }
  },
  move: {
    'gitignore': '.gitignore'
  },
  post(context) {
    const answers = context.answers

    if (answers.installDependencies) {
      installDependencies(context)
    }
  }
}

function installDependencies(context) {
  const packageManager = context.answers.packageManager
  const installers = {
    'npm': function () {
      context.npmInstall()
    },
    'yarn': function () {
      context.yarnInstall()
    },
    'default': function () {
      throw new Error('Incorrect value of option \'packageManager\': ' + packageManager)
    }
  }

  const installer = (installers[packageManager] || installers['default'])

  installer()
}
