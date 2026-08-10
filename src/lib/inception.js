export const generateTagline = async (name, role, interests) => {
  const apiKey = import.meta.env.VITE_INCEPTION_API_KEY;
  if (!apiKey) {
    console.warn("VITE_INCEPTION_API_KEY is not set. Using default tagline.");
    return null;
  }

  const prompt = `Generate a single short and punchy, fun, one-line tagline for an ID card of a participant at a hacker house (Hacker House Goa).
Their name is ${name || "a builder"}, role is ${role || "hacker"}, and their interests are: ${interests || "building things"}.
Keep it under 10 words. Example: 'Fueled by Caffeine, Code, and Good Anime.' Only output the tagline, nothing else. No quotes.`;

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
    return tagline;
  } catch (error) {
    console.error("Error generating tagline:", error);
    return null;
  }
};
