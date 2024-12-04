export enum RES_TYPES {
    INTERNAL_SERVER_ERROR = 'Something went wrong !!',
    CREATE = 'Data Insert Successfully',
    UPDATE = 'Data Update Successfully',
    DELETE = 'Data deleted Successfully',
    USER_EXISTS = 'User is already exists!! Please use unique email',
    FETCH = 'Data Fetch Successfully',
    ID_NOT_FOUND = 'Id not found/Match',
    SELECT_NOT_FOUND = 'Select not found/Match',
    LOGIN = 'Congrats! You have Successfully logged in',
    AUTH_FAIL = 'Authentication failed wrong password or email',
    LOGOUT = 'User Logged out Successfully',
    VALID_DATE = 'Please Select Valid date',
    NOT_APPLY = 'You Can Not Apply Leave at HoliDay',
    NOT_DELETE = 'This Leave is Approved you can not delete it.',
    NOT_PERMISSION = 'You do not have permission to access this route.',
    NO_FOUND = 'This Data not found',
    ALREADY_LOGOUT = 'User Have Already Logout',
    LOGOUT_FAIL = 'logout Failed',
    UNIQUE = 'This data is already stored Please give unique Email or userName',
    BAD_URL = 'Bad Request URL not Found',
    UNIQUE_DATE = 'You already assign for different task at this time',
    SOMETHING_WRONG = 'Something went wrong !!! You try to insert single in bulk.',
    ACTIVE_YOUR_ACCOUNT = 'First You have to active your account after you can access this route',
    INTIALROUTES_SUBCLASSES = 'Subclasses must implement initializeRoutes method.',
    USER_NOT_FOUND = 'User not found',
    OTP = 'Sucessfully Send OTP',
    NOT_VALIDATE_OTP = 'Invalid OTP Please Check',
    VALIDATE_OTP = 'sucessfully verify OTP',
    INVALID_DATE = 'End date must be greater than or equal to start date',
    DUPLICATEUSER = 'User Already Exists',
    INVALID_TIME = 'Clock-out time must be greater than clock-in time.',
    FILE_NOTFOUND = 'File not found pls insert file',
    NOT_UPLOAD = 'Error In Uploading',
    NO_MSG = '',
    UPLOADED = 'Successfully Uploaded',
    BACKUP = ' Error In Backup File ',
    NOT_FOUND_IMAGE = 'Please provide image',
    VALUE_NULL = 'Please provide profile completed by field ',
    NOT_VALID_ROLE = 'please provide valid role',
    INVALID_NOTIFICATION_TYPE = 'Please provide valid notification type',
    WRONG_PASSWORD = 'Please enter correct old password',
    ENCRIPTIONS = ' Error in encryption',
    DECOMPRESS = 'Error in decompressing',
    WRONG_OTP = 'Please provide valid otp',
    PACKAGE_EXISTS = 'Already exists this package',
    EMAIL_VALID = 'please provide a correct email address',
    NOT_EXIST_SESSION = 'Please first you make session time and break',
    SESSION = 'Error in session making',
    BOOKING_EXISTS = 'The slots you have selected are fully booked',
    BOOKING_USER_EXISTS = 'You can only book two sessions at a time. Please complete or cancel session',
    BOOKING_EXISTS_USER = 'You have already booked a session at this time',
    SUBSCRIPTIONS_EXISTS = 'You have already subscriptions exist!!',
    WRONG_TOKEN = 'Invalid token',
    IMAGE_REQUIRED = 'Must be required image',
    SIMULATOR_EXISTS = 'This simulator already exists!!',
    PACKAGE_NOT_EXIST = 'Before proceeding, please consider purchasing a package. Our services require a subscription or package to access',
    BOOKING_LIMIT_EXCEEDED = 'Apologies, it seems you have exceeded your booking limit for this month. To continue booking, please consider upgrading your package or contact our support team for assistance',
    MULTIPLE_BLOG_IMAGE = 'Image Should not be multiple',
    VERIFIED_FAILED = "Your email isn't verified !! Check your mail for verification",
    PASSWORD_REQUIRED = 'Password must be required',
    DEACTIVATE_USER = 'Your account is not active !! Please try again later',
    UNABLE_CANCEL_BOOKING = 'You cannot cancel the booking within 24 hours of the booking date',
    ALREADY_SENT_REQUESTED = 'Already requested visit studio',
    PACKAGE_EXPIRE = 'Package will be expire at this time',
}

export enum RES_STATUS {
    CREATE = 'CREATE',
    DELETE = 'DELETE',
    UPDATE = 'UPDATE',
    GET = 'GET',
}

export enum ROLES {
    USER = '0', // sky_link
    SUPER_ADMIN = '1', // sky_holidays
    OUTLET_ADMIN = '2',
}

export enum MODEL {
    USER = 'userModel',
    COUNTRY = 'countryModel',
    COUTRIES = 'countriesModel',
    STATE = 'stateModel',
    STATES = 'statesModel',
    CITY = 'cityModel',
    CITIES = 'citiesModel',
    OTP = 'otpModel',
    TRIP_DETAILS = 'tripDetailsModel',
    ACCOUNT_DETAILS = 'accountsDetailsModel',
    HOTEL = 'hotelModel',
    ACTIVITY = 'activityModel',
    PICKUPDROP = 'pickupdropModel',
    SIGHTSEEING = 'sightseeingModel',
}

export enum NotificationTypes {
    REMINDER = 'reminder',
    FORGOT_PSW = 'Forget Password',
    SEND_CREDENTIAL = 'send_credential',
    ACTIVE_ACCOUNT = 'active_account',
    SEND_PROFESSIONAL_SIGNUP_NOTIFICATION = 'send_professional_signup_notification',
    SEND_UNREAD_CHAT_MESSAGE = 'send_unread_chat_message',
    VERIFICATION_MAIL = 'verify_mail',
}

export enum Blog {
    BLOG = '0',
    LATEST_NEWS = '1',
    FEATURED_ARTICLES = '2',
}

export enum SESSION_TYPE {
    ROUND_SESSION = '0',
    PRACTICE_SESSION = '1',
}

export enum SLOT_TYPE {
    REGULAR = '0',
    WEEKEND = '1',
    HOLIDAY = '2',
}
export enum TRIP_TYPE {
    ONGOING = '0',
    UPCOMING = '1',
    COMPLETED = '2',
}
export enum CATEGORY_TYPE {
    SALES = 'Sales',
    EXPENSE = 'Expenses',
    MARKETING = 'Marketing',
    B2B_PAYMENT = 'B2b',
}
export enum PAID_TYPE {
    BHARGAV = 'Bhargav',
    JAYDIP = 'Jaydip',
    YASH = 'Yash',
}
