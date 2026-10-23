// All the words in the app live here, so they are easy to change.
// Keep language simple and kind: written for girls of about 8 to 10.

const AVATARS = ['🦄','🐱','🦊','🐼','🐰','🦋','🐬','🌸','🐸','🦉','🐨','🌟'];

const ISLANDS = [
  { id:'brave',   name:'Brave Me',        emoji:'🦁', sub:'Feel proud of who you are' },
  { id:'calm',    name:'Calm Corner',     emoji:'🌈', sub:'Tools for big feelings' },
  { id:'goals',   name:'My Goals',        emoji:'🚀', sub:'Make a plan, reach your dream' },
  { id:'friends', name:'Friendship Tools',emoji:'💞', sub:'Brave words & tricky moments' }
];

const GREETINGS = [
  'Every brave step counts.',
  'You are learning and growing every day.',
  'All feelings are OK.',
  'Being kind to yourself is a superpower.',
  'Small steps make big changes.'
];

/* ---------- Brave Me ---------- */

const STRENGTHS = [
  { id:'kind', e:'💗', name:'Kind' },
  { id:'brave', e:'🦁', name:'Brave' },
  { id:'funny', e:'😄', name:'Funny' },
  { id:'creative', e:'🎨', name:'Creative' },
  { id:'curious', e:'🔍', name:'Curious' },
  { id:'helpful', e:'🤝', name:'Helpful' },
  { id:'listener', e:'👂', name:'Good listener' },
  { id:'hardworking', e:'💪', name:'Hard-working' },
  { id:'honest', e:'⭐', name:'Honest' },
  { id:'fair', e:'⚖️', name:'Fair' },
  { id:'patient', e:'🐢', name:'Patient' },
  { id:'sporty', e:'⚽', name:'Sporty' },
  { id:'animals', e:'🐾', name:'Great with animals' },
  { id:'maker', e:'🛠️', name:'Good at making things' },
  { id:'reader', e:'📚', name:'Loves learning' },
  { id:'friend', e:'🫶', name:'Loyal friend' }
];

const LADDER = [
  'Smile at someone new',
  'Say "hi" to someone I don\'t usually talk to',
  'Put my hand up to answer a question',
  'Ask someone "Can I play too?"',
  'Tell a grown-up how I feel',
  'Say "I don\'t like that" in a calm, strong voice',
  'Try something new, even if I might not be good at it yet',
  'Invite someone to play with me'
];

// Worry voice -> pick the kind AND true voice
const SELF_TALK = [
  { worry:'I got a spelling wrong. I\'m so stupid.',
    options:[
      { t:'Everyone gets things wrong sometimes. I can practise it.', kind:true },
      { t:'I\'m the worst at everything.', why:'That\'s the worry voice again. It isn\'t true!' },
      { t:'Spelling doesn\'t matter, so I won\'t ever try.', why:'Giving up stops you from getting better.' }
    ]},
  { worry:'Nobody wants to play with me.',
    options:[
      { t:'Nobody likes me and nobody ever will.', why:'"Nobody" and "ever" are worry words. They\'re hardly ever true.' },
      { t:'Today was hard. I can ask someone else or try again tomorrow.', kind:true },
      { t:'I don\'t need any friends anyway.', why:'It\'s OK to want friends. Wanting friends is normal.' }
    ]},
  { worry:'I can\'t do this maths. It\'s too hard.',
    options:[
      { t:'I can\'t do it YET. I can try another way or ask for help.', kind:true },
      { t:'I\'m just not a maths person.', why:'Brains grow when we practise. Nobody is born knowing maths.' },
      { t:'I\'ll copy someone else\'s answer.', why:'That won\'t help your brain learn it.' }
    ]},
  { worry:'If I do show and tell, everyone will laugh at me.',
    options:[
      { t:'Everyone will definitely laugh. I\'ll be so embarrassed.', why:'The worry voice is guessing. It can\'t see the future!' },
      { t:'I feel nervous, and that\'s OK. Most people will be interested.', kind:true },
      { t:'I\'ll be the best ever and everyone will clap for ages.', why:'Kind thoughts are true too. You don\'t have to be the best.' }
    ]},
  { worry:'My friend is cross with me, so I must be a bad friend.',
    options:[
      { t:'Friends fall out sometimes. We can talk and make up.', kind:true },
      { t:'I\'m a terrible friend and she\'ll never like me again.', why:'One fall-out doesn\'t make you a bad friend.' },
      { t:'It\'s all her fault, not mine at all.', why:'Usually both people can help fix it.' }
    ]},
  { worry:'My friend draws better than me. I\'m rubbish.',
    options:[
      { t:'I should never draw again.', why:'Then you\'d miss out on something fun!' },
      { t:'Everyone is good at different things. I can enjoy drawing my way.', kind:true },
      { t:'Her drawing is actually rubbish.', why:'Putting others down doesn\'t make us feel better for long.' }
    ]},
  { worry:'I messed up the dance at the show. Everything is ruined.',
    options:[
      { t:'I made a mistake, and I was brave to be on stage.', kind:true },
      { t:'Everyone saw. It\'s the worst day of my life.', why:'Most people forget small mistakes really quickly.' },
      { t:'I\'m never doing anything in front of people again.', why:'Hiding away means missing fun things too.' }
    ]}
];

