import { QuizQuestion } from "@/components/Quiz";

// Easy level quizzes
export const quantumQuizEasy: QuizQuestion[] = [
  {
    question: "What are quarks?",
    options: [
      "Particles that orbit the nucleus",
      "The fundamental constituents that make up protons and neutrons",
      "Force carriers in electromagnetic interactions",
      "Types of energy waves",
    ],
    correctAnswer: 1,
    explanation:
      "Quarks are fundamental particles that combine to form protons and neutrons. They come in six 'flavors': up, down, strange, charm, top, and bottom.",
    difficulty: "easy",
  },
  {
    question: "How many types of quarks exist?",
    options: ["3 types", "6 types", "8 types", "12 types"],
    correctAnswer: 1,
    explanation:
      "There are six types (or 'flavors') of quarks: up, down, strange, charm, top, and bottom. Each also has an antimatter counterpart.",
    difficulty: "easy",
  },
  {
    question: "What is the role of gluons?",
    options: [
      "They create electrical charges",
      "They bind quarks together via the strong force",
      "They make atoms stick together",
      "They carry electromagnetic force",
    ],
    correctAnswer: 1,
    explanation:
      "Gluons are force carrier particles that mediate the strong nuclear force, binding quarks together to form protons and neutrons.",
    difficulty: "easy",
  },
];

export const quantumQuizMedium: QuizQuestion[] = [
  {
    question: "What is a lepton?",
    options: [
      "A particle made of quarks",
      "A force carrier particle",
      "A particle like an electron that doesn't experience the strong force",
      "A type of atom",
    ],
    correctAnswer: 2,
    explanation:
      "Leptons are fundamental particles that don't experience the strong nuclear force. The most common lepton is the electron, but muons and taus are also leptons.",
    difficulty: "medium",
  },
  {
    question: "Can quarks exist independently?",
    options: [
      "Yes, they can exist alone in high energy conditions",
      "No, they are always confined within composite particles",
      "Only at very low temperatures",
      "Yes, but only for a fraction of a second",
    ],
    correctAnswer: 1,
    explanation:
      "Quarks are always confined within composite particles like protons and neutrons due to a phenomenon called 'confinement.' The strong force actually gets stronger as quarks move apart, making it impossible to isolate a single quark.",
    difficulty: "medium",
  },
  {
    question: "What is asymptotic freedom in quantum chromodynamics?",
    options: [
      "Quarks become lighter at high energies",
      "Quarks interact less strongly at very short distances",
      "Quarks can escape from protons at high temperatures",
      "Gluons disappear at high energies",
    ],
    correctAnswer: 1,
    explanation:
      "Asymptotic freedom means that quarks interact weakly when they are very close together but the force strengthens as they move apart. This paradoxical behavior is unique to the strong force.",
    difficulty: "medium",
  },
];

export const quantumQuizHard: QuizQuestion[] = [
  {
    question: "What is color charge in quantum chromodynamics?",
    options: [
      "The actual color of quarks",
      "A property analogous to electric charge that comes in three types: red, green, and blue",
      "The wavelength of light emitted by quarks",
      "The temperature of quark interactions",
    ],
    correctAnswer: 1,
    explanation:
      "Color charge is a quantum property of quarks and gluons. Unlike electric charge, it comes in three types (red, green, blue) and their anticolors. All observable particles must be 'color neutral.'",
    difficulty: "hard",
  },
  {
    question: "What phenomenon explains why we can't observe isolated quarks?",
    options: [
      "Quantum tunneling",
      "Heisenberg uncertainty principle",
      "Color confinement",
      "Wave-particle duality",
    ],
    correctAnswer: 2,
    explanation:
      "Color confinement is the phenomenon where the strong force becomes so powerful at large distances that it's energetically impossible to separate quarks. Any attempt to pull quarks apart results in creating new quark-antiquark pairs.",
    difficulty: "hard",
  },
];

export const protonsNeutronsQuizEasy: QuizQuestion[] = [
  {
    question: "What is a proton composed of?",
    options: [
      "3 down quarks",
      "2 up quarks and 1 down quark",
      "1 up quark and 2 down quarks",
      "6 quarks of various types",
    ],
    correctAnswer: 1,
    explanation:
      "A proton consists of 2 up quarks (each with +2/3 charge) and 1 down quark (with -1/3 charge), giving it a total charge of +1.",
    difficulty: "easy",
  },
  {
    question: "What is the charge of a neutron?",
    options: ["+1", "-1", "0 (neutral)", "+2"],
    correctAnswer: 2,
    explanation:
      "Neutrons have no electric charge (they're neutral). They're composed of 1 up quark (+2/3) and 2 down quarks (-1/3 each), totaling zero charge.",
    difficulty: "easy",
  },
  {
    question: "What determines the element's identity?",
    options: [
      "Number of neutrons",
      "Number of electrons",
      "Number of protons",
      "Total mass",
    ],
    correctAnswer: 2,
    explanation:
      "The number of protons (atomic number) determines what element an atom is. Hydrogen has 1 proton, helium has 2, carbon has 6, and so on.",
    difficulty: "easy",
  },
];

