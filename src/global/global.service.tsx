
export  const GlobalService = {
  languages : ['Korean', 'Spanish', 'Vietnamese', 'Portuguese'],
  iOSAppURL : 'https://apps.apple.com/in/app/speaky-peaky/id1486127431',
  androidAppURL :
    'https://play.google.com/store/apps/details?id=com.summer.startenglishnow&hl=en',
  iOSAppID : '1455374609',
  androidPackage : 'market://details?id=com.summer.startenglishnow',
  webAppURL : 'https://start-english-now-android.firebaseapp.com',

  weekdays : [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  faqCategories : [
    {
      title: 'Subscriptions and Billing',
      type: 'Subscriptions_and_Billing',
    },
    {
      title: 'App Features',
      type: 'App_Features',
    },
    {
      title: 'Study Methods',
      type: 'Study_Methods',
    },
    {
      title: 'Suggestions',
      type: 'Suggestions',
    },
    // , {
    //     title: 'Others',
    //     type: 'Others'
    // }
  ],

  lessonSteps : [
    {
      name: 'Step 1 : Listen',
      _id: 'Listen',
    },
    {
      name: 'Step 2 : Dictation',
      _id: 'Dictation',
    },
    {
      name: 'Step 3 : Review',
      _id: 'Review',
    },
    {
      name: 'Step 4 : Practice',
      _id: 'Practice',
    },
    {
      name: 'Step 5 : Re-listen',
      _id: 'Re-listen',
    },
  ],

  lessonDictationStepLoop : [
    {
      isCompleted: false,
    },
    {
      isCompleted: false,
    },
    {
      isCompleted: false,
    },
    {
      isCompleted: false,
    },
    {
      isCompleted: false,
    },
    {
      isCompleted: false,
    },
    {
      isCompleted: false,
    },
    {
      isCompleted: false,
    },
    {
      isCompleted: false,
    },
    {
      isCompleted: false,
    },
  ],
  lessonReviewingStepLoop : [
    {
      isCompleted: false,
    },
    {
      isCompleted: false,
    },
    {
      isCompleted: false,
    },
  ],
  lessonPracticeStepLoop : [
    {
      isCompleted: false,
    },
    {
      isCompleted: false,
    },
    {
      isCompleted: false,
    },
  ],

  subscriptionsAndBillingFaqs : [
    {
      question: 'If I become a subscriber, can I select different levels?',
      answer:
        'Yes! You can choose any level any time you like! If you select a level, we will recommend you lessons within that level. \nIf you feel that your recommended lessons are too easy or difficult for you, you can change your level in Profile (your username in the bottom bar).',
      expanded: false,
    },
    {
      question: 'Can I review the previous lessons I have studied?',
      answer:
        'Yes, you can review any lesson you want at any point in time!  If you want to look at all \nthe lessons you’ve studied so far, please visit Review in the bottom bar.',
      expanded: false,
    },
    {
      question: 'How can I cancel my subscription?',
      answer:
        'In order to turn off auto-renewal, please go to Profile (your username in the bottom bar) \n> Settings > Account > Subscription Status',
      expanded: false,
    },
    {
      question:
        'I’m a monthly subscriber so I have 30 lessons per month to study. However, I didn’t \nstudy all the 30 lessons. Will the remaining lessons be carried forward to the next \nsubscription month?',
      answer:
        'The remaining number of lessons won’t be carried forward to the next subscription \nmonth. \n\n If you become an annual subscriber or a 6-month subscriber, you will have unlimited \nnumber of lessons throughout the subscription period at a discounted price by 20% and \n40% respectively',
      expanded: false,
    },
    {
      question: 'How does a subscription period work?',
      answer:
        'We have three types of subscription plans. The first one is a monthly subscription. For example, if you subscribed on August 15, 2019, this month’s subscription period is until September 14, 2019.\n\nThe second plan is a 6-month subscription and the annual subscription lasts for a year.\n\nAll of our subscription plans are auto-renewal. That means you will be automatically charged when the next subscription period starts. If you want to turn off auto-renewal, you can do so at anytime you want in Profile (your username in the bottom bar) > Settings > Account > Subscription Status',
      expanded: false,
    },
  ],
  appFeaturesFaqs : [
    {
      question: 'I want to see the list of lessons I’ve studied.',
      answer:
        'If you want to look at all the lessons you’ve studied so far, please visit Review in the bottom bar.',
      expanded: false,
    },
    {
      question:
        'I’m a monthly subscriber and I’ve studied all 30 lessons. Can I buy more lessons?',
      answer:
        'Yes, you can. Please go to Profile (your username in the bottom bar) > Settings > Account > Subscription Status, this is where you can purchase extra lessons. The additional number of lessons should be studied within the current subscription month as they are not carried forward to the next month. For example, let’s say, your current subscription month is from August 15 to September 14 and you purchased 5 additional lessons on September 5. You need to study the additional lessons by September 14.',
      expanded: false,
    },
    {
      question:
        'When I get my pronunciation evaluated, I don’t get a 100 even though the app types exactly what I say.',
      answer:
        "First of all, don’t feel frustrated! If you get over a 90, your pronunciation is great. Even if the app understands you perfectly, our app evaluates how well you pronounce, not how much the app can understand you. That means, even though your speech is understandable, it doesn't mean your pronunciation is 100% perfect. \nWe use Google API, one of the best speech recognition APIs (Application Program Interfaces) in the world, which has a high accuracy rate at 97%. What it means is that even if you make all the sounds correct, there is still a 3% chance that the Google speech API can make a mistake. The technology is getting better, but not perfect yet.  \nWe experimented on this technology with English native speakers. The average grade they got was 98. Therefore, if you get over a 90 as a non English native speaker, I would say it’s great! Don’t get stressed out that you don’t get a 100. If you see over 90 and the app understands you please move on to the next scene.",
      expanded: false,
    },
    {
      question:
        'I’m using an Android phone. The pronunciation evaluation feature doesn’t work. The mic does not seem to be working.',
      answer:
        "Please follow the instructions below. If it still doesn't work, please email us at hi@speakypeaky.com.\n1) Go to Google Play Store \n2) Search for “Google” \n3) If you see a button that says “Enable”, please click on it. \n4) After number 3, you will see either a “Update” button or an “Open” button. Click on either of them. Please click on the “Open” button to see if the Google app is working fine. \n5) After checking the Google app is working fine, open our app Speaky Peaky again. The mic in the evaluation step should be working now.",
      expanded: false,
    },
  ],
  studyMethods : [
    {
      question: 'Should I learn English only using this app?',
      answer:
        "Our app will definitely help improve your English. However, we don't claim that you ONLY need our app to learn English. To be fluent in English, you need a holistic approach. Not only do you need to improve listening skills, but also grammar, vocabulary, and writing. Speaky Peaky especially helps you with English listening skills and sounds (intonation, linking, tone), vocabulary, and speaking. If you feel that you’re not confident with English grammar, we recommend that you study it separately. Grammar can be boring, but we believe it would be ideal if you went over English grammar at least once. You don’t need to master English grammar but you need to know basic grammar, especially if the grammar of your native language is very different from English",
      expanded: false,
    },
    {
      question:
        'It seems that I just can’t make English sounds correctly? The app doesn’t exactly type what I say. ',
      answer:
        'Well, it might be because you’re not familiar with basic English sounds. For example, do you know the difference in sound between sit and seat, or mad and med, or do you know how to correctly pronounce ‘pleasure’? If you’re not sure, we strongly, strongly recommend you learn English phonetics as well, through which you can learn accurate sounds of English vowels and consonants. If you learn English phonetics on top of using Speaky Peaky, the effect will be much bigger.',
      expanded: false,
    },
    {
      question: 'Can I improve English speaking skills using Speaky Peaky?',
      answer:
        'Absolutely. There are two major effects in spoken English with Speaky Peaky’s methods: \nAutomaticity: By repeating English sentences multiple times, your automaticity will improve significantly. This means that you will speak sentences that you’ve practiced automatically without trying too hard. A lot of English expressions are very commonly used. It’s a great practice to get used to set expressions and sentences by repetition and practice. \nStronger memory building: With Speaky Peaky, all lessons are based off of videos with stories. Stories give us emotions and feelings. Learning something with stories and emotions is the most effective way of memorizing things scientifically. Amygdala, the emotional center of our brain is closely connected to the hippocampus, the part of our brain that deals with memorization. Therefore, if you’re emotionally connected, it allows yours brain to form a more detailed and stronger memory.  That’s why we always recommend you memorize words and expressions from stories rather than making a list of unrelated words.  \nHowever, please don’t forget to go out and meet real people to speak English with. You are learning English to communicate with people, right? Conversations are interpersonal. Go out there and start real conversations with people when you feel like you are ready. Use the words and expressions you learned with Speaky Peaky, and practice asking questions and engaging in conversations. Good luck Speaky Speaky fam! :)',
      expanded: false,
    },
    {
      question:
        'There are some words I just can’t hear well no matter how many times I try to listen. Should I listen to it more? How many times should I listen to it?',
      answer:
        'We understand your frustration. There could be 2 main reasons why you can’t hear exactly as the script says. \n Firstly, it may be because the native speaker spoke it with inaccurate pronunciation. Speaky Peaky is using real-life videos which are not made for only English learners unlike many English text books. Therefore, English native speakers may have mispronounced or may have not enunciated the sounds. In this case, no matter how many times you listen, it won’t be clear to your ears. But, that’s okay. You’re not supposed to listen to it clearly. You should guess what the speaker may have said out of the context. That is what we do in our native language as well. \nSecondly, you may not be familiar with the rule of emphasized and unemphasized sounds and linking sounds. If they are the issues you’re experiencing, are issues with you, try to find patterns. Here are some patterns that might be helpful for you. \nEnglish is like a song. Even in one word, a sound can go up and down. This is because there are stressed syllables and unstressed syllables. Let me explain what syllables are first. A word can be composed of multiple syllables. For example, “Matter” has 2 syllables -- Ma / tter. “Pronunciation” has 5 syllables -- pro / nun / ci / a / tion. In one word, there must be at least one primary stressed syllable. In a long word, there can be multiple syllables and there is one primary stressed syllable and sometimes there is one secondary stressed syllable. When a syllable is stressed,  that should be pronounced as it is originally supposed to be pronounced.  When a syllable is NOT stressed, the sound becomes very weak and the sound changes; the unstressed sound is called schwa sound (ə). When syllables are not stressed, you pronounce it more softly and at a lower tone. Let’s take ‘pronunciation’ as an example. The 4th syllable, “a” is the prime stressed one and you pronounce it as “ey” and the secondary stressed syllable is the second syllable, “nun”, so you pronounce it as “nʌn”. You should pronounce the rest of the syllables more weakly. Especially, the first and the last syllables become a schwa sound (ə). \nOnce you get each word right, the next one you want to pay attention to is linking sounds. When you speak English sentences, some sounds are linked. Here are some examples; \nWhen the /t/ and /y/ are next to each other, for example, don’t you, the sounds become one to the \'ch sound\' /ʧ/. This makes the phrase "don\'t you" /doʊntyu/ to be pronounced as "donchou" /doʊnʧu/.\nWhen the /d/ and the /y/ are next to each other, they are pronounced as a \'j sound\' /ʤ/. This makes the phrase "did you" /dɪdyu/ to be pronounced as "dijou" /dɪʤu/.\nSometimes, a sound is removed from a word. For example, when a /t/ or /d/ is between two other consonant sounds (but not the first sound of a word), the /t/ or /d/ can be omitted. In the phrase “kep-going”, the /t/ is between two consonant sounds and can be omitted. \nSo it is pronounced as “kep-going” \nIn the phrase “Sam\'s first‿day”, the /t/ can be omitted. So it is pronounced as “Sam’s firs-day” \nWhen a word ends with a consonant and the next word begins with a vowel, or when a word ends with a vowel and the next word begins with a consonant, the consonant and vowel sounds blend. For example, “press‿enter” is pronounced as “presenter”  and “fix‿it” is pronounced as “fi-xit”.',
      expanded: false,
    },
    {
      question: 'Why do I need to do dictation?',
      answer:
        'Sometimes you may think you have listened to all the words correctly when, in fact, you didn’t. By doing dictation, you will be able to learn what sounds are familiar to you and what sounds you cannot listen to well. This will help you objectively evaluate your listening skill and you will know which sounds you need to focus on. I understand that this might take a long time and can be tedious, however, this method has academically been proven to be effective.',
      expanded: false,
    },
  ],
  suggestions : [
    {
      question: 'Can I suggest videos I want to study with to the team?',
      answer:
        'Absolutely! Please email us at at hi@speakypeaky.com Can’t wait to get your suggestions!! :)',
      expanded: false,
    },
    {
      question: 'I have found errors / typos in the app. What should I do?',
      answer:
        'I am so sorry for the error or typo. Our team tries our best to provide the best quality lessons. However, sometimes we make mistakes. Thank you for your understanding. You can report any errors or typos in lessons you’ve found by clicking the exclamation mark on the right upper corner in any page of all lessons.',
      expanded: false,
    },
    {
      question: 'Everything is in English in the app.',
      answer:
        'We’ve had many discussions on this. We’ve decided to make everything in English except for subtitles in your native language. That’s because we thought that you should be exposed to English as much as possible since this app is to help you learn English. If you don’t understand any parts of the app, please feel free to email us at hi@speakypeaky.com.',
      expanded: false,
    },
  ]
}
