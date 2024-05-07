const exampleAnswers = [
  "You know, it's not that the <span style='color: #ff9900;'>squirrel</span> isn't intelligent in its own right, it's just that algebra and squirrels don't exactly go hand in hand. It's like asking for a masterpiece from a paintbrush dipped in water. Squirrels are adept at their own domain—gathering nuts, navigating trees, and looking cute while doing it. Algebra? Well, that's a different kind of tree altogether. It's not impossible, but it's certainly a challenge.",
  "Picture this: you're submerged in the depths of the ocean, surrounded by water pressure and the eerie quiet of the deep sea, and suddenly, you realize there's a screen door letting water into your submarine. It's not just useless; it's <strong>detrimental</strong>. Similarly, some things just don't fit their intended purpose. It's not about the lack of usefulness per se; it's about the mismatch between function and context.",
  "Now, jellyfish wrestling might sound like the latest extreme sport, but trust me, it's not something you'd willingly sign up for. Yet, when faced with a particularly daunting task or situation, it starts to seem like the lesser evil. Sometimes, the mere thought of grappling with a gelatinous sea creature seems more appealing than tackling whatever challenge lies ahead. It's all about perspective and the lengths we'd go to avoid certain things.",
  "Ah, the proverbial needle in a haystack, but with a twist. When the haystack itself is composed entirely of needles, the task becomes infinitely more complex. <blockquote>It's not just about sifting through a mass of hay to find a single object;</blockquote> it's about distinguishing one needle from countless others that look identical. Some tasks are inherently more difficult because of the sheer volume of similar elements involved.",
  "Imagine compiling a list of all the times you've heard a particular phrase or question. Each repetition adds another dollar to your imaginary llama fund. It's a whimsical thought, but it underscores the frequency with which certain things occur. The absurdity of the statement highlights the monotony of repetition and the potential for unexpected outcomes.",
  "Sure, here's a list of some fruits I find delightful:<ul> <li> Mangoes </li><li> Strawberries </li><li> Pineapples </li><li> Kiwis </li><li> Blueberries </li></ul>Each of these fruits has its own unique flavor profile and can be enjoyed in various ways, whether eaten fresh, blended into smoothies, or added to salads for a burst of freshness and sweetness.",
];

export function getRandomItem() {
  // Generate a random index between 0 and the length of the array minus 1
  const randomIndex = Math.floor(Math.random() * exampleAnswers.length);

  // Return the item at the randomly generated index
  return exampleAnswers[randomIndex];
}
