"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CARD_VALUES = [
  "🍎", "🍌", "🍇", "🍓",
  "🍒", "🍍", "🥝", "🍉"
];

export default function MemoryTiles() {
  const [cards, setCards] = useState<string[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    const shuffled = [...CARD_VALUES, ...CARD_VALUES]
      .sort(() => Math.random() - 0.5);
    setCards(shuffled);
  }, []);

  const handleClick = (index: number) => {
    if (flipped.includes(index) || matched.has(index)) return;
    const newFlipped = [...flipped, index];
    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      const [a, b] = newFlipped;
      if (cards[a] === cards[b]) {
        setMatched(new Set([...matched, a, b]));
      }
      setTimeout(() => setFlipped([]), 800);
    } else {
      setFlipped(newFlipped);
    }
  };

  const allMatched = matched.size === cards.length;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4 text-center">Memory Tiles</h1>
      <div className="grid grid-cols-4 gap-2">
        {cards.map((value, idx) => (
          <Button
            key={idx}
            variant="outline"
            size="lg"
            className={cn(
              "h-16 w-16 text-4xl",
              matched.has(idx) && "bg-green-200",
              flipped.includes(idx) && "bg-white"
            )}
            onClick={() => handleClick(idx)}
            disabled={matched.has(idx) || flipped.includes(idx)}
          >
            {matched.has(idx) || flipped.includes(idx) ? value : "❓"}
          </Button>
        ))}
      </div>
      <div className="mt-4 text-center">
        <p>Moves: {moves}</p>
        {allMatched && <p className="text-green-600 font-semibold">All pairs matched!</p>}
      </div>
    </div>
  );
}
