module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    settings:{
        react: {
            version: 'detect'
        }
    },
    "extends": [
        "eslint:recommended", 
        "plugin:react/recommended",
        "standard-with-typescript",
        'eslint-config-prettier',
        "plugin:react/jsx-runtime"
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        
    }
}
