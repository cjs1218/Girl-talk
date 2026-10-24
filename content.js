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

/* ---------- My Pet ---------- */
// Stars earned for trying things can be spent here.
// Deliberately gentle: the pet never gets ill, sad or runs away if she doesn't visit.

const ADOPT_COST = 5;

const PETS = [
  { id:'kitten',  e:'🐱', name:'Kitten',      fav:'fish' },
  { id:'puppy',   e:'🐶', name:'Puppy',       fav:'bone' },
  { id:'bunny',   e:'🐰', name:'Bunny',       fav:'carrot' },
  { id:'hamster', e:'🐹', name:'Hamster',     fav:'cheese' },
  { id:'fox',     e:'🦊', name:'Fox cub',     fav:'apple' },
  { id:'panda',   e:'🐼', name:'Panda',       fav:'bamboo' },
  { id:'unicorn', e:'🦄', name:'Unicorn',     fav:'strawberry', cost:15 },
  { id:'dragon',  e:'🐲', name:'Baby dragon', fav:'pepper', cost:15 }
];

const PET_NAMES = ['Biscuit','Luna','Pip','Mochi','Sparkle','Coco','Bramble','Pickle','Honey','Star'];

// Homes change the room colours
const HOMES = [
  { id:'box',       e:'📦', name:'Cardboard box',  cost:0,  wall:'#f6e7d4', floor:'#d9b98f' },
  { id:'basket',    e:'🧺', name:'Cosy basket',    cost:8,  wall:'#fde2e4', floor:'#e8c39e' },
  { id:'cottage',   e:'🏡', name:'Little cottage', cost:15, wall:'#e3f1ff', floor:'#c8a27a' },
  { id:'treehouse', e:'🌳', name:'Treehouse',      cost:20, wall:'#dcf3d2', floor:'#a9825a' },
  { id:'beach',     e:'🏖️', name:'Beach hut',      cost:20, wall:'#fff3c4', floor:'#f1d39a' },
  { id:'igloo',     e:'🧊', name:'Snowy igloo',    cost:20, wall:'#e3f6ff', floor:'#f7fbff' },
  { id:'castle',    e:'🏰', name:'Castle',         cost:30, wall:'#ece4ff', floor:'#c6b6e6' }
];

// x / y are % positions in the room
const FURNITURE = [
  { id:'plant',   e:'🪴', name:'Plant',         cost:4,  x:9,  y:58 },
  { id:'picture', e:'🖼️', name:'Picture',       cost:5,  x:28, y:22 },
  { id:'clock',   e:'🕰️', name:'Clock',         cost:5,  x:12, y:20 },
  { id:'window',  e:'🪟', name:'Window',        cost:4,  x:50, y:24 },
  { id:'lights',  e:'✨', name:'Fairy lights',  cost:6,  x:50, y:7 },
  { id:'rainbow', e:'🌈', name:'Rainbow',       cost:8,  x:76, y:22 },
  { id:'books',   e:'📚', name:'Bookshelf',     cost:6,  x:91, y:52 },
  { id:'sofa',    e:'🛋️', name:'Sofa',          cost:10, x:18, y:80 },
  { id:'bed',     e:'🛏️', name:'Comfy bed',     cost:8,  x:80, y:82 },
  { id:'flowers', e:'💐', name:'Flowers',       cost:4,  x:94, y:76 },
  { id:'balloon', e:'🎈', name:'Balloon',       cost:3,  x:66, y:12 }
];

const TOYS = [
  { id:'ball',  e:'⚽', name:'Ball',       cost:3, x:38, y:90, say:'Wheee! Kick it to me!' },
  { id:'yarn',  e:'🧶', name:'Wool ball',  cost:3, x:60, y:91, say:'Ooh, so bouncy and tangly!' },
  { id:'teddy', e:'🧸', name:'Teddy',      cost:5, x:32, y:66, say:'Teddy cuddles are the best!' },
  { id:'yoyo',  e:'🪀', name:'Yo-yo',      cost:4, x:67, y:70, say:'Up and down, up and down!' },
  { id:'kite',  e:'🪁', name:'Kite',       cost:6, x:86, y:10, say:'Let\'s fly it really high!' }
];

