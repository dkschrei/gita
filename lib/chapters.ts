export type Speaker = "krishna" | "arjuna" | "narrator" | "sanjaya" | "dhritarashtra";

export interface Panel {
  who: Speaker | string;
  line: string;
}

export interface Scene {
  setting: string;
  panels: Panel[];
}

export interface Chapter {
  n: number;
  title: string;
  sanskrit: string;
  subtitle: string;
  accent: "krishna" | "arjuna" | "dharma" | "dust";
  scenes: Scene[];
  mirror: { headline: string; tag: string; body: string };
  reflection: string;
  whyPrompts: string[];
  concepts: string[];
  characters: string[];
}

export const CHAPTERS: Chapter[] = [
  {
    n: 1,
    title: "Observing the armies",
    sanskrit: "Arjuna Vishada Yoga",
    subtitle: "Arjuna sees who he must fight — and freezes",
    accent: "dust",
    concepts: ["dharma", "moha"],
    characters: ["arjuna", "krishna", "sanjaya", "dhritarashtra", "bhishma", "drona", "duryodhana"],
    scenes: [
      {
        setting: "Kurukshetra battlefield. Two vast armies face each other. Conch shells blow.",
        panels: [
          { who: "narrator", line: "Two families. One throne. Ten million soldiers. The war that ends an age is about to begin." },
          { who: "dhritarashtra", line: "Sanjaya — tell me. On the field of dharma, gathered to fight, what did my sons and Pandu's sons do?" },
          { who: "sanjaya", line: "Duryodhana surveys the Pandava army. He names every great warrior assembled against him." },
          { who: "narrator", line: "Conches blow on both sides. The sound shakes the earth and the sky." }
        ]
      },
      {
        setting: "Arjuna's chariot rolls forward. Krishna at the reins. Arjuna in armor.",
        panels: [
          { who: "arjuna", line: "Krishna — pull my chariot into the middle. I want to see who I'm here to kill." },
          { who: "krishna", line: "(silent — drives the chariot forward)" },
          { who: "arjuna", line: "There. My grandfather. My teacher. My cousins. My childhood friends." },
          { who: "arjuna", line: "My limbs are weak. My mouth is dry. Gandiva slips from my hand." }
        ]
      },
      {
        setting: "Close-up: Arjuna's bow falls. He sits down in the chariot.",
        panels: [
          { who: "arjuna", line: "What victory? What kingdom? What pleasure could I possibly enjoy after killing my own family?" },
          { who: "arjuna", line: "Better to be killed unarmed than to do this." },
          { who: "narrator", line: "He sits down in the chariot. Drops his weapons. Cannot continue." },
          { who: "narrator", line: "The first chapter ends in silence." }
        ]
      }
    ],
    mirror: {
      headline: "The modern mirror",
      tag: "Freeze · grief · paralysis",
      body: "You're not on a battlefield. You're at a moment where doing the right thing means hurting people you love — leaving the family business, telling a parent their plan for you isn't your plan, firing someone who trusted you, ending a relationship that has history but no future. Chapter 1 is the freeze. The Gita doesn't shame the freeze. It starts there."
    },
    reflection: "Where in your life are you 'sitting down in the chariot' right now — knowing what needs to happen but unable to lift your hands to do it?",
    whyPrompts: [
      "Why does Arjuna ask to be driven INTO the middle? Wouldn't a general stay back?",
      "Is Arjuna's collapse cowardice or compassion? How would I know the difference in my own life?"
    ]
  },
  {
    n: 2,
    title: "The teaching begins",
    sanskrit: "Sankhya Yoga",
    subtitle: "Krishna's first answer — and the most quoted verse in all of Hinduism",
    accent: "krishna",
    concepts: ["karma-yoga", "atman", "sthitaprajna", "dharma"],
    characters: ["krishna", "arjuna"],
    scenes: [
      {
        setting: "Krishna turns to face Arjuna. The army noise fades.",
        panels: [
          { who: "krishna", line: "Arjuna — where did this weakness come from? This isn't who you are." },
          { who: "arjuna", line: "I'm confused about my duty. I'm your student. Tell me what to do." },
          { who: "narrator", line: "Arjuna stops debating and asks to be taught. The Gita's real text begins here." },
          { who: "krishna", line: "You grieve for those who don't need to be grieved for. The wise grieve neither for the living nor the dead." }
        ]
      },
      {
        setting: "Krishna gestures to the soldiers, then to the sky.",
        panels: [
          { who: "krishna", line: "The body is borrowed. The self that wears it cannot be cut, burned, drowned, or dried." },
          { who: "krishna", line: "Just as a person changes worn clothes, the self changes worn bodies. Why mourn the costume?" },
          { who: "krishna", line: "Even on its own terms — your duty as a warrior is to fight a just war. Refusing isn't virtue, it's failure of role." },
          { who: "krishna", line: "And here is the key — listen carefully." }
        ]
      },
      {
        setting: "Single panel. Krishna's hand on Arjuna's shoulder. The battlefield blurs.",
        panels: [
          { who: "krishna", line: "You have a right to your action. You have no right to its fruit." },
          { who: "krishna", line: "Do not let the fruit of action be your motive — but do not be attached to inaction either." },
          { who: "krishna", line: "Established in yoga, perform action. Treat success and failure the same. That evenness IS yoga." },
          { who: "narrator", line: "This is Karma Yoga. The whole rest of the book is a commentary on this one idea." }
        ]
      }
    ],
    mirror: {
      headline: "The modern mirror",
      tag: "Action without attachment",
      body: "Every modern dilemma about work, money, status, identity tracks back to this verse. You took the job for the bonus — bonus didn't come — now you hate the job. You wrote the post hoping it would go viral — it didn't — now you hate writing. The fruit-attachment is the trap. Krishna isn't saying don't act. He's saying act fully, then release the result. That's the only sustainable way to work for 40 years without burning out."
    },
    reflection: "Pick one thing you did this week. Did you do it for the doing, or for the result you hoped it would produce? What would change if you separated those two?",
    whyPrompts: [
      "Why does Krishna lead with the immortality of the self before the karma teaching?",
      "Is 'no right to the fruit' just a way to cope with failure, or is something deeper?",
      "How do I act fully without becoming attached to results — practically, on Monday morning?"
    ]
  },
  {
    n: 3,
    title: "Action is unavoidable",
    sanskrit: "Karma Yoga",
    subtitle: "You can't escape doing — so the only question is HOW",
    accent: "dharma",
    concepts: ["karma-yoga", "yajna", "kama", "krodha"],
    characters: ["krishna", "arjuna"],
    scenes: [
      {
        setting: "Arjuna leans forward, frustrated.",
        panels: [
          { who: "arjuna", line: "If knowledge is better than action, why are you sending me into battle? Just let me sit and meditate." },
          { who: "krishna", line: "No one stays inactive even for a moment. Just having a body forces you to act — breathing, eating, thinking." },
          { who: "krishna", line: "The person who sits still while their mind chases pleasure is the bigger hypocrite." },
          { who: "krishna", line: "Renouncing action is impossible. Renouncing attachment to action is the real practice." }
        ]
      },
      {
        setting: "Krishna paints a wheel in the air with his finger.",
        panels: [
          { who: "krishna", line: "The world runs on a cycle: sky feeds rain, rain feeds food, food feeds beings, beings make offerings, offerings sustain the sky." },
          { who: "krishna", line: "Whoever takes from the cycle without contributing is a thief. Your work is your contribution." },
          { who: "arjuna", line: "Then why does desire keep dragging me back? Why does anger flare even when I know better?" },
          { who: "krishna", line: "Desire and anger are the enemies. They cloud judgment the way smoke covers fire and dust covers a mirror." }
        ]
      }
    ],
    mirror: {
      headline: "The modern mirror",
      tag: "Work as offering, not identity",
      body: "The 'I'll figure out my purpose first, then act' move is the trap of chapter 3. You can't think your way out of the cycle — you're already in it. The dignified path isn't escaping work; it's working without being owned by what work pays you. Do your job as your contribution to the cycle. Don't 'quiet quit' while taking the salary — Krishna calls that hypocrisy. But also don't define yourself by the title."
    },
    reflection: "If your work is your offering to the world's cycle, what does it look like when you do it well? What does it look like when you quietly take from the cycle without giving back?",
    whyPrompts: [
      "Why does Krishna treat action and renunciation as a false binary?",
      "If desire is the enemy, is ambition also the enemy?",
      "What's the modern version of 'thief who takes without contributing'?"
    ]
  },
  {
    n: 4,
    title: "The lineage of the teaching",
    sanskrit: "Jnana Karma Sannyasa Yoga",
    subtitle: "This isn't new. It's been forgotten and recovered, again and again",
    accent: "dharma",
    concepts: ["jnana", "avatara", "karma-yoga"],
    characters: ["krishna", "arjuna"],
    scenes: [
      {
        setting: "The sky behind Krishna shimmers. Stars become visible in daylight.",
        panels: [
          { who: "krishna", line: "I taught this yoga to the sun god long ago. He passed it to the first king, who passed it to the sages." },
          { who: "krishna", line: "Over time, the chain broke. The teaching was lost. That's why I'm telling you now." },
          { who: "arjuna", line: "Wait — you were born recently. The sun god is ancient. How could you have taught him?" },
          { who: "krishna", line: "You and I have both been born many times, Arjuna. You don't remember. I do." }
        ]
      },
      {
        setting: "Krishna gestures at the soldiers preparing — fire, sweat, weapons.",
        panels: [
          { who: "krishna", line: "Whenever righteousness fades and chaos rises, I take form. To protect the good, dissolve the harmful, restore balance." },
          { who: "krishna", line: "All actions are burned up in the fire of true knowledge. Do your work, but as an offering — not as a transaction." },
          { who: "krishna", line: "Better than ritual or wealth is the offering of knowledge. All action ends there." },
          { who: "krishna", line: "Cut the doubts in your heart with the sword of knowledge. Stand up. Fight. Engage." }
        ]
      }
    ],
    mirror: {
      headline: "The modern mirror",
      tag: "Knowledge as the highest offering",
      body: "Notice the move: Krishna says 'this teaching gets lost over and over.' Every generation has to recover it. You're not behind for not having read this at 22. You're not stupid for needing it now. The fact that you're still trying to find a frame that helps — that's the recovery. The lineage isn't a museum. It's whoever, in any era, picks up the thread and uses it."
    },
    reflection: "What knowledge has been handed to you — by a teacher, parent, mentor, friend — that you haven't yet 'cashed' into action? What would it look like to act on it this week?",
    whyPrompts: [
      "Why does Krishna spend a whole chapter on his own backstory? Is it ego or is it teaching?",
      "What does 'all actions end in knowledge' mean for someone who builds things for a living?",
      "How do I tell the difference between recovering a teaching and just decorating my life with quotes?"
    ]
  },
  {
    n: 5,
    title: "Renunciation vs. action",
    sanskrit: "Karma Sannyasa Yoga",
    subtitle: "Two roads to the same mountaintop — and one is harder than it looks",
    accent: "krishna",
    concepts: ["sannyasa", "karma-yoga", "samatva"],
    characters: ["krishna", "arjuna"],
    scenes: [
      {
        setting: "Arjuna paces, trying to pin Krishna down.",
        panels: [
          { who: "arjuna", line: "First you said action. Then you praised renunciation. Tell me clearly — which is better?" },
          { who: "krishna", line: "Both lead to liberation. But action without attachment is better than literal renunciation — for almost everyone." },
          { who: "krishna", line: "Renouncing the world while still craving it is the worst of both. The yogi acts in the world but isn't owned by it." },
          { who: "krishna", line: "He sees the same self in a Brahmin, a cow, an elephant, a dog, and an outcaste." }
        ]
      },
      {
        setting: "Krishna sits still. Arjuna sits opposite.",
        panels: [
          { who: "krishna", line: "When you act and let the result go, when no outcome can wound you and none can inflate you — that is freedom while alive." },
          { who: "krishna", line: "Pleasures from outside have a beginning and an end. The wise don't drink from that well." },
          { who: "krishna", line: "Find the joy that's inside, the light that's inside — and you become what you've been looking for outside." },
          { who: "arjuna", line: "But the mind is so restless, Krishna. How do I even start?" }
        ]
      }
    ],
    mirror: {
      headline: "The modern mirror",
      tag: "Equanimity beats escape",
      body: "The pure-renunciation fantasy is the 'I'll just move to a cabin and grow vegetables' dream. It almost never works because the craving comes with you. Krishna's path is harder and saner: stay in the world, do the work, let the wins and losses pass through you without rearranging your insides. For someone who can't retire — this is actually the better deal. You don't need an exit. You need an internal stance that makes staying-in-the-game sustainable."
    },
    reflection: "When was the last win that genuinely changed your mood for more than a day? The last loss that did? What would it cost you to let both pass through faster?",
    whyPrompts: [
      "Why does Krishna treat 'sees the same self in a dog and a Brahmin' as the marker of progress?",
      "Is internal equanimity just emotional numbness with better PR?",
      "What's the practical first move toward 'the joy that's inside'?"
    ]
  },
  {
    n: 6,
    title: "The discipline of meditation",
    sanskrit: "Dhyana Yoga",
    subtitle: "How you actually train the mind — and what to do when you fall off",
    accent: "krishna",
    concepts: ["dhyana", "abhyasa", "vairagya", "samatva"],
    characters: ["krishna", "arjuna"],
    scenes: [
      {
        setting: "Krishna describes a quiet seat. The army noise softens.",
        panels: [
          { who: "krishna", line: "In a clean place, sit firm — not too high, not too low. Spine straight. Gaze steady. Mind gathered." },
          { who: "krishna", line: "Eat moderately. Sleep moderately. Work moderately. The middle path is the path." },
          { who: "krishna", line: "When the mind, controlled, rests in the self — like a flame in a windless place — that is yoga." },
          { who: "arjuna", line: "Krishna — the mind is restless, turbulent, strong, stubborn. Controlling it feels harder than controlling the wind." }
        ]
      },
      {
        setting: "Krishna nods. He doesn't dismiss Arjuna's complaint.",
        panels: [
          { who: "krishna", line: "You're right. The mind is hard to control. But with practice and detachment, it can be done." },
          { who: "arjuna", line: "And what about someone who tries — really tries — and fails? Who falls short? What happens to them?" },
          { who: "krishna", line: "No one who does good work is ever lost. Not in this life, not in the next." },
          { who: "krishna", line: "The seeker who stumbles still rises further than the one who never tried." }
        ]
      }
    ],
    mirror: {
      headline: "The modern mirror",
      tag: "Practice over perfection",
      body: "This is the chapter for the ADHD brain. Arjuna literally says 'the mind is impossible to control.' Krishna doesn't say 'try harder' — he says 'you're right, AND it can still be done, AND if you fall off you don't lose progress.' Modern productivity culture treats every lapse as a reset to zero. The Gita treats it as a pause. You don't restart. You resume."
    },
    reflection: "What's one daily 5-minute practice you could resume — not start, RESUME — that you've fallen off? What would it look like to treat falling off as part of the practice instead of failure?",
    whyPrompts: [
      "Why does Krishna validate Arjuna's complaint instead of telling him to try harder?",
      "What does 'a yogi who fails is still ahead of someone who never tried' mean for my abandoned projects?",
      "How does the middle-path principle apply to work, money, and ambition?"
    ]
  },
  {
    n: 7,
    title: "Knowledge of the absolute",
    sanskrit: "Jnana Vijnana Yoga",
    subtitle: "Krishna starts revealing what he actually is",
    accent: "krishna",
    concepts: ["prakriti", "purusha", "maya", "bhakti"],
    characters: ["krishna", "arjuna"],
    scenes: [
      {
        setting: "Krishna's form begins to subtly glow. Arjuna notices but doesn't speak.",
        panels: [
          { who: "krishna", line: "Listen now. I'll tell you what I am — both my visible nature and what's behind it." },
          { who: "krishna", line: "Earth, water, fire, air, ether, mind, intellect, ego — these eight are my lower nature." },
          { who: "krishna", line: "Behind that is my higher nature — the consciousness that holds all of this together. I am the source AND the dissolution of everything." },
          { who: "krishna", line: "Among thousands, barely one strives. Among those who strive, barely one truly knows me." }
        ]
      },
      {
        setting: "Krishna lists the kinds of people who turn to the divine.",
        panels: [
          { who: "krishna", line: "Four kinds of people come to me: the suffering, the curious, the seeker of wealth, and the one who simply wants to know." },
          { who: "krishna", line: "All are noble. But the one who simply wants to know — who is constantly devoted — is dearest to me." },
          { who: "krishna", line: "My maya is hard to cross. But those who take refuge in me cross it easily." },
          { who: "krishna", line: "Those who don't see — they're confused by the play of opposites: pleasure and pain, gain and loss." }
        ]
      }
    ],
    mirror: {
      headline: "The modern mirror",
      tag: "Why most people stay stuck",
      body: "Krishna's saying something brutal here: most people who hear this teaching won't really get it. Not because it's hidden — because they're chasing something specific (relief from suffering, knowledge for its own sake, money, security) instead of just wanting to see clearly. The 'one who simply wants to know' is rarer than the suffering, the curious, or the ambitious. That's not gatekeeping. That's a description of attention. Where you put your attention is what you become."
    },
    reflection: "Of the four kinds — suffering, curious, ambitious, knowing — which one drives you to learning right now? Be honest. Is that the one that gets you where you want to go?",
    whyPrompts: [
      "Why does Krishna call all four motives 'noble' but rank them?",
      "What does 'maya' actually mean if I strip away the mystical language?",
      "Is wanting to know for its own sake even possible, or is there always an underneath?"
    ]
  },
  {
    n: 8,
    title: "The eternal Brahman",
    sanskrit: "Akshara Brahma Yoga",
    subtitle: "What carries over when the body falls",
    accent: "krishna",
    concepts: ["brahman", "atman", "moksha", "om"],
    characters: ["krishna", "arjuna"],
    scenes: [
      {
        setting: "Arjuna asks practical questions about death.",
        panels: [
          { who: "arjuna", line: "What is Brahman? What is the self? What is action? What is the field of beings? What is the divine?" },
          { who: "arjuna", line: "And how, at the time of death, are you known by those who have steadied themselves?" },
          { who: "krishna", line: "Brahman is the imperishable, supreme. The self's own nature is called the inner self. Action is what causes things to come into being." },
          { who: "krishna", line: "Whoever, at the end, leaves the body remembering me — reaches my state. There is no doubt." }
        ]
      },
      {
        setting: "Krishna explains the moment of death.",
        panels: [
          { who: "krishna", line: "Whatever a person remembers at the end — that is what they become. Their last thought is their next direction." },
          { who: "krishna", line: "So at every moment, remember me, and fight. With mind and intellect fixed on me, you will reach me." },
          { who: "krishna", line: "Through practice, the mind moves toward the supreme. Through OM, through steady breath, through the gathered self." },
          { who: "krishna", line: "Worlds rise and fall. The ones who go beyond all worlds — they don't return." }
        ]
      }
    ],
    mirror: {
      headline: "The modern mirror",
      tag: "Last thought = next direction",
      body: "You don't actually have to believe in reincarnation to use this. The principle is: what you rehearse becomes what you reach for under pressure. Whatever you put in front of your attention every day is what'll be there when the lights go out — at the end of a meeting, the end of a day, the end of a life. So curate the rehearsal. The thoughts you let run idle are training you for whatever comes next, whether you mean them to or not."
    },
    reflection: "What thought has been on autopilot in your head this week? If that's the rehearsal, what's it training you to reach for?",
    whyPrompts: [
      "What's the difference between a 'last thought' and just whatever's on your mind when you die?",
      "If everything is impermanent, what counts as 'reaching' something permanent?",
      "Is OM just a sound, or is something else going on?"
    ]
  },
  {
    n: 9,
    title: "The royal secret",
    sanskrit: "Raja Vidya Raja Guhya Yoga",
    subtitle: "The most generous chapter — open to everyone",
    accent: "dharma",
    concepts: ["bhakti", "ishvara", "sharanagati"],
    characters: ["krishna", "arjuna"],
    scenes: [
      {
        setting: "Krishna's tone softens. He's about to give something away.",
        panels: [
          { who: "krishna", line: "I'll tell you the most secret knowledge — knowing it, you'll be free from suffering." },
          { who: "krishna", line: "I pervade this entire universe, but I'm not contained by it. All beings rest in me — and yet I'm not in them." },
          { who: "krishna", line: "Fools think I'm just a man because I appear in human form. They don't see what's behind the form." },
          { who: "krishna", line: "But the great souls — they know. They worship with steady devotion, seeing me as the source of all." }
        ]
      },
      {
        setting: "Krishna opens the door wide.",
        panels: [
          { who: "krishna", line: "Whoever offers me a leaf, a flower, a fruit, water — offered with love, with a clean heart — I accept." },
          { who: "krishna", line: "Whatever you do, whatever you eat, whatever you offer, whatever you give, whatever you suffer — do it as an offering to me." },
          { who: "krishna", line: "I am the same in all beings. None is hated, none is favored. But those who worship me with love — they're in me, and I in them." },
          { who: "krishna", line: "Even the worst person, if they turn to me with full devotion, is to be considered righteous. They have made the right resolve." }
        ]
      }
    ],
    mirror: {
      headline: "The modern mirror",
      tag: "Devotion as the universal door",
      body: "This is the chapter that says: you don't need to be smart, rich, well-born, or already-good to access this. A leaf, a flower, water — given with the right heart — counts the same as elaborate ritual. The 'royal secret' isn't a secret because it's hidden. It's a secret because it's so simple people walk past it. The way in is whatever you can offer, today, with intention. Not when you have time. Not when you've cleaned up your life. Now."
    },
    reflection: "What's something you do every day that you could turn into an offering — not by changing the action, but by changing the intention behind it?",
    whyPrompts: [
      "Why is the 'leaf, flower, fruit, water' line so famous? What's it really saying?",
      "Is 'even the worst person can turn around' a free pass, or something else?",
      "How do I do my work as an offering when I don't believe in a god?"
    ]
  },
  {
    n: 10,
    title: "The divine manifestations",
    sanskrit: "Vibhuti Yoga",
    subtitle: "Krishna names what he is, in things you already know",
    accent: "dharma",
    concepts: ["vibhuti", "ishvara", "bhakti"],
    characters: ["krishna", "arjuna"],
    scenes: [
      {
        setting: "Arjuna asks Krishna to describe himself in concrete terms.",
        panels: [
          { who: "arjuna", line: "Tell me your divine forms. By what should I think of you, in this world I can see?" },
          { who: "krishna", line: "I am the self in the heart of all beings. The beginning, middle, and end of everything." },
          { who: "krishna", line: "Among rivers, the Ganges. Among mountains, the Himalayas. Among horses, the divine steed. Among warriors, Rama." },
          { who: "krishna", line: "Among words, I am the sacred OM. Among sciences, the science of the self. Among debates, the truth." }
        ]
      },
      {
        setting: "Krishna lists, almost like a litany.",
        panels: [
          { who: "krishna", line: "I am time, the destroyer. I am the gambler's win and the saint's restraint." },
          { who: "krishna", line: "I am the silence among secrets. The intelligence of the wise. The strength of the strong." },
          { who: "krishna", line: "Whatever is glorious, beautiful, or powerful in any being — know that to be a spark of my splendor." },
          { who: "krishna", line: "But why list more? With one fragment of myself, I hold up the whole universe." }
        ]
      }
    ],
    mirror: {
      headline: "The modern mirror",
      tag: "Divinity hides in the specific",
      body: "Notice what Krishna does here: instead of pointing at the sky and saying 'I am the infinite,' he points at concrete, named things — a specific river, a specific mountain, a specific warrior. The divine isn't elsewhere. It's the most excellent version of whatever you're already looking at. The fastest horse. The clearest river. The strongest argument. When something stops you in your tracks because of its quality, you're seeing it. The list is an exercise in attention."
    },
    reflection: "Name three things this week that stopped you because of their excellence — a piece of code, a wave, a sentence, a person doing their job perfectly. That's the chapter, in your life.",
    whyPrompts: [
      "Why does Krishna list specifics instead of staying abstract?",
      "Is 'I am time, the destroyer' a threat or a comfort?",
      "What does it mean that the divine hides in 'whatever is glorious' — does that mean the divine is just excellence?"
    ]
  },
  {
    n: 11,
    title: "The universal form",
    sanskrit: "Vishvarupa Darshana Yoga",
    subtitle: "Krishna shows his true form — and Arjuna almost can't survive it",
    accent: "krishna",
    concepts: ["vishvarupa", "kala", "ishvara"],
    characters: ["krishna", "arjuna"],
    scenes: [
      {
        setting: "Arjuna asks for the whole truth.",
        panels: [
          { who: "arjuna", line: "If you say I can see your divine form — please. Show me." },
          { who: "krishna", line: "Behold. With divine eyes I'll grant you, see my forms — hundreds, thousands, of every kind." },
          { who: "narrator", line: "And then Arjuna sees. Suns within suns. Mouths swallowing armies. Time itself, eating worlds." },
          { who: "arjuna", line: "I see all the gods in your body. Your form has no end, no middle, no beginning." }
        ]
      },
      {
        setting: "Arjuna is terrified. He sees soldiers from both sides being consumed.",
        panels: [
          { who: "arjuna", line: "I see the warriors of both armies rushing into your mouths, like rivers into the sea. I'm afraid. Tell me — who are you?" },
          { who: "krishna", line: "I am Time, the great destroyer of worlds, here to consume all these warriors. Even without you, none of them will survive." },
          { who: "krishna", line: "Therefore stand up. Win the kingdom. The battle is already decided. Be the instrument, not the cause." },
          { who: "arjuna", line: "Please — return to the form I knew. Be the friend I recognize again. This is too much to bear." }
        ]
      }
    ],
    mirror: {
      headline: "The modern mirror",
      tag: "You are an instrument, not the cause",
      body: "The most famous line — 'I am become death, destroyer of worlds' — is here. Oppenheimer quoted it for a reason. The point isn't horror. It's perspective. The forces shaping outcomes are vastly bigger than your individual will. You're not the hero of the story; you're a moving part in something already in motion. That's terrifying AND it's relief. You don't have to save the world by yourself. You just have to not refuse your part."
    },
    reflection: "What outcome have you been treating as 'on your shoulders' that actually has dozens of forces moving toward it whether you act or not? What would change if you acted as an instrument instead of as the cause?",
    whyPrompts: [
      "Why does Krishna give a vision so overwhelming Arjuna begs him to stop?",
      "What's the difference between 'be an instrument' and just being a fatalist?",
      "Why this chapter, here, in the middle of the book?"
    ]
  },
  {
    n: 12,
    title: "The path of devotion",
    sanskrit: "Bhakti Yoga",
    subtitle: "Of all the paths — which is easiest, which is hardest?",
    accent: "dharma",
    concepts: ["bhakti", "abhyasa", "samatva"],
    characters: ["krishna", "arjuna"],
    scenes: [
      {
        setting: "After the cosmic vision, Arjuna asks something practical.",
        panels: [
          { who: "arjuna", line: "Some worship you with love and form. Others worship the formless, unmanifest absolute. Which is better?" },
          { who: "krishna", line: "Those who fix their minds on me, with steady devotion — they are the highest yogis, in my view." },
          { who: "krishna", line: "Those who pursue the formless absolute reach me too. But the path is harder. The unmanifest is hard for embodied beings to grasp." },
          { who: "krishna", line: "If you can't fix your mind on me steadily — practice. Try and try." }
        ]
      },
      {
        setting: "Krishna gives a ladder of practices.",
        panels: [
          { who: "krishna", line: "If practice is too hard — work for me. Do all your actions for my sake. You'll reach perfection." },
          { who: "krishna", line: "If even that's too hard — surrender the fruits of your actions. Just give up the result. Peace will follow." },
          { who: "krishna", line: "The one who is the same to friend and enemy, honor and dishonor, heat and cold, pleasure and pain — that one is dear to me." },
          { who: "krishna", line: "The one who doesn't disturb the world and isn't disturbed by it — that one is dear to me." }
        ]
      }
    ],
    mirror: {
      headline: "The modern mirror",
      tag: "A ladder, not a single rung",
      body: "Chapter 12 is for people who hear chapters 7–11 and think 'I can't do that.' Krishna gives a fallback ladder: full devotion → constant remembrance → action for the divine → just surrender the results. Each rung is easier than the one above it. The point isn't to start at the top. The point is to start at whatever rung you can stand on, and stand on it consistently. 'Surrender the fruits' is the lowest rung — and it's still enough. That's the most honest spiritual instruction in the book."
    },
    reflection: "Which rung of this ladder are you on right now — honestly? Not where you wish you were. Where do you actually stand?",
    whyPrompts: [
      "Why does Krishna list practices in order of difficulty instead of insisting on one?",
      "Is 'devotion to a personal god' just easier psychologically than abstract truth-seeking?",
      "What does 'doesn't disturb the world and isn't disturbed by it' look like in practice?"
    ]
  },
  {
    n: 13,
    title: "The field and the knower",
    sanskrit: "Kshetra Kshetrajna Vibhaga Yoga",
    subtitle: "Two things you confuse for each other every day",
    accent: "krishna",
    concepts: ["prakriti", "purusha", "atman", "jnana"],
    characters: ["krishna", "arjuna"],
    scenes: [
      {
        setting: "Krishna draws a clean distinction.",
        panels: [
          { who: "krishna", line: "This body is called the field. Whoever knows the body — the awareness inside it — is the knower of the field." },
          { who: "krishna", line: "Know me as the knower in every field. Knowledge of the field and the knower — that is true wisdom." },
          { who: "krishna", line: "The field includes: the elements, the senses, the mind, intellect, ego, desire, aversion, pleasure, pain." },
          { who: "krishna", line: "All of that is the FIELD. Not you. You are what watches the field." }
        ]
      },
      {
        setting: "Krishna lists what real knowledge looks like.",
        panels: [
          { who: "krishna", line: "Humility. Honesty. Non-violence. Patience. Self-control. Steady attention. Even-mindedness in good and bad. These ARE knowledge." },
          { who: "krishna", line: "The supreme is everywhere — beyond the senses, yet supports the senses. Without qualities, yet enjoys qualities." },
          { who: "krishna", line: "Whoever sees the same self in all beings — sees truly. That one doesn't harm the self, doesn't decay." },
          { who: "krishna", line: "Whoever sees that all action is done by nature, and the self is not the doer — that one sees." }
        ]
      }
    ],
    mirror: {
      headline: "The modern mirror",
      tag: "You are not your thoughts",
      body: "This is the chapter that anticipates modern therapy by a few thousand years. Your body is a field. Your mind is part of the field. Your emotions, desires, even your sense of self — all field. There's something else watching all of it. When anxiety arises, you're not the anxiety; you're what watches the anxiety arise. That tiny shift — from being the storm to being the sky the storm passes through — is the entire teaching of chapter 13."
    },
    reflection: "Next time you're flooded by a feeling — anger, fear, craving — try the experiment: 'I'm not this; I'm what's watching this.' Does the feeling change?",
    whyPrompts: [
      "Why does Krishna list humility and patience as 'knowledge'? Aren't those virtues, not knowledge?",
      "If the self isn't the doer, who's responsible for what I do?",
      "How is 'the witness' different from just dissociation?"
    ]
  },
  {
    n: 14,
    title: "The three gunas",
    sanskrit: "Gunatraya Vibhaga Yoga",
    subtitle: "Why your moods aren't really 'you'",
    accent: "dust",
    concepts: ["gunas", "sattva", "rajas", "tamas", "prakriti"],
    characters: ["krishna", "arjuna"],
    scenes: [
      {
        setting: "Krishna names three forces.",
        panels: [
          { who: "krishna", line: "Three qualities run through nature: sattva (clarity), rajas (drive), tamas (inertia). They bind even the imperishable self to the body." },
          { who: "krishna", line: "Sattva binds through attachment to happiness and knowledge. It's the trap of feeling good." },
          { who: "krishna", line: "Rajas binds through craving and restless action. It's the trap of needing to do, achieve, want." },
          { who: "krishna", line: "Tamas binds through sleep, laziness, confusion. It's the trap of not caring." }
        ]
      },
      {
        setting: "Arjuna asks how to recognize them, and how to get free.",
        panels: [
          { who: "arjuna", line: "What are the signs of someone who's gone beyond the three? How do they live?" },
          { who: "krishna", line: "They don't hate clarity, drive, or inertia when they arise. Don't long for them when they leave. They sit like a witness." },
          { who: "krishna", line: "Pleasure and pain are equal. Gold, dirt, and stone are equal. Praise and blame are equal." },
          { who: "krishna", line: "Whoever serves me with steady devotion — passing beyond the three qualities — is fit for becoming Brahman." }
        ]
      }
    ],
    mirror: {
      headline: "The modern mirror",
      tag: "Sattva, rajas, tamas — three modes",
      body: "Modern translation: clarity-mode, drive-mode, slump-mode. You cycle through all three every day. Morning coffee buzz = rajas. Afternoon scroll = tamas. The 30-min stretch when everything clicks = sattva. The teaching isn't 'always be in sattva' — that's just another attachment. The teaching is: notice which mode you're in, name it, don't be owned by it. Sattva, rajas, tamas all pass through. You're what stays."
    },
    reflection: "Track your day in three columns: clarity, drive, slump. Which mode were you in for most of it? Which mode were you in when you made your most important decision?",
    whyPrompts: [
      "Why is sattva — feeling clear and good — also a trap?",
      "Is rajas the same as ambition, or different?",
      "How do I tell tamas from genuine rest?"
    ]
  },
  {
    n: 15,
    title: "The supreme person",
    sanskrit: "Purushottama Yoga",
    subtitle: "The upside-down tree of existence",
    accent: "dharma",
    concepts: ["purusha", "atman", "moksha"],
    characters: ["krishna", "arjuna"],
    scenes: [
      {
        setting: "Krishna paints an unusual image.",
        panels: [
          { who: "krishna", line: "The world is an upside-down tree. Roots above, branches below. Its leaves are the verses of the scriptures." },
          { who: "krishna", line: "Its branches reach down, fed by the three gunas. Its tendrils, action, run through the human world." },
          { who: "krishna", line: "Cut this tree at its root — with the strong axe of non-attachment. Then seek that place from which there is no return." },
          { who: "krishna", line: "A spark of me dwells in every being as the eternal self. With the mind and the senses, it draws on nature." }
        ]
      },
      {
        setting: "Krishna names what he is.",
        panels: [
          { who: "krishna", line: "There are two persons in this world: the perishable and the imperishable. All beings are perishable. The unmoving is imperishable." },
          { who: "krishna", line: "But there is a higher person — the supreme self — who pervades and sustains the three worlds." },
          { who: "krishna", line: "Because I am beyond the perishable and even beyond the imperishable, I am known as the supreme person — Purushottama." },
          { who: "krishna", line: "Whoever, free from delusion, knows me thus — knows everything. They worship me with their whole being." }
        ]
      }
    ],
    mirror: {
      headline: "The modern mirror",
      tag: "Cut at the root, not the leaves",
      body: "The upside-down tree is a great image: you can't fix the leaves. You can't even fix the branches. The whole structure of craving, achievement, identity grows from a root that's somewhere else — and that's where the work has to happen. You can spend a lifetime pruning symptoms (tweaking the job, the relationship, the workout, the diet) and never touch the root. Cut at the root — the attachment itself — and the whole tree falls quietly."
    },
    reflection: "What 'leaf' have you been pruning for years that keeps growing back? What might its root be?",
    whyPrompts: [
      "Why an upside-down tree? Why not right-side-up?",
      "What's the 'axe of non-attachment' practically?",
      "How is the supreme person different from the imperishable self?"
    ]
  },
  {
    n: 16,
    title: "Divine and demonic natures",
    sanskrit: "Daivasura Sampad Vibhaga Yoga",
    subtitle: "Two ways of being human",
    accent: "arjuna",
    concepts: ["dharma", "kama", "krodha"],
    characters: ["krishna", "arjuna"],
    scenes: [
      {
        setting: "Krishna draws a contrast.",
        panels: [
          { who: "krishna", line: "Some are born with divine qualities: fearlessness, purity of mind, generosity, self-control, study, austerity, honesty." },
          { who: "krishna", line: "Others, with demonic: hypocrisy, arrogance, conceit, anger, harshness, ignorance." },
          { who: "krishna", line: "The divine nature leads to liberation. The demonic, to bondage. Don't grieve — you were born with the divine." },
          { who: "krishna", line: "Demonic people don't know what to do or what to refrain from. No purity in them, no truth, no good conduct." }
        ]
      },
      {
        setting: "Krishna describes the demonic worldview.",
        panels: [
          { who: "krishna", line: "They say: 'The world has no truth, no foundation, no god. Beings are produced by lust. Nothing else exists.'" },
          { who: "krishna", line: "Holding such views, they become enemies of the world. They engage in cruel deeds for its destruction." },
          { who: "krishna", line: "Filled with insatiable desire, hypocrisy, pride — they pursue impure goals through impure means." },
          { who: "krishna", line: "Three gates open into hell, destroying the self: lust, anger, greed. Therefore renounce these three." }
        ]
      }
    ],
    mirror: {
      headline: "The modern mirror",
      tag: "Two operating systems",
      body: "Don't read 'divine' and 'demonic' as cosmic labels — read them as operating systems. The divine OS: I act with purpose, I tell the truth, I don't take more than my share, I can be still. The demonic OS: I'm always selling something, I lie when convenient, I take what I can, I can't sit alone. Most people run a mix, throughout the day, throughout the year. The teaching is: notice which OS is running right now. The lust/anger/greed gates aren't moral failures. They're just where the OS swaps."
    },
    reflection: "Pick one specific moment yesterday where you noticed yourself flipping between these two modes. What flipped you? Can you flip back on purpose?",
    whyPrompts: [
      "Isn't 'demonic' too strong? Aren't most people just mixed?",
      "Why are lust, anger, and greed singled out as the 'three gates'?",
      "What's the difference between healthy desire and the lust that's a 'gate to hell'?"
    ]
  },
  {
    n: 17,
    title: "Three kinds of faith",
    sanskrit: "Shraddhatraya Vibhaga Yoga",
    subtitle: "What you have faith in tells you who you are",
    accent: "dust",
    concepts: ["shraddha", "gunas", "sattva", "rajas", "tamas"],
    characters: ["krishna", "arjuna"],
    scenes: [
      {
        setting: "Arjuna asks about faith without scripture.",
        panels: [
          { who: "arjuna", line: "What about people who have faith but don't follow the scriptures? Where do they stand?" },
          { who: "krishna", line: "Faith takes the shape of whichever guna dominates a person. We are the faith we hold." },
          { who: "krishna", line: "Sattvic faith worships the divine. Rajasic faith worships power and success. Tamasic faith worships ghosts and confusion." },
          { who: "krishna", line: "Even the food a person prefers tells you: light and nourishing (sattvic), spicy and intense (rajasic), stale and tasteless (tamasic)." }
        ]
      },
      {
        setting: "Krishna covers austerity, gift-giving, and speech.",
        panels: [
          { who: "krishna", line: "Sattvic austerity: undertaken with steady faith, no expectation of reward. Rajasic: done for show or status. Tamasic: done to harm yourself or others." },
          { who: "krishna", line: "Sattvic gift: given to one who can't repay, at the right time and place, to the right person. Rajasic: given expecting return. Tamasic: given without thought, to the wrong person, with contempt." },
          { who: "krishna", line: "Sattvic speech: true, kind, beneficial, study of scripture. Speech that doesn't agitate." },
          { who: "krishna", line: "OM TAT SAT — these three syllables represent the absolute. Whatever is done with these in mind, even imperfect, is held by them." }
        ]
      }
    ],
    mirror: {
      headline: "The modern mirror",
      tag: "Faith = where attention goes",
      body: "You don't get to opt out of faith. If you don't have faith in a god, you have faith in money, or status, or your own intelligence, or the news cycle, or a relationship, or science. Krishna's saying: look at where your attention goes when you're scared, and you'll see what you actually have faith in. Then ask: is that thing reliable? Does that thing hold up? The question isn't 'do you have faith.' The question is 'in what.'"
    },
    reflection: "When something goes wrong this week, watch what your mind reaches for first. That's the answer.",
    whyPrompts: [
      "Why does Krishna include FOOD in a chapter about faith?",
      "Is rajasic faith — faith in success and power — really worse than no faith?",
      "What does it mean to do something 'in the name of OM TAT SAT' if I'm not religious?"
    ]
  },
  {
    n: 18,
    title: "Liberation through surrender",
    sanskrit: "Moksha Sannyasa Yoga",
    subtitle: "Krishna ties everything together — and asks Arjuna to choose",
    accent: "krishna",
    concepts: ["moksha", "sharanagati", "karma-yoga", "bhakti", "dharma"],
    characters: ["krishna", "arjuna"],
    scenes: [
      {
        setting: "The longest chapter. Krishna summarizes everything.",
        panels: [
          { who: "arjuna", line: "Tell me clearly — what is renunciation? What is letting go? What's the difference?" },
          { who: "krishna", line: "Renunciation is giving up actions driven by desire. Letting go is giving up attachment to the fruits of action." },
          { who: "krishna", line: "The wise don't give up acting. They give up the craving for results. That's true letting go." },
          { who: "krishna", line: "Five things produce every action: the body, the doer, the senses, the effort, and destiny. Whoever sees the self as the sole doer — sees wrongly." }
        ]
      },
      {
        setting: "Krishna sorts everything by guna one last time.",
        panels: [
          { who: "krishna", line: "Sattvic doer: free of attachment, steady, undisturbed by success or failure. Rajasic: attached to fruit, greedy, violent. Tamasic: scattered, dishonest, lazy." },
          { who: "krishna", line: "Better your own duty done imperfectly than another's done perfectly. Each person's nature gives them their work." },
          { who: "krishna", line: "Do your work as worship of the source from whom all beings come. That way perfection is reached." },
          { who: "krishna", line: "Better is one's own dharma, even flawed, than another's dharma well done. Death in one's own dharma is good. Another's dharma brings fear." }
        ]
      },
      {
        setting: "The final teaching. Krishna's voice softens.",
        panels: [
          { who: "krishna", line: "Surrender all duties. Take refuge in me alone. I will free you from all sins. Do not grieve." },
          { who: "krishna", line: "This is my final word. Reflect on it fully. Then do as you wish." },
          { who: "arjuna", line: "My delusion is gone. My memory is restored, by your grace. I'm steady. My doubts are gone. I will do what you say." },
          { who: "narrator", line: "And then the war begins. The Gita ends. Arjuna picks up his bow." }
        ]
      }
    ],
    mirror: {
      headline: "The modern mirror",
      tag: "The whole book in one move",
      body: "The Gita's final word is not 'follow these rules' or 'meditate this way' or 'understand this teaching.' It's: surrender all that and trust. After 18 chapters of careful argument, Krishna's last move is to let it go. 'Reflect on it fully. Then do as you wish.' He doesn't compel Arjuna. He gives him everything and steps back. Arjuna picks up the bow not because he was forced to, but because, finally, the doubt is gone. Whatever you've been agonizing over — the Gita ends with you doing it. Not certain. Not perfect. Steady."
    },
    reflection: "What's the bow you've been refusing to pick up? Now that you've walked through 18 chapters with Arjuna — what's stopping you?",
    whyPrompts: [
      "Why does Krishna give Arjuna full freedom at the end? Why not command?",
      "What does 'surrender all duties' mean for someone with real responsibilities — kids, mortgage, work?",
      "Is the Gita's ending hopeful or sobering? Both? How do I tell?"
    ]
  }
];
