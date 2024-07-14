import api from "../../utils/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getLanguages = createAsyncThunk(
  "laguages/getLanguages",
  async () => {
    const res = await api.get("getLanguages");
    return res.data.data.languages;
  }
);

export const translateText = createAsyncThunk(
  "translate/translateSlice",
  async (p) => {
    //* API'ye gönderilicek olan parametreleri belirle
    const params = new URLSearchParams();
    params.set("source_language", p.sourceLang.value);
    params.set("target_language", p.targetLang.value);
    params.set("text", p.text);

    //* API'ye istek at
    const res = await api.post("/translate", params);
    return res.data.data.translatedText;
  }
);