const FOOD = [
  { id:'apple',      e:'🍎', name:'Apple',      cost:1 },
  { id:'carrot',     e:'🥕', name:'Carrot',     cost:1 },
  { id:'strawberry', e:'🍓', name:'Strawberry', cost:1 },
  { id:'fish',       e:'🐟', name:'Fish',       cost:2 },
  { id:'bone',       e:'🦴', name:'Bone',       cost:2 },
  { id:'cheese',     e:'🧀', name:'Cheese',     cost:2 },
  { id:'bamboo',     e:'🎋', name:'Bamboo',     cost:2 },
  { id:'pepper',     e:'🌶️', name:'Spicy pepper', cost:2 },
  { id:'cupcake',    e:'🧁', name:'Cupcake treat', cost:3 }
];

// where = where it sits on the pet
const ACCESSORIES = [
  { id:'flower', e:'🌸', name:'Flower',     cost:4,  where:'head' },
  { id:'bow',    e:'🎀', name:'Bow',        cost:5,  where:'head' },
  { id:'shades', e:'🕶️', name:'Sunglasses', cost:6,  where:'face' },
  { id:'scarf',  e:'🧣', name:'Scarf',      cost:6,  where:'neck' },
  { id:'tophat', e:'🎩', name:'Top hat',    cost:8,  where:'head' },
  { id:'cap',    e:'🎓', name:'Clever cap', cost:10, where:'head' },
  { id:'crown',  e:'👑', name:'Crown',      cost:12, where:'head' }
];

const PET_SAYS = [
  'Every brave step counts!',
  'I\'m so proud of you!',
  'You can do hard things.',
  'Mistakes help us learn. Even pets know that!',
  'Shall we do some flower breathing together?',
  'Thank you for looking after me!',
  'You\'re a great friend to me.',
  'Want to try a brave step today?'
];

/* ---------- My Week ---------- */
// Example week. Everything here can be changed in the app ("Change my week").
// Days: mon tue wed thu fri sat sun. School items are packed Mon–Fri.

// Picking a picture fills in the club name and a starter kit list (if those are empty or still the old suggestion)
const CLUB_EMOJI = [
  { e:'🏊', name:'Swimming', bag:['Swimming costume','Towel','Goggles','Hairbrush'] },
  { e:'💃', name:'Dance', bag:['Leotard','Dance shoes','Hair bobble','Water bottle'] },
  { e:'🤸', name:'Gymnastics', bag:['Leotard','Hair bobble','Water bottle'] },
  { e:'⚽', name:'Football', bag:['Football kit','Shin pads','Football boots','Water bottle'] },
  { e:'🏀', name:'Netball', bag:['Netball kit','Trainers','Water bottle'] },
  { e:'🎾', name:'Tennis', bag:['Tennis racket','Trainers','Water bottle'] },
  { e:'🏸', name:'Badminton', bag:['Badminton racket','Trainers','Water bottle'] },
  { e:'🥋', name:'Karate', bag:['Karate suit','Belt','Water bottle'] },
  { e:'🐴', name:'Horse riding', bag:['Riding hat','Jodhpurs','Riding boots','Gloves'] },
  { e:'🛼', name:'Roller skating', bag:['Roller skates','Helmet','Knee pads'] },
  { e:'⛸️', name:'Ice skating', bag:['Gloves','Warm jumper','Hat'] },
  { e:'🏃‍♀️', name:'Junior parkrun', bag:['parkrun barcode','Trainers','Water bottle'] },
  { e:'🏃', name:'PE at school', bag:['PE kit','Trainers','Hair bobble'] },
  { e:'🧘', name:'Yoga', bag:['Comfy clothes','Water bottle'] },
  { e:'🎹', name:'Piano', bag:['Piano book'] },
  { e:'🎻', name:'Violin', bag:['Violin','Music book'] },
  { e:'🎶', name:'Music lesson', bag:['Instrument','Music book'] },
  { e:'🎤', name:'Choir', bag:['Song folder','Water bottle'] },
  { e:'🎭', name:'Drama', bag:['Script','Water bottle'] },
  { e:'🎨', name:'Art club', bag:['Apron'] },
  { e:'🧑‍🍳', name:'Cooking club', bag:['Apron','Container to bring food home'] },
  { e:'♟️', name:'Chess club', bag:[] },
  { e:'📚', name:'Library', bag:['Library book'] },
  { e:'🧭', name:'Brownies', bag:['Brownies uniform','Subs money'] },
  { e:'⛪', name:'Church', bag:[] },
  { e:'👵', name:'Visit Grandma', bag:[] },
  { e:'🎉', name:'Party', bag:['Present','Card'] }
];

