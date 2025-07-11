# AI-Powered Multimodal Product Search Engine

This project is an AI-driven semantic search system for e-commerce products (e.g., Walmart-style catalog), leveraging features like:

- 💬 Natural language prompts ("A red shirt with black dots")
- 🖼️ Visual queries (image-only search)
- 🧠 Abstract contextual prompts ("Shoes that go well with a maroon shirt and cream pants")
- 👨🏼‍⚕️ Your personal shopping assistant!

---

## ⚙️ Tech Stack

| Component      | Description                                                  |
|----------------|--------------------------------------------------------------|
| **Python**     | Core programming language for data processing and pipelines  |
| **Cohere (embed-v4.0)** | Embedding model for text and image (multimodal embeddings) |
| **Pinecone**   | Vector database for fast similarity search and retrieval     |

---

## 🧠 Features

### 1. 🔍 Natural Language Search
- Full-text search using user prompts.
- Supports descriptive and abstract queries.
- Embedded using Cohere’s `embed-v4.0`.
- Supports 9 Languages: English, German, Portuguese, Hindi, Arabic, Spanish, Chinese(simplified), French, Italian. 

### 2. 🖼️ Image-Based Search
- Product images embedded using Cohere.
- Supports similarity search using only visual signals.
- Finds products similar to an image provided by the user.

### 3. 🧠 Multimodal Query Understanding
- Queries like *"shoes that go with maroon shirt"* are supported.
- System combines image + text features to rank best matches.

---

## 🗃️ Data Flow

1. **Load Dataset** (`walmart-products.csv`)
    - Fields: SKU, title, description, specifications, reviews, images, etc.

2. **Preprocessing**
    - Combine product specs, reviews, attributes into rich text blobs.
    - Convert image files to base64-encoded data URIs.

3. **Embedding**
    - Text and/or image passed to `co.embed()` (Cohere v4).
    - Mode: `search_document` for indexing, `search_query` for querying.

4. **Vector Upsert to Pinecone**
    - Indexed using unique product IDs.
    - Metadata includes brand, price, category, etc.

5. **Querying**
    - User prompt → Cohere embed → Pinecone search
    - Return top N most semantically relevant results

---

## 🧪 Sample Queries

- `"a cotton shirt with tribal prints"`
- `"black running shoes with red laces"`
- `"a backpack that matches my cream denim"`
- `upload an image of a sandal` → returns visually similar items

---

## 📦 Future Improvements

- Contextual outfit suggestions (via LLM+fashion graph)
- Hybrid filters (e.g., color + embedding score)
- User preference modeling
- Use LLM (e.g., GPT-4, Gemini) to rewrite abstract prompts for improved accuracy.

---

## 📁 File Structure(WIP)

```
├── embed_and_upsert.py     # Main logic for loading, embedding, and indexing
├── .env                    # API keys for Cohere and Pinecone
├── walmart-products.csv    # Raw product data
├── utils/
│   ├── image_to_base64.py  # Image conversion helpers
│   └── prompt_rewriter.py  # (Optional) LLM-based query rewriter
├── README.md
```

---

## 🔐 Environment Variables (.env)
```
COHERE_API_KEY=your_cohere_api_key
PINECONE_API_KEY=your_pinecone_api_key
```

---

## 📚 References
- [Cohere Embed API](https://docs.cohere.com/reference/embed)
- [Pinecone Docs](https://docs.pinecone.io)

---

## 🧑‍💻 Author
Built by:
- [Krish Das](https://www.linkedin.com/in/krish-das-215aa4278/)
- [Aditya Anand](https://www.linkedin.com/in/aditya-astralite-anand/)
- [Yash Raj Singh](https://www.linkedin.com/in/yashhhhh/)
