export type NodeKind = "character" | "concept";

export interface GraphNode {
  id: string;
  name: string;
  sanskrit?: string;
  kind: NodeKind;
  group: string;
  short: string;
  body: string;
  appears?: number[];
  related?: string[];
}

export interface GraphEdge {
  source: string;
  target: string;
  kind?: "teaches" | "opposes" | "related" | "is-in";
}

export const NODES: GraphNode[] = [
  // ===== CHARACTERS =====
  {
    id: "krishna",
    name: "Krishna",
    sanskrit: "कृष्ण",
    kind: "character",
    group: "divine",
    short: "Charioteer, friend, divine teacher",
    body: "Krishna is Arjuna's cousin, lifelong friend, and charioteer in the war. He has vowed not to fight — only to drive the chariot and counsel. Throughout the Gita he progressively reveals himself as more than human: in chapter 7 he hints at his cosmic nature, in chapter 10 he names his manifestations in the world, and in chapter 11 he shows his universal form. The blue skin and peacock feather are his iconic markers. He holds the reins, not a weapon. The whole point of the dialogue is that the divine guides; Arjuna must still act.",
    appears: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
    related: ["arjuna", "vishvarupa", "bhakti", "ishvara", "avatara"]
  },
  {
    id: "arjuna",
    name: "Arjuna",
    sanskrit: "अर्जुन",
    kind: "character",
    group: "pandava",
    short: "Elite warrior, the student in crisis",
    body: "The third of five Pandava brothers, considered the greatest archer of his age. Trained by Drona. He is physically the more imposing of the two on the chariot — fully armored, with the divine bow Gandiva — but emotionally collapses when he sees the cost of the coming war. He is a stand-in for any thoughtful person facing a difficult duty. His role in the dialogue is to ask honest questions, push back when he doesn't understand, and ultimately decide for himself.",
    appears: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
    related: ["krishna", "moha", "dharma", "gandiva"]
  },
  {
    id: "sanjaya",
    name: "Sanjaya",
    sanskrit: "सञ्जय",
    kind: "character",
    group: "narrator",
    short: "Blind king's seer — narrates the dialogue",
    body: "The minister of the blind king Dhritarashtra. Granted divine sight by the sage Vyasa so he can describe the entire war from the palace, far from the battlefield. The whole Gita is technically Sanjaya reporting Krishna's and Arjuna's conversation back to the king. Without him, there is no Gita — he is the device that lets the reader hear the dialogue at all.",
    appears: [1, 11, 18],
    related: ["dhritarashtra", "krishna", "arjuna"]
  },
  {
    id: "dhritarashtra",
    name: "Dhritarashtra",
    sanskrit: "धृतराष्ट्र",
    kind: "character",
    group: "kaurava",
    short: "Blind king — asks the opening question",
    body: "Father of the hundred Kauravas, including Duryodhana. Born blind, he is also blind to his sons' wrongdoing. The very first verse of the Gita is his question to Sanjaya: 'On the field of dharma, what did my sons and Pandu's sons do?' He is the one for whom the entire dialogue is, ostensibly, being narrated. The king who cannot see — physically or morally — is the reason we get to hear the teaching at all.",
    appears: [1],
    related: ["sanjaya", "duryodhana"]
  },
  {
    id: "duryodhana",
    name: "Duryodhana",
    sanskrit: "दुर्योधन",
    kind: "character",
    group: "kaurava",
    short: "The ambitious cousin — Arjuna's adversary",
    body: "Eldest son of Dhritarashtra, leader of the Kaurava forces. He is the reason the war is happening — refused to give the Pandavas even five villages of their rightful share, declaring that he wouldn't yield enough land 'to fit the point of a needle.' In chapter 1 he surveys the Pandava army, naming every great warrior. Not depicted as cartoonishly evil; he is a competent prince ruled by ambition and pride — exactly the qualities chapter 16 calls 'demonic.'",
    appears: [1],
    related: ["dhritarashtra", "arjuna", "kama", "krodha"]
  },
  {
    id: "bhishma",
    name: "Bhishma",
    sanskrit: "भीष्म",
    kind: "character",
    group: "kaurava",
    short: "The grand-uncle — bound by his oath",
    body: "Grand-uncle to both the Pandavas and Kauravas. Sworn to defend the throne of Hastinapur — which means he fights on Duryodhana's side, even though he loves the Pandavas. The greatest warrior on the field. He is one of the people Arjuna sees and refuses to kill in chapter 1. Bhishma represents a perfect dilemma: a good man bound by duty to the wrong side. The question 'is duty enough?' lives in him.",
    appears: [1],
    related: ["arjuna", "drona", "dharma"]
  },
  {
    id: "drona",
    name: "Drona",
    sanskrit: "द्रोण",
    kind: "character",
    group: "kaurava",
    short: "Arjuna's archery teacher — fighting against him",
    body: "The Brahmin master of weapons who trained both the Pandava and Kaurava princes. Arjuna was his favorite student. Bound to the Kuru kingdom, he fights on Duryodhana's side. When Arjuna freezes in chapter 1, Drona is among the faces he sees and cannot raise his bow against. Drona embodies the painful question: what do you owe the people who made you?",
    appears: [1],
    related: ["arjuna", "bhishma", "dharma"]
  },
  {
    id: "gandiva",
    name: "Gandiva",
    sanskrit: "गाण्डीव",
    kind: "character",
    group: "object",
    short: "Arjuna's divine bow",
    body: "Arjuna's celestial bow, gifted to him by the fire god Agni. In chapter 1, when Arjuna's resolve breaks, the most physical signal of his collapse is the line: 'Gandiva slips from my hand.' For a warrior of Arjuna's stature, dropping his bow is the equivalent of laying down everything that defines him. The Gita ends, in chapter 18, with him picking it back up.",
    appears: [1, 18],
    related: ["arjuna"]
  },

  // ===== CONCEPTS =====
  {
    id: "dharma",
    name: "Dharma",
    sanskrit: "धर्म",
    kind: "concept",
    group: "core",
    short: "Right action; duty grounded in your nature and role",
    body: "Often translated as 'duty,' but closer to 'the right action for this person, in this situation, given their nature.' Dharma is not a universal rulebook — it's contextual. A warrior's dharma differs from a teacher's. The Gita argues that doing your own dharma imperfectly is better than doing another's perfectly (chapter 18). The opening question of the entire book sets the field: 'on the field of dharma, what did they do?' Every chapter is a different angle on this single question.",
    appears: [1,2,3,16,18],
    related: ["karma-yoga", "moha", "arjuna"]
  },
  {
    id: "karma-yoga",
    name: "Karma Yoga",
    sanskrit: "कर्म योग",
    kind: "concept",
    group: "path",
    short: "The discipline of action without attachment to results",
    body: "The first of three main paths Krishna teaches. The core formula: 'You have a right to your action. You have no right to its fruit.' Act fully, with care and skill, but release attachment to outcomes. This is NOT about not caring — it's about not letting the result determine your sense of self. Chapter 2 plants this; chapters 3, 4, and 5 develop it. Most of the rest of the book is a commentary on this single principle.",
    appears: [2,3,4,5,18],
    related: ["dharma", "samatva", "yajna", "krishna"]
  },
  {
    id: "bhakti",
    name: "Bhakti",
    sanskrit: "भक्ति",
    kind: "concept",
    group: "path",
    short: "The path of devotion",
    body: "The second main path. Where karma yoga is about how you act, bhakti is about who you love. Chapter 12 is the clearest summary: fix the mind on the divine, and if you can't, work for the divine, and if you can't, give up the fruits of action. Chapter 9 is the most generous: 'a leaf, a flower, a fruit, water — offered with love, I accept.' Bhakti is the path Krishna says is the easiest and the most accessible — and in chapter 18 he tells Arjuna it's the one he himself prefers.",
    appears: [7,9,10,11,12,18],
    related: ["krishna", "ishvara", "sharanagati", "karma-yoga"]
  },
  {
    id: "jnana",
    name: "Jnana",
    sanskrit: "ज्ञान",
    kind: "concept",
    group: "path",
    short: "The path of knowledge",
    body: "The third main path: liberation through direct knowledge of reality. 'All actions are burned up in the fire of true knowledge' (chapter 4). Jnana isn't intellectual learning — it's the kind of knowing that fundamentally rewires what you do, like seeing through an optical illusion. Chapter 13 lists what real jnana looks like: humility, honesty, non-violence, patience, even-mindedness. These aren't virtues TO knowledge — they ARE knowledge in this framework.",
    appears: [4,7,13],
    related: ["karma-yoga", "bhakti", "atman"]
  },
  {
    id: "atman",
    name: "Atman",
    sanskrit: "आत्मन्",
    kind: "concept",
    group: "metaphysics",
    short: "The self that doesn't change",
    body: "Often translated as 'soul,' but better understood as 'the awareness that watches everything else.' Krishna's first major teaching in chapter 2 is: the body changes, sensations change, thoughts change, but something watches all of that — and THAT is what you really are. The atman cannot be cut, burned, drowned, or dried. Chapter 13's distinction between 'the field' (body, mind, emotions) and 'the knower of the field' is the same teaching. Modern echo: 'you are not your thoughts.'",
    appears: [2,8,13,15],
    related: ["brahman", "purusha", "jnana"]
  },
  {
    id: "brahman",
    name: "Brahman",
    sanskrit: "ब्रह्मन्",
    kind: "concept",
    group: "metaphysics",
    short: "The absolute — what underlies everything",
    body: "Brahman is the unchanging reality behind everything that appears. Not a god — more like the substrate. Chapter 8 opens with Arjuna asking 'what is Brahman?' and Krishna answers: 'the imperishable, supreme.' One of the Gita's bigger claims is that the atman (the self in you) and Brahman (the absolute) are the same reality. The realization of that identity is moksha. This is the philosophical heart of Vedanta, and the Gita is one of its key texts.",
    appears: [5,8,14,15],
    related: ["atman", "moksha", "purusha"]
  },
  {
    id: "moksha",
    name: "Moksha",
    sanskrit: "मोक्ष",
    kind: "concept",
    group: "goal",
    short: "Liberation — release from the cycle",
    body: "The ultimate goal: freedom from the cycle of birth, action, and rebirth. Not a place you go; a state you realize. Each of the three paths (karma, bhakti, jnana) leads here. Chapter 18 is titled 'Moksha Sannyasa Yoga' — liberation through letting go. The Gita's view is that moksha is available in this life, not just after death — the 'liberated while living' (jivanmukta) is someone who has released attachment so completely that whatever happens to them, they remain steady.",
    appears: [8,15,18],
    related: ["brahman", "sannyasa", "sharanagati"]
  },
  {
    id: "moha",
    name: "Moha",
    sanskrit: "मोह",
    kind: "concept",
    group: "obstacle",
    short: "Delusion — confusion about what to do",
    body: "The opposite of clarity. The state Arjuna is in throughout chapter 1: paralyzed, unable to see his duty clearly because compassion and grief have clouded his judgment. Moha isn't stupidity — it's the specific confusion that comes when emotion and identity tangle with action. The whole Gita is, at one level, the dispelling of Arjuna's moha. In chapter 18 his final words are 'my delusion is gone' (nashto mohah).",
    appears: [1,18],
    related: ["arjuna", "kama", "krodha", "jnana"]
  },
  {
    id: "samatva",
    name: "Samatva",
    sanskrit: "समत्व",
    kind: "concept",
    group: "core",
    short: "Even-mindedness — the marker of yoga",
    body: "'Treat success and failure the same. That evenness IS yoga' (chapter 2). Samatva is the practical signature of someone who has internalized karma yoga. Not numbness — equanimity. The wins still feel good; the losses still hurt; but neither rearranges the inner stance. Chapter 5: 'gold, dirt, and stone are equal.' Chapter 12: 'pleasure and pain are equal.' The Gita uses this word as the test for whether someone is actually progressing.",
    appears: [2,5,6,12,14],
    related: ["karma-yoga", "sthitaprajna", "dhyana"]
  },
  {
    id: "sthitaprajna",
    name: "Sthitaprajna",
    sanskrit: "स्थितप्रज्ञ",
    kind: "concept",
    group: "core",
    short: "The one of steady wisdom",
    body: "Chapter 2 ends with Arjuna asking: 'What does someone with steady wisdom look like? How do they walk, sit, speak?' Krishna's answer becomes a touchstone for the rest of the book. The sthitaprajna isn't disturbed by pleasure or driven by craving. They withdraw the senses like a tortoise withdraws its limbs. They have ego but aren't owned by it. This is the practical portrait of the goal — not a saint in a cave, but someone navigating the world without being remade by every wave that hits them.",
    appears: [2],
    related: ["samatva", "karma-yoga", "atman"]
  },
  {
    id: "yajna",
    name: "Yajna",
    sanskrit: "यज्ञ",
    kind: "concept",
    group: "core",
    short: "Sacrifice / offering — work as gift",
    body: "Originally a fire-ritual, but Krishna massively expands the meaning in chapters 3 and 4. Yajna becomes any action performed without attachment, as a contribution to the larger cycle. 'Sky feeds rain, rain feeds food, food feeds beings, beings make offerings, offerings sustain the sky.' Whoever takes from the cycle without contributing is a thief. So work itself, done as offering rather than transaction, is yajna. This is the move that makes karma yoga workable in ordinary life — you don't need a temple. Your job is the altar.",
    appears: [3,4,9,17],
    related: ["karma-yoga", "dharma", "bhakti"]
  },
  {
    id: "kama",
    name: "Kama",
    sanskrit: "काम",
    kind: "concept",
    group: "obstacle",
    short: "Desire — the engine of bondage",
    body: "Not desire in the casual sense — kama in the Gita is the specific craving that makes you grasp at outcomes and lose your inner steadiness. Chapter 3 ends with Krishna naming kama as the great enemy. Chapter 16 lists it as one of the three gates to hell (with anger and greed). This is not asceticism — Krishna isn't telling Arjuna to want nothing. He's pointing at the kind of wanting that owns you, where you can't rest because the next thing is always missing.",
    appears: [3,16],
    related: ["krodha", "moha", "gunas"]
  },
  {
    id: "krodha",
    name: "Krodha",
    sanskrit: "क्रोध",
    kind: "concept",
    group: "obstacle",
    short: "Anger — what kama becomes when blocked",
    body: "Krishna names the chain explicitly in chapter 2: thinking about objects produces attachment, attachment produces desire (kama), thwarted desire produces anger (krodha), anger produces confusion, confusion destroys judgment, destroyed judgment destroys the person. Krodha isn't the start of the problem; it's a downstream symptom. The Gita's interest is in catching the chain earlier — at the level of attention, before craving even becomes the issue.",
    appears: [2,3,16],
    related: ["kama", "moha"]
  },
  {
    id: "gunas",
    name: "The three gunas",
    sanskrit: "त्रिगुण",
    kind: "concept",
    group: "metaphysics",
    short: "Sattva, rajas, tamas — three forces in nature",
    body: "Three qualities that run through everything material — including your moods, your food, your work, your faith. Sattva: clarity, lightness, balance. Rajas: drive, restlessness, action. Tamas: inertia, heaviness, confusion. Chapter 14 introduces them; chapters 17 and 18 use them as a lens to sort EVERYTHING (faith, food, gifts, austerity, action, knowledge, doer-types). The teaching isn't 'be sattvic' — that's another attachment. It's 'notice which guna is running, name it, don't be owned by it.'",
    appears: [14,17,18],
    related: ["sattva", "rajas", "tamas", "prakriti"]
  },
  {
    id: "sattva",
    name: "Sattva",
    sanskrit: "सत्त्व",
    kind: "concept",
    group: "metaphysics",
    short: "Clarity-mode",
    body: "The guna of brightness, balance, and clear seeing. The 30-minute window when work flows. The morning before the day gets messy. A meal that leaves you light, not heavy. Sattva is the closest of the three gunas to the self — but Krishna warns that it still binds, just more subtly. Attachment to feeling-good, attachment to insight, attachment to your own clarity — sattva can become its own trap. Beyond all three is what the book is pointing toward.",
    appears: [14,17,18],
    related: ["gunas", "rajas", "tamas"]
  },
  {
    id: "rajas",
    name: "Rajas",
    sanskrit: "रजस्",
    kind: "concept",
    group: "metaphysics",
    short: "Drive-mode",
    body: "The guna of motion, ambition, restlessness. Coffee at 11am. The need to do, achieve, want, push. Rajas binds through craving — not by feeling bad, but by never letting you sit still. Most of modern life is engineered to keep you in rajas: notifications, deadlines, scrolling, productivity culture. Krishna doesn't say rajas is bad. He says be aware of it. There's a difference between rajas using you and you using rajas.",
    appears: [14,17,18],
    related: ["gunas", "sattva", "tamas", "kama"]
  },
  {
    id: "tamas",
    name: "Tamas",
    sanskrit: "तमस्",
    kind: "concept",
    group: "metaphysics",
    short: "Slump-mode",
    body: "The guna of inertia, heaviness, dullness, sleep. The 3pm scroll. The 'I'll do it tomorrow.' Confusion, laziness, ignorance. Tamas isn't always rest — Krishna distinguishes it from genuine rest, which can be sattvic. Tamas is the kind of stillness that's actually a fog. The hardest of the three to even notice, because tamas dulls the very faculty that would notice it.",
    appears: [14,17,18],
    related: ["gunas", "rajas", "sattva"]
  },
  {
    id: "prakriti",
    name: "Prakriti",
    sanskrit: "प्रकृति",
    kind: "concept",
    group: "metaphysics",
    short: "Nature — the field of change",
    body: "The material side of reality: the body, the mind, emotions, the world, the gunas — all of prakriti. Everything that changes. Chapter 13's 'field' is prakriti. Krishna's lower nature (chapter 7) is prakriti. The Gita's view: prakriti is real, but it's not what you ARE. You witness prakriti from somewhere else — from purusha. Confusing yourself with prakriti — your body, your mood, your job — is the original error.",
    appears: [7,13,14],
    related: ["purusha", "gunas", "atman"]
  },
  {
    id: "purusha",
    name: "Purusha",
    sanskrit: "पुरुष",
    kind: "concept",
    group: "metaphysics",
    short: "Consciousness — the witness",
    body: "The conscious side of reality. Where prakriti changes, purusha witnesses. Where prakriti is the field, purusha is the knower of the field. Chapter 15 names a 'supreme purusha' (Purushottama) — beyond both the perishable and the imperishable. This is one of the Gita's signature moves: rather than saying 'consciousness vs. matter,' it adds a third — the supreme that holds both. Krishna identifies himself with that.",
    appears: [13,15],
    related: ["prakriti", "atman", "ishvara"]
  },
  {
    id: "ishvara",
    name: "Ishvara",
    sanskrit: "ईश्वर",
    kind: "concept",
    group: "metaphysics",
    short: "The personal divine — God as you can relate to it",
    body: "Where Brahman is the impersonal absolute, Ishvara is the personal aspect of the divine — the one you can love, address, surrender to. The Gita's specific innovation is bringing these together: Krishna IS Ishvara, and Ishvara IS Brahman, and the path of devotion (bhakti) is therefore not lower than the path of knowledge (jnana). Chapter 12 explicitly defends this: the formless absolute is harder for embodied beings to reach than a divine you can relate to.",
    appears: [9,10,11,12],
    related: ["bhakti", "brahman", "krishna"]
  },
  {
    id: "avatara",
    name: "Avatara",
    sanskrit: "अवतार",
    kind: "concept",
    group: "metaphysics",
    short: "Divine descent — the divine taking form",
    body: "Literally 'descent.' In chapter 4, Krishna explains: 'Whenever righteousness fades and chaos rises, I take form. To protect the good, dissolve the harmful, restore balance.' Krishna himself, by the Gita's account, is one such descent. The concept later expands in Hindu tradition to a list of ten major avataras of Vishnu (including Rama and the Buddha). The relevant point for the Gita: the divine isn't only abstract. It enters history, repeatedly, when conditions call for it.",
    appears: [4,7,11],
    related: ["krishna", "ishvara", "vishvarupa"]
  },
  {
    id: "vishvarupa",
    name: "Vishvarupa",
    sanskrit: "विश्वरूप",
    kind: "concept",
    group: "metaphysics",
    short: "The universal form",
    body: "The cosmic form Krishna reveals to Arjuna in chapter 11 — and the most psychedelic moment in the entire book. Suns within suns. Mouths consuming armies. Time itself, eating worlds. Arjuna sees it and is terrified. The vision contains the most quoted line in the Gita: 'I am Time, the great destroyer of worlds' — what Oppenheimer remembered at Trinity. The vishvarupa isn't decoration; it's the answer to the question 'who are you really?' that Arjuna keeps asking. The answer is: more than you can hold.",
    appears: [11],
    related: ["krishna", "ishvara", "kala"]
  },
  {
    id: "kala",
    name: "Kala",
    sanskrit: "काल",
    kind: "concept",
    group: "metaphysics",
    short: "Time — the destroyer",
    body: "In chapter 11, when Arjuna asks who Krishna really is, the answer is: 'I am kala — Time, the great destroyer.' Time here isn't the clock. It's the principle that ages, ends, dissolves, returns to source. The terrifying part of the universal vision is that the warriors on both sides are already being consumed by time, regardless of what Arjuna does. He's not the cause of their deaths. Time is. He's just an instrument. This is the line 'I am become death' — and it's meant to liberate, not horrify.",
    appears: [11],
    related: ["vishvarupa", "krishna"]
  },
  {
    id: "maya",
    name: "Maya",
    sanskrit: "माया",
    kind: "concept",
    group: "obstacle",
    short: "The veil — appearance vs. reality",
    body: "Often translated as 'illusion,' but closer to 'the veiling power that makes the apparent seem ultimate.' Chapter 7: 'My maya is hard to cross. But those who take refuge in me cross it easily.' Maya isn't that the world is fake — it's that the world is real but not ultimate, and confusing the two is the basic mistake. Modern translation: the way you take your own thoughts, identity, and circumstances as 'just how things are' instead of as one frame among many.",
    appears: [7],
    related: ["moha", "prakriti", "krishna"]
  },
  {
    id: "dhyana",
    name: "Dhyana",
    sanskrit: "ध्यान",
    kind: "concept",
    group: "practice",
    short: "Meditation — gathering the mind",
    body: "Chapter 6 is named for this: the discipline of meditation. Krishna gives concrete instructions — clean place, firm seat, spine straight, gaze steady. Eat, sleep, work moderately. The middle path. The signature image is 'a flame in a windless place that doesn't flicker.' What makes the chapter human, and what makes it useful, is Arjuna's pushback: the mind is impossible to control. Krishna's answer isn't 'try harder' — it's 'with practice and detachment, it can be done. And falling off doesn't reset progress.'",
    appears: [6],
    related: ["abhyasa", "vairagya", "samatva"]
  },
  {
    id: "abhyasa",
    name: "Abhyasa",
    sanskrit: "अभ्यास",
    kind: "concept",
    group: "practice",
    short: "Practice — repeated effort",
    body: "One of the two key tools Krishna gives in chapter 6 (with vairagya — non-attachment). Abhyasa is the willingness to keep showing up, knowing the mind will wander, knowing you'll fall off. It's the opposite of perfectionism. The ADHD-friendly answer to 'how do you train the mind' is that you don't do it once; you do it repeatedly, over years, and the falling-off is part of the practice, not a failure of it.",
    appears: [6,12],
    related: ["dhyana", "vairagya"]
  },
  {
    id: "vairagya",
    name: "Vairagya",
    sanskrit: "वैराग्य",
    kind: "concept",
    group: "practice",
    short: "Non-attachment — letting go of grip",
    body: "The companion of abhyasa. Where abhyasa is the willingness to keep practicing, vairagya is the willingness to let go — of outcomes, of preferences, of the version of yourself you wanted to be by now. Chapter 6 frames it: 'with practice and non-attachment, the mind can be controlled.' Not 'without desire' — 'without grip.' You can want things and not be owned by the wanting.",
    appears: [6],
    related: ["abhyasa", "samatva", "sannyasa"]
  },
  {
    id: "sannyasa",
    name: "Sannyasa",
    sanskrit: "संन्यास",
    kind: "concept",
    group: "path",
    short: "Renunciation — letting go entirely",
    body: "Traditional sannyasa is literal renunciation — leaving the household life. But chapter 5 and chapter 18 redefine it for ordinary people: not giving up action, but giving up attachment to the fruits of action. 'The wise don't give up acting. They give up the craving for results. That's true renunciation.' This is huge — it means you don't need a monastery. You can be a sannyasi at your job, in your marriage, in your family, by changing the inside, not the outside.",
    appears: [5,18],
    related: ["karma-yoga", "vairagya", "moksha"]
  },
  {
    id: "sharanagati",
    name: "Sharanagati",
    sanskrit: "शरणागति",
    kind: "concept",
    group: "practice",
    short: "Surrender — taking refuge",
    body: "The Gita's final word, chapter 18: 'Surrender all duties. Take refuge in me alone. I will free you from all sins. Do not grieve.' Sharanagati is the move where you stop trying to figure it all out yourself and entrust the outcome to something larger. Not passivity — Arjuna still picks up the bow and fights. But he stops carrying the whole weight. For someone exhausted from trying to control everything, this is the closing teaching: you can put it down.",
    appears: [9,18],
    related: ["bhakti", "moksha", "krishna"]
  },
  {
    id: "shraddha",
    name: "Shraddha",
    sanskrit: "श्रद्धा",
    kind: "concept",
    group: "core",
    short: "Faith — what you trust without proof",
    body: "Chapter 17: 'Faith takes the shape of whichever guna dominates a person. We are the faith we hold.' Shraddha isn't religious belief specifically — it's whatever you trust without needing it to be proven. Money. Status. Your own intelligence. A relationship. A god. Krishna's claim is that you can't opt out of faith — you can only choose what to put it in. Look at where your attention goes when you're scared, and you'll see what you actually have shraddha in.",
    appears: [17],
    related: ["bhakti", "gunas", "sharanagati"]
  },
  {
    id: "vibhuti",
    name: "Vibhuti",
    sanskrit: "विभूति",
    kind: "concept",
    group: "metaphysics",
    short: "Divine manifestation — splendor",
    body: "Chapter 10 is named for this. Krishna lists his vibhutis — the specific things in the world that carry the divine spark most visibly: the Ganges among rivers, the Himalayas among mountains, OM among words. The point isn't that those things ARE divine while others aren't — it's that the divine shows up as excellence wherever excellence appears. Whatever stops you in your tracks because of its quality is, in this framework, a vibhuti. Attention to excellence is itself a spiritual practice.",
    appears: [10],
    related: ["krishna", "ishvara"]
  },
  {
    id: "om",
    name: "OM",
    sanskrit: "ॐ",
    kind: "concept",
    group: "practice",
    short: "The sacred syllable",
    body: "The most concentrated symbol in the tradition. Chapter 8: chanting OM at the time of death directs the consciousness toward the supreme. Chapter 10: 'Among words, I am OM.' Chapter 17: 'OM TAT SAT' — three syllables that mark any action as offered to the absolute. OM isn't just a sound — in the Gita's framing, it's a compressed pointer to the unmanifest, used as a tool for the mind to gather around.",
    appears: [8,10,17],
    related: ["dhyana", "bhakti", "brahman"]
  }
];

