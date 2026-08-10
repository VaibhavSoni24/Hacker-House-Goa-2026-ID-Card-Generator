export const generateTagline = async (name, role, interests) => {
  const apiKey = import.meta.env.VITE_INCEPTION_API_KEY;
  if (!apiKey) {
    console.warn("VITE_INCEPTION_API_KEY is not set. Using default tagline.");
    return null;
  }

  const prompt = `Generate a single short, punchy, fun, one-line tagline for a Hacker House Goa ID card.
Their name is ${name || "a builder"}, role is ${role || "hacker"}, and their interests are: ${interests || "building things"}.
CRITICAL: Keep it STRICTLY under 40 characters total. Example: 'Fueled by Code & Anime.' Only output the tagline, no quotes, no extra text.`;

  try {
    const response = await fetch("https://api.inceptionlabs.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "mercury-2",
        messages: [{ role: "user", content: prompt }],
        reasoning_effort: "low", // using low for faster response
        temperature: 0.75,
        max_tokens: 150
      })
    });

    if (!response.ok) {
      throw new Error(`Inception API error: ${response.statusText}`);
    }

    const data = await response.json();
    let tagline = data.choices[0]?.message?.content?.trim();
    if (tagline.startsWith('"') && tagline.endsWith('"')) {
      tagline = tagline.slice(1, -1);
    }
    // Force truncation just in case the AI ignores the prompt
    if (tagline.length > 40) {
      tagline = tagline.substring(0, 37) + '...';
    }
    return tagline;
  } catch (error) {
    console.error("Error generating tagline:", error);
    return null;
  }
};
