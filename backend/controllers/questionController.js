const axios = require("axios");

const HF_API_URL =
  "https://api-inference.huggingface.co/models/sshleifer/tiny-gpt2"; 

const HF_API_KEY = process.env.HF_API_KEY;

const getSoal = async (req, res) => {
  try {
    const question =
      req.body.prompt ||
      "Buatkan 1 soal pilihan ganda matematika sederhana dalam format JSON seperti { no: 1, soal: '...', pilihan_ganda: 'a. .. b. .. c. .. d. ..', jawaban: '...' }";

    const response = await axios.post(
    HF_API_URL,
    {
        inputs: question,
        parameters: { max_new_tokens: 150 }, 
        options: { wait_for_model: true }
    },
    {
        headers: {
        Authorization: `Bearer ${HF_API_KEY}`,
        "Content-Type": "application/json",
        },
        timeout: 9990000
    }
    );
    
    // response dari Hugging Face bisa berupa array atau object
    let result = response.data;
    if (Array.isArray(result)) {
      result = result[0]?.generated_text || JSON.stringify(result);
    }

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("HuggingFace API Error:", error.message);

    res.status(500).json({
      success: false,
      error: error.response?.data || error.message,
    });
  }
};

module.exports = { getSoal };
