export const API_URL={
login:'aceCam/identity/auth/login',
register:'aceCam/identity/auth/register-new-user',
forgotPassword:'aceCam/identity/auth/forgot-password',
verifyRegisterOtp:'aceCam/identity/auth/verify-login-otp',
verifySignInOtp:"aceCam/identity/auth/verify-password-otp",
reSendOtpRegister:"aceCam/identity/auth/forgot-register-user-password",
reSendOtpSignIn:"aceCam/identity/auth/forgot-password",
resetPassword:'aceCam/identity/auth/reset-password',
getAllRole:"aceCam/core/roles/all-role",
getUserRole:'aceCam/core/user-roles-mapping/get-user-permission',
addAdmin:"aceCam/core/user/add-user-admin",
activeInactiveUser:"aceCam/core/user/act-deactivate",
getAllPlayer:'aceCam/core/user/all-player-user',
getAllCourseAdmin:'aceCam/core/user/all-course-admin',
getAllSuperAdmin:'aceCam/core/user/all-super-admin',
getAllCount:"aceCam/core/user/get-all-user-count",
getCourseList:"aceCam/core/course/courses",
getCourseData:'aceCam/core/club/all-club',
getHoleByCourseId:'aceCam/core/hole/hole-by-courseId',
qrCodeByCourseId:'http://localhost:5173/aceCamDev/course?course=',
qrCodeByHoldId:'http://localhost:5173/aceCamDev/course?course=holeNumber:',
fbRedirectUI:"http://localhost:8080/aceCamDev/abcd",
verigyGoogleToken:"aceCam/identity/auth/verifyGoogleToken",
verifyFbToken:'aceCam/identity/auth/verifyFacebookToken'


}