/* ---------- Calm Corner ---------- */

const FEELINGS = [
  { id:'happy', e:'😊', name:'Happy', msg:'Yay! Notice what made you happy today. You could tell someone about it.', tools:['strengths','goals'] },
  { id:'excited', e:'🤩', name:'Excited', msg:'Excited feelings are full of energy! If they get too fizzy, a slow breath helps.', tools:['breathe'] },
  { id:'calm', e:'😌', name:'Calm', msg:'Lovely. Calm is a great feeling. Remember what helped you feel this way.', tools:['goals'] },
  { id:'proud', e:'🥰', name:'Proud', msg:'Well done! Being proud of yourself is a good thing.', tools:['strengths'] },
  { id:'worried', e:'😟', name:'Worried', msg:'Worries can feel big. Let\'s get it out of your head and work out what to do.', tools:['worry','breathe','grownup'] },
  { id:'sad', e:'😢', name:'Sad', msg:'It\'s OK to feel sad. Crying is OK too. A hug or a chat with someone you love can help.', tools:['grownup','squeeze','breathe'] },
  { id:'angry', e:'😠', name:'Angry', msg:'Anger is OK, but hurting people or things isn\'t. Calm your body first, then sort it out.', tools:['breathe','squeeze','stt'] },
  { id:'leftout', e:'🥺', name:'Left out', msg:'Being left out really hurts. It doesn\'t mean you\'re not likeable.', tools:['words','stories','grownup'] },
  { id:'jealous', e:'😒', name:'Jealous', msg:'Jealous feelings are normal. They often mean something really matters to you.', tools:['selftalk','strengths'] },
  { id:'embarrassed', e:'😳', name:'Embarrassed', msg:'Everyone feels embarrassed sometimes. It goes away faster than you think.', tools:['selftalk','breathe'] },
  { id:'frustrated', e:'😤', name:'Frustrated', msg:'When something is hard, take a break, then try a different way.', tools:['breathe','stt'] },
  { id:'lonely', e:'😔', name:'Lonely', msg:'Feeling lonely is hard. Talking to a grown-up and finding one friend to play with can help.', tools:['grownup','ladder','words'] }
];

const SIZES = [
  { n:1, name:'Tiny' }, { n:2, name:'Small' }, { n:3, name:'Medium' }, { n:4, name:'Big' }, { n:5, name:'Huge' }
];

// Where each suggested tool goes
const TOOL_LINKS = {
  breathe:   { e:'🌸', name:'Flower & candle breathing', href:'#/calm/breathe' },
  squeeze:   { e:'🍋', name:'Squeeze & relax', href:'#/calm/squeeze' },
  senses:    { e:'👀', name:'5-4-3-2-1 senses game', href:'#/calm/senses' },
  worry:     { e:'📦', name:'Worry sorter', href:'#/calm/worry' },
  strengths: { e:'💪', name:'My super strengths', href:'#/brave/strengths' },
  ladder:    { e:'🪜', name:'Brave steps ladder', href:'#/brave/ladder' },
  selftalk:  { e:'💬', name:'Kind voice game', href:'#/brave/selftalk' },
  goals:     { e:'🚀', name:'Set a goal', href:'#/goals' },
  words:     { e:'🗣️', name:'Brave words', href:'#/friends/words' },
  stories:   { e:'📖', name:'Friendship stories', href:'#/friends/stories' },
  stt:       { e:'🚦', name:'Stop, Think, Do', href:'#/friends/stt' },
  grownup:   { e:'🧡', name:'Talk to a grown-up', href:'#/friends/help' }
};

