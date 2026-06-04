import axios from "axios";

export async function analyzeAnswerSheet(
  base64Image
) {

  try {

    const response =
      await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model:
            "google/gemini-2.5-flash",

          max_tokens: 1000,

          messages: [
            {
              role: "user",

              content: [
                {
                  type: "text",

                  text: `
You are LEARNIQ AI.

Analyze this student's answer sheet.

Return ONLY valid JSON.

Example:

{
  "score": 78,

  "learningGaps": [
    "Vocabulary",
    "Reading Comprehension"
  ],

  "rootCauses": [
    "Conceptual Weakness",
    "Limited Practice"
  ],

  "explainabilityFactors": [
    {
      "factor": "Vocabulary Gap",
      "percentage": 45
    },
    {
      "factor": "Attention Issues",
      "percentage": 30
    },
    {
      "factor": "Conceptual Weakness",
      "percentage": 25
    }
  ],

  "recommendations": [
    "Practice reading passages",
    "Weekly revision exercises"
  ],

  "summary":
  "Student requires additional support in reading and vocabulary development."
}

Rules:
- Return JSON only
- No markdown
- No explanation
- No code block
- Percentages should total 100
`
                },

                {
                  type:
                    "image_url",

                  image_url: {
                    url:
                      base64Image
                  }
                }
              ]
            }
          ]
        },

        {
          headers: {
            Authorization:
              `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,

            "Content-Type":
              "application/json"
          }
        }
      );

 const aiText =
  response?.data?.choices?.[0]?.message?.content
  ?.trim() || "";

const cleanedText =
  aiText
    .replace(/```json\s*/gi, "")
    .replace(/```\s*/g, "")
    .trim();

console.log(
  "RAW AI RESPONSE:",
  aiText
);

try {

  return JSON.parse(
    cleanedText
  );

} catch (parseError) {

  console.error(
    "JSON PARSE ERROR:",
    parseError
  );

  console.error(
    "RAW RESPONSE:",
    aiText
  );

  return {

    score: 0,

    learningGaps: [
      "Response Format Error"
    ],

    rootCauses: [
      "AI Formatting Issue"
    ],

    explainabilityFactors: [
      {
        factor:
          "System Error",
        percentage: 100
      }
    ],

    recommendations: [
      "Retry Analysis"
    ],

    summary:
      "AI returned an invalid JSON format."

  };

}
  } catch (error) {

    console.error(
      "LEARNIQ AI ERROR:",
      error
    );

    return {

      score: 0,

      learningGaps: [
        "Analysis Failed"
      ],

      rootCauses: [
        "Unable To Analyze"
      ],

      explainabilityFactors: [
        {
          factor:
            "System Error",
          percentage: 100
        }
      ],

      recommendations: [
        "Retry Analysis"
      ],

      summary:
        "AI could not analyze this answer sheet."

    };

  }

}