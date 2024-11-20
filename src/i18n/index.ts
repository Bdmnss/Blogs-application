import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "welcome": "Welcome to the blog",
      "logo": "Logo",
      "home": "Home",
      "about": "About",
      "aboutContent": "This is the about page content.",
      "ourMission": "Our Mission",
      "ourMissionContent": "Our mission is to provide the best services to our customers.",
      "whatWeOffer": "What We Offer",
      "offer1Title": "Quality Service",
      "offer1Description": "We offer top-notch services to meet your needs.",
      "offer2Title": "Customer Support",
      "offer2Description": "Our support team is here to help you 24/7.",
      "offer3Title": "Affordable Prices",
      "offer3Description": "We provide the best prices in the market.",
      "ourStory": "Our Story",
      "ourStoryContent": "Our story began in 2020 with a vision to revolutionize the industry.",
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
      "authorAbout": "This is a brief description about the author.",
      "authorAboutContent": "This is a detailed description about the author, including their background, experience, and achievements.",
      "followers": "Followers",
      "following": "Following",
      "articles": "Articles",
      "skills": "Skills",
      "skill1": "Skill 1",
      "skill2": "Skill 2",
      "skill3": "Skill 3",
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
      "about": "შესახებ",
      "aboutContent": "ეს არის გვერდის შესახებ შინაარსი.",
      "ourMission": "ჩვენი მისია",
      "ourMissionContent": "ჩვენი მისიაა საუკეთესო სერვისების მიწოდება ჩვენს მომხმარებლებს.",
      "whatWeOffer": "რას ვთავაზობთ",
      "offer1Title": "ხარისხიანი სერვისი",
      "offer1Description": "ჩვენ გთავაზობთ უმაღლესი ხარისხის სერვისებს თქვენი საჭიროებების დასაკმაყოფილებლად.",
      "offer2Title": "მომხმარებელთა მხარდაჭერა",
      "offer2Description": "ჩვენი მხარდაჭერის გუნდი მზად არის დაგეხმაროთ 24/7.",
      "offer3Title": "ხელმისაწვდომი ფასები",
      "offer3Description": "ჩვენ გთავაზობთ საუკეთესო ფასებს ბაზარზე.",
      "ourStory": "ჩვენი ისტორია",
      "ourStoryContent": "ჩვენი ისტორია დაიწყო 2020 წელს, ინდუსტრიის რევოლუციის ხედვით.",
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
      "authorAbout": "ეს არის მოკლე აღწერა ავტორის შესახებ.",
      "authorAboutContent": "ეს არის დეტალური აღწერა ავტორის შესახებ, მათ შორის მათი გამოცდილება და მიღწევები.",
      "followers": "გამომწერები",
      "following": "მიმდევრები",
      "articles": "სტატიები",
      "skills": "უნარები",
      "skill1": "უნარი 1",
      "skill2": "უნარი 2",
      "skill3": "უნარი 3",
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