const SQUEEZE = [
  { e:'🍋', name:'Lemon hands', squeeze:'Pretend you have a lemon in each hand. Squeeze it really hard to get all the juice out!', relax:'Drop the lemons. Let your hands go soft and floppy.' },
  { e:'🐢', name:'Turtle shoulders', squeeze:'Be a turtle hiding in its shell. Pull your shoulders right up to your ears.', relax:'Now come out of your shell. Let your shoulders drop down.' },
  { e:'🐝', name:'Scrunchy face', squeeze:'A bee has landed on your nose! Scrunch up your whole face to wiggle it off.', relax:'It flew away. Let your face go smooth and still.' },
  { e:'🦶', name:'Muddy toes', squeeze:'Imagine standing in thick, squishy mud. Push your toes down hard into it.', relax:'Step out of the mud. Let your feet and legs relax.' },
  { e:'🍮', name:'Wobbly jelly', squeeze:'Make your whole body stiff like a robot. Squeeze everything!', relax:'Now be a wobbly jelly. Let your whole body go loose and calm.' }
];

const SENSES = [
  { n:5, e:'👀', t:'things you can SEE' },
  { n:4, e:'✋', t:'things you can TOUCH' },
  { n:3, e:'👂', t:'things you can HEAR' },
  { n:2, e:'👃', t:'things you can SMELL' },
  { n:1, e:'👅', t:'thing you can TASTE' }
];

/* ---------- Goals (WOOP) ---------- */

const WOOP_STEPS = [
  { key:'wish', letter:'W', name:'Wish', q:'What would you love to do or get better at?',
    ex:['Join in games at playtime','Make a new friend','Read a chapter book','Swim a whole length','Put my hand up more in class'] },
  { key:'outcome', letter:'O', name:'Outcome', q:'Imagine it has happened! What\'s the best thing about it? How do you feel?',
    ex:['I\'d feel proud','I\'d have more fun at playtime','I\'d feel happy and confident'] },
  { key:'obstacle', letter:'O', name:'Obstacle', q:'What thing inside YOU might get in the way?',
    ex:['I feel too shy','I give up when it gets hard','I forget','I worry I\'ll get it wrong'] },
  { key:'plan', letter:'P', name:'Plan', q:'If that happens, what will you do?',
    ex:['take a big breath and try anyway','ask a grown-up for help','say "I can\'t do it YET"','try for just 5 minutes'] }
];

/* ---------- Friendships ---------- */

const MMM = [
  { s:'Someone pushes in front of you in the lunch queue.',
    mouse:'Say nothing and feel cross inside.',
    monster:'Shove them back and shout "MOVE!"',
    me:'"Excuse me, I was here first. Please go behind me."' },
  { s:'Your friend says, "If you play with Lily, I won\'t be your friend any more."',
    mouse:'Stop playing with Lily, even though you like her.',
    monster:'"Fine! I don\'t want to be your friend anyway!"',
    me:'"I like playing with you AND Lily. We could all play together."' },
  { s:'Someone keeps taking your rubber without asking.',
    mouse:'Let them keep taking it and use your finger instead.',
    monster:'Snatch it back and throw their pencil on the floor.',
    me:'"Please ask before you borrow my things."' },
  { s:'Your friends are playing a game and you want to join in.',
    mouse:'Stand nearby and hope someone notices you.',
    monster:'Barge in and tell everyone they\'re playing it wrong.',
    me:'"That looks fun! Can I play too?"' },
  { s:'Someone laughs at your drawing.',
    mouse:'Hide your drawing and feel silly.',
    monster:'Laugh at their drawing and call it rubbish.',
    me:'"That\'s not kind. I\'m proud of my drawing."' },
  { s:'A friend wants you to say something mean about another girl.',
    mouse:'Say it so your friend isn\'t cross with you.',
    monster:'Tell your friend she\'s horrible and push her away.',
    me:'"I don\'t want to say mean things. Let\'s talk about something else."' },
  { s:'Your friend borrowed your favourite pen and broke it.',
    mouse:'Say "It\'s fine" even though you\'re upset.',
    monster:'Break something of hers so it\'s fair.',
    me:'"I feel sad my pen is broken. Next time, could you be more careful?"' },
  { s:'Someone is always choosing the game and never lets you choose.',
    mouse:'Always play what she wants, even when you\'re bored.',
    monster:'Tell everyone she\'s bossy and nobody should play with her.',
    me:'"Can we take turns choosing? You pick today and I\'ll pick tomorrow."' }
];

