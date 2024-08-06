
const InputValidation = [
    {
    'username': {
    name: 'username',
    type: 'text',
    placeholder: "Username",
    errorMessage: "Username should be 3-16 characters and shouldn't include any special character!",
    label: "Username",
    pattern: "^[A-Za-z0-9]{3,16}$",
    required: true,
},
'email' : {
    name: "email",
    type: "email",
    placeholder: "Email",
    errorMessage: "It should be a valid email address!",
    label: "Email",
    required: true,
},
'birthday' : {
    name: "birthday",
    type: "date",
    placeholder: "Birthday",
    label: "Birthday", 
},
'password' : {
    name: "password",
    type: "password",
    placeholder: "Password",
    errorMessage: "Password should be 8-20 characters and include at least 1 letter, 1 number, 1 special character!",
    label: "Password",
    pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W).{8,20}$`,
    required: true,
},
'confirmPassword':{
    name: "confirmPassword",
    type: "password",
    placeholder: "Confirm Password",
    errorMessage: "Passwords don't match!",
    label: "Confirm Password",
    required: true,
}
}]

const minifyUrlValidation = [
    {
        'url': {
        name: 'minifyLink-url',
        type: 'url',
        placeholder: 'Enter the URL to shorten',
        errorMessage: 'Not a valid URL',
        label: 'Minify a long URL ?',
        required: true,
    },
    'alias': {
        name: 'alias',
        type: 'text',
        placeholder: 'Enter Alias',
        errorMessage: "Invalid alias. Only letters, numbers, and underscores are allowed. Must be between 3 and 20 characters.",
        label: ' Want to Customize your URL ?',
        pattern: '^[a-zA-Z0-9\_]{3,20}$'
    }
    }
]

export {InputValidation, minifyUrlValidation}

