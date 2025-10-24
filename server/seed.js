require('dotenv').config();
const mongoose = require('mongoose');
const ReadingTest = require('./models/ReadingTest');
const ListeningTest = require('./models/ListeningTest');
const WritingTest = require('./models/WritingTest');
const SpeakingTest = require('./models/SpeakingTest');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ielts_prep';

async function seed() {
  await mongoose.connect(MONGODB_URI, { dbName: 'ielts_prep' });

  console.log('Connected to MongoDB, seeding data...');

  // READING DATA (from client/src/components/ReadingModule.tsx)
  const readingDoc = {
    passages: [
      {
        title: 'The Evolution of Urban Planning',
        text: `Modern urban planning has undergone significant transformations over the past century. What began as simple grid systems in the early 1900s has evolved into complex, sustainable city designs that prioritize both human welfare and environmental protection.

The Industrial Revolution marked a turning point in urban development. Cities grew rapidly, but this growth came with challenges: overcrowding, pollution, and inadequate infrastructure. Urban planners of the early 20th century, such as Daniel Burnham and Frederick Law Olmsted, recognized the need for comprehensive city planning that would address these issues.

One of the most influential movements was the Garden City concept, introduced by Ebenezer Howard in 1898. This approach aimed to combine the benefits of city and country living by creating self-contained communities surrounded by greenbelts. The idea was to limit urban sprawl while providing residents with access to both urban amenities and natural spaces.

The mid-20th century saw the rise of modernist planning, characterized by large-scale housing projects and car-centric design. However, critics like Jane Jacobs argued that such approaches ignored the social fabric of communities and the importance of mixed-use development.

Today's urban planning emphasizes sustainability, walkability, and community engagement. Smart city technologies are being integrated to improve efficiency and quality of life. Cities are now designed with climate change in mind, incorporating green infrastructure, renewable energy systems, and resilient design principles.

The future of urban planning will likely involve even greater integration of technology, more participatory planning processes, and innovative solutions to address growing populations and environmental challenges.`,
        questions: 13,
      },
      {
        title: 'Artificial Intelligence in Healthcare',
        text: `Artificial Intelligence (AI) is revolutionizing healthcare delivery and patient outcomes across the globe. From diagnostic imaging to drug discovery, AI applications are transforming how medical professionals work and how patients receive care.

In diagnostic imaging, AI algorithms can now detect abnormalities in medical scans with accuracy that rivals or exceeds human specialists. Machine learning models trained on thousands of images can identify early-stage cancers, cardiovascular diseases, and neurological conditions that might be missed by the human eye. This capability is particularly valuable in regions with shortages of specialist radiologists.

Drug discovery, traditionally a process taking decades and costing billions of dollars, is being accelerated through AI. Researchers use machine learning to predict how different compounds will interact with biological targets, significantly reducing the time needed to identify promising drug candidates. Some pharmaceutical companies report reducing drug discovery timelines from years to months.

Personalized medicine is another area where AI is making significant strides. By analyzing genetic data, medical histories, and lifestyle factors, AI systems can predict individual patient responses to treatments and recommend personalized therapeutic approaches. This precision medicine approach improves treatment effectiveness while reducing adverse reactions.

However, the integration of AI in healthcare faces several challenges. Data privacy concerns are paramount, as medical records contain highly sensitive information. There are also questions about algorithmic bias, transparency in decision-making, and the potential for over-reliance on technology.

Regulatory frameworks are still developing to ensure AI medical devices meet safety and efficacy standards. Healthcare professionals need training to effectively integrate AI tools into their practice while maintaining the human touch that is essential to patient care.

Despite these challenges, the potential benefits of AI in healthcare are immense. As technology continues to advance and regulatory frameworks mature, AI will likely become an indispensable tool in modern medicine.`,
        questions: 13,
      },
      {
        title: 'Climate Change and Global Food Security',
        text: `Climate change poses one of the most significant threats to global food security in the 21st century. Rising temperatures, changing precipitation patterns, and extreme weather events are already affecting agricultural productivity worldwide, with implications for billions of people who depend on farming for their livelihoods and food security.

Temperature increases affect crop yields in complex ways. While some regions may benefit from longer growing seasons and increased CO2 concentrations, many major agricultural areas face declining productivity. Heat stress reduces the yields of staple crops like wheat, rice, and maize. In tropical regions, temperatures are approaching or exceeding the thermal tolerance of many crops.

Water availability is becoming increasingly unpredictable. Drought conditions are intensifying in many regions, while others experience more frequent flooding. Both extremes damage crops and reduce yields. Changes in rainfall patterns also affect the timing of planting and harvesting, disrupting traditional farming cycles that have been refined over generations.

Sea-level rise threatens coastal agricultural areas through saltwater intrusion, which makes soil unsuitable for most crops. Small island states and low-lying coastal regions are particularly vulnerable, with some areas already experiencing permanent loss of agricultural land.

The impacts are not evenly distributed globally. Developing countries, particularly those in sub-Saharan Africa and parts of Asia, face the greatest risks. These regions often have limited adaptive capacity due to poverty, inadequate infrastructure, and reliance on rain-fed agriculture.

Adaptation strategies are being developed and implemented worldwide. These include developing climate-resilient crop varieties, improving water management systems, and diversifying agricultural practices. Precision agriculture technologies help farmers optimize inputs and reduce waste. Some farmers are shifting to crops better suited to changing conditions.

However, adaptation alone may not be sufficient. Mitigation efforts to reduce greenhouse gas emissions are crucial to limit the severity of climate impacts. Agriculture itself is both a victim and a contributor to climate change, responsible for significant greenhouse gas emissions through livestock production, rice cultivation, and deforestation.

International cooperation is essential to address these challenges. Technology transfer, financial support for adaptation measures, and coordinated research efforts are all necessary components of a global response to climate change and food security challenges.`,
        questions: 14,
      },
    ],
    correctAnswers: [
      // P1 1-13
      'B','A','C','B','A','TRUE','FALSE','NOT GIVEN','TRUE','FALSE','education','technology','communication',
      // P2 14-26
      'iv','vii','ii','i','vi','C','A','B','D','innovation','research','development','market',
      // P3 27-40
      'YES','NO','NOT GIVEN','YES','NO','D','B','A','C','B','sustainability','environment','future','challenges'
    ],
    questionTexts: new Map(Object.entries({
      1: [
        'What was the main cause of urban growth challenges?',
        'Who introduced the Garden City concept?',
        'What did critics say about modernist planning?',
        "What is emphasized in today's urban planning?",
        'What will future planning likely involve?',
        'The Industrial Revolution led to overcrowding in cities.',
        'Daniel Burnham worked alone on city planning.',
        'The Garden City concept was introduced in 1898.',
        'Jane Jacobs supported modernist planning.',
        'Smart city technologies improve quality of life.',
        'Modern planning prioritizes _____ and environmental protection.',
        'Cities now integrate _____ to improve efficiency.',
        'Future planning will involve greater _____.',
      ],
      2: [
        'Which paragraph contains the following information? Choose the correct heading for each paragraph.',
        'AI in diagnostic imaging',
        'Drug discovery acceleration',
        'Personalized medicine advances',
        'Implementation challenges',
        'What is the main advantage of AI in medical imaging?',
        'How has AI affected drug discovery timelines?',
        'What does personalized medicine analyze?',
        'What is a major concern about AI in healthcare?',
        'AI promotes _____ in medical research.',
        'Machine learning accelerates _____.',
        'Precision medicine focuses on _____.',
        'Regulatory frameworks ensure _____.',
      ],
      3: [
        'Climate change definitely threatens food security worldwide.',
        'All regions will benefit from longer growing seasons.',
        'Sea-level rise affects coastal agricultural areas.',
        'Developing countries have adequate adaptive capacity.',
        'Agriculture contributes to greenhouse gas emissions.',
        'Which regions face the greatest climate risks?',
        'What is saltwater intrusion?',
        'What are precision agriculture technologies used for?',
        'Why is international cooperation necessary?',
        'What type of cooperation is mentioned as essential?',
        'Adaptation strategies focus on _____.',
        'Climate change affects the _____ negatively.',
        'Technology and cooperation are needed for the _____.',
        'Agriculture faces significant _____.',
      ],
    })),
  };

  // LISTENING DATA (from client/src/components/ListeningModule.tsx)
  const listeningDoc = {
    sections: [
      { title: 'Section 1 - Social Context', description: 'Conversation between a student and librarian about joining the library', questions: '1-10' },
      { title: 'Section 2 - General Interest', description: 'Monologue about a local museum and its facilities', questions: '11-20' },
      { title: 'Section 3 - Academic Context', description: 'Discussion between students and tutor about a research project', questions: '21-30' },
      { title: 'Section 4 - Academic Lecture', description: 'Lecture about renewable energy and environmental impact', questions: '31-40' },
    ],
    correctAnswers: [
      'library','9:30','thompson','07789 123456','student discount','monday','beginner','swimming','25','reception',
      'A','B','C','A','B','museum','guided tour','photography','café','gift shop',
      'research methods','data collection','analysis','presentation','peer review','C','A','B','A','C',
      'climate change','global warming','renewable energy','sustainability','carbon footprint','fossil fuels','solar power','wind energy','hydroelectric','environmental impact'
    ],
  };

  // WRITING DATA (from client/src/components/WritingModule.tsx)
  const writingDoc = {
    task1: {
      title: 'Writing Task 1',
      time: '20 minutes',
      wordCount: 150,
      instructions:
        'The chart shows the percentage of households with different types of internet connections in three countries from 2010 to 2020. Summarize the information by selecting and reporting the main features, and make comparisons where relevant.',
      chartDescription:
        'Internet Connection Types by Country (2010-2020). Broadband and Mobile Internet trends for Country A, B, C.',
    },
    task2: {
      title: 'Writing Task 2',
      time: '40 minutes',
      wordCount: 250,
      question:
        'Many people believe that social media has had a negative impact on society, particularly on young people. Others argue that social media has brought significant benefits to communication and information sharing. Discuss both views and give your own opinion.',
      tips: [
        'Present both sides of the argument clearly',
        'Give your own opinion and support it',
        'Use specific examples where possible',
        'Organize your essay with clear paragraphs',
        'Write a strong conclusion',
      ],
    },
  };

  // SPEAKING DATA (from client/src/components/SpeakingModule.tsx)
  const speakingDoc = {
    parts: [
      {
        title: 'Part 1 - Introduction and Interview',
        duration: '4-5 minutes',
        description: 'General questions about yourself, your life, and familiar topics',
        questions: [
          'What is your full name?',
          'Where are you from?',
          'Do you work or are you a student?',
          'What do you like about your job/studies?',
          'Do you enjoy reading books? Why or why not?',
          'What kind of books do you prefer?',
          'How has your reading habit changed over the years?',
        ],
      },
      {
        title: 'Part 2 - Individual Long Turn',
        duration: '3-4 minutes',
        description: 'Speak for 1-2 minutes on a given topic after 1 minute of preparation',
        questions: [
          `Describe a memorable journey you have taken.
          
You should say:
• Where you went
• Who you went with
• What you did during the journey
• And explain why this journey was memorable for you
          
You have 1 minute to prepare. You can make notes if you wish.`,
        ],
      },
      {
        title: 'Part 3 - Two-way Discussion',
        duration: '4-5 minutes',
        description: 'Abstract discussion related to Part 2 topic',
        questions: [
          'Why do you think people enjoy traveling?',
          'How has tourism changed in your country over the years?',
          'What are the benefits and drawbacks of international tourism?',
          'Do you think virtual travel experiences could replace real travel in the future?',
          'How important is it for young people to experience different cultures?',
        ],
      },
    ],
  };

  // Clear existing and insert fresh
  await ReadingTest.deleteMany({});
  await ListeningTest.deleteMany({});
  await WritingTest.deleteMany({});
  await SpeakingTest.deleteMany({});

  await ReadingTest.create(readingDoc);
  await ListeningTest.create(listeningDoc);
  await WritingTest.create(writingDoc);
  await SpeakingTest.create(speakingDoc);

  console.log('Seed complete.');
  await mongoose.disconnect();
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
