"use client";

import { useMemo, useState } from "react";

type PersonalityId =
  | "bold-adventurer"
  | "sweet-enthusiast"
  | "zen-minimalist"
  | "social-butterfly"
  | "health-nut"
  | "indulgent-treat";

type Personality = {
  id: PersonalityId;
  name: string;
  coffee: string;
  tagline: string;
  color: string;
  art: string;
};

type Answer = {
  label: string;
  personality: PersonalityId;
  icon: string;
};

type Question = {
  prompt: string;
  answers: Answer[];
};

const personalities: Personality[] = [
  {
    id: "bold-adventurer",
    name: "Bold Adventurer",
    coffee: "Double Espresso",
    tagline: "You live for intensity",
    color: "#ff6b5f",
    art: "espresso",
  },
  {
    id: "sweet-enthusiast",
    name: "Sweet Enthusiast",
    coffee: "Caramel Latte",
    tagline: "Life's too short for bitter",
    color: "#ffd166",
    art: "latte",
  },
  {
    id: "zen-minimalist",
    name: "Zen Minimalist",
    coffee: "Black Coffee, Single Origin",
    tagline: "Simple. Clean. Perfect.",
    color: "#172033",
    art: "black",
  },
  {
    id: "social-butterfly",
    name: "Social Butterfly",
    coffee: "Cappuccino",
    tagline: "Coffee is better with company",
    color: "#5b7cfa",
    art: "cappuccino",
  },
  {
    id: "health-nut",
    name: "Health Nut",
    coffee: "Oat Milk Americano",
    tagline: "Wellness in every sip",
    color: "#14b8a6",
    art: "americano",
  },
  {
    id: "indulgent-treat",
    name: "Indulgent Treat",
    coffee: "Mocha with Whip",
    tagline: "Coffee is dessert",
    color: "#b24b70",
    art: "mocha",
  },
];

