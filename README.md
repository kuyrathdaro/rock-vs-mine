# 🌊 Rock vs Mine Prediction

A machine learning web application that predicts whether sonar signals indicate a **Rock** or a **Mine** using a trained classification model.

![React](https://img.shields.io/badge/React-19.1-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6)
![FastAPI](https://img.shields.io/badge/FastAPI-Python_3.10-green)
![Vite](https://img.shields.io/badge/Vite-6.3-646cff)
![License](https://img.shields.io/badge/License-GPL--3.0-blue)

## ✨ Features

- **Manual Input** - Enter 60 comma-separated sonar values for prediction
- **CSV Upload** - Batch predict from CSV files with multiple samples
- **Prediction History** - All predictions saved locally via IndexedDB
- **Beautiful UI** - Ocean-themed dark mode with glowing effects
- **Responsive Design** - Works on desktop and mobile

## 🛠️ Tech Stack

### Frontend
- **React** 19.1 + **TypeScript** 5.8
- **Vite** 6.3 (build tool)
- **Material-UI** 7.1 (components)
- **TanStack Table** 8.21 (data tables)
- **SWR** 2.3 (data fetching)
- **Tailwind CSS** 4.1 (styling)
- **Zod** 3.25 (validation)
- **IndexedDB** (local storage)

### Backend
- **FastAPI** + **Uvicorn** (Python 3.10)
- **Pandas** (data processing)
- **Scikit-learn** (ML model)
- **NumPy** (numerical computing)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.10+ with Conda

### Backend Setup

```bash
cd backend
conda activate ml
python -m app.main
```

Server runs at `http://localhost:8000`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

App runs at `http://localhost:5173`

### Environment Variables

Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:8000
```

## 📁 Project Structure

```
rock-vs-mine/
├── backend/
│   ├── app/
│   │   ├── api/v1/          # API routes
│   │   ├── core/            # ML model
│   │   ├── schemas/         # Pydantic models
│   │   └── main.py          # FastAPI app
│   ├── data/                # Training data
│   └── models/              # Saved models
│
└── frontend/
    └── src/
        ├── components/      # UI components
        ├── hooks/           # Custom React hooks
        ├── pages/           # Route pages
        ├── services/        # API & IndexedDB
        └── types.ts         # TypeScript types
```

## 📖 Usage

1. **Manual Prediction**: Go to "Manual Input" tab, enter 60 sonar values, click "Predict"
2. **Batch Prediction**: Go to "Upload CSV" tab, upload a CSV file, click "Predict"
3. **View History**: Click "History" in the nav to see past predictions
4. **View Details**: Click the eye icon on any history record for full details

## 🎨 UI Features

- Custom ocean-themed scrollbars
- Glowing table headers
- Animated prediction chips (Rock = Green, Mine = Red)
- Infinite scroll tables
- Tooltips for truncated data

## 📝 License

GPL-3.0 - See [LICENSE](LICENSE) for details.
