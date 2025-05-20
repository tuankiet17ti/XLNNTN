# FastAPI + React

## FastAPI Setup

### Backend Dependencies
- Python 3.9+
- pip install -r requirements.txt

### Frontend Dependencies
- NodeJS


### Components
- backend/
  - model.py (Apply pre-trained model for fine-tune with given text to return description)
  - amazon.py (Using selenium for reading and get product information + user reviews. Then feed to model)
  - main.py (Prepare route, host, ... to communicate with frontend)
- frontend/
  - src/
    - components/
      - AmazonSummary.jsx (Process output return)
      - AddAmazonURLForm.jsx (Form that using to input amazon url)
    - App.jsx
    - main.jsx 
    - api.js (Prepare to communicate with backend)

### Running project
Run backend:
- cd backend
- python main.py

Run frontend
- cd frontend
- npm run dev