const ROUTINE_DEFAULT = {
  clubs: {
    mon: [{ id:'c1', e:'🏊', name:'Swimming', time:'16:30', bag:['Swimming costume','Towel','Goggles','Hairbrush','Snack'] }],
    tue: [],
    wed: [{ id:'c2', e:'🧭', name:'Brownies', time:'18:00', bag:['Brownies uniform','Subs money'] }],
    thu: [{ id:'c3', e:'🏃', name:'PE at school', time:'', bag:['PE kit','Trainers','Hair bobble'] }],
    fri: [],
    sat: [{ id:'c4', e:'💃', name:'Dance', time:'10:00', bag:['Leotard','Ballet shoes','Hair bobble','Water bottle'] }],
    sun: []
  },
  school: [{ t:'Reading book & record' }, { t:'Water bottle' }, { t:'Lunchbox' }, { t:'Coat' }],
  // A job or school item with no 'days' happens every day. Add days:['mon','tue',...] to limit it.
  jobs: {
    morning: [
      { id:'j1', e:'🛏️', t:'Make my bed' },
      { id:'j2', e:'👕', t:'Get dressed' },
      { id:'j3', e:'🍽️', t:'Breakfast things in the dishwasher' },
      { id:'j4', e:'🪥', t:'Brush my teeth' },
      { id:'j5', e:'💇‍♀️', t:'Brush my hair' }
    ],
    after: [
      { id:'j6', e:'🎒', t:'Unpack my school bag', days:['mon','tue','wed','thu','fri'] },
      { id:'j7', e:'🥪', t:'Lunchbox to the kitchen', days:['mon','tue','wed','thu','fri'] },
      { id:'j8', e:'📖', t:'Reading or homework' }
    ],
    bedtime: [
      { id:'j9',  e:'🧺', t:'Dirty clothes in the wash basket' },
      { id:'j10', e:'👗', t:'Lay out clothes for tomorrow' },
      { id:'j11', e:'🎒', t:'Pack my bag for tomorrow' },
      { id:'j12', e:'🪥', t:'Brush my teeth' }
    ]
  }
};

const JOB_PARTS = [
  { id:'morning', e:'☀️', name:'Morning' },
  { id:'after',   e:'🏠', name:'After school', school:true },  // only on school days
  { id:'bedtime', e:'🌙', name:'Bedtime' }
];

// Pictures to choose from for "My own club"
const OWN_EMOJI = ['⭐','🏃‍♀️','🚴‍♀️','🌳','🏞️','🐕','🧗‍♀️','🎳','🏓','🏐','⛳','🏄‍♀️','🎣','🎮','🧶','🎸','🥁','🎺','🪴','🐾','🧪','🔭','🏕️','🎬','🧁','🛝','👯‍♀️','📝','🧩','🫶'];