const STORIES = [
  { id:'join', e:'🐴', title:'"You can\'t play with us"',
    scene:'At playtime, Ava and Grace are playing horses. You ask if you can join. Ava says, "No. It\'s only a game for two."',
    choices:[
      { t:'Ask, "Could I be a third horse? Or could we play something all three of us can do?"', r:'good',
        o:'Grace says, "OK, you can be the foal!" Sometimes asking in a friendly way works. And if they still said no, that\'s OK too. You\'d have a Plan B.' },
      { t:'Shout, "Fine, I\'m never playing with you again!" and stomp off.', r:'bad',
        o:'Now everyone feels upset, and it\'s harder to play together tomorrow. It\'s OK to feel hurt, but you can calm down before you speak.' },
      { t:'Go and find someone else, like Zara on the bench, who is on her own.', r:'good',
        o:'Zara is really pleased! You make up a new game together. Having a Plan B person or game is a great idea.' }
    ],
    tip:'Sometimes people say no. It hurts, but it doesn\'t mean you\'re not likeable. Keep a Plan B: another friend, another game, or a grown-up on duty.' },
  { id:'bossy', e:'👑', title:'The bossy friend',
    scene:'Your friend Isla always decides what game you play. When you want to play something different, she gets cross and says, "That\'s boring."',
    choices:[
      { t:'Always play what Isla wants so she stays happy.', r:'ok',
        o:'Isla is happy, but you\'re not. Your choices matter too! A good friend takes turns.' },
      { t:'Say calmly, "Can we take turns choosing? You pick today, I\'ll pick tomorrow."', r:'good',
        o:'Isla thinks about it and says, "OK, but I go first!" Taking turns is fair, and you said it in a kind, strong way.' },
      { t:'Tell everyone else in the class that Isla is bossy.', r:'bad',
        o:'Isla finds out and is really upset. Talking about people behind their backs usually makes things worse.' }
    ],
    tip:'In a good friendship, both people get a say. You can use a calm, strong voice to ask for turns.' },
  { id:'newfriend', e:'💛', title:'My best friend has a new friend',
    scene:'Your best friend Ruby has started sitting next to Mia, the new girl. They are laughing together, and you feel jealous and worried.',
    choices:[
      { t:'Tell Ruby, "You have to choose. It\'s me or her!"', r:'bad',
        o:'Ruby feels stuck and upset. Making people choose can push them away.' },
      { t:'Go over and say hi to Mia too. Maybe the three of you can be friends.', r:'good',
        o:'Mia is funny and kind! It turns out you all like the same TV show. Friends can have more than one friend.' },
      { t:'Tell yourself, "Ruby can have other friends, and so can I." Then go and play with someone else today.', r:'good',
        o:'You have a nice playtime, and Ruby still sits with you at lunch. Having lots of friends is like having eggs in lots of baskets.' }
    ],
    tip:'Feeling jealous is normal. It means your friend matters to you. But friends can have more than one friend, and that\'s OK.' },
  { id:'secret', e:'🤫', title:'The secret',
    scene:'You told your friend a secret: you still sleep with a night light. Today she told some girls in your class, and they giggled.',
    choices:[
      { t:'Tell everyone her secret back so she knows how it feels.', r:'bad',
        o:'Now two people are hurt, and it becomes a big fight. Getting even doesn\'t fix things.' },
      { t:'Talk to her on her own: "I felt really embarrassed when you told everyone. That was private."', r:'good',
        o:'She looks sorry and says, "I didn\'t think it was a big deal. I\'m sorry." Telling someone how you feel helps them understand.' },
      { t:'Tell a grown-up you trust how you are feeling.', r:'good',
        o:'Your grown-up gives you a hug and helps you work out what to say. Getting help is a brave thing to do.' }
    ],
    tip:'Use "I feel..." words to say how something made you feel. And remember: lots of people have night lights. It\'s nothing to be embarrassed about!' },
  { id:'fallout', e:'💔', title:'The falling out',
    scene:'You and your friend argued about who won a game. You both shouted. Now she won\'t talk to you, and you feel horrible.',
    choices:[
      { t:'Wait until you both feel calm, then say, "I\'m sorry I shouted. Can we be friends again?"', r:'good',
        o:'She says, "Sorry I shouted too." You decide to play a different game. Saying sorry first is very brave.' },
      { t:'Ignore her forever. She started it!', r:'bad',
        o:'You both feel sad and miss each other. It doesn\'t matter who started it. Someone has to be brave and fix it.' },
      { t:'Give her a little time, then ask if she wants to play something new.', r:'good',
        o:'After a while, she smiles and says yes. Sometimes a bit of space helps everyone calm down.' }
    ],
    tip:'All friends fall out sometimes. It\'s fixing it that matters. Calm down first, then say sorry for your part.' },
  { id:'unkind', e:'🛑', title:'When it keeps happening',
    scene:'A girl in your class keeps calling you names and leaving you out on purpose. It happens almost every day, and you\'ve already asked her to stop.',
    choices:[
      { t:'Keep it to yourself. Telling is telling tales.', r:'bad',
        o:'Keeping it inside makes you feel worse and worse. When unkind things keep happening, it\'s important to tell.' },
      { t:'Tell your teacher and your grown-up at home exactly what has been happening.', r:'good',
        o:'Your teacher says, "Thank you for telling me. This isn\'t OK, and I\'m going to help." Telling is NOT telling tales. It\'s being brave.' },
      { t:'Be really mean back to her so she stops.', r:'bad',
        o:'Now you could get into trouble too, and she keeps going. Grown-ups can help you sort this out safely.' }
    ],
    tip:'If someone keeps being unkind on purpose, even after you\'ve asked them to stop, tell a grown-up you trust. You deserve to feel safe and happy.' }
];

