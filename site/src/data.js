export const videos = [
  {
    n: 1,
    title: 'Vehicle chassis',
    desc: 'Raycast suspension, network ownership handoff, drift tuning.',
    tag: 'Vehicles',
    src: 'videos/Car.mp4'
  },
  {
    n: 2,
    title: 'Carpet wash system',
    desc: 'Cleaning game built on EditableImage, dirt painted away pixel by pixel as you scrub.',
    tag: 'Simulators',
    src: 'videos/CarpetWash.mp4'
  },
  {
    n: 3,
    title: 'Dynamic skill tree',
    desc: 'Nodes unlock from a config table, points spent server side, progression saved between sessions.',
    tag: 'Progression',
    src: 'videos/DynamicSkillTreeWithProgressionSaving.mp4'
  },
  {
    n: 4,
    title: 'Helldivers dive system',
    desc: 'Dive on input, with a camera that shifts framing dynamically from mouse distance and position.',
    tag: 'Combat',
    src: 'videos/HellDiversBasedSystemWithDynamicCamera.mp4'
  },
  {
    n: 5,
    title: 'Parkour system',
    desc: 'IK driven movement with dynamic sliding, wall running and wall climbing.',
    tag: 'Movement',
    src: 'videos/ParkourSystem.mp4'
  },
  {
    n: 6,
    title: 'PVE melee combat',
    desc: 'Enemy AI that fights back, built on a melee kit with light and heavy attacks, blocking and parries.',
    tag: 'Combat',
    src: 'videos/PVE.mp4'
  }
]

export const tiers = [
  {
    name: 'Debugging',
    fits: 'Find and fix a bug in your existing script. You describe it, I trace it and hand back the fix.',
    time: 'Same day',
    price: 'from $15',
    robux: 'from 1,000 R$'
  },
  {
    name: 'Simple script',
    fits: 'A small, single purpose script: a door, a kill brick, a leaderboard, a tool, a GUI button.',
    time: '1 to 2 days',
    price: 'from $20',
    robux: '1,000 to 15,000 R$'
  },
  {
    name: 'Small system',
    fits: 'One self contained system: a shop, a data store, a UI screen, a single weapon.',
    time: '2 to 4 days',
    price: 'from $60',
    robux: 'from 21,000 R$'
  },
  {
    name: 'Medium system',
    fits: 'A connected set: full combat, a simulator loop with saving, a vehicle with UI.',
    time: '1 to 2 weeks',
    price: 'from $250',
    robux: 'from 87,500 R$'
  }
]

export const specialties = [
  'Combat systems',
  'Data stores',
  'UI programming',
  'Simulators / tycoons',
  'Vehicles',
  'Anti-cheat',
  'Monetization',
  'Building systems',
  'AI behaviours'
]

export const stats = [
  { value: '5 yrs', label: 'Scripting in Luau' },
  { value: String(specialties.length), label: 'System specialties' },
  { value: String(videos.length), label: 'Recorded demos' },
  { value: '<24h', label: 'Reply time on Discord' }
]

export const shipped = {
  name: 'Floors',
  role: 'AI and systems scripter',
  desc: 'I script the monster AI for Floors: a state machine that drives how it behaves, sound detection so it reacts to what it hears, and pathfinding to hunt players around the map. I also handle server to client replication, optimize for performance, and debug and fix issues across the codebase.',
  points: [
    'AI behaviour',
    'Monster state machine',
    'Sound detection',
    'Pathfinding',
    'Networking / replication',
    'Optimization',
    'Debugging'
  ],
  youtube: 'KoeNSALcb4o',
  url: null
}

export const steps = [
  { title: 'Message me', text: 'Send a short brief on Discord: what the system does, and screenshots or references if you have them.' },
  { title: 'Get a quote', text: 'I place it in a tier and give you a price and turnaround before any work starts.' },
  { title: 'Half up front', text: 'Pay 50% in USD, or Robux by group payout. Then I build it.' },
  { title: 'Delivery', text: 'Documented source dropped into your place. Revisions within scope included, then the other half.' }
]

export const faq = [
  {
    q: 'Do you script full games?',
    a: 'No. I build systems: combat, saving, UI, vehicles, AI and the like. If you need a whole game, I can take it one system at a time.'
  },
  {
    q: 'How does paying in Robux work?',
    a: 'Every tier has a Robux price as an alternative to USD, paid by group payout. I never take a percentage of the game.'
  },
  {
    q: 'Who owns the code?',
    a: 'You do. Once it is paid for, the source lives in your place and you can change or extend it however you like.'
  },
  {
    q: 'What should I send in my first message?',
    a: 'What the system should do, how players interact with it, and anything it has to plug into. Videos or games that do something similar help a lot.'
  },
  {
    q: 'Can you work inside my existing setup?',
    a: 'Yes. I work with Rojo and Git, with Knit or custom frameworks, and I can follow your code style and module layout.'
  },
  {
    q: 'What counts as a revision?',
    a: 'Changes that keep to the original brief, such as tuning values, fixing behaviour or adjusting UI. New features outside the brief are quoted separately.'
  }
]

export const testimonials = []

export const DISCORD = 'https://discord.com/users/506442617253527552'
