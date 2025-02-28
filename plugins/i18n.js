import { createI18n } from "vue-i18n";

const messages = {
  en: {
    welcome: "Welcome",
    toggle: "EN",
    orders: "Orders",
    loading: "Loading...",
    email: "Email",
    Phone: "Phone",
    Birth_Date: "Birth Date",
    Gender: "Gender",
    User_not_found: "⛔ User not found! Redirecting...",
    Analytics: "Analytics",
    Login: "Login",
    Enter_your_email: "Enter your email",
    Password: "Password",
    Enter_password: "Enter your password",
    Don_have_account: "Don't have an account? ",
    Sign_up_here: "Sign up here",
    Settings: "Settings",
    Transactions: "Transactions",
    Support: "Support",
    search: "search...",
    Messages: "Messages",
    Items: "Items",
    Profile: "Profile",
    Logout: "Logout",
    Reports: "Reports",
    Visits: "Visits",
  },
  ar: {
    welcome: "أهلا وسهلا",
    toggle: "AR",
    orders: "الطلبات",
    loading: "جاري التحميل",
    email: "البريد الالكتروني",
    Phone: "رقم التليفون",
    Birth_Date: "تاريخ الميلاد",
    Gender: "الجنس",
    User_not_found: "⛔ لم يتم العثور على المستخدم! إعادة التوجيه...",
    Analytics: "التحليلات",
    Login: "تسجيل الدخول",
    Enter_your_email: "ادخل البريد الالكتروني",
    Password: "الرقم السري",
    Enter_password: "ادخل الرقم السري",
    Don_have_account: "ليس لديك حساب؟",
    Sign_up_here: "إنشاء حساب",
    Settings: "الإعدادات",
    Transactions: "المعاملات",
    Support: "الدعم",
    search: "بحث...",
    Messages: "الرسائل",
    Items: "المنتجات",
    Profile: "الملف الشخصي",
    Logout: "تسجيل الخروج",
    Reports: "التقارير",
    Visits: "الزيارات",
  },
};

const savedLocale = localStorage.getItem("locale") || "en";

export default defineNuxtPlugin((nuxtApp) => {
  const i18n = createI18n({
    locale: savedLocale,
    messages,
  });

  nuxtApp.vueApp.use(i18n);

  document.documentElement.lang = savedLocale;
  document.documentElement.dir = savedLocale === "ar" ? "rtl" : "ltr";
});
