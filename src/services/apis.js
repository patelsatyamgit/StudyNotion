const BASE_URL=process.env.REACT_APP_BASE_URL

export const enpoints={
    SENDOTP_API:BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSTOKEN_API:BASE_URL +"/auth/reset-password-token",
    RESETPASSWORD_API:BASE_URL + "/auth/reset-password",
}


// CATAGORIES API
export const categories = {
    CATEGORIES_API: BASE_URL + "/course/showAllCategories",
  }

// Contact userSelect: 

export const contact={
    CONTACTUSMAIL_API:BASE_URL +"/auth/contact-us",
}
//update prfile;
export const updateProfile={
    UPDATEPROFILEPICTURE_URL:BASE_URL +"/profile/updateDisplayPicture",
    UPDATEABOUT_URL:BASE_URL +"/profile/updateabout",
    UPDATEINFO_URL: BASE_URL +"/profile/updateProfile",
    CHANGEPASSWORD_URL :BASE_URL +"/auth/changepassword",
    DELETEPROFILE_URL:BASE_URL+ "/profile/deleteProfile",
    GETENROLLEDCOURSEAPI_URL:BASE_URL +"/profile/getEnrolledCourses",
}


export const courseEndpoint={
    CREATECOURSE_URL:BASE_URL +"/course/createCourse",
    UPDATECOURSE_URL:BASE_URL +"/course/updateCourse",
    CREATESECTION_URL:BASE_URL +"/course/addSection",
    UPDATESECTION_URL:BASE_URL +"/course/updateSection",
    DELETESECTION_URL:BASE_URL +"/course/deleteSection",
    CREATESUBSECTION_URL:BASE_URL + "/course/addSubSection",
    GETINSTRUCTOR_URL:BASE_URL + "/course/getInstructorCourse",
    DELETECOURSE_URL:BASE_URL +"/course/deletecourse",
    UPDATESUBSECTION_URL:BASE_URL + "/course/updateSubSection",
    DELETESUBSECTION_URL:BASE_URL + "/course/deleteSubSection",
    EDITCOURSE_URL:BASE_URL + "/course/editcourse",
    GETCOURSEDETAILS_URL:BASE_URL +"/course/getCourseDetails",
    GEGCOURSEFULLDETAILS_URL:BASE_URL+"/course/getCourseFullDetails",
    CREATERATINGAPI_URL:BASE_URL+"/course/createRating",
    UPDATECOURSEPROGRESSAPI_URL:BASE_URL+"/course/updatecourseProgress",
    GETALLREVIEWAPI_URL:BASE_URL+"/course/getReviews",
    GETINSTRUCTORDESBOARDAPI_URL:BASE_URL+"/course/getInstructorDesboardDetails"
}

export const categoryEndpoint ={
    GETCATEGORYDETAILS_URL:BASE_URL +"/course/getCategoryPageDetails",
}

export const paymentEnpoints={
    CREATEORDERAPI_URL:BASE_URL +"/payment/capturePayment",
    VARIFYPAMENTAPI_URL:BASE_URL+"/payment/verifySignature",
    PAYMENTSUCCESSEMAIL_URL:BASE_URL+"/payment/sendPaymentSuccessmail"
}