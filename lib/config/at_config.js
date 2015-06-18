AccountsTemplates.configure({
    // Behaviour
    confirmPassword: true,
    enablePasswordChange: true,
    forbidClientAccountCreation: true,
    overrideLoginErrors: true,
    sendVerificationEmail: true,

    // Appearance
    showAddRemoveServices: false,
    showForgotPasswordLink: true,
    showLabels: true,
    showPlaceholders: true,

    // Client-side Validation
    continuousValidation: false,
    negativeFeedback: false,
    negativeValidation: true,
    positiveValidation: true,
    positiveFeedback: true,

    // Privacy Policy and Terms of Use
    privacyUrl: 'privacy',
    termsUrl: 'terms-of-use',

    // Redirects
    homeRoutePath: '/home',
    redirectTimeout: 4000

    // Texts
    //buttonText: {
    //    signUp: "Sign Up Now!"
    //},
    //title: {
    //    forgotPwd: "Recover Your Passwod"
    //},
});