const questions: Question[] = [
  {
    prompt: 'You find a glowing button labeled "Maybe." What do you do?',
    answers: [
      { label: "Press it immediately", personality: "bold-adventurer", icon: "bolt" },
      { label: "Ask if it comes with sprinkles", personality: "sweet-enthusiast", icon: "sparkle" },
      { label: "Sit beside it and observe quietly", personality: "zen-minimalist", icon: "stone" },
      { label: "Invite everyone over to vote", personality: "social-butterfly", icon: "circle" },
      { label: "Check whether it affects sleep quality", personality: "health-nut", icon: "leaf" },
      { label: "Save it for a dramatic midnight moment", personality: "indulgent-treat", icon: "gem" },
    ],
  },
  {
    prompt: "Pick a weather system for your inner world.",
    answers: [
      { label: "Thunderstorm over a neon city", personality: "bold-adventurer", icon: "bolt" },
      { label: "Cotton-candy sunset", personality: "sweet-enthusiast", icon: "sparkle" },
      { label: "Clear sky over still water", personality: "zen-minimalist", icon: "stone" },
      { label: "Warm breeze through a street festival", personality: "social-butterfly", icon: "circle" },
      { label: "Fresh mountain air after rain", personality: "health-nut", icon: "leaf" },
      { label: "Golden fog around a dessert table", personality: "indulgent-treat", icon: "gem" },
    ],
  },
  {
    prompt: "A mysterious vending machine offers you one object.",
    answers: [
      { label: "A compass that points to risk", personality: "bold-adventurer", icon: "bolt" },
      { label: "A tiny cake with your name on it", personality: "sweet-enthusiast", icon: "sparkle" },
      { label: "A smooth black stone", personality: "zen-minimalist", icon: "stone" },
      { label: "A phone that only calls favorite people", personality: "social-butterfly", icon: "circle" },
      { label: "A reusable bottle that refills itself", personality: "health-nut", icon: "leaf" },
      { label: 'A velvet ticket to "something lavish"', personality: "indulgent-treat", icon: "gem" },
    ],
  },
  {
    prompt: "Choose a room to spend an hour in.",
    answers: [
      { label: "The room with a secret trapdoor", personality: "bold-adventurer", icon: "bolt" },
      { label: "The pink room full of pastries", personality: "sweet-enthusiast", icon: "sparkle" },
      { label: "The empty white room with perfect silence", personality: "zen-minimalist", icon: "stone" },
      { label: "The room where everyone is laughing", personality: "social-butterfly", icon: "circle" },
      { label: "The sunlit room full of plants", personality: "health-nut", icon: "leaf" },
      { label: "The room with candlelight and chocolate", personality: "indulgent-treat", icon: "gem" },
    ],
  },
  {
    prompt: "Your spirit object is probably:",
    answers: [
      { label: "A matchstick", personality: "bold-adventurer", icon: "bolt" },
      { label: "A ribbon", personality: "sweet-enthusiast", icon: "sparkle" },
      { label: "A ceramic bowl", personality: "zen-minimalist", icon: "stone" },
      { label: "A party invitation", personality: "social-butterfly", icon: "circle" },
      { label: "A leaf", personality: "health-nut", icon: "leaf" },
      { label: "A gold spoon", personality: "indulgent-treat", icon: "gem" },
    ],
  },
  {
    prompt: "A tiny oracle gives you advice. What does it say?",
    answers: [
      { label: '"Go first."', personality: "bold-adventurer", icon: "bolt" },
      { label: '"Make it sweeter."', personality: "sweet-enthusiast", icon: "sparkle" },
      { label: '"Remove one thing."', personality: "zen-minimalist", icon: "stone" },
      { label: '"Bring someone with you."', personality: "social-butterfly", icon: "circle" },
      { label: '"Drink water too."', personality: "health-nut", icon: "leaf" },
      { label: '"Choose the beautiful version."', personality: "indulgent-treat", icon: "gem" },
    ],
  },
  {
    prompt: "Pick the door you'd open.",
    answers: [
      { label: "Red door humming with electricity", personality: "bold-adventurer", icon: "bolt" },
      { label: "Candy-striped door with warm light underneath", personality: "sweet-enthusiast", icon: "sparkle" },
      { label: "Matte black door with no handle", personality: "zen-minimalist", icon: "stone" },
      { label: "Yellow door with music behind it", personality: "social-butterfly", icon: "circle" },
      { label: "Green door covered in vines", personality: "health-nut", icon: "leaf" },
      { label: "Burgundy door with a velvet rope", personality: "indulgent-treat", icon: "gem" },
    ],
  },
];

function AnswerIcon({ icon }: { icon: string }) {
  return (
    <span className={`answer-icon ${icon}`} aria-hidden="true">
      <span />
    </span>
  );
}

function CoffeeArt({ art, name }: { art: string; name: string }) {
  return (
    <div className={`coffee-art ${art}`} aria-label={`${name} coffee illustration`}>
      <span className="steam steam-one" />
      <span className="steam steam-two" />
      <span className="cup-top" />
      <span className="cup-body" />
      <span className="cup-handle" />
      <span className="cup-detail detail-one" />
      <span className="cup-detail detail-two" />
      <span className="saucer" />
    </div>
  );
}

function QuizQuestion({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  onBack,
}: {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (personality: PersonalityId) => void;
  onBack: () => void;
}) {
  return (
    <section className="quiz-card" aria-labelledby="question-title">
      <div className="question-topline">
        <span>
          Question {questionNumber} of {totalQuestions}
        </span>
        <span>Pick your instinct</span>
      </div>

      <div className="question-layout">
        <div className="question-number" aria-hidden="true">
          Q{questionNumber}
        </div>
        <h2 id="question-title">{question.prompt}</h2>
      </div>

      <div className="answers-grid">
        {question.answers.map((answer) => (
          <button
            className="answer-button"
            key={answer.label}
            onClick={() => onAnswer(answer.personality)}
            type="button"
          >
            <AnswerIcon icon={answer.icon} />
            <span>{answer.label}</span>
          </button>
        ))}
      </div>

      <div className="question-actions">
        <button
          className="secondary-action"
          aria-disabled={questionNumber === 1}
          onClick={questionNumber === 1 ? undefined : onBack}
          type="button"
        >
          Back
        </button>
      </div>
    </section>
  );
}