const PHRASES = [
  { cat:'Joining in', e:'🙋‍♀️', list:['Can I play too?','That looks fun! What are you playing?','Do you need another person?','Do you want to play with me?'] },
  { cat:'Saying no', e:'✋', list:['No, thank you.','I don\'t want to do that.','I\'m not comfortable with that.','No. That\'s my choice.'] },
  { cat:'Unkind words', e:'🛑', list:['Stop. I don\'t like that.','That\'s not kind.','Please don\'t talk to me like that.','I\'m going to play somewhere else now.'] },
  { cat:'Taking turns', e:'🔄', list:['Can we take turns choosing?','You chose last time. Can I choose now?','Let\'s find a game we all like.'] },
  { cat:'Saying sorry', e:'💐', list:['I\'m sorry I said that.','I\'m sorry. Are you OK?','I\'m sorry. Next time I\'ll try to...'] },
  { cat:'Making up', e:'🌈', list:['I miss playing with you.','Can we start again?','I\'m sorry we fell out. Friends?'] },
  { cat:'Helping a friend', e:'🫶', list:['Hey, leave her alone.','Do you want to come and play with us?','Are you OK? Do you want me to come with you to tell a teacher?'] }
];

const FRIEND_SORT = [
  { t:'Lets you choose the game sometimes', kind:true },
  { t:'Says you can only be her friend if you don\'t play with anyone else', kind:false },
  { t:'Says sorry when she gets it wrong', kind:true },
  { t:'Tells your secrets to other people', kind:false },
  { t:'Is happy when good things happen to you', kind:true },
  { t:'Laughs at you when you make a mistake', kind:false },
  { t:'Asks if you\'re OK when you look sad', kind:true },
  { t:'Often makes you feel worried or bad about yourself', kind:false },
  { t:'Shares and takes turns', kind:true },
  { t:'Only plays with you when nobody else is around', kind:false },
  { t:'Says "You can\'t come to my party" to get her own way', kind:false },
  { t:'Keeps your private things private', kind:true }
];

const STT_IDEAS = [
  'Use my brave words','Take turns','Ask a grown-up for help','Walk away and play something else',
  'Say sorry for my part','Wait until I feel calm','Find a different friend to play with','Tell them how I feel'
];

const HELP_LIST = [
  'Someone keeps being unkind to you, even after you\'ve asked them to stop',
  'Someone hurts your body',
  'Someone asks you to keep a secret that makes you feel worried or uncomfortable',
  'You feel sad, worried or angry a lot of the time',
  'Something you see or hear online upsets you',
  'You just need a hug and a chat'
];
