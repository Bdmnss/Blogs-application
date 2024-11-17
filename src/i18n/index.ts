import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "welcome": "Welcome to the blog",
      "logo": "Logo",
      "home": "Home",
      "language": "Language",
      "english": "English",
      "georgian": "Georgian",
      "theme": "Theme",
      "lightMode": "Light Mode",
      "darkMode": "Dark Mode",
      "login": "Login",
      "register": "Register",
      "name": "Name",
      "email": "Email",
      "password": "Password",
      "confirmPassword": "Confirm Password",
      "passwordsDoNotMatch": "Passwords do not match",
      "popularTags": "Popular Tags",
      "featuredAuthors": "Featured Authors",
      "blogs": [
        {
          "id": 1,
          "title": "Introduction to Blockchain",
          "author": "John Doe",
          "date": "2023-10-01",
          "description": "A beginner's guide to blockchain technology.",
          "tags": ["blockchain", "technology"],
          "image": "/placeholder.png"
        },
        {
          "id": 2,
          "title": "Programming in JavaScript",
          "author": "Jane Smith",
          "date": "2023-09-15",
          "description": "Learn the basics of programming in JavaScript.",
          "tags": ["programming", "javascript"],
          "image": "/placeholder.png"
        }
      ]
    }
  },
  ka: {
    translation: {
      "welcome": "კეთილი იყოს თქვენი მობრძანება ბლოგზე",
      "logo": "ლოგო",
      "home": "მთავარი",
      "language": "ენა",
      "english": "ინგლისური",
      "georgian": "ქართული",
      "theme": "თემა",
      "lightMode": "ნათელი რეჟიმი",
      "darkMode": "ბნელი რეჟიმი",
      "login": "შესვლა",
      "register": "რეგისტრაცია",
      "name": "სახელი",
      "email": "ელ.ფოსტა",
      "password": "პაროლი",
      "confirmPassword": "დაადასტურეთ პაროლი",
      "passwordsDoNotMatch": "პაროლები არ ემთხვევა",
      "popularTags": "პოპულარული ტეგები",
      "featuredAuthors": "გამორჩეული ავტორები",
      "blogs": [
        {
          "id": 1,
          "title": "შესავალი ბლოკჩეინში",
          "author": "ჯონ დოუ",
          "date": "2023-10-01",
          "description": "დამწყებთათვის სახელმძღვანელო ბლოკჩეინის ტექნოლოგიაში.",
          "tags": ["ბლოკჩეინი", "ტექნოლოგია"],
          "image": "/placeholder.png"
        },
        {
          "id": 2,
          "title": "პროგრამირება ჯავასკრიპტში",
          "author": "ჯეინ სმიტი",
          "date": "2023-09-15",
          "description": "ისწავლეთ პროგრამირების საფუძვლები ჯავასკრიპტში.",
          "tags": ["პროგრამირება", "ჯავასკრიპტი"],
          "image": "/placeholder.png"
        }
      ]
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;