/* ---------- Pocket money ---------- */
// Suggested bonus jobs ("gigs") a grown-up can choose from. Prices are only suggestions.
const GIG_SUGGESTIONS = [
  { cat:'Around the house', list:[
    { e:'👕', t:'Fold and put away the washing', pay:0.50 },
    { e:'🧦', t:'Pair up all the socks', pay:0.30 },
    { e:'🧹', t:'Hoover a room', pay:0.50 },
    { e:'🪞', t:'Clean the mirrors', pay:0.30 },
    { e:'🚿', t:'Wipe the bathroom sink', pay:0.40 },
    { e:'♻️', t:'Sort the recycling', pay:0.30 },
    { e:'🛒', t:'Help unpack the shopping', pay:0.30 },
    { e:'🧸', t:'Sort old toys to give to charity', pay:1.00 },
    { e:'🪶', t:'Dust the living room', pay:0.40 },
    { e:'👟', t:'Clean and polish the shoes', pay:0.50 },
    { e:'🚪', t:'Wipe the door handles and light switches', pay:0.30 },
    { e:'🗑️', t:'Help put the bins out (with a grown-up)', pay:0.30 },
    { e:'🚙', t:'Clear the crumbs and rubbish out of the car', pay:0.75 },
    { e:'🪙', t:'Count and sort the coin jar', pay:0.30 }
  ]},
  { cat:'Kitchen', list:[
    { e:'🍽️', t:'Lay and clear the table', pay:0.30 },
    { e:'🧽', t:'Help wash up after dinner', pay:0.50 },
    { e:'🥗', t:'Help cook dinner', pay:0.50 },
    { e:'🧁', t:'Bake something with a grown-up', pay:0.50 },
    { e:'🍳', t:'Make a grown-up breakfast in bed', pay:1.00 },
    { e:'🥡', t:'Empty the dishwasher', pay:0.30 },
    { e:'🧻', t:'Wipe the kitchen table and counters', pay:0.20 },
    { e:'🥪', t:'Make my own packed lunch', pay:0.30 },
    { e:'🍓', t:'Make a fruit salad for pudding', pay:0.50 },
    { e:'📝', t:'Write the shopping list with a grown-up', pay:0.20 },
    { e:'📅', t:'Check the fridge for out-of-date food', pay:0.20 },
    { e:'👩‍🍳', t:'Plan a family meal and help cook it', pay:1.00 }
  ]},
  { cat:'Garden and outdoors', list:[
    { e:'🚗', t:'Help wash the car', pay:1.00 },
    { e:'🍂', t:'Sweep or rake the leaves', pay:1.00 },
    { e:'🌼', t:'Pull up weeds', pay:0.75 },
    { e:'🌱', t:'Water the plants', pay:0.20 },
    { e:'🥕', t:'Plant some seeds and look after them', pay:0.50 },
    { e:'🗑️', t:'Pick up litter on a walk (with gloves)', pay:0.50 },
    { e:'🧹', t:'Sweep the path or patio', pay:0.50 },
    { e:'🚲', t:'Wash the bikes', pay:0.75 },
    { e:'🪑', t:'Wash the garden furniture', pay:0.75 },
    { e:'🐦', t:'Fill up the bird feeder', pay:0.20 },
    { e:'🍎', t:'Pick fruit or vegetables from the garden', pay:0.30 },
    { e:'👚', t:'Bring in the washing from the line and fold it', pay:0.40 }
  ]},
  { cat:'Pets', list:[
    { e:'🐕', t:'Walk the dog with a grown-up', pay:0.50 },
    { e:'🐾', t:'Help clean out the pet\'s cage or bed', pay:1.00 },
    { e:'🥣', t:'Feed the pet without being reminded', pay:0.20 }
  ]},
  { cat:'Learning and kindness', list:[
    { e:'📚', t:'Finish a whole book', pay:1.00 },
    { e:'🧮', t:'15 minutes of times tables', pay:0.30 },
    { e:'✍️', t:'Write a thank-you card', pay:0.30 },
    { e:'🎂', t:'Make a birthday card for family', pay:0.30 },
    { e:'🤝', t:'Help a neighbour (with a grown-up)', pay:1.00 },
    { e:'🎹', t:'15 minutes of extra instrument practice', pay:0.30 },
    { e:'🔤', t:'Learn to spell 10 tricky words', pay:0.30 },
    { e:'🪡', t:'Learn to sew on a button (with a grown-up)', pay:0.50 },
    { e:'📖', t:'Write and illustrate a short story', pay:0.50 },
    { e:'👶', t:'Read a book to a younger brother, sister or cousin', pay:0.30 }
  ]},
  { cat:'My bedroom', list:[
    { e:'🛏️', t:'Change my bed sheets (with help)', pay:0.50 },
    { e:'🧽', t:'Tidy and dust my whole bedroom', pay:0.50 },
    { e:'📚', t:'Sort out my bookshelf', pay:0.30 },
    { e:'👗', t:'Sort clothes that are too small to give away', pay:1.00 },
    { e:'🧩', t:'Check games and puzzles have all their pieces', pay:0.50 }
  ]},
  { cat:'Little business ideas', list:[
    { e:'🔖', t:'Make bookmarks or cards to sell to family', pay:0.50 },
    { e:'📰', t:'Make a family newsletter', pay:0.50 },
    { e:'📱', t:'Teach Grandma or Grandad something on their phone', pay:0.50 },
    { e:'🧽', t:'Wash a neighbour\'s car (with a grown-up)', pay:1.50 },
    { e:'🏷️', t:'Get old toys ready for a car boot sale', pay:1.00 }
  ]}
];

const PAY_STEPS = [0, 0.05, 0.10, 0.15, 0.20, 0.25, 0.50, 1.00];
const CURRENCIES = [{ c:'£', minor:'p' }, { c:'€', minor:'c' }, { c:'$', minor:'¢' }];
