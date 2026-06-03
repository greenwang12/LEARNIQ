import axios from "axios";

export async function analyzeStudent(studentData) {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-chat",
        messages: [
          {
            role: "user",
            content: `
Analyze this student.

${studentData}

Provide:

1. Learning Gaps
2. Root Causes
3. Explainable AI Factors
4. Teacher Intervention
5. Parent Intervention
6. Student Action Plan

Format clearly.
            `,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${
            import.meta.env.VITE_OPENROUTER_API_KEY
          }`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error(error);
    return "AI Analysis Failed";
  }
}