export const EDGES: GraphEdge[] = [
  { source: "krishna", target: "arjuna", kind: "teaches" },
  { source: "krishna", target: "ishvara", kind: "is-in" },
  { source: "krishna", target: "avatara", kind: "is-in" },
  { source: "krishna", target: "vishvarupa", kind: "is-in" },
  { source: "sanjaya", target: "dhritarashtra", kind: "related" },
  { source: "sanjaya", target: "krishna", kind: "related" },
  { source: "dhritarashtra", target: "duryodhana", kind: "related" },
  { source: "duryodhana", target: "arjuna", kind: "opposes" },
  { source: "bhishma", target: "arjuna", kind: "opposes" },
  { source: "drona", target: "arjuna", kind: "opposes" },
  { source: "arjuna", target: "gandiva", kind: "is-in" },
  { source: "arjuna", target: "moha", kind: "is-in" },

  { source: "dharma", target: "karma-yoga", kind: "related" },
  { source: "karma-yoga", target: "samatva", kind: "related" },
  { source: "karma-yoga", target: "yajna", kind: "related" },
  { source: "karma-yoga", target: "sannyasa", kind: "related" },
  { source: "samatva", target: "sthitaprajna", kind: "related" },
  { source: "samatva", target: "dhyana", kind: "related" },

  { source: "bhakti", target: "ishvara", kind: "related" },
  { source: "bhakti", target: "sharanagati", kind: "related" },
  { source: "bhakti", target: "shraddha", kind: "related" },
  { source: "jnana", target: "atman", kind: "related" },
  { source: "jnana", target: "brahman", kind: "related" },

  { source: "atman", target: "brahman", kind: "related" },
  { source: "atman", target: "purusha", kind: "related" },
  { source: "purusha", target: "prakriti", kind: "opposes" },
  { source: "prakriti", target: "gunas", kind: "is-in" },
  { source: "gunas", target: "sattva", kind: "is-in" },
  { source: "gunas", target: "rajas", kind: "is-in" },
  { source: "gunas", target: "tamas", kind: "is-in" },

  { source: "kama", target: "krodha", kind: "related" },
  { source: "kama", target: "moha", kind: "related" },
  { source: "moha", target: "maya", kind: "related" },

  { source: "moksha", target: "brahman", kind: "related" },
  { source: "moksha", target: "sannyasa", kind: "related" },
  { source: "moksha", target: "sharanagati", kind: "related" },

  { source: "dhyana", target: "abhyasa", kind: "related" },
  { source: "dhyana", target: "vairagya", kind: "related" },
  { source: "vairagya", target: "sannyasa", kind: "related" },

  { source: "vibhuti", target: "ishvara", kind: "related" },
  { source: "vishvarupa", target: "kala", kind: "related" },
  { source: "vishvarupa", target: "ishvara", kind: "related" },
  { source: "om", target: "dhyana", kind: "related" },
  { source: "om", target: "brahman", kind: "related" }
];

export function getNode(id: string): GraphNode | undefined {
  return NODES.find((n) => n.id === id);
}