function Results({
  answers,
  onRestart,
}: {
  answers: PersonalityId[];
  onRestart: () => void;
}) {
  const results = useMemo(() => {
    const counts = Object.fromEntries(
      personalities.map((personality) => [personality.id, 0]),
    ) as Record<PersonalityId, number>;

    answers.forEach((answer) => {
      counts[answer] += 1;
    });

    return personalities
      .map((personality) => ({
        ...personality,
        count: counts[personality.id],
        percentage: Math.round((counts[personality.id] / answers.length) * 100),
      }))
      .sort((a, b) => b.count - a.count);
  }, [answers]);

  const topResult = results[0];

  return (
    <section className="results-panel" aria-labelledby="results-title">
      <div className="result-hero">
        <div>
          <span className="eyebrow">Your coffee blend</span>
          <h2 id="results-title">You are mostly {topResult.name}</h2>
          <p>
            Your strongest match is {topResult.coffee}, but your full coffee
            personality has a few flavors in the mix.
          </p>
        </div>
        <CoffeeArt art={topResult.art} name={topResult.name} />
      </div>

      <div className="result-list">
        {results.map((result) => (
          <article
            className={`result-card ${result.count === 0 ? "is-empty" : ""}`}
            key={result.id}
          >
            <CoffeeArt art={result.art} name={result.name} />
            <div className="result-copy">
              <div className="result-heading">
                <h3>{result.name}</h3>
                <strong>{result.percentage}%</strong>
              </div>
              <p className="coffee-name">{result.coffee}</p>
              <p>{result.tagline}</p>
              <div
                className="result-meter"
                aria-label={`${result.name}: ${result.percentage} percent`}
              >
                <span
                  style={{
                    backgroundColor: result.color,
                    width: `${result.percentage}%`,
                  }}
                />
              </div>
            </div>
          </article>
        ))}
      </div>

      <button className="primary-action restart-action" onClick={onRestart} type="button">
        Restart quiz
      </button>
    </section>
  );
}

export default function Home() {
  const [answers, setAnswers] = useState<PersonalityId[]>([]);
  const currentQuestionIndex = answers.length;
  const isComplete = answers.length === questions.length;
  const progress = Math.round((answers.length / questions.length) * 100);

  function handleAnswer(personality: PersonalityId) {
    if (!isComplete) {
      setAnswers((currentAnswers) => [...currentAnswers, personality]);
    }
  }

  function handleBack() {
    setAnswers((currentAnswers) => currentAnswers.slice(0, -1));
  }

  function handleRestart() {
    setAnswers([]);
  }

  return (
    <main className="quiz-shell">
      <section className="masthead" aria-label="Coffee personality quiz intro">
        <div>
          <span className="eyebrow">What is Your Coffee Personality?</span>
          <h1>Coffee Personality Quiz</h1>
          <p>
            Answer seven strange little questions and get your personality
            blend with a coffee recommendation for every flavor.
          </p>
        </div>

        <div
          className="progress-card"
          aria-label={`Quiz progress: ${progress} percent complete`}
        >
          <span>{isComplete ? "Results" : `Question ${currentQuestionIndex + 1}`}</span>
          <strong>{progress}%</strong>
          <div className="progress-track" aria-hidden="true">
            <span style={{ width: `${progress}%` }} />
          </div>
        </div>
      </section>

      {isComplete ? (
        <Results answers={answers} onRestart={handleRestart} />
      ) : (
        <QuizQuestion
          question={questions[currentQuestionIndex]}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          onAnswer={handleAnswer}
          onBack={handleBack}
        />
      )}
    </main>
  );
}
