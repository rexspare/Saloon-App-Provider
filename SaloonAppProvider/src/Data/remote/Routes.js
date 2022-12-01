const BASE_URL = "https://nuyou.online/"

const ROUTES = {
    CHECK_USER: "check-user",
    REGISTER: "register-user",
    VERIFY_USER: "verify-user",
    LOGIN: "login-user",
    RESET_PASSWORD: "reset-password-user",
    CHANGE_PASSWORD: "set-new-password-user",
    GET_CATEGORIES: "get-categories",
    GET_SERVICES: "get-services",
    CREATE_VENDOR_PROFILE: "create-vendor-profile",
    GET_VENDOR_SELECTED_CATEGORIES: "get-user-categories",
    ADD_VENDOR_SERVICE: "add-service",
    GET_BOOKING_HISTORY: "get-booking-history",
    UPDATE_BOOKING_HISTORY: "update-booking-status",
    TODAYS_BOOKINGS: "get-today-booking",
    USER_BOOKINGS: "booking",
    UPDATE_PROFILE: "update-user-profile",
    REVIEWS: "get-reviews",
    SEND_USER_NOTIFICATION: "send-user-notification",
    SEND_PROVIDER_NOTIFICATION: 'send-provider-notification',
    USER_IS_NOTIFY: 'user-is-notify',
    UPLOAD_GALLERY_IMAGES: 'upload-gallery-images',
    GET_GALLERY_IMAGE: 'get-gallery-images',
    DELETE_GALLERY_IMAGES: "delete-gallery-images",
    DELETE_USER_ACCOUNT: "delete-user-account"
}

export {
    BASE_URL, ROUTES
}