export const protonsNeutronsQuizMedium: QuizQuestion[] = [
  {
    question: "What force holds quarks together inside protons and neutrons?",
    options: [
      "Electromagnetic force",
      "Gravitational force",
      "Strong nuclear force",
      "Weak nuclear force",
    ],
    correctAnswer: 2,
    explanation:
      "The strong nuclear force, mediated by gluons, is what binds quarks together within protons and neutrons. It's the strongest of the four fundamental forces.",
    difficulty: "medium",
  },
  {
    question: "What happens as you try to pull quarks apart?",
    options: [
      "The force gets weaker",
      "The force stays the same",
      "The force gets stronger",
      "They repel each other",
    ],
    correctAnswer: 2,
    explanation:
      "The strong force exhibits 'asymptotic freedom' - it gets stronger as quarks move apart, like a rubber band being stretched. This makes it impossible to isolate individual quarks.",
    difficulty: "medium",
  },
];

export const protonsNeutronsQuizHard: QuizQuestion[] = [
  {
    question: "What is the approximate mass contribution of quarks to a proton's total mass?",
    options: [
      "Nearly 100% of the mass",
      "About 50% of the mass",
      "Only about 1% of the mass",
      "Exactly 33% of the mass",
    ],
    correctAnswer: 2,
    explanation:
      "Surprisingly, the three quarks in a proton only account for about 1% of its mass. The remaining 99% comes from the energy of the gluon field and the kinetic energy of the quarks - this is E=mc² in action!",
    difficulty: "hard",
  },
];

export const atomsQuizEasy: QuizQuestion[] = [
  {
    question: "What is an atom primarily made of?",
    options: [
      "Only protons and electrons",
      "A nucleus of protons and neutrons, surrounded by electrons",
      "Just neutrons and electrons",
      "A solid sphere of matter",
    ],
    correctAnswer: 1,
    explanation:
      "An atom consists of a dense nucleus containing protons and neutrons, with electrons orbiting in shells around it. Most of an atom is actually empty space!",
    difficulty: "easy",
  },
  {
    question: "What is the most abundant element in the universe?",
    options: ["Carbon", "Oxygen", "Hydrogen", "Helium"],
    correctAnswer: 2,
    explanation:
      "Hydrogen is the most abundant element in the universe, making up about 75% of all normal matter. It's also the simplest element with just one proton.",
    difficulty: "easy",
  },
  {
    question: "How many elements are in the periodic table?",
    options: ["92", "108", "118", "150"],
    correctAnswer: 2,
    explanation:
      "There are currently 118 confirmed elements in the periodic table. Elements 1-94 occur naturally, while elements 95-118 are synthetic (human-made).",
    difficulty: "easy",
  },
];

export const atomsQuizMedium: QuizQuestion[] = [
  {
    question: "What are isotopes?",
    options: [
      "Elements with different numbers of protons",
      "Elements with different numbers of electrons",
      "Atoms of the same element with different numbers of neutrons",
      "Atoms with different atomic numbers",
    ],
    correctAnswer: 2,
    explanation:
      "Isotopes are variants of the same element (same number of protons) but with different numbers of neutrons. For example, Carbon-12 and Carbon-14 are both carbon but have different neutron counts.",
    difficulty: "medium",
  },
  {
    question: "What determines an atom's chemical properties?",
    options: [
      "Number of protons",
      "Number of neutrons",
      "Number and arrangement of electrons, especially in outer shell",
      "Total mass of the atom",
    ],
    correctAnswer: 2,
    explanation:
      "An atom's chemical properties are determined by its electrons, particularly those in the outermost shell (valence electrons). These electrons participate in chemical bonding.",
    difficulty: "medium",
  },
];

export const atomsQuizHard: QuizQuestion[] = [
  {
    question: "What is the significance of electron shells being quantized?",
    options: [
      "Electrons can have any energy level",
      "Electrons can only exist at specific, discrete energy levels",
      "Electrons move in perfect circles",
      "Electrons don't move at all",
    ],
    correctAnswer: 1,
    explanation:
      "Quantum mechanics shows that electrons can only exist at specific, discrete energy levels (shells). This quantization explains atomic spectra, chemical bonding, and why atoms are stable.",
    difficulty: "hard",
  },
];

