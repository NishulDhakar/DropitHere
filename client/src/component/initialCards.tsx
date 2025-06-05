"use client"
import React, { useState, useEffect } from "react";
import { Card } from "./Card";
import { BACKRND_URL } from "../config";

export default function CardList() {
  const [cards, setCards] = useState<{ title: string; link: string; type: "youtube" | "twitter" }[]>([]);

  useEffect(() => {
    const fetchCards = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch(`${BACKRND_URL}/api/v1/content`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setCards(data.content);
    };
    fetchCards();
  }, []);

  const handleDelete = async (link: string) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${BACKRND_URL}/api/v1/content`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ link }),
      });
      const data = await res.json();
      if (res.ok) {
        setCards(prev => prev.filter(card => card.link !== link));
      } else {
        alert(data.message || "Failed to delete content");
      }
    } catch (err) {
      console.error("Failed to delete:", err);
      alert("Failed to delete content. Please try again.");
    }
  };

  return (
    <div className="grid gap-4">
      {cards.map((card) => (
        <Card
          key={card.link}
          title={card.title}
          link={card.link}
          type={card.type}
          onDelete={() => handleDelete(card.link)}
        />
      ))}
    </div>
  );
}
