/* ------------------------------------------------------------------
   BLACK & WHITE — game data
   Edit this file to change questions, scoring or the personality text.
   No other file needs to change.

   Each option has:
     label : the word(s) shown on screen
     w     : trait weights (0–3) this choice adds to
     side  : "bold" | "soft" (optional) — used for the bold-vs-soft summary
     tone  : "light" | "dark" (optional) — panel colour. Defaults: left = light, right = dark
------------------------------------------------------------------- */

window.GAME = {

  traits: {
    fire: {
      label: "Fire", noun: "Flame", adj: "Blazing",
      tag: "Driven, direct and hard to move.",
      high: "There is an intense, driven fire under whatever calm you show the world. Your convictions are strong, your energy is high, and when something matters you would rather fight for it than dress it up in romantic gestures.",
      low: "You don't burn hot just for the sake of it. You pick your battles carefully and save your intensity for what truly deserves it."
    },
    depth: {
      label: "Depth", noun: "Tide", adj: "Moonlit",
      tag: "Quiet waters, long thoughts.",
      high: "When the noise of the day winds down, you drift toward depth: calm, quiet and introspective. There is an emotional undercurrent in you, wide and steady like the ocean, and you rarely show all of it at once.",
      low: "You live more in the day than in the dark. You'd rather act than turn things over a hundred times, and you don't dwell where you can move."
    },
    warmth: {
      label: "Warmth", noun: "Hearth", adj: "Loyal",
      tag: "Soft hands, loyal heart.",
      high: "You care in a way people can actually feel. When you let someone in you want real intimacy and presence, not surface-level interaction, and your loyalty runs deep once it's given.",
      low: "Your affection isn't loud and it isn't handed out easily. You keep your tenderness for the few who have shown they're worth it."
    },
    order: {
      label: "Order", noun: "Architect", adj: "Composed",
      tag: "A clean space, a clear mind.",
      high: "You think best in a clean, organised space. You keep what is useful, let go of what isn't, and you don't collect things at random. Clutter feels like noise to you.",
      low: "You're comfortable with a bit of mess. Life, for you, isn't something to be arranged neatly on a shelf."
    },
    candor: {
      label: "Candor", noun: "Arrow", adj: "Straight-shooting",
      tag: "No filter, no pretense.",
      high: "You don't waste time on pretense, small talk or overthinking. You strip away the fluff and go straight to what is real, raw and comfortable, and you say it out loud.",
      low: "You read the room before you speak. Tact and timing matter to you as much as being right."
    },
    indep: {
      label: "Independence", noun: "Wanderer", adj: "Free",
      tag: "Your own road, your own rules.",
      high: "You own your path without apology. Self-preservation comes naturally to you, and you protect your energy, your time and your freedom.",
      low: "You'd rather walk with someone than alone. Togetherness matters more to you than proving you can manage by yourself."
    },
    ground: {
      label: "Grounded", noun: "Anchor", adj: "Steady",
      tag: "Feet on the earth.",
      high: "You trust what is real and what you can verify. You stay steady while others spin, and you choose substance over performance.",
      low: "You leave room for imagination, mystery and the unexplained. Not everything has to be pinned down to be true."
    },
    vital: {
      label: "Vitality", noun: "Spark", adj: "Vivid",
      tag: "Alive and moving.",
      high: "You choose life, loudly. Your energy is high and you chase experiences over things. Your best assets are the memories you've made, not what you've bought.",
      low: "Your energy is measured and well spent. You'd trade a loud life for a peaceful one."
    }
  },

  questions: [
    { a: { label: "Black",     tone: "dark",  w: { fire: 2, depth: 1, indep: 1 },           side: "bold" },
      b: { label: "White",     tone: "light", w: { order: 2, ground: 1, depth: 1 },          side: "soft" } },

    { a: { label: "Tea",       w: { depth: 1, warmth: 1, order: 1 },                         side: "soft" },
      b: { label: "Coffee",    w: { vital: 2, fire: 1 },                                     side: "bold" } },

    { a: { label: "Sugar",     w: { warmth: 2 },                                             side: "soft" },
      b: { label: "Pepper",    w: { fire: 2, vital: 1 },                                     side: "bold" } },

    { a: { label: "Sun",       w: { vital: 2, candor: 1 },                                   side: "bold" },
      b: { label: "Moon",      w: { depth: 2, indep: 1 },                                    side: "soft" } },

    { a: { label: "Mountain",  w: { ground: 2, indep: 1 },                                   side: "bold" },
      b: { label: "Ocean",     w: { depth: 2, warmth: 1 },                                   side: "soft" } },

    { a: { label: "Dawn",      w: { vital: 2, order: 1 },                                    side: "bold" },
      b: { label: "Dusk",      w: { depth: 2, warmth: 1 },                                   side: "soft" } },

    { a: { label: "Guns",      w: { fire: 2, indep: 1, candor: 1 },                          side: "bold" },
      b: { label: "Roses",     w: { warmth: 2, depth: 1 },                                   side: "soft" } },

    { a: { label: "Casuals",   w: { candor: 2, ground: 1 },                                  side: "bold" },
      b: { label: "Formals",   w: { order: 2, ground: 1 } } },

    { a: { label: "Fact",      w: { ground: 2, candor: 1 },                                  side: "bold" },
      b: { label: "Fiction",   w: { depth: 2, indep: 1 },                                    side: "soft" } },

    { a: { label: "Dog",       w: { warmth: 2, vital: 1 },                                   side: "soft" },
      b: { label: "Cat",       w: { indep: 2, depth: 1 },                                    side: "soft" } },

    { a: { label: "Talk",      w: { candor: 2, warmth: 1 },                                  side: "bold" },
      b: { label: "Text",      w: { depth: 1, order: 1, indep: 1 },                          side: "soft" } },

    { a: { label: "Ice",       w: { ground: 2, order: 1 },                                   side: "soft" },
      b: { label: "Fire",      w: { fire: 2, vital: 1 },                                     side: "bold" } },

    { a: { label: "Bed",       w: { depth: 1, indep: 1, warmth: 1 },                         side: "soft" },
      b: { label: "Sofa",      w: { warmth: 1, ground: 1, vital: 1 } } },

    { a: { label: "Hugs",      w: { warmth: 2, depth: 1 },                                   side: "soft" },
      b: { label: "Kisses",    w: { fire: 1, warmth: 1, vital: 1 },                          side: "bold" } },

    { a: { label: "Naked",     w: { candor: 2, indep: 1, fire: 1 },                          side: "bold" },
      b: { label: "Clothes",   w: { order: 1, ground: 1 } } },

    { a: { label: "Life",      w: { vital: 2, fire: 1 },                                     side: "bold" },
      b: { label: "Death",     w: { depth: 2, ground: 1 },                                   side: "soft" } },

    { a: { label: "You",       w: { warmth: 2, depth: 1 },                                   side: "soft" },
      b: { label: "Me",        w: { indep: 2, fire: 1 },                                     side: "bold" } }
  ]
};