export const greenhouseQuizEasy: QuizQuestion[] = [
  {
    question: "Why do molecules like CO₂ trap heat while N₂ and O₂ don't?",
    options: [
      "CO₂ is heavier",
      "CO₂ has an asymmetric structure that absorbs infrared radiation",
      "CO₂ is a liquid",
      "N₂ and O₂ reflect all radiation",
    ],
    correctAnswer: 1,
    explanation:
      "Greenhouse gases like CO₂ have asymmetric molecular structures that vibrate when struck by infrared radiation, absorbing and re-emitting heat. Symmetric molecules like N₂ and O₂ don't interact with infrared as effectively.",
    difficulty: "easy",
  },
  {
    question: "What is the molecular formula for methane?",
    options: ["CO₂", "CH₄", "N₂O", "H₂O"],
    correctAnswer: 1,
    explanation:
      "Methane (CH₄) consists of one carbon atom bonded to four hydrogen atoms. It's released from agriculture, natural gas operations, and decomposing organic matter.",
    difficulty: "easy",
  },
  {
    question: "What percentage of greenhouse gas emissions does CO₂ account for?",
    options: ["~25%", "~50%", "~75%", "~95%"],
    correctAnswer: 2,
    explanation:
      "Carbon dioxide accounts for approximately 75% of greenhouse gas emissions, primarily from burning fossil fuels like coal, oil, and natural gas for energy.",
    difficulty: "easy",
  },
];

export const greenhouseQuizMedium: QuizQuestion[] = [
  {
    question: "Which greenhouse gas is most potent per molecule over 100 years?",
    options: [
      "Carbon Dioxide (CO₂)",
      "Methane (CH₄)",
      "Nitrous Oxide (N₂O)",
      "Water Vapor (H₂O)",
    ],
    correctAnswer: 2,
    explanation:
      "Nitrous Oxide (N₂O) is about 265 times more potent than CO₂ over 100 years. However, CO₂ is still the biggest concern because we emit much more of it.",
    difficulty: "medium",
  },
  {
    question: "How long does CO₂ stay in the atmosphere?",
    options: [
      "About 10 years",
      "About 50 years",
      "Hundreds to thousands of years",
      "It breaks down immediately",
    ],
    correctAnswer: 2,
    explanation:
      "CO₂ can remain in the atmosphere for hundreds to thousands of years. This long lifetime is one reason why reducing emissions now is so critical for future climate.",
    difficulty: "medium",
  },
];

export const greenhouseQuizHard: QuizQuestion[] = [
  {
    question: "What is a dipole moment and why is it crucial for greenhouse gases?",
    options: [
      "The speed at which molecules rotate",
      "An uneven distribution of electrical charge that allows interaction with infrared radiation",
      "The mass of the molecule",
      "The temperature of the gas",
    ],
    correctAnswer: 1,
    explanation:
      "A dipole moment occurs when a molecule has an uneven distribution of electrical charge. This allows it to interact with the oscillating electric field of infrared radiation, absorbing that energy and trapping heat. Symmetric molecules like N₂ and O₂ have no net dipole moment and can't absorb infrared effectively.",
    difficulty: "hard",
  },
  {
    question: "What is the primary quantum mechanical reason that CO₂ absorbs infrared but N₂ doesn't?",
    options: [
      "CO₂ has more mass",
      "CO₂'s vibrational modes cause a change in dipole moment when absorbing IR photons",
      "N₂ is too small to interact with light",
      "CO₂ is always in an excited state",
    ],
    correctAnswer: 1,
    explanation:
      "CO₂'s asymmetric bending and stretching vibrations cause changes in its electric dipole moment. These changes allow it to couple with the oscillating electromagnetic field of infrared photons. N₂, being homonuclear and symmetric, has no dipole moment change during vibration and cannot absorb infrared radiation effectively.",
    difficulty: "hard",
  },
];

// Legacy combined quizzes for backward compatibility
export const quantumQuiz = [...quantumQuizEasy, ...quantumQuizMedium, ...quantumQuizHard];
export const protonsNeutronsQuiz = [...protonsNeutronsQuizEasy, ...protonsNeutronsQuizMedium, ...protonsNeutronsQuizHard];
export const atomsQuiz = [...atomsQuizEasy, ...atomsQuizMedium, ...atomsQuizHard];
export const greenhouseQuiz = [...greenhouseQuizEasy, ...greenhouseQuizMedium, ...greenhouseQuizHard];
