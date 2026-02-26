from fastapi import FastAPI, File, UploadFile
import shutil
import os
import cv2
import cvzone
from ultralytics import YOLO
from datetime import datetime

app = FastAPI()

# Load model
model = YOLO("weights/best.pt")

UPLOAD_FOLDER = "results/inputs"
OUTPUT_FOLDER = "results/boulders"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

@app.get("/")
def home():
    return {"message": "Boulder Detection API Running 🚀"}

@app.post("/detect-boulder/")
async def detect_boulder(file: UploadFile = File(...)):
    # Save uploaded file
    input_path = os.path.join(UPLOAD_FOLDER, file.filename)
    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    image = cv2.imread(input_path)

    if image is None:
        return {"error": "Invalid image"}

    results = model.predict(image)

    detections = []

    for r in results:
        for box in r.boxes:
            x1, y1, x2, y2 = map(int, box.xyxy[0])
            conf = float(box.conf[0])

            width = x2 - x1
            height = y2 - y1
            diameter = width * 0.3

            detections.append({
                "x1": x1, "y1": y1, "x2": x2, "y2": y2,
                "confidence": round(conf, 3),
                "diameter": round(diameter, 2)
            })

            cvzone.cornerRect(image, (x1, y1, width, height), l=8, t=1, rt=1)

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    output_path = f"{OUTPUT_FOLDER}/boulder_{timestamp}.jpg"
    cv2.imwrite(output_path, image)

    return {
        "message": "Detection successful",
        "output_image": output_path,
        "detections": detections
    }