import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = 3000;

app.get("/weather/:city", async (req, res) => {
  const city = decodeURIComponent(req.params.city);
  const API_KEY = process.env.WEATHERAPI_KEY;
  const url = `https://api.weatherapi.com/v1/current.json?key=${"cda6c50dc0fc4aa1884132258251202"}&q=${city}&lang=ru`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    const result = {
      city: data.location.name,
      temperature: data.current.temp_c,
      description: data.current.condition.text,
    };

    res.json(result);
  } catch (error) {
    console.error("Ошибка запроса:", error.response?.data || error.message);
    res.status(500).json({ error: "Не удалось получить данные о погоде." });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
